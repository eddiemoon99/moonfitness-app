from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken
from datetime import datetime
from django.utils import timezone
from django_filters import rest_framework as filters
from rest_framework import filters as rest_filters

from .models import Studio, Point, StudioClass, SubscriptionPlan, ClassBooking
from .serializers import ClassBookingSerializer, ClassDroppingSerializer, StudiosSerializer, StudioSerializer, StudioClassesSerializer, SubscriptionPlansSerializer, SubscriptionSubscribeSerializer

# Create your views here.

class StudiosView(ListAPIView):
  serializer_class = StudiosSerializer

  def get_queryset(self):
    # get user location from request
    user_lat = float(self.request.query_params.get('latitude'))
    user_long = float(self.request.query_params.get('longitude'))
    # get points sorted by closest to given user point
    points_in_order = Point.get_points_nearby_coords(user_lat, user_long)
    # get list of studio ids translated from points
    studio_ids = [i['studio_id'] for i in list(points_in_order.values())]
    # sort studios based on previous list
    studios_in_order = sorted(Studio.objects.all(), key=lambda x: studio_ids.index(x.id))
    return studios_in_order

class StudiosFilterView(ListAPIView):
  serializer_class = StudiosSerializer
  filter_backends = [rest_filters.SearchFilter]
  filterset_fields = ('name', 'address', 'postal_code', 'phone_number',)
  search_fields = ['name', 'address', 'postal_code', 'phone_number',]

  def get_queryset(self):
    return Studio.objects.all()

class StudioView(RetrieveAPIView):
  serializer_class = StudioSerializer

  def get_object(self):
    return get_object_or_404(Studio, id=self.kwargs['studio_id'])

class StudioClassesView(ListAPIView):
  serializer_class = StudioClassesSerializer
  filter_backends = [rest_filters.SearchFilter, filters.DjangoFilterBackend]
  filterset_fields = ('name', 'coach', 'start_time', 'end_time')
  search_fields = ['name', 'coach', 'start_time', 'end_time']

  def get_queryset(self):
    classes = StudioClass.objects.filter(studio__pk=self.kwargs['studio_id'])
    future_classes = classes.filter(start_time__gte=timezone.now())
    return future_classes

class SubscriptionPlansView(ListAPIView):
  serializer_class = SubscriptionPlansSerializer

  def get_queryset(self):
    return SubscriptionPlan.objects.all()

class SubscriptionPlanView(RetrieveAPIView):
  serializer_class = SubscriptionPlansSerializer

  def get_object(self):
    return get_object_or_404(SubscriptionPlan, id=self.kwargs['subscription_plan_id'])

class SubscriptionPlanSubscribeView(CreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = SubscriptionSubscribeSerializer

class StudioClassEnrolView(CreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = ClassBookingSerializer

class StudioClassDropView(DestroyAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = ClassDroppingSerializer

  def get_queryset(self):
    return ClassBooking.objects.all()