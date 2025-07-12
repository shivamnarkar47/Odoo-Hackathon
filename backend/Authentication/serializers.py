from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Skills, Swap, UserActivityLog, BannedUser, PlatformMessage

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_pic = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "name",
            "location",
            "availability",
            "is_public",
            "profile_pic",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            request=self.context.get("request"),
            email=data.get("email"),
            password=data.get("password"),
        )
        if not user:
            raise serializers.ValidationError("Invalid email or password")
        if not user.is_active:
            raise serializers.ValidationError("User is inactive")
        return user


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ["id", "name"]


class UserProfileSerializer(serializers.ModelSerializer):
    skills_offered = SkillsSerializer(many=True, read_only=True)
    skills_wanted = SkillsSerializer(many=True, read_only=True)
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "location",
            "availability",
            "is_public",
            "skills_offered",
            "skills_wanted",
            "profile_pic",
        ]

    def get_profile_pic(self, obj):
        return obj.profile_pic.url if obj.profile_pic else None


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "name",
            "location",
            "availability",
            "is_public",
            "skills_offered",
            "skills_wanted",
            "profile_pic",
        ]


class SwapUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name"]


class SwapSerializer(serializers.ModelSerializer):
    requester = SwapUserSerializer(read_only=True)
    receiver = SwapUserSerializer(read_only=True)
    skill_offered = SkillsSerializer(read_only=True)
    skill_wanted = SkillsSerializer(read_only=True)

    class Meta:
        model = Swap
        fields = [
            "id",
            "requester",
            "receiver",
            "skill_offered",
            "skill_wanted",
            "status",
            "created_at",
            "updated_at",
            "requester_rating",
            "requester_feedback",
            "receiver_rating",
            "receiver_feedback",
        ]


class SwapCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swap
        fields = ["receiver", "skill_offered", "skill_wanted"]

    def create(self, validated_data):
        validated_data["requester"] = self.context["request"].user
        return Swap.objects.create(**validated_data)


class PlatformMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformMessage
        fields = "__all__"


class BannedUserSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = BannedUser
        fields = ["id", "user", "user_email", "reason", "banned_at"]


class UserActivityLogSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = UserActivityLog
        fields = ["id", "user", "user_email", "action", "timestamp", "details"]


class PlatformMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformMessage
        fields = "__all__"


class BannedUserSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = BannedUser
        fields = ["id", "user", "user_email", "reason", "banned_at"]


class UserActivityLogSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = UserActivityLog
        fields = ["id", "user", "user_email", "action", "timestamp", "details"]
