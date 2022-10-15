from operator import truediv
from django.core.exceptions import ValidationError
import re

def validate_mobile_number(value):
    if re.fullmatch(re.compile(r'^\+?1?\d{9,15}$'), value):
        return True
    raise ValidationError("Please provide a valid mobile number")
