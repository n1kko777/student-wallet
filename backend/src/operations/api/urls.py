from django.conf.urls import url, include

from .views import OperationListView, OperationDetailView

urlpatterns = [
    url(r'^$', OperationListView.as_view(), name="Operations List"),
    url(r'^(?P<pk>\d+)/$', OperationDetailView.as_view(), name="Operation Details"),
]
