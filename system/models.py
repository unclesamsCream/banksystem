from django.db import models

# Create your models here.
class User(models.Model):

	name = models.CharField(max_length=128, unique=True)
	password = models.CharField(max_length=256)
	email = models.EmailField(unique=True)
	c_time = models.DateTimeField(auto_now_add=True)
	root = models.BooleanField(default=False)
	realName = models.CharField(max_length=128,null = True,blank=True)
	IDCard = models.CharField(max_length = 128,null = True,blank=True)
	phone = models.CharField(max_length = 128, null = True,blank=True)
	money = models.FloatField(blank = True,null = True)


	def __str__(self):
		return self.name

	class Meta:
		ordering = ["-c_time"]
		verbose_name = "用户"
		verbose_name_plural = "用户"



class account(models.Model):
	bindingUser = models.CharField(max_length = 128,null = True,blank=True)
	realName = models.CharField(max_length = 128,null = True,blank=True)
	IDCard = models.CharField(max_length = 128,null = True,blank=True)
	cardNum = models.CharField(max_length = 128)
	payPassword = models.CharField(max_length = 6)
	balance = models.FloatField()
	freeze = models.BooleanField(default = False)
	binding = models.BooleanField(default = False)


class Goods(models.Model):
	name=models.CharField(max_length=1024)
	price=models.DecimalField(max_digits=10,decimal_places=2)
	num =models.IntegerField()

class Cart(models.Model):
	goods_id =models.IntegerField()

	num =models.IntegerField()
	user_id =models.IntegerField()

class BuysCount(models.Model):
	create_time=models.DateField()
	count=models.DecimalField(max_digits=10,decimal_places=2)
	user_id =models.IntegerField()


class BuysDetail(models.Model):
	name=models.CharField(max_length=1024)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	goodspriceall=models.DecimalField(max_digits=10, decimal_places=2)
	num=models.IntegerField()

	buysCount_id=models.IntegerField()