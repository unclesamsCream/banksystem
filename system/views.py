from django.shortcuts import render
from system import form
from django.db.models import Q

from . import models
from django.shortcuts import redirect
from datetime import datetime
def login(request):
    if request.session.get('is_login', None):
        return redirect("/index/")
    if request.method == "POST":
        login_form = form.UserForm(request.POST)
        message = "请检查填写的内容！"
        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']
            try:
                user = models.User.objects.get(name=username)
                if user.password == password:  # 哈希值和数据库内的值进行比对
                    request.session['is_login'] = True
                    request.session['user_name'] = user.name
                    request.session['root'] = user.root
                    request.session.set_expiry(24*60*60)
                    # return render(request, 'index.html', locals())
                    return redirect("/index/")
                else:
                    message = "密码不正确！"
            except:
                message = "用户不存在！"
        return render(request, 'login.html', locals())

    login_form = form.UserForm()
    return render(request, 'login.html', locals())



def register(request):
    if request.session.get('is_login', None):
        # 登录状态不允许注册。
        return redirect("/index/")
    if request.method == "POST":
        register_form = form.RegisterForm(request.POST)
        message = "请检查填写的内容！"
        if register_form.is_valid():  # 获取数据
            username = register_form.cleaned_data['username']
            password1 = register_form.cleaned_data['password1']
            password2 = register_form.cleaned_data['password2']
            email = register_form.cleaned_data['email']
            root = request.POST.get('root')
            if password1 != password2:  # 判断两次密码是否相同
                message = "两次输入的密码不同！"
                return render(request, 'register.html', locals())
            else:
                same_name_user = models.User.objects.filter(name=username)
                if same_name_user:  # 用户名唯一
                    message = '用户已经存在，请重新选择用户名！'
                    return render(request, 'register.html', locals())
                same_email_user = models.User.objects.filter(email=email)
                if same_email_user:  # 邮箱地址唯一
                    message = '该邮箱地址已被注册，请使用别的邮箱！'
                    return render(request, 'register.html', locals())

                # 当一切都OK的情况下，创建新用户

                new_user = models.User()
                new_user.name = username
                new_user.password = password1  # 使用加密密码
                new_user.email = email
                if root == 'on':
                    root = True
                if root == None:
                    root = False
                new_user.root = root
                new_user.save()
                return redirect('/login/')  # 跳转到等待邮件确认页面。
    register_form = form.RegisterForm()
    return render(request, 'register.html', locals())


def index(request):
    username = request.session['user_name']
    if request.session['root'] == False:
        totalMoney = 0
        totalCard = 0
        user = models.User.objects.get(name = username)
        accounts = models.account.objects.filter(bindingUser = username,binding = True)
        for account in accounts:
            totalMoney = account.balance + totalMoney
            totalCard = totalCard + 1
        time = user.c_time
    else:
        userNum = 0
        accountNum = 0
        totalMoney = 0
        users = models.User.objects.filter()
        accounts = models.account.objects.filter()
        time = models.User.objects.get(name=request.session['user_name']).c_time
        for user in users:
            userNum = userNum + 1
        for account in accounts:
            totalMoney = totalMoney + account.balance
            accountNum = accountNum + 1   
    return render(request,'index.html',locals())


def userInformation(request):
    message = "您还未登陆，等登陆！！"
    if request.session.get('is_login', None):
        username = request.session['user_name']
        user =  models.User.objects.get(name=username)
        name = user.name
        realName = user.realName
        email = user.email
        IDCard = user.IDCard
        phone = user.phone
    if request.method == "POST":
        realName = request.POST.get('realName')
        email = request.POST.get('email')
        IDCard = request.POST.get('IDCard')
        phone = request.POST.get('phone')
        models.User.objects.filter(name = username).update(realName=realName,IDCard=IDCard,phone=phone,email=email)
        

    return render(request, 'userInformation.html', locals())


