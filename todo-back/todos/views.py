from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import TodoSerializer, UserDetailSerializer
from .models import Todo
User = get_user_model()

# Create your views here.

@api_view(['POST']) # 특정 method의 요청만 허용하겠다.
def todo_create(request):
    # reqeust.data 는 axios 의 body로 전달한 데이터
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()

        # 사용자가 새롭게 작성한 데이터를 응답해준다
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
def todo_update_delete(request, todo_id):
    todo = get_object_or_404(Todo, pk=todo_id)
    if request.method == 'PUT':
        serializer = TodoSerializer(instance=todo, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    if request.method == 'DELETE':
        todo.delete()
        return Response(status=204) # 요청에 성공했지만 컨텐츠는 없다는 걸 알려주는 status코드

@api_view(['GET'])
def user_detail(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    serializer = UserDetailSerializer(instance=user)
    return Response(serializer.data)