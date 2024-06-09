from django.contrib import admin

# Register your models here.
from .models import Users, Location
# Register your models here.


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone',
                    'address', 'location', 'gender')


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'location_name')
