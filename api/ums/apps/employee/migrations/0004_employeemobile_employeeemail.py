# Generated by Django 4.1.2 on 2022-10-15 06:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import ums.validators.validate


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_rename_blood_group_id_employee_blood_group_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmployeeMobile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile_number', models.CharField(max_length=10, validators=[ums.validators.validate.validate_mobile_number])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'db_table': 'ums_employee_mobile',
            },
        ),
        migrations.CreateModel(
            name='EmployeeEmail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=220, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'db_table': 'ums_employee_email',
            },
        ),
    ]