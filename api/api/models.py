from django.db import models
from django.contrib.auth.models import User


#Task Maneger Many to one with Project and Task 

class Project(models.Model):
    name= models.CharField(max_length=100)

    def __str__(self):
        return self.name 
    
class Task(models.Model):
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='task')

    def __str__(self):
        return self.title