from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from .serializer import UsersSerializer
from rest_framework.response import Response

from .models import Users
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
# from models import *
# from .serializers import *


def index(HttpRequest):  # new
    return HttpResponse('<h1>Django Include URLs</h1>')


# @api_view(['GET'])
# def get_data(request):
#     queryset = Users.objects.all()
#     serializer = UsersSerializer(queryset, many=True)
#     return Response(serializer.data)


# @csrf_exempt
# def usersApi(request, id=0):
#     if request.method == 'GET':
#         users = Users.objects.all()
#         users_serializer = UsersSerializer(users, many=True)
#         return JsonResponse(users_serializer.data, safe=False)

#     elif request.method == 'POST':
#         users_data = JSONParser().parse(request)
#         users_serializer = UsersSerializer(data=users_data)
#         if users_serializer.is_valid():
#             users_serializer.save()
#             return JsonResponse("Added Data SuccessFully", safe=False, status=201)

#         return JsonResponse("Data Not Added Successfully", safe=False, status=400)

#     elif request.method == 'PUT':
#         users_data = JSONParser().parse(request)
#         users = Users.objects.get(id=id)
#         users_serializer = UsersSerializer(users, data=users_data)

#         if users_serializer.is_valid():
#             users_serializer.save()
#             return JsonResponse("Update Data SuccessFully", safe=False, status=201)

#         return JsonResponse("Data Update Not SuccessFully", safe=False, status=400)
#     elif request.method == 'DELETE':
#         users = Users.objects.get(id=id)
#         users.delete()
#         return JsonResponse("Data Deleted Successfully", safe=False)


@api_view(['POST'])
@csrf_exempt
def usersApiPost(request):
    users_data = JSONParser().parse(request)
    users_serializer = UsersSerializer(data=users_data)
    if users_serializer.is_valid():
        users_serializer.save()
        return JsonResponse("Data Added Successfully", safe=False, status=201)
    return JsonResponse("Data Not Added Successfully", safe=False, status=400)


@api_view(['GET'])
@csrf_exempt
def usersApiGet(request):
    users = Users.objects.all()
    users_serializer = UsersSerializer(users, many=True)
    return Response(users_serializer.data)


@api_view(['GET'])
@csrf_exempt
def findUserById(request, id):
    try:
        users = Users.objects.get(id=id)
        users_serializer = UsersSerializer(users,  many=False)
        return Response(users_serializer.data)
    except Users.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


@api_view(['PUT'])
@csrf_exempt
def usersApiPut(request, id):
    print(id)
    try:
        users = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return JsonResponse(status=404)

    users_serializer = UsersSerializer(users, data=request.data)
    if users_serializer.is_valid():
        users_serializer.save()
        return JsonResponse("Update Data SuccessFully", safe=False, status=201)
    return JsonResponse("Data Update Not SuccessFully", safe=False, status=400)


@api_view(['DELETE'])
@csrf_exempt
def usersApiDelete(request, id):
    try:
        users = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return JsonResponse("Data Not Deleted Successfully", safe=False, status=404)
    users.delete()
    return JsonResponse("Data Deleted Successfully", safe=False, status=204)
