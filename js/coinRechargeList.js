layui.config({
    base: "/static/admin/js/"
}).use(['form', 'layer', 'jquery', 'table', 'laydate'], function () {
    var laydate = layui.laydate;
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        $ = layui.jquery;
    laydate.render({
        elem: '#test5'
        , type: 'datetime'
    });

    /**币充值列表*/
    //第一个实例
    table.render({
        elem: '#recharge_record'
        , height: 'full-10'
        , url: '/admin/Apply/rechargeRecordList' //数据接口
        , page: true //开启分页
        ,limit: 20
        , cols: [[ //表头
            { field: 'id', title: 'ID', width: '6%' }
            , { field: 'transaction_id', title: '交易所交易id', width: '20%'}
            , { field: 'user_id', title: '用户ID', }
            , { field: 'coin_name', title: '充值币种', }
            , { field: 'number', title: '充值数量', }
            , { field: 'status_name', title: '状态', width: '10%' }
            , {field: 'create_time', title: '申请时间',  width:'15%',}
            , {field: 'update_time', title: '审核时间',  width:'15%',}
        ]]
    });


    /**提币记录列表*/
    //第二个实例
    table.render({
        elem: '#extract_record'
        , height: 'full-10'
        , url: '/admin/Apply/extractRecordlist' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'id', title: 'ID', width: '6%' }
            , { field: 'user_id', title: '用户ID', }
            , { field: 'coin_name', title: '提币币种', }
            , { field: 'number', title: '提币数量', }
            , { field: 'addr', title: '提币地址', width: '20%'}
            , { field: 'attach', title: '附属信息', width: '20%'}
            , { field: 'status_name', title: '状态', width: '10%' }
            , { field: 'create_time', title: '申请时间', width: '12%' }
            , {field: 'update_time', title: '审核时间',  width:'12%',}

        ]]
    });

    /**
     * 搜索框
     */
    $('.search_recharge').click(function () {
        var user_id = $('.searchVal').val();
        table.reload('list', {
            url: '/admin/Apply/rechargeRecordList'
            ,where: {'user_id': user_id} //设定异步数据接口的额外参数

        });
    })

    /**
     * 搜索框
     */
    $('.search_extract').click(function () {
        var user_id = $('.searchVal').val();
        table.reload('list', {
            url: '/admin/Apply/extractRecordlist'
            ,where: {'user_id': user_id} //设定异步数据接口的额外参数

        });
    })


})