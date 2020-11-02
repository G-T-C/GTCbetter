<?php

namespace app\common\model;

use think\Model;

class AssetsLog extends Model
{
    public function getTypeAttr($value)
    {
        $Gender = [1=>lang('个人释放'),2=>lang('团队释放')];
        return $Gender[$value];
    }


}
