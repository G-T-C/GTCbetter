layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload','laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;
        var laydate = layui.laydate;
        form.on("submit(complaintEdit)", function (data) {
            var formData = data.field;
            $.ajax({
               url: '/admin/complaint/edit',
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