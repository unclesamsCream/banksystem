
$(function(){
  listLook();
    localChange();
    partChange();
    tabChage();
    serChage();
    liInit();
    lookAll();
    lookAll2();
    typeAndPart();




})
//区域切换
function localChange(){
    $("#local").click(function(event){
        $(".pubBox").fadeIn();
        event.stopPropagation();

    })
    $(document).click(function(){
        $(".pubBox").fadeOut();
    })
}
//部门切换
function partChange(){
    $("#part").click(function(){
        $(".pubBoxPart").fadeIn();
        return false;
    })
    $(document).click(function(){
        $(".pubBoxPart").fadeOut();
    })
}
//子菜单显示
function listLook(){
    $("#navList li").hover(function(){
        $(this).find(".navCon").slideDown();
    },function(){
        $(this).find(".navCon").slideUp();
    })

}

//查询Tab切换
function tabChage(){
    $(".tabUl li").click(function(){
        var ins=$(this).index();
        var span="<span class='tabActive'></span>";
        $(this).prepend(span).siblings().find("span").remove();
        $(".tabCon div").eq(ins).show().siblings().hide();
    })

}
//服务切换
function serChage(){
    $(".conSerUl li").click(function(){
        var ins=$(this).index();
        $(this).addClass("serActive").siblings().removeClass("serActive").end().find("a").addClass("serActiveA").parent().siblings().find("a").removeClass("serActiveA");
        $(".conSerBox div").eq(ins).show().siblings().hide();
    })
}
function liInit(){
    $("#ul1 li:gt(17)").hide();
    $("#ul2 li:gt(39)").hide();

    scroll();
}
//查看全部
function lookAll(){
    $("#more1").click(function(){
        var val=$(this).find("span").text();
        if(val=="查看全部"){
            $("#ul1 li:gt(17)").show();
           $(this).find("span").text("向上收起");

        }
        else{
            $("#ul1 li:gt(17)").hide();
            $(this).find("span").text("查看全部");

        }
    })
}
function lookAll2(){
    $("#more2").click(function(){
        var val=$(this).find("span").text();
        if(val=="查看全部"){
            $("#ul2 li:gt(39)").show();
            $(this).find("span").text("向上收起");


        }
        else{
            $("#ul2 li:gt(39)").hide();
            $(this).find("span").text("查看全部");


        }
    })
}

//图片滚动
var offset=0;
var timer;
function palyAuto(){

    $(".scrollUl").css("marginLeft",offset);

}
//调用定时器
function scroll(){
    var wh=$(".scrollUl li").width()*6+120;
    timer=setInterval(function(){
        offset+=-10;
        if(offset<=-wh){
            offset=0;
        }
        else
        {
            palyAuto();
        }

    },300)

}
//悬停停止动画
$(".scrollUl li").hover(function(){
    clearInterval(timer);
},function(){
    scroll();

})
//个人服务部分
//主题与部分切换
function typeAndPart(){
    $("#persolTab li").click(function(){
        var ins=$(this).index();
        $(this).addClass("serActive01").siblings().removeClass("serActive01");
        $(".persolSerCon div").eq(ins).show().siblings().hide();
    })
}

