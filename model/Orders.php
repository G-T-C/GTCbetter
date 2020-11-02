<?php

namespace app\common\model;

use think\Model;

class Orders extends Model
{

    protected $append = [
        'goods_name',
        'nickname',
    ];
    //关联商品表
    public function goods()
    {
        return $this->belongsTo('Goods','goods_id','id');
    }
    //关联用户表
    public function user()
    {
        return $this->belongsTo('User','user_id','id');
    }

    public function getGoodsNameAttr($value, $data)
    {
        return $this->goods->goods_name;
    }

    public function getNicknameAttr($value, $data)
    {
        return $this->user->nickname;
    }
}
