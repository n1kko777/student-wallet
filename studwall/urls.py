from django.contrib import admin
from django.conf.urls import url, include
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest/auth/register/', include('rest_auth.registration.urls')),

    url(r'^api/v1/', include('api.urls')),
    url(r'^.*$', TemplateView.as_view(template_name="index.html"))
]
