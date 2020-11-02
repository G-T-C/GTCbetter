layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload'], function () {

    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;

        var uploadInst = upload.render({
            elem: '#goodsPic' //绑定元素
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
        var editIndex = layedit.build('goodsDetail', {
            uploadImage: {
                url: '/admin/notice/uploadImg/'
                ,type: 'post'
            }
        });

        form.on("submit(addGoods)", function (data) {
            data.field.content = layedit.getContent(editIndex);
            //var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
            var formdom = $('#goodsForm')[0]
                ,formdata = new FormData(formdom);
                 formdata.append('goods_detail', layedit.getContent(editIndex));
            $.ajax({
               url: '/admin/goods/addGoods',
               type: 'POST',
               data: formdata,
               processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
               success: function(res) {
                   top.layer.msg("商品添加成功！");
                   layer.closeAll("iframe");
                   //刷新父页面
                   parent.location.reload();
               }

           });
            return false;
        })


        form.on("submit(editGoods)", function () {
            var formdom = $('#goodsForm')[0]
                ,formdata = new FormData(formdom);
            formdata.append('content', layedit.getContent(editIndex));
            $.ajax({
                url: '/admin/goods/editGoods',
                type: 'POST',
                data: formdata,
                processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
                success: function(res) {
                    top.layer.msg("商品修改成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }

            });
        
            return false;
        })


});