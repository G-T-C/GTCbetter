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
        , url: '/admin/Assetsinfos/lists' //数据接口
        , page: true //开启分页
        ,limit : 40
        , cols: [[ //表头
            //  {type:'checkbox'}
            {field: 'id', title: '订单id', sort: true,}
            , {field: 'cid', title: '交易币',}
            , {field: 'Publisher', title: '发布者',}
            , {field: 'num', title: '数量',}
            , {field: 'Clinch', title: '成交者',}
            , {field: 'dprice', title: '单价',}
            , {field: 'tprice', title: '总价',}
            , {field: 'create_time', title: '时间', sort: true,}
            
        ]]
    });
   
        //用户搜索
        $('.search_btn').click(function () {

            var find= $('.searchVal').val();
    
            table.reload('list', {
    
                 url: '/admin/Assetsinfos/list'
    
                ,where: {find:find} //设定异步数据接口的额外参数
    
            });
    
        })


})