def addAccount(request):
    if request.method == "POST":
        cardNum = request.POST.get('cardNum')
        password = request.POST.get('payPassword')
        username = request.session['user_name']
        if models.account.objects.filter(cardNum = cardNum):
            account = models.account.objects.get(cardNum = cardNum)
            if account.payPassword == password:
                message = "添加账户成功！"
                models.account.objects.filter(cardNum = cardNum).update(binding = True,bindingUser = username)
                return render(request, 'addAccount.html', locals())
        else:
            message = "添加失败，请检查卡号或者密码！"
            return render(request, 'addAccount.html', locals())

    return render(request, 'addAccount.html', locals())


def manage(request):
    username = request.session['user_name']
    # user =  models.User.objects.get(name=username)
    accounts = models.account.objects.filter(bindingUser = username, binding = True)

    return render(request, 'manage.html', locals())



def freeze(request):
    if request.session['root'] == False:
        username = request.session['user_name']
        user =  models.User.objects.get(name=username)
        accounts = models.account.objects.filter(bindingUser = username, binding = True,freeze = False)
        if request.method == "POST":
            cardNum = request.POST.get('cardNum')
            models.account.objects.filter(cardNum=cardNum).update(freeze = True)
            message = "此卡已冻结!"
            return render(request, 'freeze.html', locals())
        return render(request, 'freeze.html', locals())
    else:
        accounts = models.account.objects.filter(freeze = False)
        if request.method == "POST":
            cardNum = request.POST.get('cardNum')
            models.account.objects.filter(cardNum=cardNum).update(freeze = True)
            message = "此卡已冻结!"
            return render(request, 'freeze.html', locals())
    return render(request, 'freeze.html', locals())


def unfreeze(request):
    accounts = models.account.objects.filter(freeze = True)
    if request.method == "POST":
        cardNum = request.POST.get('cardNum')
        models.account.objects.filter(cardNum=cardNum).update(freeze = False)
        message = "此卡已解冻!"
        return render(request, 'unfreeze.html', locals())
    return render(request, 'unfreeze.html', locals())


def delete(request):
    username = request.session['user_name']
    user =  models.User.objects.get(name=username)
    accounts = models.account.objects.filter(bindingUser = username, binding = True)
    if request.method == "POST":
        cardNum = request.POST.get('cardNum')
        models.account.objects.filter(cardNum=cardNum).update(binding = False,bindingUser="")
        message = "此卡已删除!"
        return render(request, 'delete.html', locals())
    return render(request, 'delete.html', locals())



def findPassword(request):
    if request.method == "POST":
        username = request.POST.get('username')
        realName = request.POST.get('realName')
        IDCard = request.POST.get('IDCard')
        newPassword = request.POST.get('newPassword')
        user = models.User.objects.get(name = username)
        if user.realName == realName:
            if user.IDCard == IDCard:
                models.User.objects.filter(name = username).update(password = newPassword)
                message = "密码修改成功，请使用新密码登陆！"
                return render(request, 'login.html', locals())
            else:
                message = "请检查填写的内容是否正确！"
                return render(request, 'findPassword.html', locals())
        else:
            message = "请检查填写的内容是否正确！"
            return render(request, 'findPassword.html', locals())
    return render(request, 'findPassword.html', locals())




def alterPassword(request):
    return render(request, 'findPassword.html', locals())


def resetPassword(request):
    return render(request, 'findPassword.html', locals())




def logout(request):
    if not request.session.get('is_login', None):
        # 如果本来就未登录，也就没有登出一说
        return redirect("/login/")
    request.session.flush()
    # 或者使用下面的方法
    # del request.session['is_login']
    # del request.session['user_id']
    # del request.session['user_name']
    return redirect("/login/")

def deposit(request):
    if request.method == "POST":
        cardNum = request.POST.get('cardNum')
        password = request.POST.get('password')
        money = request.POST.get('money')
        account = models.account.objects.get(cardNum=cardNum)
        if account.freeze:
            message = "此账户已经冻结，请联系管理员解冻！"
            return render(request, 'deposit.html', locals())
        if account.payPassword == password:
            message = "存款成功！"
            money = account.balance + float(money)
            models.account.objects.filter(cardNum=cardNum).update(balance = money)
            return render(request, 'deposit.html', locals())
        else:
            message = "账号或密码错误！"
            return render(request, 'deposit.html', locals())
    elif request.method == "GET":
        accounts = models.account.objects.filter(bindingUser=request.session['user_name'])

        return render(request, 'deposit.html', locals())

