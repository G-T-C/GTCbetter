<?php

namespace app\common\model;

use think\Model;

class UserCoinLocal extends Model
{
    //
    public function coin(){
        return$this->belongsTo('Coins', 'coin_id', 'id');
    }

    public function getPicAttr($value, $data)
    {
        if($this->coin){
            return $this->coin->getData('img');
        }else{
            return '';
        }
//        $coin = Coins::get($data['coin_id']);
//        if($coin){
//            return $coin->img;
//        }else{
//            return '';
//        }
    }


    public function getCoinNameAttr($value, $data)
    {
        $coin = Coins::get($data['coin_id']);
        if($coin){
            return $coin->coin_name;
        }else{
            return '';
        }
    }

    /**
     * 获取用户对应币的数量
     */
    public function getAssetsAttr($value, $data)
    {
        $coin = Coins::get($data['coin_id']);
        $assets = UserCoin::where('uid', $data['user_id'])->value($coin['coin_name']);
        if($assets){
            return $assets;
        }else{
            return 0.00;
        }
    }

}
