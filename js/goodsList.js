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
        , url: '/admin/goods/goodsList' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            /* {type:'checkbox',width:'3%',}
             ,*/ {field: 'id', title: 'ID', width:'10%', sort: false}
            , {field: 'name', width:'15%',title: '商品名称',}
            , {field: 'business_name', width:'15%',title: '所属店铺',}
            , {field: 'img1',width:'20%',align:'center', title: '商品图片', templet: '#goodsImg'}
            , {field: 'sale_price', width:'20%',align:'center',title: '商品价格', sort: false}
            , {field: 'is_on', width:'10%',align:'center',title: '是否上架', sort: false}
            , {field: 'right', width:'10%',align:'center',title: '操作', toolbar: '#barDemo'}

        ]]
    });


    $(".goodsAdd_btn").click(function () {
        var index = layui.layer.open({
            title: "添加商品",
            type: 2,
            content: "/admin/goods/addGoods",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回商品列表', '.layui-layer-setwin .layui-layer-close', {
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



    table.on('tool(goods)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        var id=data.id;
        if(layEvent === 'detail'){ //查看
            //alert('/admin/goods/detail/id/'+id);return false;
            window.location.href = '/admin/goods/detail/id/'+id;
        } else if(layEvent === 'down'){ //下架
            layer.confirm('确定执行下架操作？', function(index){
                layer.close(index);
                $.post('/admin/goods/caozuo_goods', {
                        id: id
                    }, function (data) {
                        if (data.status ==1) {
                            top.layer.msg(data.msg);
                            location.reload();
                        } else {
                            top.layer.msg(data.msg);
                        }

                    }
                );
                //向服务端发送删除指令
            });
        } else if(layEvent === 'up'){//上架
            layer.confirm('确定执行上架操作？', function(index){
                layer.close(index);
                $.post('/admin/goods/caozuo_goods', {
                        id: id
                    }, function (data) {
                        if (data.status ==1) {
                            top.layer.msg(data.msg);
                            location.reload();
                        } else {
                            top.layer.msg(data.msg);
                        }

                    }
                );
                //向服务端发送删除指令
            });
        }
    });


    //批量删除
    $(".batchDel").click(function(){
        var checkStatus = table.checkStatus('list');
        // console.log(checkStatus);
        if(checkStatus.data.length>0){
            var datalist={};
            for(var i=0;i<checkStatus.data.length;i++){
                datalist[i]=checkStatus.data[i].id;
            }
            // console.log(datalist);
            layer.confirm('真的删除'+checkStatus.data.length+'条？', function(index){
                layer.close(index);
                $.post('/admin/goods/deleteGoods', {
                        id: datalist
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
        }else{
            top.layer.msg("请选择数据！！");
        }
    })

    $('.search_btn').click(function () {

        var goods_name= $('.searchVal').val();

        console.log(goods_name);

        table.reload('list', {

            url: '/admin/goods/goodsList'

            ,where: {goods_name:goods_name} //设定异步数据接口的额外参数

        });

    })









})