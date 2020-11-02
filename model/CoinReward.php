<?php

namespace app\common\model;

use think\Model;

class CoinReward extends Model
{
    public function getTypeAttr($value)
    {
        $status = [
            1 => '锁仓制度奖励', 2 => '锁仓高管制度奖励',3=>'理财制度奖励',4=>'理财高管制度奖励'
        ];
        return $status[$value];
    }

    public function getFromUserAttr($value ,$data){
        $user = User::where('id', $data['from_id'])->find();
        return $user['nickname'];
    }
}
