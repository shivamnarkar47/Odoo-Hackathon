from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Skills)
admin.site.register(Swap)
admin.site.register(BannedUser)