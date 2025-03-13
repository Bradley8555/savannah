from django.contrib.auth.decorators import login_required
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('api/users/', login_required(views.fetch_users), name='user_data'),
    path('api/albums/', login_required(views.fetch_albums), name='album_data'),
    path('api/photos/', login_required(views.fetch_photos), name='photo_data'),
    path('index/', login_required(views.index), name='index'),
    path('users/', login_required(views.users), name='users'),
    path('albums/', login_required(views.albums), name='albums'),
    path('photos/', login_required(views.photos), name='photos'),
]
