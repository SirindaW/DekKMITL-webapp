# Generated by Django 4.0.3 on 2022-04-20 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0019_post_cover_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='tag',
        ),
        migrations.AddField(
            model_name='post',
            name='tag',
            field=models.ManyToManyField(blank=True, related_name='posts', to='post.tag'),
        ),
    ]
