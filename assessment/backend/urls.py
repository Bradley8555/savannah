from django.urls import path
from . import views

urlpatterns = [
    path('api/users/', views.fetch_users, name='user_data'),
    path('api/albums/', views.fetch_albums, name='album_data'),
    path('api/photos/', views.fetch_photos, name='photo_data'),
    path('', views.index, name='index'),
    path('users/', views.users, name='users'),
    path('albums/', views.albums, name='albums'),
    path('photos/', views.photos, name='photos'),
]
