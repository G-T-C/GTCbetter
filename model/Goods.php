<?php

namespace app\common\model;

use think\Model;

class Goods extends Model
{
    protected $append = [
        'business_name',

    ];
    protected $autoWriteTimestamp = true;
    public function getIsOnAttr($value)
    {
        $status = [
            1 => '是', 0 => '否'
        ];
        return $status[$value];
    }
    public function Business()
    {
        return $this->belongsTo('Business', 'bis_id', 'id');
    }
    public function getBusinessNameAttr($value, $data)
    {
        if($this->Business){
            return $this->Business->getData('name');
        }else{
            return '';
        }

    }
}
