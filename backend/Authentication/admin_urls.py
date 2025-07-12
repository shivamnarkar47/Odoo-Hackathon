from django.urls import path
from .admin_views import *

urlpatterns = [
    path('api/admin/messages/', list_platform_messages),
    path('api/admin/messages/create/', create_platform_message),
    path('api/admin/messages/<int:id>/update/', update_platform_message),
    path('api/admin/messages/<int:id>/delete/', delete_platform_message),

    path('api/admin/users/ban/', ban_user),
    path('api/admin/users/unban/', unban_user),
    path('api/admin/users/banned/', list_banned_users),

    path('api/admin/swaps/', list_all_swaps),
    path('api/admin/activity-logs/', list_activity_logs),

    path('api/admin/report/', download_report),
]
