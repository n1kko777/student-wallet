# Generated by Django 2.2.6 on 2019-11-03 05:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('operations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=120)),
                ('category_color', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('operation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='operations.Operation')),
            ],
        ),
    ]
