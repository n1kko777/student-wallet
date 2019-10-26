# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Operation(models.Model):
    operation_price = models.DecimalField(max_digits=10, decimal_places=2)
    operation_type = models.BooleanField(default=True)
    category_id = models.CharField(max_length=120)
    wallet_id = models.CharField(max_length=120)
    operation_date = models.DateField(auto_now_add=True)
    account_id = models.ForeignKey(
        'account.Account', on_delete=models.CASCADE, related_name='operations')

    def __str__(self):
        return self.category_id + "( " + self.operation_price + ")"
