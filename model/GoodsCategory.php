<?php

namespace app\common\model;

use think\Model;

class GoodsCategory extends Model
{
//获取下拉列表
    public function getSelectOption($parentid=0){
        $rslist = $this->where('cat_id','>',0)->order('sort_order asc')->select()->toArray();
        //$rslist = collection($rslist)->toArray();
        $categorySelectData = array();
        foreach($rslist as $row){
            $categorySelectData[$row['parent_id']][] = $row;
        }
        //echo '<pre>';
        //print_r($categorySelectData);exit;
        if(isset($categorySelectData[0])==false){ return '';}
        $this->categorySelectData = $categorySelectData;
        $html = $this->getSelectOptionHtml($categorySelectData[0],$parentid);
        //echo $html;exit;
        return $html;
    }
    //获取下拉列表
    public function getSelectOptionHtml($array,$parentid,$depth=0){
        if($depth==0){
            $prefix = '';
        }else{
            $prefix = '└─';
            $prefix .= str_repeat('──',$depth-1);
        }
        $html = '';
        foreach($array as $row){
            $html .= '<option>'.$prefix.$row['cat_name'].'</option>';
            if(isset($this->categorySelectData[$row['cat_id']])){
                $html .= $this->getSelectOptionHtml($this->categorySelectData[$row['cat_id']],$parentid,$depth+1);
            }
        }
        return $html;
    }
}
