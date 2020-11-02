<?php

namespace app\common\model;

use think\Model;

class Coins extends Model
{
    public function getStatusAttr($value, $data)
    {
        $status_arr = [
            0 => '关闭',
            1 => '开启',
        ];
        return $status_arr[$data['status']];
    }
}
