# Generated by Django 4.0.4 on 2022-04-22 21:55

from django.db import migrations, models
import post.models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0021_remove_post_likes_post_liker'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='image',
            field=models.ImageField(null=True, upload_to=post.models.get_room_icon_file_path),
        ),
        migrations.AlterField(
            model_name='room',
            name='title',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]