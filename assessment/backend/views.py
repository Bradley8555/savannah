import requests
from django.http import JsonResponse
from django.shortcuts import render

def fetch_users(request):
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/users')
        response.raise_for_status()  # Raises HTTPError for bad responses
        users = response.json()
        return JsonResponse({'users': users})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

def fetch_albums(request):
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/albums')
        response.raise_for_status()  # Raises HTTPError for bad responses
        albums = response.json()
        return JsonResponse({'albums': albums})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

def fetch_photos(request):
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/photos')
        response.raise_for_status()  # Raises HTTPError for bad responses
        photos = response.json()
        return JsonResponse({'photos': photos})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

def index(request):
    return render(request, 'index.html')

def users(request):
    return render(request, 'users.html')

def albums(request):
    return render(request, 'albums.html')

def photos(request):
    return render(request, 'photos.html')