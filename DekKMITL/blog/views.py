from django.shortcuts import get_object_or_404, render
from django.template.defaultfilters import slugify
from .models import Post
from .forms import PostForm
from taggit.models import Tag

def home_view(request):
    posts = Post.objects.order_by('-date_created')
    
    common_tags = Post.tags.most_common()[:4]
    form = PostForm(request.POST)
    if form.is_valid():
        newpost = form.save(commit=False)
        newpost.slug = slugify(newpost.title)
        newpost.save()
        
        form.save_m2m()
        
    context = {
        'posts':posts,
        'common_tags':common_tags,
        'form':form,
    }
    return render(request,'home.html',context)

def tagged(request,slug):
    tag = get_object_or_404(Tag,slug=slug)
    posts = Post.objects.filter(tags=tag)
    context = {
        'tag':tag,
        'posts':posts,    
    }
    return render(request,'home.html',context)

# Create your views here.
