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
        , url: '/admin/Conduct/recode' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'uid', title: 'UID', sort: true}
            , {field: 'name', title: '理财名称'}
            , {field: 'only_money', title: '理财数量'}
            , {field: 'start_time', title: '开始时间'}
            , {field: 'end_time', title: '结束时间'}
            , {field: 'active', title: '状态'}
           // , {field: 'active', title: '状态', sort: true}
        ]]
    });
    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');
            var demoReload2 = $('#demoReload2');
            table.reload('list', {
                where: {
                    keyword: demoReload.val(),
                    keyword2: demoReload2.val()
                }
            });
        }
    };
    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //用户搜索
    $('.search_btn').click(function () {
        var nickname= $('.searchVal').val();
        //console.log(nickname);
        table.reload('list', {
            url: '/admin/Conduct/search'
            ,where: {nickname:nickname} //设定异步数据接口的额外参数

        });

    })





});