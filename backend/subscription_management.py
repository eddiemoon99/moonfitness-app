from django.utils import timezone

from studios.models import Subscription, Payment
from accounts.models import User

## MANUALLY RUN EACH DAY BY STAFF

## Go through all subscriptions and check their next_date.

## 1. if next date is today, then charge change the subscription object:
##      - set start_date to today, and next_date to the new next_date based on duration 

## 2. create payment object for each payment to be found, and check user card for validation
##

def dailyPaymentChecker():

  subscriptions = Subscription.object.all()

  for (subscription in subscriptions):
    if subscription.next_date == timezone.now():
      if subscription.user.card:
        subscription.start_date = subscription.next_date
        subscription.next_date = subscription.next_date + duration

        payment = Payment(date=timezone.now(), amount=subscription.price, card=subscription.user.card, user=subscription.user)
        subscription.save()
        payment.save()
      else:
        subscription.status = 'cancelled'
  
  #end

# running once
dailyPaymentChecker()
