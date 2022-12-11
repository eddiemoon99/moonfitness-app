from django.contrib import admin

from studios.models import Studio, Point, Image, Amenity, Keyword, StudioClass, SubscriptionPlan, Subscription, Payment, Card, ClassBooking

# Register your models here.

class PointInline(admin.TabularInline):
  model = Point
  min_num = 1
  max_num = 1
  can_delete = False

class AmenityInline(admin.TabularInline):
  model = Amenity
  extra = 1

class ImageInline(admin.TabularInline):
  model = Image
  extra = 1

class StudioAdmin(admin.ModelAdmin):
  inlines= (PointInline, AmenityInline, ImageInline)

class KeywordInline(admin.TabularInline):
  model = Keyword
  extra = 1

class StudioClassAdmin(admin.ModelAdmin):
  #readonly_fields=('start_time', 'end_time', 'recurrence_end')
  search_fields = ('name',)
  inlines = (KeywordInline,)

admin.site.register(Studio, StudioAdmin)
admin.site.register(StudioClass, StudioClassAdmin)
admin.site.register(Point)
admin.site.register(Image)
admin.site.register(Amenity)
admin.site.register(SubscriptionPlan)
admin.site.register(Subscription)
admin.site.register(Payment)
admin.site.register(Card)
admin.site.register(ClassBooking)



