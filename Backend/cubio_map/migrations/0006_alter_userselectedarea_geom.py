# Generated by Django 5.1.2 on 2024-11-20 13:56

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cubio_map', '0005_userselectedarea'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userselectedarea',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(srid=4326),
        ),
    ]