from django.urls import include, path
from rest_framework import routers
from .views import BloodGroupView

router = routers.DefaultRouter()
router.register(r'blood-groups', BloodGroupView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('blood-groups/<int:id>/change-status/', BloodGroupView.changeStatus)
]