layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'upload'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;
        form.on("submit(orderStatus)", function (data) {
            var formData = data.field;
            console.log(formData);
            $.ajax({
                url: '/admin/orders/detail',
                type: 'POST',
                data: formData,
                success: function(res) {
                    console.log(res);
                    if(res){
                        top.layer.msg("修改成功");
                    }else {
                        top.layer.msg("修改失败!")
                    }
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }
            });
            return false;
        })
});