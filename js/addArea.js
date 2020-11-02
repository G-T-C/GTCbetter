layui.config({
	base : "/static/admin/js/"
}).use(['form','layer','jquery','layedit'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		layedit = layui.layedit,
		$ = layui.jquery;

	//添加区号
	//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
	$(window).one("resize",function(){
		$(".newsAdd_btn").click(function(){
			var index = layui.layer.open({
				title : "添加地区",
				type : 2,
				content : "/admin/index/addArea/",
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

        //执行添加区号
        form.on("submit(addNews)", function (data) {
            var formdom = $('#areaForm')[0]
                ,formdata = new FormData(formdom);
            $.ajax({
               url: '/admin/index/addArea',
               type: 'POST',
               data: formdata,
               processData: false,
               contentType: false,
               success: function(res) {
                   if(res.code==1){
                        top.layer.msg("区号添加成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    }else{
                        layer.msg(res.msg);
                    }

               }

           });

        
            return false;
        })

	//是否展示
	form.on('switch(isShow)', function(data){
		var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
			layer.msg("展示状态修改成功！");
        },2000);
	})
 
	//修改页面
    $(window).one("resize",function(){
        $(".news_edit").click(function(){
            var that = $(this);
            id=that.attr('data-id');
            console.log(id);
            var index = layui.layer.open({
                title : "编辑公告",
                type : 2,
                content : "/admin/index/editArea?id="+id,
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
    //删除
	$("body").on("click",".news_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
            $.post('/admin/index/deleteArea',{
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
	//执行修改
	 form.on("submit(editNews)", function () {
            var formdom = $('#areaForm')[0]
                ,formdata = new FormData(formdom);
            $.ajax({
                url: '/admin/index/editArea',
                type: 'POST',
                data: formdata,
                processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
                success: function(res) {
                    if(res.code==1){
                        top.layer.msg("公告修改成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    }else{
                        layer.msg(res.msg);
                    }

                }

            });
        
            return false;
        })

})
