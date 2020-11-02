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
        , url: '/admin/coins/rewardlist' //数据接口
        , page: true //开启分页
        ,limit : 40
        , cols: [[ //表头
            //  {type:'checkbox'}
             {field: 'uid', title: '用户id',}
            , {field: 'num', title: '奖励数量',}
            , {field: 'type', title: '类型',}
            , {field: 'create_time', title: '时间', sort: true,}
        ]]
    });
   
        //用户搜索
        $('.search_btn').click(function () {

            var find= $('.searchVal').val();
    
            table.reload('list', {
    
                 url: '/admin/coins/rewardlist'
    
                ,where: {find:find} //设定异步数据接口的额外参数
    
            });
    
        })


})