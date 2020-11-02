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
    //添加
    $(".userAdd_btn").click(function () {
        var index = layui.layer.open({
            title: "配置文件",
            type: 2,
            content: "/admin/buy_order/configure",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })

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
        , url: '/admin/buy_order/dolist' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'id', title: 'ID', width: '6%' }
            , { field: 'user_nickname', title: '买入用户', width: '7%' }
            , { field: 'users_nickname', title: '卖出用户', width: '7%', }
            , { field: 'money', title: '金额', width: '7%' }
            , { field: 'bond', title: '保证金', width: '7%' }
            , { field: 'fee', title: '手续费', width: '6%' }
            , { field: 'bandcard_cardnumber', title: '银行卡号', width: '10%', }
            , { field: 'bandcard_name', title: '银行名称', width: '10%', }
            , { field: 'status_name', title: '状态', width: '10%', }
            , { field: 'create_time', title: '时间', width: '10%', }
            // , {field: 'update_time', title: '完成时间',  width:'10%',}
        ]]
    });

    // //用户搜索
    $('.search_btn').click(function () {
        var timeframe = $('#test5').val();
        var status = $('#type').val();
        var nickname = $('.searchVal').val();
        table.reload('list', {
            url: '/admin/buy_order/dolist'
            , where: { status: status, nickname: nickname, timeframe: timeframe } //设定异步数据接口的额外参数

        });

    })


})