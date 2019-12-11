
$(function(){
  listLook();
    localChange();
    partChange();






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
        $(this).find(".navCon").stop().slideDown();
    },function(){
        $(this).find(".navCon").stop().slideUp();
    })

}


