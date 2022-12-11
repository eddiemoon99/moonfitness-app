from django.urls import path, include
from accounts import views

# from .views import RegisterUserAPIView, UserProfileView, UserProfileEditView
from .views import StudiosView, StudioView, StudioClassesView, StudiosFilterView, SubscriptionPlansView, SubscriptionPlanView, SubscriptionPlanSubscribeView, StudioClassEnrolView, StudioClassDropView

app_name = 'studios'

urlpatterns = [
  path('all/', StudiosView.as_view(), name='studios'),
  path('all/filter/' , StudiosFilterView.as_view(), name='studios_filter'),
  path('<int:studio_id>/', StudioView.as_view(), name='studio'),
  path('<int:studio_id>/classes/', StudioClassesView.as_view(), name='classes'),
  path('<int:studio_id>/classes/<int:class_id>/enrol/', StudioClassEnrolView.as_view(), name='class-enrol'),
  path('<int:studio_id>/classes/<int:class_id>/drop/<int:pk>/', StudioClassDropView.as_view(), name='class-drop'),
  path('<int:studio_id>/classes/filter/', StudioClassesView.as_view(), name='classes_filter'),
  path('plans/', SubscriptionPlansView.as_view(), name='subscription_plans'),
  path('plans/<int:subscription_plan_id>/', SubscriptionPlanView.as_view(), name='subscription_plan'),
  path('plans/<int:subscription_plan_id>/subscribe/', SubscriptionPlanSubscribeView.as_view(), name='subscription_plan_subscribe')
]