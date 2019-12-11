/**
 * Created by 30947 on 2018/6/11.
 */
$(function(){
char1();
    char2();
    char3();
    char4();
    char5();
    changeAny();
})

function char1() {

    var myChart = echarts.init($("#char1")[0]);
//app.title = '堆叠柱状图';

    option = {
        title : {
            text: '全省2018年土地矿产交易数据统计',
            x:'center',
            y:'top',
            textAlign:'center',
            padding:10,
             textStyle:{
                //文字颜色
                color:'#333',
                //字体风格,'normal','italic','oblique'
                fontStyle:'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight:'bold',
                //字体系列
                fontFamily:'sans-serif',
                //字体大小
                fontSize:18
            }

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        //legend: {
        //    x:'center',
        //
        //    top:'5%',
        //    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
        //},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '广告',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'bar',
                stack: '广告',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'bar',
                stack: '广告',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '搜索引擎',
                type: 'bar',
                data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                markLine: {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data: [
                        [{type: 'min'}, {type: 'max'}]
                    ]
                }
            },
            {
                name: '百度',
                type: 'bar',
                barWidth: 5,
                stack: '搜索引擎',
                data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
                name: '谷歌',
                type: 'bar',
                stack: '搜索引擎',
                data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
                name: '必应',
                type: 'bar',
                stack: '搜索引擎',
                data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
                name: '其他',
                type: 'bar',
                stack: '搜索引擎',
                data: [62, 82, 91, 84, 109, 110, 120]
            }
        ]
    };
    myChart.setOption(option);
}
function char2() {

    var myChart = echarts.init($("#char2")[0]);
//app.title = '堆叠柱状图';

    option = {
        title : {
            text: '全省2018年土地矿产交易数据统计二',
            x:'center',

        },
        tooltip : {
            trigger: 'axis'
        },

        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} °C'
                }
            }
        ],
        series : [
            {
                name:'最高气温',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint : {
                    data : [
                        {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}
function char3() {

    var myChart = echarts.init($("#char3")[0]);
//app.title = '堆叠柱状图';

    option = {
        title : {
            text: '全省2018年土地矿产交易数据统计',
            x:'center',

        },
        tooltip : {
            trigger: 'axis'
        },

        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        grid: {y: 70, y2:30, x2:20},
        xAxis : [
            {
                type : 'category',
                data : ['Line','Bar','Scatter','K','Map']
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : ['Line','Bar','Scatter','K','Map']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{formatter:'{value} ms'}
            }
        ],
        series : [
            {
                name:'ECharts2 - 2k数据',
                type:'bar',
                itemStyle: {normal: {color:'rgba(193,35,43,1)', label:{show:true}}},
                data:[40,155,95,75, 0]
            },
            {
                name:'ECharts2 - 2w数据',
                type:'bar',
                itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,textStyle:{color:'#27727B'}}}},
                data:[100,200,105,100,156]
            },
            {
                name:'ECharts2 - 20w数据',
                type:'bar',
                itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
                data:[906,911,908,778,0]
            },
            {
                name:'ECharts1 - 2k数据',
                type:'bar',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(193,35,43,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
                data:[96,224,164,124,0]
            },
            {
                name:'ECharts1 - 2w数据',
                type:'bar',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(181,195,52,0.5)', label:{show:true}}},
                data:[491,2035,389,955,347]
            },
            {
                name:'ECharts1 - 20w数据',
                type:'bar',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'+'):'';}}}},
                data:[3000,3000,2817,3000,0]
            }
        ]
    };
    myChart.setOption(option);
}
function char4() {

    var myChart = echarts.init($("#char4")[0]);
//app.title = '堆叠柱状图';

    option = {
        title :{
            text: '全省2018年土地矿产交易数据统计',
            x:'center',
        },
        tooltip : {
            trigger: 'axis',
            formatter: function (params){
                return params[0].name + ' : '
                    + (params[2].value - params[1].value > 0 ? '+' : '-')
                    + params[0].value + '<br/>'
                    + params[2].seriesName + ' : ' + params[2].value + '<br/>'
                    + params[3].seriesName + ' : ' + params[3].value + '<br/>'
            }
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },

        xAxis : [
            {
                type : 'category',
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value',
                min : 200,
                max : 450
            }
        ],
        series : [
            {
                name:'本周',
                type:'line',
                data:[400, 374, 251, 300, 420, 400, 440]
            },
            {
                name:'上周',
                type:'line',
                symbol:'none',
                itemStyle:{
                    normal:{
                        lineStyle: {
                            width:1,
                            type:'dashed'
                        }
                    }
                },
                data:[320, 332, 301, 334, 360, 330, 350]
            },
            {
                name:'上周2',
                type:'bar',
                stack: '1',
                barWidth: 6,
                itemStyle:{
                    normal:{
                        color:'rgba(0,0,0,0)'
                    },
                    emphasis:{
                        color:'rgba(0,0,0,0)'
                    }
                },
                data:[320, 332, 251, 300, 360, 330, 350]
            },
            {
                name:'变化',
                type:'bar',
                stack: '1',
                data:[
                    80, 42,
                    {value : 50, itemStyle:{ normal:{color:'red'}}},
                    {value : 34, itemStyle:{ normal:{color:'red'}}},
                    60, 70, 90
                ]
            }
        ]
    };
    myChart.setOption(option);

}
function char5() {

    var myChart = echarts.init($("#char5")[0]);
//app.title = '堆叠柱状图';

    option = {
        title : {
            text: '全省2018年土地矿产交易数据统计二',
            x:'center',

        },
        tooltip : {
            trigger: 'axis'
        },

        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} °C'
                }
            }
        ],
        series : [
            {
                name:'最高气温',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint : {
                    data : [
                        {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}
function changeAny(){
    $(".anyChangeSpan a").click(function(){
        var ins=$(this).index();
        $(this).addClass("anyActive").siblings().removeClass("anyActive");
        $(".staicAnyCon .staicChange").eq(ins).show().siblings().hide();
    })
}