# Generated by Django 4.0.4 on 2022-04-22 21:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0022_room_image_alter_room_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='image',
            new_name='icon',
        ),
    ]
