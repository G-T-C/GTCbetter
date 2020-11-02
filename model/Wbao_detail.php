<?php

namespace app\mobile\model;

use think\Model;

class Wbao_detail extends Model
{
   
   protected $pk = 'id';
   
   protected $autoWriteTimestamp = 'create_time';
   public function getTypeAttr($value)
   {
       $type = [1=>'转出',2=>'转入',3=>'冻结'];
       return $type[$value];
   }
   public function getCrowdsIdAttr($value)
   {
      
       return 'SPpay';
   }
}
