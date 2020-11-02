<?php

namespace app\common\model;

use think\Model;

class Business extends Model
{

    public function getStatusAttr($value)
    {
        $status = [
            0=>'未审核',1=>'已审核',2=>'审核失败'
        ];
        return $status[$value];
    }
}
