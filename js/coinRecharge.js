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

    /**币充值申请列表*/
    //第一个实例
    table.render({
        elem: '#list'
        , height: 'full-10'
        , url: '/admin/Apply/rechargeList' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'id', title: 'ID', width: '6%' }
            , { field: 'transaction_id', title: '交易所交易id', width: '20%'}
            , { field: 'user_id', title: '用户ID', }
            , { field: 'coin_name', title: '充值币种', }
            , { field: 'number', title: '充值数量', }
            , { field: 'status_name', title: '状态', width: '10%' }
            , {field: 'update_time', title: '申请时间',  width:'15%',}
            ,{title: '操作', width:'9%', toolbar: '#barDemo'}
        ]]
    });

    table.on('tool(coinRecharge)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        var id = data.id;
        if(layEvent === 'checkpass'){
            layer.confirm(
                '请确认充值数量和交易ID的正确性',
                {icon:3, 'title':'币种充值确认'},
                function(index){
                    $.get('/admin/Apply/rechargeCheckPass/id/'+id, function(res){
                        layer.msg(res.msg);
                        if(res.code == 0){
                            setTimeout(function(){
                                window.location.reload()
                            }, 1500);
                        }
                    })
                    layer.close(index);
            })
        }
        else if(layEvent === 'checkreject'){
            layer.prompt({
                formType: 2,
                value: '请填写拒绝原因',
                title: '充值审核驳回',
                area: ['500px', '300px'] //自定义文本域宽高
            }, function(value, index, elem){
                if(value == '请填写拒绝原因'){
                    layer.msg('请至少说点什么');
                    return false;
                }
                $.post('/admin/Apply/rechargeCheckReject', {'id': id, 'reason': value}, function(res){
                    layer.msg(res.msg);
                    if(res.code == 0){
                        setTimeout(function(){
                            window.location.reload()
                        }, 1500);
                    }
                })
                layer.close(index);
            })
        }
        else if(layEvent === 'edit') {
            var url = '/admin/Apply/rechargeDetails/id/'+data.id;
            var index = layui.layer.open({
                title : "币种充值",
                type : 2,
                content : "/admin/Apply/rechargeDetails",
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回充值列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function(){
                layui.layer.full(index);
            })
            layui.layer.full(index);
        }
    });


    /**
     * 搜索框
     */
    $('.search_btn').click(function () {
        var user_id = $('.searchVal').val();
        table.reload('list', {
            url: '/admin/goods_order/dolist'
            ,where: {'user_id': user_id} //设定异步数据接口的额外参数

        });

    })


})