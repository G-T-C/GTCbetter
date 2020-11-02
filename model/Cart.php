<?php

namespace app\common\model;

use think\Model;

class Cart extends Model
{

    protected $autoWriteTimestamp = true;
    public function Business()
    {
        return $this->belongsTo('Business', 'shops_id', 'id');
    }
   
    public function Goods()
    {
        return $this->belongsTo('Goods', 'goods_id', 'id');
    }
    
}
