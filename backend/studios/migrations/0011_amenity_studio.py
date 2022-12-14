# Generated by Django 4.1.3 on 2022-11-18 02:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0010_remove_studio_amenities'),
    ]

    operations = [
        migrations.AddField(
            model_name='amenity',
            name='studio',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, related_name='amenities', to='studios.studio'),
            preserve_default=False,
        ),
    ]
