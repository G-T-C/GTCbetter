<?php

namespace app\common\model;

use think\Model;

class WalletLog extends Model
{

    protected $autoWriteTimestamp = true;
    public function getTypeAttr($value)
    {
        $status = [
            1 => lang('转款扣除'), 2 => lang('收款增加'), 3 => lang('兑换资产扣除'), 4 => lang('红包'), 5 => lang('余额转动奖'), 6 => lang('直推奖'),
            7 => lang('兑换奖'), 8 => lang('流通奖'), 9 => lang('VIP奖'), 10 => lang('众筹花费'),
			11 => lang('后台充值'), 12 => lang('后台扣除'), 13 => lang('余额卖出'), 14 => lang('余额买入'),15=>lang('资产释放'),16=>lang('退回保证金'),
            17 =>lang('取消订单'),18=>lang('向商家付款'),19=>lang('商家收款'),20=>lang('资产发布扣除'),
			21=>lang('资产发布取消'),22=>lang('资产购买扣除'),23=>lang('资产出售余额增加'),24=>lang('罚金'),25=>lang('余额卖出返还'),26=>lang('卖出商品所得'),
            27=>lang('商品购买扣除'),28=>lang('申请入住扣除'),29=>lang('入住失败返还'),30=>lang('创建激活卡扣除'),
            33=>lang('取消商品订单'),34=>lang('兑换Only扣除'),35=>lang('USDT兑换增加'),100=>lang('每日释放')
        ];
        return $status[$value]; 
    } 
    protected $append = [

        'nickname',

    ];
    public function getNicknameAttr($value)
    {
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
}
