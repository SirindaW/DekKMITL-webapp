from django.contrib import admin

# Register your models here.
from .models import Post, Comment, Room, Tag

class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    # fields = ('name', 'title','is_expirable','expire_date')
    list_display = ('title', 'author', 'date_created','is_active','is_expired','is_expirable','expire_date','views',)
    ordering = ['-date_created']

admin.site.register(Post, PostAdmin)
admin.site.register(Room)
admin.site.register(Tag)
admin.site.register(Comment)