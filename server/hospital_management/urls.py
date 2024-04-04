from django.contrib import admin
from django.urls import path, include
# from django.conf.urls import url
# from class import


urlpatterns = [
    path('', include('hospital.urls')),  # new
    path('admin/', admin.site.urls),
]
