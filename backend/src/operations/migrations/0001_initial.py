# Generated by Django 2.2.6 on 2019-10-27 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Operation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('credit', models.DecimalField(decimal_places=2, max_digits=10)),
                ('removeFromAmount', models.BooleanField(default=True)),
                ('category', models.CharField(max_length=120)),
                ('wallet', models.CharField(max_length=120)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
