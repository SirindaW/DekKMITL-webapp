# Generated by Django 4.0.3 on 2022-04-12 13:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0007_remove_post_post_likes_post_post_likes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='post_likes',
            new_name='likes',
        ),
    ]
