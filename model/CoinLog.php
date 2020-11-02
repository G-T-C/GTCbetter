<?php

namespace app\common\model;

use think\Model;

class CoinLog extends Model
{
    protected $append = [
        'coin_name',
    ];
    public function getTypeAttr($value)
    {
        $status = [
            1 => lang('锁仓'), 2 => lang('提出'),3=>lang('兑换'),4=>lang('理财'),5=>lang('锁仓释放奖励'),6=>lang('锁仓制度奖励'),7=>lang('锁仓高管制度奖励'),8=>lang('理财到期返还'),9=>lang('理财释放奖励'), 10=>lang('后台增加'),11=>lang('后台减少'), 12=>lang('提币扣除'), 13=>lang('提币手续费'), 14=>lang('币种充值'), 15=>lang('币种转账'), 16=>lang('币种入账'),17=>lang('理财制度奖励'),18=>lang('理财高管制度奖励'),19=>lang('兑换GC扣除'),
        ];
        return $status[$value]; 
    }
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
}
