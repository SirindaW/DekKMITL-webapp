from django.shortcuts import render

# Create your views here.

def home_view(request):
    context = {}
    return render(request,'home.html',context)

def about_view(request):
    context = {}
    return render(request,'about.html',context)

def rules_view(request):
    context = {
    }
    return render(request,'pages/rules.html',context)