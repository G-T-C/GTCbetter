<?php

namespace app\common\model;

use think\Model;

class CoinPrice extends Model
{
    protected $append = [
        'coin_name',
    ];
    public function coins()
    {
        return $this->belongsTo('Coins','coin_id','id');
    }
    public function getCoinNameAttr($value, $data)
    {
        return $this->coins->coin_name;
    }
}
