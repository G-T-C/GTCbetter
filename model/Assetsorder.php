<?php

namespace app\mobile\model;

use think\Model;

class Assetsorder extends Model
{
   
   protected $pk = 'id';
   protected $autoWriteTimestamp = true;

//    public function getTypeAttr($value)
//    {
//        //别人出售 我购买 。。
//        $type = [1=>'购买',2=>'出售'];
//        return $type[$value];
//    }
public function user()
{
 return $this->belongsTo('User','userid','id');
}
public function getCidAttr($value)

   {
       //别人出售 我购买 。。
       $type = [1=>'SPpay',2=>'Bitcoin',3=>'莱特币',4=>'Ethereum',5=>'狗狗币'];
       return $type[$value];
   }
}
