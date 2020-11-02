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
        , url: '/admin/Recharge/houtaicoinList' //数据接口
        , page: true //开启分页
        ,limit : 40
        , cols: [[ //表头
            
            {field: 'type', title: '类型', sort: true,}
            , {field: 'uid', title: '会员id',}
            , {field: 'coin_name', title: '币种名称',}
            , {field: 'num', title: '数量', sort: true,}
            , {field: 'create_time', title: '时间', sort: true,}
        ]]
    });
       
        //用户搜索
        $('.search_btn').click(function () {

            var nickname= $('.searchVal').val();
            table.reload('list', {
    
                 url: '/admin/Recharge/houtaicoinList'
    
                ,where: {nickname:nickname} //设定异步数据接口的额外参数
    
            });
    
        })


})