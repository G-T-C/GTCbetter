<?php

namespace app\common\model;

use think\Model;

class ReleaseLog extends Model
{
    public function getTypeAttr($value)
    {
        $status = [
            1 => '锁仓释放', 2 => '理财释放',
        ];
        return $status[$value];
    }

}
