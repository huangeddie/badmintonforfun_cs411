# Generated by Django 2.0.2 on 2018-04-03 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='scoreA',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='match',
            name='scoreB',
            field=models.IntegerField(default=0),
        ),
    ]
