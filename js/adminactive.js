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
        , url: '/admin/Recharge/activeList' //数据接口
        , page: true //开启分页
        ,limit : 40
        , cols: [[ //表头
            
            {field: 'userid', title: '会员id',}
            , {field: 'money', title: '金额', sort: true,}
            , {field: 'sonid', title: '激活下级',}
            , {field: 'status', title: '激活状态',}
            , {field: 'create_time', title: '创建时间', sort: true,}
            , {field: 'active_time', title: '使用时间', sort: true,}
            
        ]]
    });
       
        //用户搜索
        $('.search_btn').click(function () {

            var nickname= $('#active1').val();
            var status = $('#active2').val();
            console.log(status);
            table.reload('list', {
    
                 url: '/admin/Recharge/activeList'
                ,where: {nickname:nickname,status:status} //设定异步数据接口的额外参数
            });
    
        })


})