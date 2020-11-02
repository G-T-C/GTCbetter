<?php

namespace app\mobile\model;

use think\Model;

class Coindets extends Model
{
   
   protected $pk = 'cid';
//    protected $autoWriteTimestamp = true;
   protected $autoWriteTimestamp = 'datetime';
   protected $create_time='coin_addtime';
   
//    public function getCidAttr($value)
//    {
//        $type = [1=>"VSPay",2=>"Bitcoin",3=>"莱特币",4=>"Ethereum",5=>"狗狗币"];
//        return $type[$value];
//    }
    
}
