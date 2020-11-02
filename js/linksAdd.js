layui.config({
	base : "/static/admin/js/"
}).use(['form','layer','jquery','laydate'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laydate = layui.laydate,
		$ = layui.jquery;


 	form.on("submit(addLinks)",function(data){
        $.post('/admin/links/addLinks',data.field,function (res) {
            console.log(res);
            top.layer.msg("添加成功");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        });

        return false;
 	})

    form.on("submit(editLinks)",function(data){
        $.post('/admin/links/editLinks',data.field,function (res) {
            console.log(res);
            top.layer.msg("修改成功");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        });

        return false;
    })
})
