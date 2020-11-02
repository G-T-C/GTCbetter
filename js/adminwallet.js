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
        , url: '/admin/Recharge/walletList' //数据接口
        , page: true //开启分页
        ,limit : 40
        , cols: [[ //表头
            
            {field: 'type', title: '类型', sort: true,}
            , {field: 'userid', title: '会员id',}
            , {field: 'nickname', title: '昵称',}
            // , {field: 'gender', title: '性别', sort: true,}
            // , {field: 'head_img', title: '头像', templet: '#titleTpl',}
            // , {field: 'level', title: '等级',}
            , {field: 'money', title: '数量', sort: true,}
            , {field: 'before_wallet', title: '原有GK', sort: true,}
            , {field: 'now_wallet', title: '现有GK', sort: true,}
            
            , {field: 'create_time', title: '时间', sort: true,}
            
            // ,{title: '操作', toolbar: '#barDemo',width: 200}
        ]]
    });
       
        //用户搜索
        $('.search_btn').click(function () {

            var nickname= $('.searchVal').val();
    
            console.log(nickname);
    
            table.reload('list', {
    
                 url: '/admin/Recharge/walletList'
    
                ,where: {nickname:nickname} //设定异步数据接口的额外参数
    
            });
    
        })


})