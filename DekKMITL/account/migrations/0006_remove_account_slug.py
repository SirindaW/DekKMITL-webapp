# Generated by Django 4.0.3 on 2022-04-12 11:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_alter_account_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='slug',
        ),
    ]
