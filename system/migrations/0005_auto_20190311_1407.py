# Generated by Django 2.1.4 on 2019-03-11 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0004_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='IDCard',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='realName',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
