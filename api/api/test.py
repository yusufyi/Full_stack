from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Project, Task

class TaskAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(name="Test Project")

    def test_create_project(self):
        response = self.client.post("/api/projects/", {"name": "New Project"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)  # 1 from setUp, 1 new

    def test_create_task(self):
        data = {
            "title": "Write tests",
            "completed": False,
            "project": self.project.id  # OK in API client
        }
        response = self.client.post("/api/tasks/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)

    def test_list_tasks(self):
        # Create task using model (must pass full object)
        Task.objects.create(title="Model Task", completed=True, project=self.project)

        response = self.client.get("/api/tasks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)