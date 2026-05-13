from django.db import models

class Playground(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=20, default='error')
    type = models.CharField(max_length=20, default='error')
    price = models.IntegerField(default=0)
    images = models.CharField(max_length=20, default='error')


class Rent(models.Model):
    idPlayground = models.CharField(max_length=30)
    date = models.DateField()
    hour = models.IntegerField()
    numberPerson = models.CharField(max_length=30)
