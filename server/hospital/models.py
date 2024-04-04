from django.db import models

# Create your models here.


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)

    def __str__(self):
        return self.name
