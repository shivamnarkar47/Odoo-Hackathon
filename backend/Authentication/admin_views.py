from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Swap, PlatformMessage, BannedUser, UserActivityLog
from .serializers import (
    SwapSerializer,
    PlatformMessageSerializer,
    BannedUserSerializer,
    UserActivityLogSerializer,
)
from .permissions import IsAdminUser
import pandas as pd
from io import BytesIO
from django.http import HttpResponse

User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def list_platform_messages(request):
    messages = PlatformMessage.objects.all().order_by("-created_at")
    serializer = PlatformMessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_platform_message(request):
    serializer = PlatformMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message created successfully"})
    return Response(serializer.errors, status=400)


@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def update_platform_message(request, id):
    try:
        message = PlatformMessage.objects.get(id=id)
    except PlatformMessage.DoesNotExist:
        return Response({"error": "Message not found"}, status=404)
    serializer = PlatformMessageSerializer(message, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message updated successfully"})
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_platform_message(request, id):
    try:
        message = PlatformMessage.objects.get(id=id)
        message.delete()
        return Response({"message": "Message deleted successfully"})
    except PlatformMessage.DoesNotExist:
        return Response({"error": "Message not found"}, status=404)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def ban_user(request):
    user_id = request.data.get("user_id")
    reason = request.data.get("reason", "No reason provided")
    try:
        user = User.objects.get(id=user_id)
        if not BannedUser.objects.filter(user=user).exists():
            BannedUser.objects.create(user=user, reason=reason)
            user.is_active = False
            user.save()
            return Response({"message": "User banned successfully"})
        return Response({"error": "User already banned"}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def unban_user(request):
    user_id = request.data.get("user_id")
    try:
        user = User.objects.get(id=user_id)
        banned = BannedUser.objects.get(user=user)
        banned.delete()
        user.is_active = True
        user.save()
        return Response({"message": "User unbanned successfully"})
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except BannedUser.DoesNotExist:
        return Response({"error": "User is not banned"}, status=400)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_banned_users(request):
    banned = BannedUser.objects.all()
    serializer = BannedUserSerializer(banned, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_all_swaps(request):
    swaps = Swap.objects.all().order_by("-created_at")
    serializer = SwapSerializer(swaps, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_activity_logs(request):
    logs = UserActivityLog.objects.all().order_by("-timestamp")
    serializer = UserActivityLogSerializer(logs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def download_report(request):
    try:
        users = User.objects.all().values(
            "id", "email", "name", "location", "availability", "is_public"
        )
        swaps = Swap.objects.all().values(
            "id", "requester__email", "receiver__email", "status", "created_at"
        )
        logs = UserActivityLog.objects.all().values(
            "id", "user__email", "action", "timestamp", "details"
        )

        df_users = pd.DataFrame(users)
        df_swaps = pd.DataFrame(swaps)
        df_logs = pd.DataFrame(logs)
        for df in [df_swaps, df_logs]:
            for col in df.select_dtypes(include=["datetimetz"]).columns:
                df[col] = df[col].dt.tz_localize(None)
        for df in [df_swaps, df_logs]:
            for col in df.columns:
                if pd.api.types.is_datetime64_any_dtype(df[col]):
                    df[col] = pd.to_datetime(df[col]).dt.tz_localize(None)

        output = BytesIO()
        with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
            workbook = writer.book

            if not df_users.empty:
                df_users.to_excel(writer, sheet_name="Users", index=False)

            if not df_swaps.empty:
                df_swaps.to_excel(writer, sheet_name="Swaps", index=False)

            if not df_logs.empty:
                df_logs.to_excel(writer, sheet_name="Activity Logs", index=False)

            chart_sheet = workbook.add_worksheet("Charts")

            if not df_users.empty and "availability" in df_users.columns:
                avail_counts = df_users["availability"].value_counts().reset_index()
                avail_counts.columns = ["Availability", "Count"]
                avail_counts.to_excel(
                    writer, sheet_name="Charts", startrow=1, index=False
                )

                pie_chart = workbook.add_chart({"type": "pie"})
                pie_chart.add_series(
                    {
                        "name": "Users by Availability",
                        "categories": ["Charts", 2, 0, 1 + len(avail_counts), 0],
                        "values": ["Charts", 2, 1, 1 + len(avail_counts), 1],
                    }
                )
                pie_chart.set_title({"name": "Users by Availability"})
                chart_sheet.insert_chart("D2", pie_chart)

            if not df_swaps.empty and "status" in df_swaps.columns:
                status_counts = df_swaps["status"].value_counts().reset_index()
                status_counts.columns = ["Status", "Count"]
                status_counts.to_excel(
                    writer, sheet_name="Charts", startrow=10, index=False
                )

                col_chart = workbook.add_chart({"type": "column"})
                col_chart.add_series(
                    {
                        "name": "Swaps by Status",
                        "categories": ["Charts", 11, 0, 10 + len(status_counts), 0],
                        "values": ["Charts", 11, 1, 10 + len(status_counts), 1],
                    }
                )
                col_chart.set_title({"name": "Swaps by Status"})
                chart_sheet.insert_chart("D16", col_chart)

            if not df_logs.empty and "timestamp" in df_logs.columns:
                df_logs["Date"] = pd.to_datetime(df_logs["timestamp"]).dt.date
                daily_logs = df_logs.groupby("Date").size().reset_index(name="Count")
                daily_logs.to_excel(
                    writer, sheet_name="Charts", startrow=20, index=False
                )

                line_chart = workbook.add_chart({"type": "line"})
                line_chart.add_series(
                    {
                        "name": "Activity Logs per Day",
                        "categories": ["Charts", 21, 0, 20 + len(daily_logs), 0],
                        "values": ["Charts", 21, 1, 20 + len(daily_logs), 1],
                    }
                )
                line_chart.set_title({"name": "Activity Logs per Day"})
                chart_sheet.insert_chart("D30", line_chart)

        output.seek(0)
        filename = "platform_report.xlsx"
        response = HttpResponse(
            output.read(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
