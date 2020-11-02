
//切换分类状态
function change_show(id){
    //alert(123);return false;

    $.post('/admin/goods_category/change_show',{'id':id},function(data){
        if(data.status == 1){
            layer.msg(data.msg, {
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function(){
                location.reload();
            });
        }else{
            layer.msg(data.msg);
        }
    })
}
//修改分类排序
function change_sort(id,sort){
    //alert(sort);return false;
    $.post('/admin/goods_category/change_sort',{'id':id,'sort':sort},function(data){
        if(data.status == 3){
            console.log(data.status);
        }else if(data.status == 1){
            layer.msg(data.msg, {
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function(){
                location.reload();
            });
        }else{
            layer.msg(data.msg);
        }
    })
}
//删除分类
function del_cat(id){
    layer.confirm("确定要删除吗？", {icon: 3, title:'提示'}, function(index){
        $.post('/admin/goods_category/del_cat',{'id':id},function(data){
            if(data.status == 1){
                layer.msg(data.msg, {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    location.reload();
                });
            }else{
                layer.msg(data.msg);
            }
        })

        layer.close(index);
    });
    //alert(123);return false;

}
//修改分类保存
$('#edit_bti').click(function(){
    var cat_name = $("input[name='cat_name']").val();
    var parent_id = $(".box_s").attr('data-id');
    //alert(parent_id);return false;
    var sort_order = $("input[name='sort_order']").val();
    var is_show = $("input[name='is_show']:checked").val();
    var thumb = $("#img0").attr('src');
    var cat_id = $("input[name='cat_id']").val();
    var shoptype_id = $(".box_s1").attr('data-id');
    $.post('/admin/goods_category/edit_cat',{'cat_name':cat_name,'parent_id':parent_id,'sort_order':sort_order,'is_show':is_show,'thumb':thumb,'cat_id':cat_id,'shoptype_id':shoptype_id},function(data){
        if(data.status == 1){
            layer.msg(data.msg, {
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function(){
                window.location.href = '/admin/goods_category/index';
            });
        }else{
            layer.msg(data.msg);
        }
    })

})
//添加分类
$('.bti').click(function(){
    var cat_name = $("input[name='cat_name']").val();
    var parent_id = $(".box_s").attr('data-id');
    //alert(parent_id);return false;
    var sort_order = $("input[name='sort_order']").val();
    var is_show = $("input[name='is_show']:checked").val();
    var thumb = $("#img0").attr('src');
    var shoptype_id = $(".box_s1").attr('data-id');
    $.post('/admin/goods_category/add_cat',{'cat_name':cat_name,'parent_id':parent_id,'sort_order':sort_order,'is_show':is_show,'thumb':thumb,'shoptype_id':shoptype_id},function(data){
        if(data.status == 1){
            layer.msg(data.msg, {
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function(){
                window.location.href = '/admin/goods_category/index';
            });
        }else{
            layer.msg(data.msg);
        }
    })
});
