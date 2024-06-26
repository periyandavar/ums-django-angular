from django.urls import include, path
from rest_framework import routers
from .views import GenderView

router = routers.DefaultRouter()
router.register(r'genders', GenderView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('genders/<int:id>/change-status/', GenderView.changeStatus)
]