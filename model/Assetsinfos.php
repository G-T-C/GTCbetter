<?php

namespace app\mobile\model;

use think\Model;

class Assetsinfos extends Model
{
   
   protected $pk = 'id';
   
   protected $autoWriteTimestamp = true;
  //  protected $create_time='time';
   
   public function getTypeAttr($value)
   {
       //别人出售 我购买 。。
       $type = [1=>'出售',2=>'买入'];
       return $type[$value];
   }
   //模型关联
   public function user()
   {
    return $this->belongsTo('User','otheruserid','id');
   }
   public function users()
   {
     return $this->belongsTo('User','userid','id');
   }
    
}
