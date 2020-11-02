layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table', 'upload'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        upload = layui.upload,
        $ = layui.jquery;

    //第一个实例
    table.render({
        elem: '#list'
        , height: 'full-10'
        , url: '/admin/Coins/coinsList' //数据接口
        , page: false //开启分页
        , cols: [[ //表头
            {field: 'id', title: 'ID', sort: true}
            , {field: 'coin_name', title: '币种名称'}
            , {field: 'img', title: '图标', templet:'<div><img style="border-radius: 50%;overflow: hidden;height:50px;width:50px;" src="{{ d.img}}"></div>'}
            , {field: 'status', title: '状态'}
            , {field: 'create_time', title: '创建时间', sort: true}
            ,{title: '操作',  toolbar: '#barDemo'}
        ]]
    });

    //监听工具条
    table.on('tool(crowd)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if(layEvent === 'edit'){
            var index = layui.layer.open({
                title : "币种编辑",
                type : 2,
                content : "/admin/Coins/edit?id="+data.id,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回币种列表', '.layui-layer-setwin .layui-layer-close', {
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
            layer.confirm('真的删除该条币种吗?', function(index){
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
    //添加
    //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
    $(window).one("resize",function(){
        $(".add_btn").click(function(){
            var index = layui.layer.open({
                title : "添加币种",
                type : 2,
                content : "/admin/Coins/addCoin/",
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回币种列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
            layui.layer.full(index);
        })
    }).resize();

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test333'
        ,field: 'titleFile'
        ,choose: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#preview').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
        ,auto:false
    });

    form.on("submit(coinsAdd)", function (data) {
        var formdom = $('#coinForm')[0]
            ,formdata = new FormData(formdom);
        $.ajax({
            url: '/admin/Coins/addCoin',
            type: 'POST',
            data: formdata,
            processData: false, // jQuery不要去处理发送的数据
            contentType: false, // jQuery不要去设置Content-Type请求头
            success: function(res) {
                top.layer.msg(res.msg);
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            }
        });
        return false;
    })

    form.on("submit(coinEdit)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/Coins/edit',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            }

        });
        return false;
    })


})