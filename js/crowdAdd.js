layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload','laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;
        var laydate = layui.laydate;

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

        //执行一个laydate实例
        laydate.render({
            elem: '#test1'//指定元素
        });
        laydate.render({
            elem: '#test2'//指定元素
        });
        form.on("submit(crowdAdd)", function (data) {
            var formdom = $('#crowdForm')[0]
                ,formdata = new FormData(formdom);
            $.ajax({
               url: '/admin/crowd/addCrowd',
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
});