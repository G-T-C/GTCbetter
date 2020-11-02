<?php

namespace app\common\model;

use think\Model;

class InancingLog extends Model
{
    public function getTypeAttr($value)
    {

        $status = [

            1=>lang('锁仓'),
            2=>lang('提出'),
            3=>lang('兑换')

        ];
        return $status[$value];
    }
}
