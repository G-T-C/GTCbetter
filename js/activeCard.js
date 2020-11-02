layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;

    //激活卡配置
    form.on("submit(editActive)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/index/active',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });

})