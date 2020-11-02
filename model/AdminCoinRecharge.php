<?php

namespace app\common\model;

use think\Model;

class AdminCoinRecharge extends Model
{
    protected $append = [
    'coin_name',
     ];
    public function Coins()
    {
        return $this->belongsTo('Coins', 'coin_id', 'id');
    }
    public function getCoinNameAttr($value, $data)
    {
        if($this->Coins){
            return $this->Coins->getData('coin_name');
        }else{
            return '';
        }
    }
    public function getTypeAttr($value)
    {
        $status = [
            1 => '增加', 2 => '扣除',
        ];
        return $status[$value];
    }
}
