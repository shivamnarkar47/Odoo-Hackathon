from django.contrib import admin
from django.urls import path, include
from Authentication.urls import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Authentication.urls')),
]
