from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from django.db import models
from .models import Skills, Swap
from .serializers import UserSerializer, LoginSerializer, UserProfileSerializer, UpdateProfileSerializer, SkillsSerializer, SwapCreateSerializer, SwapSerializer

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        new_user = serializer.save()
        refresh = RefreshToken.for_user(new_user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserProfileSerializer(new_user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserProfileSerializer(user).data
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    try:
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    try:
        serializer = UpdateProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_skills(request):
    skills = Skills.objects.all()
    serializer = SkillsSerializer(skills, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_users(request):
    users = User.objects.filter(is_public=True)
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def search_users_by_skill(request):
    skill_name = request.query_params.get('skill')
    if not skill_name:
        return Response({'error': 'skill parameter is required.'}, status=400)
    users = User.objects.filter(
        is_public=True,
        skills_offered__name__icontains=skill_name
    ).distinct()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_profile(request, user_id):
    try:
        user = User.objects.get(id=user_id, is_public=True)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_swap(request):
    serializer = SwapCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        swap = serializer.save(requester=request.user)
        return Response(SwapSerializer(swap).data, status=201)
    return Response(serializer.errors, 400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_my_swaps(request):
    swaps = Swap.objects.filter(models.Q(requester=request.user) | models.Q(receiver=request.user))
    serializer = SwapSerializer(swaps, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_swap(request, swap_id):
    return _update_swap_status(request, swap_id, 'accepted')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_swap(request, swap_id):
    return _update_swap_status(request, swap_id, 'rejected')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_swap(request, swap_id):
    return _update_swap_status(request, swap_id, 'cancelled')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_swap(request, swap_id):
    try:
        swap = Swap.objects.get(id=swap_id, requester=request.user, status='pending')
        swap.delete()
        return Response({'message': 'Swap deleted.'})
    except Swap.DoesNotExist:
        return Response({'error': 'Swap not found or cannot delete.'}, 404)


def _update_swap_status(request, swap_id, new_status):
    try:
        swap = Swap.objects.get(id=swap_id)
        if request.user != swap.receiver:
            return Response({'error': 'Permission denied.'}, 403)
        swap.status = new_status
        swap.save()
        return Response({'message': f'Swap {new_status}.'})
    except Swap.DoesNotExist:
        return Response({'error': 'Swap not found.'}, 404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_swap(request, swap_id):
    rating = request.data.get('rating')
    feedback = request.data.get('feedback')

    if not rating:
        return Response({'error': 'Rating is required.'}, 400)
    try:
        rating = int(rating)
        swap = Swap.objects.get(id=swap_id)
        if swap.status != 'completed':
            return Response({'error': 'Swap not completed yet.'}, 400)

        if request.user == swap.requester:
            swap.requester_rating = rating
            swap.requester_feedback = feedback
        elif request.user == swap.receiver:
            swap.receiver_rating = rating
            swap.receiver_feedback = feedback
        else:
            return Response({'error': 'Not your swap.'}, 403)

        swap.save()
        return Response({'message': 'Rating submitted.'})
    except Swap.DoesNotExist:
        return Response({'error': 'Swap not found.'}, 404)
    except Exception as e:
        return Response({'error': str(e)}, 400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_availability_choices(request):
    choices = [ {'value': k, 'label': v} for k,v in User.AVAILABILITY_CHOICES ]
    return Response(choices)
