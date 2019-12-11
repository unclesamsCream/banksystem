from django.urls import path,re_path
from . import views

app_name = 'system'

urlpatterns = [
    path('login/', views.login),
    path('register/',views.register),
    path('index/',views.index),
    path('userInformation/', views.userInformation),
    path('addAccount/', views.addAccount),
    path('manage/', views.manage),
    path('freeze/',views.freeze),
    path('unfreeze/',views.unfreeze),
    path('delete/',views.delete),
    path('resetPassword/',views.resetPassword),
    path('findPassword/',views.findPassword),
    path('resetPassword/',views.resetPassword),
    path('logout/',views.logout),
    path('deposit/', views.deposit),
    path('draw/',views.draw),
    path('usersManage/',views.usersManage),
    path('goodslist/',views.GoodsList),
    path('addgoods/',views.AddGoods),
    path('delgoods/',views.DelGoods),
    path('editgoods/',views.EditGoods),
    path('addcart/',views.addCart),
    path('cartlist/',views.CartList),
    path('delcart/',views.DelCart),
    path('checkcart/',views.CheckCart),
    path('historydetail/',views.BuyHistoryDetail),
    path('historyaccount/',views.BuysHistoryCount)
]