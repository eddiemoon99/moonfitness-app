from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.fields import CurrentUserDefault
from rest_framework.exceptions import PermissionDenied

from accounts.models import User
from studios.models import Card

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.CharField(
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  class Meta:
    model = User
    fields = ['first_name', 'last_name', 'password', 'email', 'username', 'avatar', 'phone_number']

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      phone_number=validated_data['phone_number'],
      avatar=validated_data['avatar'],
    )
    user.set_password(validated_data['password'])
    user.save()
    return user

class UserProfileSerializer(serializers.ModelSerializer):
  email = serializers.CharField(
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  class Meta:
    model = User
    fields = ['id', 'username', 'first_name', 'last_name', 'email', 'avatar', 'phone_number']

class UserCardSerializer(serializers.ModelSerializer):
  user = serializers.HiddenField(
    default=serializers.CurrentUserDefault()
  )

  class Meta:
    model = Card
    fields = ['user', 'first_name', 'last_name', 'address', 'phone_number', 'card_number', 'card_expiry', 'card_cvv']

  def create(self, validated_data):
    
    current_user = validated_data['user']

    if hasattr(current_user, 'card'):
      raise PermissionDenied(detail='You already have a card.', code=405)
      return Card.objects.create(**validated_data)
    else:
      return Card.objects.create(**validated_data)

  