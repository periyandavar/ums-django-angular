from email.policy import default
from django.db import models
from django.conf import settings

# Create your models here.

class Gender(models.Model):
    class Meta:
        db_table = settings.PARAMS['database']['prefix'] + 'gender'
        
    value = models.CharField(max_length=20, null=False)
    status = models.BooleanField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.value

    def __unicode__(self):
        return 
