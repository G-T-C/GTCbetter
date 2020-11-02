layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    form.on("submit(editConfig)", function (data) {
        $.post('/admin/config/save', data.field, function (res) {
            console.log(res);
            top.layer.msg("修改成功");
            location.reload();
        });

        return false;
    });

});
