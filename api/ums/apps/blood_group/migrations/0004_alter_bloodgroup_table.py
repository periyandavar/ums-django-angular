# Generated by Django 4.1.2 on 2022-10-12 10:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blood_group', '0003_alter_bloodgroup_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='bloodgroup',
            table='ums_blood_group',
        ),
    ]
