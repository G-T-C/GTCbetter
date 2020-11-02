layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload','laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;
        var laydate = layui.laydate;
    form.on("submit(businessEdit)", function (data) {
        var formData = data.field;
        var status = 1;
        formData['status'] = status;
        $.ajax({
            url: '/admin/business/edit',
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
    });
    form.on("submit(businessEdit1)", function (data) {
        var formData = data.field;
        var status1 = 0;
        formData['status1'] = status1;
        $.ajax({
            url: '/admin/business/edit',
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
    });
});