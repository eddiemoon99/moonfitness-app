# Generated by Django 4.1.3 on 2022-11-19 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0020_card_subscriptionplan_subscription_payment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='card',
            old_name='address_name',
            new_name='address',
        ),
    ]
