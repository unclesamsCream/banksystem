
$(function(){
    tabChange();







})

//选项卡切换
function tabChange(){

    $("#askTab li").click(function(){
        var ins=$(this).index();
        $(this).addClass("askTabActive").siblings().removeClass("askTabActive");
        $("#objList .objBox").eq(ins).show().siblings().hide();
    })
}

