<?php

namespace app\common\model;

use think\Model;

class IntegralLog extends Model
{
    protected $append = [
      
        'nickname',
        
    ];
    public function getNicknameAttr($value){
        if($this->User){
            return $this->User->getData('nickname');
        }else{
            return '';
        }
    }
    public function User()
    {
        return $this->belongsTo('User', 'userid', 'id');
    }

    public function getTypeAttr($value)
    {
        
        $status = [
            1=>lang('GC转动释放'),2=>lang('直推奖励释放'),3=>lang('兑换奖释放'),4=>lang('流通奖释放'),5=>lang('vip奖励'),6=>lang('注册送资产'),
            7=>lang('推荐奖励释放'),8=>lang('兑换资产增加'),9=>lang('转账获得'),10=>lang('红包释放'),11=>lang('后台充值'),12=>lang('后台扣除'),
            13=>lang('挂卖返资产'),15=>lang('向商家付款所得'),16=>lang('商家收款所得'),17=>lang('购买商品获得'),18=>lang('卖出商品获得'),
            19=>lang('申请入驻扣除'),20=>lang('入驻失败退还'),21=>lang('资产转出'),22=>lang('资产转入'),
        ];
        return $status[$value];
    }
    
}
