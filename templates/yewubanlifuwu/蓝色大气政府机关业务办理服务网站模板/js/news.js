/**
 * Created by Administrator on 2017/4/25.
 */
    $(function(){
        table();
    })
var currentID;
function table(){
    $('#table').bootstrapTable({
        method: "get",
        url: "",
        striped: true,
        singleSelect: false,
        dataType: "json",
        pagination: true, //分页
        pageSize: 10,
        pageNumber: 1,
        search: false, //显示搜索框
        contentType: "application/x-www-form-urlencoded",
        queryParams: null,
        sidePagination: "server", //服务端请求
        columns: [
            {
                checkbox: "true",
                field: 'check',
                align: 'center',
                valign: 'middle'
            }
            ,
            {
                title: "编号",
                field: 'id',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '标题',
                field: 'title',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '作者',
                field: 'type',
                align: 'center',
                valign: 'middle'
            },

            {
                title: '发布人',
                field: 'person',
                align: 'center'
            },
            {
                title: '发布时间',
                field: 'date',
                align: 'center'
            },
            {
                title: '操作',
                field: 'opear',
                align: 'center',
                formatter: function (value, row) {
                    var e = '<a  href="#" title="编辑" onclick="edit(\'' + row.id + '\')">编辑</a> ';
                    var c = '<a  href="#" title="删除" onclick="del(\'' + row.id + '\')">删除</a> ';

                    return e+c ;
                }
            }
        ]
    });


}
// 新闻查询
function queryParams1(params) {
    return {
        page: params.pageNumber,
        rows: params.limit,//页码大小
        order: params.order,
        sort: params.sort,
        ApproveStatus: $("#name").val(),
        LeaveName: $("#time").val(),
        QueryAudit: true
    };
}

// 刷新
function getData() {
    $(".table_style").bootstrapTable("refresh");

}
// 公用弹出框
function openlayer(){
    layer.open({
        type: 2,
        title: '信息详情页面',
        shade: 0.5,
        skin: 'layui-layer-rim',
        area: ['920px', '580px'],
        shadeClose: true,
        closeBtn: 1,
        content: 'addNotice.html'
    });
}
//获取编号
function getCurrentID() {
    return currentID;
}
//新增
function add() {
    currentID="";
    openlayer();


}

// 编辑
function edit(id) {
    currentID=id;
    openlayer();

}
// 删除单个新闻
function  del(id) {
    conforms=confirm("是否删除所选信息？");
    var Nid=id;
    if(conforms) {
        $.ajax({
            url: '/OaAnnounce/EditDel?id=' + NId,
            type: "get",
            dataType: "json",
            success:function (result) {
                if(result){
                    alert("删除成功");
                    getData();
                }
                else{
                    alert("删除失败");
                }
                
            },
            error: function (err) {
        }

        })
    }
}
// 删除所有
function Alldel() {
    var dbs=$(".table_style").bootstrapTable('getSelections');

    if(dbs==null||dbs.length==0){
        alert("请至少选择一个！");
        return false;
    }
    else{
        arry=[];
        $.each(dbs,function (index,row) {
            arry.push(row.Id);

        })

            $.ajax({
                url:'/OaAnnounce/EditDels?ids=' + arry.join(","),
                type:'get',
                dataType:"json",
                success:function (result) {
                    if(result){
                        alert("删除成功");
                        getData();
                    }
                    else{
                        alert("删除失败");
                    }

                },
                error: function (err) {
                }
            })

    }
    
}