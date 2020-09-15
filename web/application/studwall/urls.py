from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include

from .views import index

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    url(r'^api/v1/', include('api.urls')),

    url(r'^', include('django.contrib.auth.urls')),
    url(r'^.*', index, name='index'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# to have images urls in dev. in prod we don't need this, because of nginx
