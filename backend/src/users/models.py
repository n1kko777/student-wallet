# -*- coding: utf-8 -*-
from django.contrib.auth.models import AbstractUser
from django.db import models
from app.models import Wallet, Category


class CustomUser(AbstractUser):
    first_name = models.CharField(blank=True, max_length=255)
    last_name = models.CharField(blank=True, max_length=255)
    wallets = models.ForeignKey(
        Wallet, on_delete=models.CASCADE, null=True, blank=True)
    categories = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=True, blank=True)
    user_amount = models.DecimalField(
        default=0, max_digits=20, decimal_places=2)

    def __str__(self):
        return str(self.username)
