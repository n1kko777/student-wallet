# -*- coding: utf-8 -*-
from django.db import models
from operations.models import Operation
from studwall import settings


class Wallet(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='wallets', on_delete=models.CASCADE)
    wallet_amount = models.DecimalField(max_digits=10, decimal_places=2)
    wallet_name = models.CharField(max_length=120)
    wallet_color = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.wallet_name + "(" + str(self.wallet_amount) + ")"
