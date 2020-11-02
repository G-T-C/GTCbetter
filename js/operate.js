layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;
    //第一个实例
    table.render({
        elem: '#list'
        , height: 'full-10'
        , url: '/admin/operatelist/list' //数据接口
        , page: true //开启分页
      ,limit:40
        , cols: [[ //表头
            {field: 'userid', title: 'id',}
           , {field: 'name', title: '登录名',}
           , {field: 'ip_address', title: '登录ip',}
           , {field: 'type', title: '操作类型',}
            , {field: 'create_time', title: '操作时间',}
        ]]
    });
    var $ = layui.$, active = {
        reload: function(){
            var demoReload2 = $('#demoReload2');
            table.reload('list', {
                where: {
                    keyword2: demoReload2.val()
                }
            });
        }
    };
    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});