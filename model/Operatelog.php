<?php

namespace app\common\model;

use think\Model;

class Operatelog extends Model
{
  	protected $append = [
       'name'
    ];
    public function getNameAttr($value){
     	if($this->AdminUser){
          return $this->AdminUser->getData('name');
        }
      	else{
          	return '';
        }
      
    }
    public function AdminUser()
    {
        return $this->belongsTo('AdminUser','userid','id');
    }
      public function getTypeAttr($value)
    {
        $status = [
            1 => '后台登录',2=>'充值余额',3=>'充值积分',4=>'充值资产',5=>'审核商家通过',6=>'锁定会员',7=>'修改会员资料'
		
        ];
        return $status[$value]; 
    } 
}
