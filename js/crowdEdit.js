layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload','laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#test1'//指定元素
        });
        laydate.render({
            elem: '#test2'//指定元素
        });
        form.on("submit(crowdEdit)", function (data) {
            var formData = data.field;
            $.ajax({
               url: '/admin/crowd/edit',
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
});