def draw(request):
    if request.method == 'POST':
        cardNum = request.POST.get('cardNum')
        password = request.POST.get('password')
        money = request.POST.get('money')
        receiverCardNum = request.POST.get('receiverCardNum')
        receiverName = request.POST.get('receiverName')
        account = models.account.objects.get(cardNum=cardNum)
        if account.freeze:
            message = "此账户已经冻结，请联系管理员解冻！"
            return render(request, 'draw.html', locals())
        try:
            my = models.account.objects.get(cardNum = cardNum)
            receiver = models.account.objects.get(cardNum = receiverCardNum)
        except:
            message = "账号不存在！"
            return render(request, 'draw.html', locals())
        if my.payPassword == password:
            if my.balance > float(money):
                if receiverName == receiver.realName:
                    models.account.objects.filter(cardNum = cardNum).update(balance = my.balance - float(money))
                    models.account.objects.filter(cardNum = receiverCardNum).update(balance = receiver.balance + float(money))
                    message = "转账成功！"
                    return render(request, 'draw.html', locals())
                else:
                    message = "收款人信息错误！"
                    return render(request, 'draw.html', locals())
            else:
                message = "余额不足！"
                return render(request, 'draw.html', locals())
        else:
            message = "密码错误！"
            return render(request, 'draw.html', locals())
    elif request.method=="GET":
        accounts = models.account.objects.filter(bindingUser=request.session['user_name'])
        return render(request, 'draw.html', locals())


def usersManage(request):
    users  = models.User.objects.filter()
    count = 0
    totalMoney = -0

    for user in users:
        total = 0
        accounts = models.account.objects.filter(bindingUser=user.name)
        for account in accounts:
            total = total + account.balance
        models.User.objects.filter(name = user.name).update(money = total)
    
    return render(request, 'usersManage.html', locals())


def AddGoods(request):
    #post请求获取相关参数
    if request.method=="POST":
        name = request.POST.get('goodsname')
        price = request.POST.get('goodsprice')
        num = request.POST.get('goodsnum')
        models.Goods.objects.create(name=name,price=price,num=num)#保存到数据库


        return render(request,'addGoods.html',locals())
    elif request.method=="GET":
        return render(request,'addGoods.html',locals())


def DelGoods(request):
    id =request.GET.get('id')#获取id
#删除商品
    models.Goods.objects.get(id=id).delete()
    return redirect('/goodslist/')



def EditGoods(request):
    if request.method=="GET":
        #获取id根据id获取商品信息，传回前端
        id =request.GET.get('id')
        goods=models.Goods.objects.get(id=id)
        return render(request,'editGoods.html',locals())
    elif request.method=='POST':
        #获取修改后的信息
        id =request.POST.get("goodsid")
        name=request.POST.get("goodsname")
        price=request.POST.get('goodsprice')
        num=request.POST.get('goodsnum')
        #查出该商品进行修改
        goods =models.Goods.objects.get(id=id)
        goods.name=name
        goods.price=price
        goods.num=num
        goods.save()
        return redirect('/goodslist/')

def GoodsList(request):
#获取商品列表
    goodslist=models.Goods.objects.all()


    return render(request,'GoodsList.html',locals())

def addCart(request):
    id =request.GET.get("id")
#获取用户
    user =models.User.objects.get(name=request.session['user_name'])

    try:
        #查询出该用户的该商品是否购买过，购买过数量加一并保存，没有则新增一条购物车记录
        cart=models.Cart.objects.get(Q(user_id=user.id)&Q(goods_id=id))
        cart.num+=1
        cart.save()
    except :
        models.Cart.objects.create(goods_id=id,num=1,user_id=user.id)
    return redirect('/goodslist/')


