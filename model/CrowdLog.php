<?php

namespace app\common\model;

use think\Model;

class CrowdLog extends Model
{
    protected $append = [
        'nickname','title'
    ];
    public function getNicknameAttr($value){
        if($this->user){
            return $this->User->getData('nickname');
        }else{
            return '';
        }
    }


    public function User()
    {
        return $this->belongsTo('User','userid','id');
    }


    public function getTitleAttr($value){
        if($this->Crowed){
            return $this->Crowed->getData('title');
        }else{
            return '';
        }
    }


    public function Crowed()
    {
        return $this->belongsTo('Crowd','crowdid','id');
    }

}
