from django.contrib import admin
from django.urls import path, include
# from django.conf.urls import url
# from class import


urlpatterns = [
    path('', include('hospital.urls')),  # new
    path('location', include('hospital.urls')),
    path('admin/', admin.site.urls),
]
