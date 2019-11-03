# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
# from wallet.models import Wallet


class Operation(models.Model):
    # wallet = models.ForeignKey(
    #     Wallet, related_name='operations', on_delete=models.CASCADE)
    credit = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%d: %s' % (self.order, self.title)
