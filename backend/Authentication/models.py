from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager
from cloudinary.models import CloudinaryField


class Skills(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = "Skills"

    def __str__(self):
        return self.name


class User(AbstractUser):
    AVAILABILITY_CHOICES = [
        ("daily", "Daily"),
        ("weekends", "Weekends"),
        ("weekdays", "Weekdays"),
    ]
    username = None

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    skills_offered = models.ManyToManyField(
        Skills, related_name="users_offering", blank=True
    )
    skills_wanted = models.ManyToManyField(
        Skills, related_name="users_wanting", blank=True
    )
    availability = models.CharField(
        max_length=20,
        choices=AVAILABILITY_CHOICES,
        blank=True,
        null=True,
        help_text="e.g., daily, weekends, evenings",
    )
    profile_pic = CloudinaryField("image", blank=True, null=True)
    is_public = models.BooleanField(
        default=True, help_text="Make profile public or private"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = "User"

    def __str__(self):
        return self.email


class Swap(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    requester = models.ForeignKey(
        User, related_name="swaps_requested", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name="swaps_received", on_delete=models.CASCADE
    )

    skill_offered = models.ForeignKey(
        Skills, related_name="swaps_offered", on_delete=models.CASCADE
    )
    skill_wanted = models.ForeignKey(
        Skills, related_name="swaps_wanted", on_delete=models.CASCADE
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    requester_rating = models.IntegerField(blank=True, null=True)
    requester_feedback = models.TextField(blank=True, null=True)
    receiver_rating = models.IntegerField(blank=True, null=True)
    receiver_feedback = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Swap"

    def __str__(self):
        return f"Swap {self.id}: {self.requester.email} → {self.receiver.email} [{self.status}]"


class PlatformMessage(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    visible = models.BooleanField(default=True)

    class Meta:
        db_table = "PlatformMessage"

    def __str__(self):
        return self.title


class UserActivityLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "UserActivityLog"

    def __str__(self):
        return f"{self.user.email} - {self.action} at {self.timestamp}"


class BannedUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reason = models.TextField()
    banned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "BannedUser"

    def __str__(self):
        return f"Banned: {self.user.email}"
