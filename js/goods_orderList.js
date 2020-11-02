layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table', 'laydate'], function () {
    var laydate = layui.laydate;
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;
    laydate.render({
        elem: '#test5'
        , type: 'datetime'
    });

    // //充值记录
    // $(".revise").click(function(){
    //      alert(1);
    //     var index = layui.layer.open({
    //         title : "修改配置文件",
    //         type : 2,
    //         content : "/admin/buy_order/configure",
    //         success : function(layero, index){
    //             setTimeout(function(){
    //                 layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
    //                     tips: 3
    //                 });
    //             },500)
    //         }
    //     })
    //     //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
    //     $(window).resize(function(){
    //         layui.layer.full(index);
    //     })
    //     layui.layer.full(index);
    // })
    table.on('tool(user)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'details') {
            var url = '/admin/goods_order/oder_date/order_id/'+data.order_id;
            //alert(url);return false;
            $('#off_off').attr('src',url);
            $(".jiazai").show();
            $(".con_con").hide();
        }
        });

    form.on("submit(revise)", function (data) {
        var formdom = $('#opeing')[0]
            , formdata = new FormData(formdom);
        $.ajax({
            url: '/admin/buy_order/configure',
            type: 'POST',
            data: formdata,
            processData: false, // jQuery不要去处理发送的数据
            contentType: false, // jQuery不要去设置Content-Type请求头
            success: function (res) {
                if (res.code == 1) {
                    top.layer.msg(res.msg);
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    top.layer.msg(res.msg);
                }
            }
        });
        return false;
    })


    //第一个实例
    table.render({
        elem: '#list'
        , height: 'full-10'
        , url: '/admin/goods_order/dolist' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'order_id', title: 'ID', width: '6%' }
            , { field: 'order_number', title: '订单号', width: '25%' }
            , { field: 'userid', title: '买家ID', width: '20%', }
            , { field: 'goodname', title: '商品名称', width: '10%' }
            , { field: 'tprice', title: '总价', width: '20%' }
            , { field: 'status', title: '状态', width: '10%' }
            ,{title: '操作', width:'9%', toolbar: '#barDemo'}
            // , {field: 'update_time', title: '完成时间',  width:'10%',}
        ]]
    });
    $('.search_btn').click(function () {
        var order_number= $('.searchVal').val();
        table.reload('list', {
            url: '/admin/goods_order/dolist'
            ,where: {order_number:order_number} //设定异步数据接口的额外参数

        });

    })


})