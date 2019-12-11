
$(function(){

setHeight();
TabChage();
    initMap();
    mapToll();




})
//地图界面高度设置
function setHeight(){
    var allHeight=$(document).height();
    var mapHeight=allHeight-165;
    var mapTop=mapHeight/2+110;
    $(".mapCon").css("height",mapHeight);
    $(".mapOpenHide").css("top",mapTop);

}

//加载专题地图

var setting = {
    view: {
        dblClickExpand: false
    },
    check: {
        enable: true
    }

};
var zNodes =[
    {"id":0,"name":"专题图层目录","open":true,children:[
        { "id":1,"pid":0, "name":"专题图层一","open":true,
            children: [
                { "id":11,"pid":1, "name":"接警处"},
                { "id":12, "pid":1,"name":"接受案事件"},
                { "id":13,"pid":1, "name":"立案审查"}
            ]
        },
        {"id":2,"pid":0,"name":"专题图层二",
            children: [
                { "id":21,"pid":2, "name":"法院人事部"},

                { "id":23,"pid":2, "name":"法院后勤部门"}
            ]
        },
        {"id":3,"pid":0,"name":"专题图层三",
            children: [
                { "id":31,"pid":3, "name":"检查人事部"},

                { "id":33,"pid":3, "name":"检查院后勤部门"}
            ]}
    ]}

];





var zTree;
$(document).ready(function(){
    $.fn.zTree.init($("#ztree"), setting, zNodes);


    zTree = $.fn.zTree.getZTreeObj("ztree");


});
//Tab切换
function TabChage(){
    $(".mapLeftTab a").click(function(){
        var ins=$(this).index();
        $(this).addClass("mapActive").siblings().removeClass("mapActive");
        $(".mapChange .mapChangeBox").eq(ins).show().siblings().hide();
    })
}
//加载地图
function initMap(){
// 百度地图API功能
    var map = new BMap.Map("mapall");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    var size1 = new BMap.Size(10, 50);
    map.addControl(new BMap.MapTypeControl({
        offset: size1,
        mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP,

        ]}));
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
//加载城市控件
    var size = new BMap.Size(10, 50);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,


    }));
}
function hideLeft(){
    if($(".mapLeft").is(":visible")){
        $(".mapLeft").hide();
        $(".mapOpenHide").css("left",0);
        $(".mapRight").css("width",'100%');
    }
    else{
        $(".mapLeft").show();
        $(".mapOpenHide").css("left",'20%');
        $(".mapRight").css("width",'79.8%');
    }

}
//工具条下拉菜单显示
function mapToll(){
    $(".mapToolUl>li").click(function(){
        $(this).find("ul").toggle();
    })
}