# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Operation(models.Model):
    credit = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=120)
    comment = models.TextField()

    def __str__(self):
        return self.title

    def __unicode__(self):
        return u"{}".format(self.title)
