<?php

namespace app\common\model;

use think\Model;

class CoinLocking extends Model
{
    public function getCoinNameAttr($value ,$data)
    {
        $coin = Coins::get($data['coin_id']);
        return $coin['coin_name'];
    }
}
