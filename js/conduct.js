layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;
    //第一个实例
    table.render({
        elem: '#list'
        , height: 'full-10'
        , url: '/admin/Conduct/indexList' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'id', title: 'ID', sort: true}
            , {field: 'name', title: '理财名称'}
            , {field: 'start_purchase', title: '理财起始购'}
            , {field: "num", title: '理财数量'}
            , {field: 'interest', title: '理财百分比%'}
            , {field: 'surplus', title: '剩余理财量'}

            , {field: 'start_time', title: '开始时间', sort: true}
            , {field: 'end_time', title: '结束时间', sort: true}
            //, {field: 'status', title: '理财状态'}
            , {field: 'create_time', title: '创建时间', sort: true}
            ,{title: '操作', width:150, toolbar: '#barDemo'}
        ]]
    });
   //监听工具条
    table.on('tool(crowd)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'edit'){
            var index = layui.layer.open({
                title : "理财编辑",
                type : 2,
                content : "/admin/Conduct/edit?id="+data.id,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回理财列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },100)
                }
            })
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function(){
                layui.layer.full(index);
            })
            layui.layer.full(index);
        }
        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除该条众筹吗?', function(index){
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
                $.post('/admin/crowd/delete', {
                        id: data.id
                    }, function (data) {
                        top.layer.msg(data.msg);
                    }
                );
            });
        }
    });
    //添加公告
    //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
    $(window).one("resize",function(){
        $(".crowdAdd_btn").click(function(){
            var index = layui.layer.open({
                title : "添加理财",
                type : 2,
                content : "/admin/Conduct/addConduct/",
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回理财列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
            layui.layer.full(index);
        })
    }).resize();


})