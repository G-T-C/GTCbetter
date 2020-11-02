layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;


        form.on("submit(editrole)",function(data){
            // alert('1');
            console.log(data.field);
            $.post('/admin/role/editrole',data.field,function (res) {
                console.log(res);
                top.layer.msg("添加成功");
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
    
            return false;
         })
   


})