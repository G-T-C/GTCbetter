<?php

namespace app\mobile\model;

use think\Model;

class Assetsout extends Model
{
   
   protected $pk = 'id';
   
public function user()
{
 return $this->belongsTo('User','userid','id');
}
public function otheruser()
{
 return $this->belongsTo('User','otheruserid','id');
}
public function getTimeAttr($value, $data)
{
    return date('Y-m-d H:i:s',$value);

}
}
