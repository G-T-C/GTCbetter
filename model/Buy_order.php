<?php

namespace app\common\model;

use think\Model;
use app\common\model\AccountOpeningBank;

class Buy_order extends Model
{
    protected $autoWriteTimestamp = true;
    protected $append = [
        'name',
        'user_nickname',
        'users_nickname',
        'status_name',
        'bandcard_name',
        'bandcard_cardnumber',
        'users_headimg',
        'user_headimg',

    ];
    public function bandcard()
    {
        return $this->belongsTo('Bandcard', 'band_card_id', 'id');
    }
    public function getNameAttr()
    {   if ($this->bandCard) {
           return $this->bandCard->getData('name');
        }else{
           return '';
        }
    }
    public function getBandcardNameAttr($value, $data)
    {
        if ($this->bandCard) {
            $bank = AccountOpeningBank::where('id',$this->bandCard->getData('open_id'))->field('bank_name')->find();
            return $bank['bank_name'];
        } else {
            return '';
        }
    }
    public function getBandcardCardnumberAttr($value, $data)
    {
        if ($this->bandCard) {
            return $this->bandCard->getData('cardnumber');
        } else {
            return '';
        }
    }
    public function openingbank(){
        return $this->belongsTo('Bandcard', 'band_card_id', 'id');
    }

    public static function getBuyOrderBandCardIdAttr($band_card_id)
    {
        $banner = self::with(['openingbank', 'openingbank.bank_name'])->find($band_card_id); // with 接收一个数组
        return $banner;
    }

    public function user()
    {
        return $this->belongsTo('User', 'buy_id', 'id');
    }
    public function users()
    {
        return $this->belongsTo('User', 'sell_id', 'id');
    }
    public function getUsersHeadImgAttr($value, $data)
    {
        if ($this->users) {

            if ($this->users->getData('head_img')) {
                return $this->users->getData('head_img');
            } else {
                return '/uploads/20180714/38c3a45dd52e90d17eb04afbb952e77f.png';
            }
        } else {
            return '';
        }
    }
    public function getUserHeadImgAttr($value, $data)
    {
        if ($this->user) {
            if ($this->user->getData('head_img')) {
                return $this->user->getData('head_img');
            } else {
                return '/uploads/20180714/38c3a45dd52e90d17eb04afbb952e77f.png';
            }
        } else {
            return '';
        }
    }
    public function getUsersNicknameAttr($value, $data)
    {
        if ($this->users) {
            return $this->users->getData('nickname');
        } else {
            return '';
        }
    }
    public function getUserNicknameAttr($value, $data)
    {
        if ($this->user) {
            return $this->user->getData('nickname');
        } else {
            return '';
        }
    }
    protected static $status = [
        '创建订单','买家买入但未上传凭证','买家上传凭证','交易已完成','取消订单'
        // '待交易', '创建订单', '交易已完成', '交易已取消'
    ];
    public static function getStatus()
    {
        return self::$status;
    }
    public function getStatusNameAttr($value, $data)
    {
        $arr = self::$status;
        return $arr[$data['status']];
    }




}
