layui.config({
	base : "/static/admin/js/"
}).use(['form','layer','jquery','upload','laydate'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laydate = layui.laydate,
		$ = layui.jquery;
    upload = layui.upload;
    
    //普通图片上传
  var uploadInst = upload.render({
    elem: '#test1'
    ,field: 'titleFile'
    ,choose: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#preview').attr('src', result); //图片链接（base64）
      });
    }
    ,done: function(res){
      //如果上传失败
      if(res.code > 0){
        return layer.msg('上传失败');
      }
      //上传成功
    }
    ,error: function(){
      //演示失败状态，并实现重传
      var demoText = $('#demoText');
      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
      demoText.find('.demo-reload').on('click', function(){
        uploadInst.upload();
      });
    }
    ,auto:false
});

  //修改个人信息
 	form.on("submit(edituser)",function(data){
      
    var formdom = $('#userform')[0]
    ,formdata = new FormData(formdom);

        $.ajax({
          url: '/admin/user/edituser',
          type: 'POST',
          data: formdata,
          processData: false, // jQuery不要去处理发送的数据
           contentType: false, // jQuery不要去设置Content-Type请求头
          success: function(res) {
           
              top.layer.msg("修改成功！");
              layer.closeAll("iframe");
              //刷新父页面
              parent.location.reload();
          }
        });
        return false;
 	})
   //修改资产 金额
    form.on("submit(integralConfig)",function(data){
        // alert(1);
        var datas=$('#integral').serializeArray();
        $.post('/admin/user/details',datas,function (res) {
            if(res.status==1){
              top.layer.msg("修改成功");
              layer.closeAll("iframe");
              //刷新父页面
              parent.location.reload();
            }else{
              top.layer.msg("修改失败");
              layer.closeAll("iframe");
              //刷新父页面
              parent.location.reload();
            }
        });

        return false;
    })
    form.on("submit(walletConfig)",function(data){
      var datas=$('#wallet').serializeArray();
      console.log(datas);
      $.post('/admin/user/details',datas,function (res) {
          if(res.status==1){
            top.layer.msg("修改成功");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
          }else{
            top.layer.msg("修改失败");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
          }
          
      });

      return false;
  })
    form.on("submit(assetsConfig)",function(data){
        var datas=$('#assets').serializeArray();
        $.post('/admin/user/details',datas,function (res) {

            if(res.status==1){
                top.layer.msg("修改成功");
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            }else{
                top.layer.msg("修改失败");
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            }

        });

        return false;
    })
    form.on("submit(adduser)",function(data){
        var formdom = $('#userform')[0]
        ,formdata = new FormData(formdom);
            $.ajax({
              url: '/admin/user/adduser',
              type: 'POST',
              data: formdata,
              processData: false, // jQuery不要去处理发送的数据
               contentType: false, // jQuery不要去设置Content-Type请求头
              success: function(res) {
                // console.log(res);
                if(res.code==1){
                  top.layer.msg("添加成功");
                  layer.closeAll("iframe");
                  //刷新父页面
                  parent.location.reload();
                }else{
                  top.layer.msg(res.msg);
                }
              }
            });
            return false;
      
    })

})
