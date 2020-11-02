layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;
    //添加友情链接
    $(".banksAdd_btn").click(function () {
        var index = layui.layer.open({
            title: "添加银行名称",
            type: 2,
            content: "/admin/banks/addBanks",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回友链列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        });
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        });
        layui.layer.full(index);
    });
    //操作
    $("body").on("click", ".banks_edit", function () {  //编辑
        var that = $(this);
        id = that.attr('data-id');
        console.log(id);
        var index = layui.layer.open({
            title: "编辑单位",
            type: 2,
            content: "/admin/banks/editBanks?id=" + id,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回单位列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        });
        layui.layer.full(index);
    });

    $("body").on("click", ".banks_del", function () {  //删除
        var _this = $(this);
        layer.confirm('确定删除此信息？', {icon: 3, title: '提示信息'}, function (index) {
            $.post('/admin/banks/deleteBanks', {
                    id: _this.attr('data-id')
                }, function (data) {
                    if (data) {
                        window.location.reload()
                    } else {
                        alert('出错了稍后再试');
                    }

                }
            );
            layer.close(index);
        });
    })

});
