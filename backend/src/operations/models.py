# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Operation(models.Model):
    credit = models.DecimalField(max_digits=10, decimal_places=2)
    removeFromAmount = models.BooleanField(default=True)
    category = models.CharField(max_length=120)
    wallet = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now=True)
