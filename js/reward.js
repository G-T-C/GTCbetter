layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;
    //基础释放比例
    form.on("submit(editConfig1)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/base',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //直推奖励设置
    form.on("submit(editConfig2)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/share',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;

    });
    //流通奖励设置
    form.on("submit(editConfig3)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/transfer',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;

    });
    //兑换奖励设置
    form.on("submit(editConfig4)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/exchange',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;

    });
    //转账倍数设置
    form.on("submit(editConfig5)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/transforMul',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;

    });
    //转账倍数设置
    form.on("submit(editConfig6)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/exchangeMul',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;

    });
    //Only价格管理
    form.on("submit(editcoindets)", function (data) {
        var formData = $('#coindetsform').serialize();

        $.ajax({
            url: '/admin/Reward/coindets',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //Only价格管理
    form.on("submit(maxcoindets)", function (data) {
        var formData = $('#maxform').serialize();

        $.ajax({
            url: '/admin/Reward/maxcoindets',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });

    //注册送资产数
    form.on("submit(editConfig7)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/registe',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //推荐奖励设置
    form.on("submit(editConfig8)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/recommend',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //GK资产兑换比例
    form.on("submit(editConfig9)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/convert',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //有效用户
    form.on("submit(editConfig10)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/jifenLimit',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //vip资产数
    form.on("submit(editConfig11)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/vip',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //vip奖励比例
    form.on("submit(editConfig12)", function (data) {
        var formData = data.field;
        $.ajax({
            url: '/admin/reward/vipBili',
            type: 'POST',
            data: formData,
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
    //币种价格
    form.on("submit(editConfig13)", function (data) {
        var formdom = $('#coinsprice')[0]
            ,formdata = new FormData(formdom);
        console.log(formdata);
        $.ajax({
            url: '/admin/reward/price',
            type: 'POST',
            data: formdata,
            processData: false, // jQuery不要去处理发送的数据
            contentType: false, // jQuery不要去设置Content-Type请求头
            success: function(res) {
                top.layer.msg(res.msg);
                window.location.reload();
            }
        });
        return false;
    });
})