def CartList(request):
    if request.method=='GET':
        user = models.User.objects.get(name=request.session['user_name'])
        #获取购物车列表
        cartlist=models.Cart.objects.filter(user_id=user.id)
        cartshowlist=[]
        count=0
        #构建显示的信息
        for cart in cartlist:
            try:
                cartdict = {}
                goods=models.Goods.objects.get(id=cart.goods_id)

                cartdict['id']=cart.id
                cartdict['name']=goods.name
                cartdict['price']=goods.price
                cartdict['num']=cart.num
                cartdict['allprice']=cart.num*goods.price
                count+=cartdict['allprice']

                cartshowlist.append(cartdict)
            except Exception as e:


                continue
        username = request.session['user_name']
        #获取支付账户
        accountlist =models.account.objects.filter(bindingUser=username)
        isGo = True

        return render(request,'Cart.html',locals())


def DelCart(request):

    id =request.GET.get("id")
    try:
        models.Cart.objects.get(id=id).delete()
    except:
        pass
    return redirect('/cartlist/')


def CheckCart(request):
    if request.method=="POST":

        user = models.User.objects.get(name=request.session['user_name'])
        #获取当前用户的所有购物车信息
        cartlist = models.Cart.objects.filter(user_id=user.id)
        #
        count =request.POST.get("count")
        cartid=request.POST.get('cardNum')
        password=request.POST.get("payPassword")
        #获取支付卡号
        account1 =models.account.objects.get(id=cartid)
        #如果余额大约总额并且账户未被冻结
        if account1.balance>float(count) and account1.freeze==False and account1.payPassword==password:
            #创建一条购买记录
            buyscount =models.BuysCount.objects.create(user_id=user.id,count=count,create_time=datetime.now())
            cartshowlist = []
            allcount=0
            #创建购买记录详情
            for cart in cartlist:
                try:
                    cartdict = {}
                    goods = models.Goods.objects.get(id=cart.goods_id)
                    cartdict['name'] = goods.name
                    cartdict['price'] = goods.price
                    cartshowlist.append(cartdict)

                    price=goods.price*cart.num
                    #商品数量减去购买数量
                    goods.num-=cart.num
                    goods.save()
                    allcount+=price
                    models.BuysDetail.objects.create(buysCount_id=buyscount.id,name=goods.name,goodspriceall=price,price=goods.price,num=cart.num)
                except Exception as e:
                    print(e)
                    continue
            #卡号金额减去消费金额
            account1.balance-=float(count)
            account1.save()

            models.Cart.objects.filter(user_id=user.id).delete()
            return redirect('/goodslist/')
        else:
            #如果账户冻结或者卡号余额不足，跟查询购物车列表一样，isgo=False以提示用户不可支付
            user = models.User.objects.get(name=request.session['user_name'])

            cartlist = models.Cart.objects.filter(user_id=user.id)
            cartshowlist = []
            count = 0
            for cart in cartlist:
                try:
                    cartdict = {}
                    goods = models.Goods.objects.get(id=cart.goods_id)

                    cartdict['id'] = cart.id
                    cartdict['name'] = goods.name
                    cartdict['price'] = goods.price
                    cartdict['num'] = cart.num
                    cartdict['allprice'] = cart.num * goods.price
                    count += cartdict['allprice']

                    cartshowlist.append(cartdict)
                except Exception as e:

                    continue
            username = request.session['user_name']
            accountlist = models.account.objects.filter(bindingUser=username)
            isGo=False
            return render(request,'Cart.html',locals())


def  BuysHistoryCount(request):

    user = models.User.objects.get(name=request.session['user_name'])
    #查询购买记录历史
    buyslist=models.BuysCount.objects.filter(user_id=user.id)
    print(buyslist)

    return render(request,'buysHistoryCount.html',locals())

def BuyHistoryDetail(requst):
    id =requst.GET.get('id')
    #查询购买记录详情
    busdetails=models.BuysDetail.objects.filter(buysCount_id=id)
    print(busdetails)

    return render(requst,'buysHistoryDetail.html',locals())








