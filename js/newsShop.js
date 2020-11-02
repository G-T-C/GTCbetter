layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;
        var uploadInst = upload.render({
            elem: '#test1' //绑定元素
            ,url: '/admin/notice/img' //上传接口
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
        
        //创建一个编辑器
        var editIndex = layedit.build('news_content', {
            uploadImage: {
                url: '/admin/notice/uploadImg/'
                ,type: 'post'
            }
        });

        
        form.on("submit(addNews)", function (data) {
            data.field.content = layedit.getContent(editIndex);
            //var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
            /*             
            $.post('/admin/notice/addNotice', data.field, function (res) {
                console.log(res);
                top.layer.msg("公告添加成功！");
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
            */
            var formdom = $('#articleForm')[0]
                ,formdata = new FormData(formdom);
            formdata.append('content', layedit.getContent(editIndex));
            $.ajax({
               url: '/admin/notice/addNotice',
               type: 'POST',
               data: formdata,
               processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
               success: function(res) {
                   if(res.code==1){
                        top.layer.msg("公告添加成功！");
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
        form.on("submit(editNews)", function () {
            var formdom = $('#articleForm')[0]
                ,formdata = new FormData(formdom);
            formdata.append('content', layedit.getContent(editIndex));
            $.ajax({
                url: '/admin/notice/editNotice',
                type: 'POST',
                data: formdata,
                processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
                success: function(res) {
                    if(res.code==1){
                        top.layer.msg("公告修改成功！");
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
});