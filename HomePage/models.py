from django.db import models

# Create your models here.
class User(models.Model):
    Name = models.CharField(max_length=100)
    Email = models.CharField(max_length=500)
    Subject = models.CharField(max_length=500)
    Message = models.CharField(max_length=10000)
    Timestamp = models.CharField(max_length=50)

    def __str__(self):
        return self.Name