# Generated by Django 5.1.2 on 2024-11-20 12:39

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cubio_map', '0004_project'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSelectedArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('nature_value', models.DecimalField(decimal_places=4, max_digits=5)),
                ('area_size', models.DecimalField(decimal_places=2, max_digits=10)),
                ('geom', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
                ('user_id', models.IntegerField()),
            ],
        ),
    ]