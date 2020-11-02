<?php

namespace app\common\model;

use think\Model;

class Profit extends Model
{
    protected $append = [
        'name',
        'interest',
        'start_purchase',
        'num'
    ];
    public function Conduct()
    {
        return $this->belongsTo('Conduct', 'conduct_id', 'id');
    }
    public function getNameAttr($value, $data)
    {
        if($this->Conduct){
            return $this->Conduct->getData('name');
        }else{
            return '';
        }

    }
    public function getInterestAttr($value, $data)
    {
        if($this->Conduct){
            return $this->Conduct->getData('interest');
        }else{
            return '';
        }
    }
    public function getStartPurchaseAttr($value, $data)
    {
        if($this->Conduct){
            return $this->Conduct->getData('start_purchase');
        }else{
            return '';
        }
    }
    public function getNumAttr($value, $data)
    {
        if($this->Conduct){
            return $this->Conduct->getData('num');
        }else{
            return '';
        }
    }

}