# -*- coding: utf-8 -*-
from django.db import models
from operations.models import Operation
from studwall import settings


class Category(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='category', on_delete=models.CASCADE)
    operation = models.ForeignKey(
        Operation, related_name='category', on_delete=models.CASCADE)
    category_name = models.CharField(max_length=120)
    category_color = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%d: %s' % (self.id, self.category_name)
