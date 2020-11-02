<?php

namespace app\common\model;

use think\Model;


class CoinRecharge extends Model
{
    protected $append = [
        'coin_name',
        'status_name',
    ];

    public function user()
    {
        return $this->belongsTo('User','user_id', 'id');
    }

    public function getStatusNameAttr($value, $data)
    {
        $value_arr = [
            0=> lang('未审核'),
            1=> lang('已通过'),
            2=> lang('未通过'),
        ];

        return $value_arr[$data['status']];
    }

    public function getCoinNameAttr($value, $data)
    {
        $coin = Coins::where('id', $data['coin_id'])->find();

        if($coin){
            return $coin->coin_name;
        }else{
            return '';
        }
    }
}
