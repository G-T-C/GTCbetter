layui.config({
	base : "/static/admin/js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;

	//添加公告
	//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
	$(window).one("resize",function(){
		$(".newsAdd_btn").click(function(){
			var index = layui.layer.open({
				title : "添加公告",
				type : 2,
				content : "/admin/notice/addNotice/",
				success : function(layero, index){
					setTimeout(function(){
						layui.layer.tips('点击此处返回公告列表', '.layui-layer-setwin .layui-layer-close', {
							tips: 3
						});
					},500)
				}
			})			
			layui.layer.full(index);
		})
	}).resize();


	//是否展示
	form.on('switch(isShow)', function(data){
		var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
			layer.msg("展示状态修改成功！");
        },2000);
	})
 
	//操作
    $(window).one("resize",function(){
        $(".news_edit").click(function(){
            var that = $(this);
            id=that.attr('data-id');
            console.log(id);
            var index = layui.layer.open({
                title : "编辑公告",
                type : 2,
                content : "/admin/notice/editNotice?id="+id,
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回公告列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
            layui.layer.full(index);
        })
    }).resize();

	$("body").on("click",".news_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
            $.post('/admin/notice/deleteNotice',{
                    id:_this.attr('data-id')
                } ,function(data){
                    if(data){
                        window.location.reload()
                    }else{
                        alert('出错了稍后再试');
                    }

                }
            );
            layer.close(index);
		});
	})

})
