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
        , url: '/admin/Wbao/wbaoList' //数据接口
        , page: true //开启分页
       
        , cols: [[ //表头
            //  {type:'checkbox'}
            {field: 'id', title: 'ID', sort: true,}
            , {field: 'type', title: '方法',}
            , {field: 'uid', title: '会员',}
            , {field: 'crowds_id', title: '币的类别',}
            , {field: 'num', title: '数量',}
            , {field: 'create_time', title: '时间',}
            
			
        ]]
    });
   
        //用户搜索
        $('.search_btn').click(function () {

            var nickname= $('.searchVal').val();
    
            console.log(nickname);
    
            table.reload('list', {
    
                 url: '/admin/Wbao/wbaoList'
    
                ,where: {nickname:nickname} //设定异步数据接口的额外参数
    
            });
    
        })


})