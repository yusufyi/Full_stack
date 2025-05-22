from django.shortcuts import render
from rest_framework import viewsets

from .models import Project, Task 
from .serializer import ProjectSerializer,TaskSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset= Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class  = TaskSerializer
    

