# Generated by Django 4.0.3 on 2022-04-06 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='status',
        ),
    ]
