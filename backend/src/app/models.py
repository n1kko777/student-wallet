from django.db import models
from studwall import settings


class Wallet(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    wallet_amount = models.DecimalField(max_digits=10, decimal_places=2)
    wallet_name = models.CharField(max_length=120, unique=True)
    wallet_color = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.wallet_name + "(" + str(self.wallet_amount) + ")"


class Category(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    category_name = models.CharField(max_length=120, unique=True)
    category_color = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%d: %s' % (self.id, self.category_name)


class Operation(models.Model):
    credit = models.DecimalField(max_digits=10, decimal_places=2)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.credit) + "(" + str(self.created_at) + ")"
