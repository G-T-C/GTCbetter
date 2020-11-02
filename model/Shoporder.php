<?php

namespace app\common\model;

use think\Model;

class Shoporder extends Model
{
    /*protected $append = [
        'goodname',
        'goodimg',
        'goodprice'
    ];*/
    protected $autoWriteTimestamp = true;
    public function getStatusAttr($value)
    {
        $status = [
            1 => '待发货', 2 => '已发货', 3 => '确认收货'
        ];
        return $status[$value];
    }
    public function Goods()
    {
        return $this->belongsTo('Goods', 'goods_id', 'id');
    }
    public function getGoodnameAttr($value, $data)
    {
        if($this->Goods){
            return $this->Goods->getData('name');
        }else{
            return '';
        }

    }

    public function getGoodimgAttr($value, $data)
    {
        if($this->Goods){
            return $this->Goods->getData('img1');
        }else{
            return '';
        }
    }

    public function getGoodpriceAttr($value, $data)
    {
        if($this->Goods){
            return $this->Goods->getData('sale_price');
        }else{
            return '';
        }
    }

}
