# Generated by Django 2.0.2 on 2018-03-20 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20180320_0350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='number_of_courts',
            field=models.IntegerField(default=4),
        ),
    ]