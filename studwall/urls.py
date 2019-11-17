from django.contrib import admin
from django.conf.urls import url, include
from .views import index

urlpatterns = [
    url('', index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^rest/auth/register/', include('rest_auth.registration.urls')),

    url(r'^api/v1/', include('api.urls'))
]
