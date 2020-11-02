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
        , url: '/admin/business/businessList' //数据接口
        , page: true //开启分页
        , limit:  18
        , cols: [[ //表头
             {field: 'userid', title: '商家id'}
            , {field: 'name', title: '商家名称'}
            , {field: 'contact', title: '联系人'}
            , {field: 'mobile', title: '联系电话'}
            , {field: 'status', title: '审核状态'}
            , {field: 'create_time', title: '申请时间', sort: true}
            ,{title: '操作', width:150, toolbar: '#barDemo'}
        ]]
    });
    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');
            var status = $('#demoReload2').val();
            table.reload('list', {
                where: {
                    keyword: demoReload.val(),
                    status:status
                }
            });
        }
    };
    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    //监听工具条
    table.on('tool(business)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'edit'){
            var index = layui.layer.open({
                title : "商家详情",
                type : 2,
                content : "/admin/business/edit?id="+data.userid,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回审核列表', '.layui-layer-setwin .layui-layer-close', {
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
            layer.confirm('真的删除该条申请吗?', function(index){
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
                $.post('/admin/business/delete', {
                        id: data.userid
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
        $(".protocolAdd_btn").click(function(){
            var id = $(this).attr('data-id');
            var index = layui.layer.open({
                title : "入驻协议",
                type : 2,
                content : "/admin/notice/editShopProtocol?id="+id,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回公告列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })          
            layui.layer.full(index);
        })
    }).resize();
})