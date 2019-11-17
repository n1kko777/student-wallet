from django.contrib import admin
from django.conf.urls import url, include
from .views import index

urlpatterns = [
    url(r'^rest/auth/register/', include('rest_auth.registration.urls')),

    url(r'^api/v1/', include('api.urls')),
    
    url(r'^admin/', admin.site.urls),
    url(r'^.*',, index, name='index'),
]
