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
        , height: 'full-8'
        , url: '/admin/complaint/complaintList' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'id', title: 'ID', sort: true}
            , {field: 'userid', title: '投诉人id'}
            , {field: 'nickname', title: '投诉人昵称'}
            , {field: 'mobile', title: '投诉人电话'}
            , {field: 'status', title: '投诉状态'}
            , {field: 'create_time', title: '创建时间', sort: true}
            ,{title: '操作', width:150, toolbar: '#barDemo'}
        ]]
    });
    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');
            table.reload('list', {
                where: {
                    keyword: demoReload.val()
                }
            });
        }
    };
    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    //监听工具条
    table.on('tool(complaint)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'edit'){
            var index = layui.layer.open({
                title : "投诉详情",
                type : 2,
                content : "/admin/complaint/edit?id="+data.id,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回投诉列表', '.layui-layer-setwin .layui-layer-close', {
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
            layer.confirm('真的删除该条投诉吗?', function(index){
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
                $.post('/admin/complaint/delete', {
                        id: data.id
                    }, function (data) {
                        top.layer.msg(data.msg);
                    }
                );
            });
        }
    });
})