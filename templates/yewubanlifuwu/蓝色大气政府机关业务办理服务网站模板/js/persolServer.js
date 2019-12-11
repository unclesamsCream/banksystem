
$(function(){

    tabChage();
    serChage();
    liInit();
    lookAll();
    lookAll2();
    typeAndPart();
    table();





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
    $("#ul1 li:gt(10)").hide();
    $("#ul2 li:gt(21)").hide();

    scroll();
}
//查看全部
function lookAll(){
    $("#more1").click(function(){
        var val=$(this).find("span").text();
        if(val=="查看全部"){
            $("#ul1 li:gt(10)").show();
           $(this).find("span").text("向上收起");

        }
        else{
            $("#ul1 li:gt(10)").hide();
            $(this).find("span").text("查看全部");

        }
    })
}
function lookAll2(){
    $("#more2").click(function(){
        var val=$(this).find("span").text();
        if(val=="查看全部"){
            $("#ul2 li:gt(21)").show();
            $(this).find("span").text("向上收起");


        }
        else{
            $("#ul2 li:gt(21)").hide();
            $(this).find("span").text("查看全部");


        }
    })
}


//个人服务部分
//主题与部分切换
function typeAndPart(){
    $("#persolTab li").click(function(){
        var ins=$(this).index();
        $(this).addClass("serActive01").siblings().removeClass("serActive01");
        $(".persolSerCon div").eq(ins).show().siblings().hide();
    })
}

//表格部分
function table(){
    $('#table').bootstrapTable({
        method: "get",
        url: "json/case.json",
        striped: true,
        singleSelect: false,
        dataType: "json",
        pagination: true, //分页
        pageSize: 10,
        pageNumber: 1,
        search: false, //显示搜索框
        contentType: "application/x-www-form-urlencoded",
        queryParams: null,
        //sidePagination: "server", //服务端请求
        columns: [
            {
                title: "",
                field: 'ch',
                align: 'center',
                width:'30px',
                valign: 'middle',
                formatter:function(val,row){

                        return '<div class="cliclRed"></div>';
                }

            }
            ,
            {
                title: "事项名称",
                field: 'name',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '负责部门',
                field: 'part',
                align: 'center',
                valign: 'middle'
            },

            {
                title: '操作',
                field: 'opear',
                width:'450px',
                align: 'center',
                formatter: function (value, row) {
                    var e = '<a  href="persolServerAsk.html" title="咨询" onclick="edit(\'' + row.id + '\')">咨询</a> ';
                    var c = '<a   href="persolServerAsk.html" title="删除" onclick="del(\'' + row.id + '\')">办理指南</a> ';
                    var d = '<a   href="javascript:" title="删除" onclick="dataLog(\'' + row.id + '\')">申请办理</a> ';
                    var f = '<a   href="javascript:" title="回复" onclick="reply(\'' + row.id + '\')">回复</a> ';

                    return e+c+d+f ;
                }
            }
        ]
    });


}
function reply(){
    layer.open({
        type: 2,
        title: '信息详情页面',
        shade: 0.5,
        skin: 'layui-layer-rim',
        area: ['1000px', '610px'],
        shadeClose: true,
        closeBtn: 1,
        content: 'caseQueryReply.html'
    });
}
function dataLog(){
    layer.open({
        type: 2,
        title: '信息详情页面',
        shade: 0.5,
        skin: 'layui-layer-rim',
        area: ['1100px', '650px'],
        shadeClose: true,
        closeBtn: 1,
        content: 'dataWrite.html'
    });
}
