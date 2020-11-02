layui.config({
    base: "/static/admin/js/"
}).use(['form','upload', 'layer', 'jquery', 'table'], function () {
    var form = layui.form,
        upload = layui.upload,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;
    
     //普通图片显示
     var uploadInst = upload.render({
        elem: '#test1' //绑定元素
        ,url: '' //上传接口
        ,field: 'titleFile'
        ,choose : function(obj) {
            obj.preview(function(index, file, result){
                $('#preview').attr('src', result);
            });
        }
        ,done: function (res) {
            //上传完毕回调
            console.log('ok');
        }
        ,error: function () {
            //请求异常回调
            console.log('error');
        }
        ,auto:false
    });
    //添加
    $(".adminAdd_btn").click(function(){
       
        var index = layui.layer.open({
            title : "添加商铺类别",
            type : 2,
            content : "/admin/Shoptype/addType",
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
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
    })
    //执行添加
    form.on("submit(addadmin)",function(data){
        // alert(1);
        var formdom = $('#userform')[0]
        ,formdata = new FormData(formdom);

        $.ajax({
            url: '/admin/Shoptype/addType',
            type: 'POST',
            data: formdata,
            processData: false, // jQuery不要去处理发送的数据
             contentType: false, // jQuery不要去设置Content-Type请求头
            success: function(res) {
                console.log(res);
                if(res==1){
                    top.layer.msg("添加成功");
                    layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                }else{
                    layer.msg(res.msg);
                }    
            }
          });
      

        return false;
    })
   
    //执行修改
    form.on("submit(editadmin)",function(data){
        // alert(1);
        var formdom = $('#userform')[0]
        ,formdata = new FormData(formdom);
        $.ajax({
            url: '/admin/Shoptype/editType',
            type: 'POST',
            data: formdata,
            processData: false, // jQuery不要去处理发送的数据
             contentType: false, // jQuery不要去设置Content-Type请求头
            success: function(res) {
                // console.log(res);
                if(res==1){
                top.layer.msg("修改成功");
                layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }
            }
          });

        return false;
    })
    //执行轮播
    form.on("submit(editbanner)",function(data){
        // alert(1);
        var formdom = $('#userform')[0]
        ,formdata = new FormData(formdom);
        $.ajax({
            url: '/admin/Index/editBanner',
            type: 'POST',
            data: formdata,
            processData: false, // jQuery不要去处理发送的数据
             contentType: false, // jQuery不要去设置Content-Type请求头
            success: function(res) {
                // console.log(res);
                if(res.code==1){
                top.layer.msg("修改成功");
                layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }
            }
          });

        return false;
    })
    //删除
    $(".admins_del").click(function(){
        
        var id=$(this).attr("data-id");
            layer.confirm('真的删除？', function(index){
                // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
                $.post('/admin/Shoptype/delete', {
                                    typeid: id
                                }, function (data) {
                                    if (data) {
                                        if(data.code == 1){
                                            top.layer.msg(data.msg, {icon: 7,time: 1500,shade : [0.5 , '#000' , true]});
                                        }else {
                                            top.layer.msg(data.msg,{time: 1500,shade : [0.5 , '#000' , true]});
                                            //刷新父页面
                                            setTimeout(function(){parent.location.reload()},1000);
                                        }
                                    } else {
                                        top.layer.msg("出错了！！！");
                                    }
                
                                }
                            );
            });
       
    })
    //修改
    $(".admins_edit").click(function(){
        
        var id=$(this).attr("data-id");
        //    alert(id);
        var index = layui.layer.open({
            title : "修改类别",
            type : 2,
            content : "/admin/Shoptype/editType?typeid="+id,
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
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
                
           
       
    })
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
                // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
                $.post('/admin/user/batchdel', {
                                    ids: datalist
                                }, function (data) {
                                    // console.log(data);
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
   
        //用户搜索
        $('.search_btn').click(function () {

            var nickname= $('.searchVal').val();
    
            console.log(nickname);
    
            table.reload('list', {
    
                 url: '/admin/Shoptype/index'
    
                ,where: {nickname:nickname} //设定异步数据接口的额外参数
    
            });
    
        })


})