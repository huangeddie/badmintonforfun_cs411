# Generated by Django 2.0.1 on 2018-04-16 05:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20180416_0457'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bracketnode',
            name='match',
        ),
        migrations.AddField(
            model_name='match',
            name='bracket_node',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='match', to='api.BracketNode'),
        ),
        migrations.AddField(
            model_name='tournament',
            name='elimination_type',
            field=models.CharField(choices=[('SINGLE', 'Single'), ('DOUBLE', 'Double')], default='SINGLE', max_length=64),
        ),
        migrations.AddField(
            model_name='tournament',
            name='match_type',
            field=models.CharField(choices=[('SINGLES', 'Singles'), ('DOUBLES', 'Doubles')], default='SINGLES', max_length=64),
        ),
    ]
