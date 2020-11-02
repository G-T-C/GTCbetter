layui.config({
    base: "/statics/admin/js/"
}).use(['form', 'layer', 'jquery', 'laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laydate = layui.laydate,
        $ = layui.jquery;


    form.on("submit(addBanks)", function (data) {
        $.post('/admin/banks/addBanks', data.field, function (res) {
            console.log(res);
            top.layer.msg("添加成功");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        });

        return false;
    });

    form.on("submit(editBanks)", function (data) {
        $.post('/admin/banks/editBanks', data.field, function (res) {
            console.log(res);
            top.layer.msg("修改成功");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        });

        return false;
    });

});
