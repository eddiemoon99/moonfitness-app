from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import AccessToken
from accounts.models import User
from studios.models import Card, Payment, Subscription, ClassBooking
from .serializers import RegisterSerializer, UserProfileSerializer, UserCardSerializer
from studios.serializers import PaymentsSerializer, SubscriptionSubscribeSerializer, ClassBookingUserSerializer

# Create your views here.

class RegisterUserAPIView(CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


class UserProfileView(RetrieveAPIView):
  serializer_class = UserProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return get_object_or_404(User, id=self.request.user.id)

class UserProfileEditView(UpdateAPIView):
  serializer_class = UserProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user

class UserCardView(RetrieveAPIView):
  serializer_class = UserCardSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    return get_object_or_404(Card, user=current_user)

class UserCardCreateView(CreateAPIView):
  serializer_class = UserCardSerializer
  permission_classes = [IsAuthenticated]

class UserCardUpdateView(UpdateAPIView):
  serializer_class = UserCardSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    return get_object_or_404(Card, user=current_user)

class UserPaymentHistoryView(ListAPIView):
  serializer_class = PaymentsSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    return Payment.objects.filter(user=current_user)

class UserFuturePaymentView(RetrieveAPIView):
  serializer_class = SubscriptionSubscribeSerializer
  permission_classes = [IsAuthenticated]
  
  def get_object(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    
    has_subscription = Subscription.objects.filter(user=current_user)
    nextSub = None
    if has_subscription:
      for subscription in has_subscription:
        if subscription.status == 'active':
          nextSub = subscription
    return nextSub

class UserSubscriptionView(RetrieveAPIView):
  serializer_class = SubscriptionSubscribeSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    has_subscription = Subscription.objects.filter(user=current_user)
    activeSub = None
    if has_subscription:
      for subscription in has_subscription:
        if subscription.status == 'active':
          activeSub = subscription
    return activeSub

class UserUpdateSubscriptionView(UpdateAPIView):
  serializer_class = SubscriptionSubscribeSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    has_subscription = Subscription.objects.filter(user=current_user)
    activeSub = None
    if has_subscription:
      for subscription in has_subscription:
        if subscription.status == 'active':
          activeSub = subscription
    return activeSub

class UserClassBookingsView(ListAPIView):
  serializer_class = ClassBookingUserSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    current_user = User.objects.filter(id=self.request.user.id)[0]
    return ClassBooking.objects.filter(user=current_user).order_by('studio_class__start_date')



  
