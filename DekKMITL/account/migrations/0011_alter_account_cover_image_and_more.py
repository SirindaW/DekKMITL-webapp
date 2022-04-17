# Generated by Django 4.0.3 on 2022-04-17 00:29

import account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0010_alter_account_cover_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='cover_image',
            field=models.ImageField(default=account.models.get_default_cover_image, max_length=255, upload_to=account.models.get_cover_image_filepath),
        ),
        migrations.AlterField(
            model_name='account',
            name='profile_image',
            field=models.ImageField(default=account.models.get_default_profile_image, max_length=255, upload_to=account.models.get_profile_image_filepath),
        ),
    ]
