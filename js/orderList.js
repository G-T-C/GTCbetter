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
        , url: '/admin/orders/orderList' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
             {type:'checkbox'}
            ,{field: 'id', title: 'ID', sort: true}
            , {field: 'order_id', title: 'orderID'}
            , {field: 'goods_name', title: '商品名'}
            , {field: 'nickname', title: '昵称'}
            , {field: 'pay_money', title: '支付金额'}
            , {field: 'pay_type', title: '支付方式'}
            , {field: 'status', title: '订单状态'}
            , {field: 'create_time', title: '下单时间', sort: true}
            ,{title: '操作', width:150, toolbar: '#barDemo'}
        ]]
    });
    //监听工具条
    table.on('tool(orders)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除该条订单吗?', function(index){
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
                $.post('/admin/orders/delete', {
                                    id: data.id
                                }, function (data) {
                                    if (data) {
                                        top.layer.msg("删除成功");
                                        window.location.reload();
                                    } else {
                                        top.layer.msg("出错了！！！");
                                    }
                                }
                );
            });
        }
        if(layEvent === 'detail'){
            var index = layui.layer.open({
                title : "订单详情",
                type : 2,
                content : "/admin/orders/detail?id="+data.id,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回订单列表', '.layui-layer-setwin .layui-layer-close', {
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
    });
})