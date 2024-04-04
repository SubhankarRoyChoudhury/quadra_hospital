from django.contrib import admin

# Register your models here.
from .models import Users
# Register your models here.


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'address', 'gender')
