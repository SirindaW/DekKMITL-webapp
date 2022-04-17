# Generated by Django 4.0.3 on 2022-04-17 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0011_alter_account_cover_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='bio',
            field=models.TextField(blank=True, max_length=160),
        ),
        migrations.AlterField(
            model_name='account',
            name='first_name',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(default='', max_length=50),
        ),
    ]