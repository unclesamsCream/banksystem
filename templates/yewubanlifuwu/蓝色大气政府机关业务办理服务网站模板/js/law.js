
$(function(){
  page();
    size();






})


function page(){
    $("#page").Page({
        totalPages: 9,//分页总数
        liNums: 7,//分页的数字按钮数(建议取奇数)
        activeClass: 'activP', //active 类样式定义
        callBack : function(page){
            //console.log(page)
        }
    });
}
function size(){
    $("#size a").click(function(){
        var size=$(".lawTailCon").css("font-size");
        var sizeFloat=parseFloat(size,10);
        var unit=size.slice(-2);
        var className=$(this).attr("class");
        if(className=="max"){
            if(sizeFloat<=22){
                sizeFloat+=2;

            }
        }
        else if(className=="cen"){
            sizeFloat=14;
        }
        else if(className=="min"){
            if(sizeFloat>=12){
                sizeFloat-=2;
            }
        }
        $(".lawTailCon").css("font-size",sizeFloat+unit);

    })
}