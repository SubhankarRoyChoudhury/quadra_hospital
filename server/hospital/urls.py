from django.urls import path
# from django.conf.urls import url
from . import views
# or
# from .views import usersApi

urlpatterns = [
    # path('users/', views.usersApi,),
    # path('users/<int:id>', views.usersApi,),

    path('users/', views.usersApiGet),
    path('users/<int:id>', views.findUserById),
    path('users/create/', views.usersApiPost),
    path('updateUsers/<int:id>/update/', views.usersApiPut),
    path('users/<int:id>/delete/', views.usersApiDelete),
]
