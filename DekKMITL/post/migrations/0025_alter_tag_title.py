# Generated by Django 4.0.4 on 2022-04-22 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0024_room_verbose'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='title',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
