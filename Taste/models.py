# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Dianping(models.Model):
    id = models.IntegerField(primary_key=True)
    # id = models.TextField(blank=True, null=True)  # This field type is a guess.
    city = models.TextField(blank=True, null=True)
    shopname = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    score1 = models.TextField(blank=True, null=True)
    score2 = models.TextField(blank=True, null=True)
    score3 = models.TextField(blank=True, null=True)
    rec1 = models.TextField(blank=True, null=True)
    rec2 = models.TextField(blank=True, null=True)
    rec3 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dianping'
        ordering=('id',)


class DianpingLoc(models.Model):
    id = models.IntegerField(primary_key=True)
    # id = models.TextField(blank=True, null=True)  # This field type is a guess.
    city = models.TextField(blank=True, null=True)
    shopname = models.TextField(blank=True, null=True)
    lng = models.TextField(blank=True, null=True)
    lat = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    score1 = models.TextField(blank=True, null=True)
    score2 = models.TextField(blank=True, null=True)
    score3 = models.TextField(blank=True, null=True)
    rec1 = models.TextField(blank=True, null=True)
    rec2 = models.TextField(blank=True, null=True)
    rec3 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dianping_loc'
        ordering = ('id',)
