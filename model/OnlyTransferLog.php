<?php

namespace app\common\model;

use think\Model;

class OnlyTransferLog extends Model
{
	protected $append = [
		'coin_name',
	];
    //
    public function getCoinNameAttr($value, $data)
    {
    	$coins = Coins::where('id', $data['coin_id'])->find();

    	if($coins)
    	{
    		return $coins['coin_name'];
    	}else{
    		return '';
    	}
    }
}
