from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, password=None):
        if not email:
            return ValueError("Необходимо указать Вашу почту.")
        if not username:
            return ValueError("Необходимо указать Ваш никнейм.")
        if not first_name:
            return ValueError("Необходимо указать Ваше Имя.")
        if not last_name:
            return ValueError("Необходимо указать Вашу Фамилию.")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, first_name, last_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class Account(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email", max_length=254, unique=True)
    username = models.CharField(max_length=60, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    wallet_id = models.IntegerField(default=0)
    date_of_bitrthday = models.DateTimeField(
        verbose_name="date of bityhday", auto_now_add=True)
    date_joined = models.DateTimeField(
        verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(
        verbose_name="last login", auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name", ]

    objects = MyAccountManager()

    def __str__(self):
        return self.email + ", " + self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
