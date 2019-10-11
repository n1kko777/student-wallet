# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Operations(models.Model):
    credit = models.DecimalField(max_digits=6, decimal_places=2)
    title = models.CharField(max_length=120)
    comment = models.TextField()

    def __str__(self):
        return self.title

    def __unicode__(self):
        return u"{}".format(self.title)
