<?php

namespace app\common\model;

use think\Model;
use app\common\model\User as userModel;
use app\common\model\Money as moneyModel;
use app\common\model\Reward as rewardModel;
use app\common\model\UserLevel as userLevelModel;

class Index extends Model
{
    /**
     * @param $userid 用户userid
     * @param $y 要查询的代数
     * @return array
     */
    public function GetParents($userid, $y)
    {
        $path = userModel::where('id',$userid)->Field('path')->find();
        $newstr = ltrim($path['path'], '0');
        $newstr = trim($newstr, ',');
        $arr = explode(',', $newstr);
        if (!empty($arr)) {
            rsort($arr);
            $mun = count($arr);
            $newarr = array();
            if ($mun > $y) {
                for ($x = 0; $x < $y; $x++) {
                    $newarr[] = $arr[$x];
                }
            } else {
                $newarr = $arr;
            }
            return $newarr;
        }
    }

    /**
     * 更新用户等级
     */
    public function CheckLevel($uid)
    {
        //查询当前用户的积分
        $integral = moneyModel::where('uid',$uid)->field('integral_num')->find();
        $old_level = userLevelModel::where('userid',$uid)->field('user_grade,uservip_grade')->find();
        //查询余额转动用户等级更新条件
        $share = rewardModel::where('group','2')->order('id asc')->select();
        $new_user_level = 0;
        foreach ($share as $k=>$v){
            if($integral['integral_num'] >= $v['tip']){
                $new_user_level = $k+1;
            }else{
                break;
            }
        }
        if($new_user_level != $old_level['user_grade']){
            //更新用户user等级
            userLevelModel::where('userid',$uid)->update(['user_grade'=>$new_user_level]);
        }
        //查询VIP奖用户等级更新条件
        $vip = rewardModel::where('group','23')->field('value')->find();
        $new_vip_level = 0;
        if($integral['integral_num'] >= $vip['value']){
            $new_vip_level = 1;
        }
        if($new_vip_level != $old_level['uservip_grade']){
            //更新用户vip等级
            userLevelModel::where('userid',$uid)->update(['uservip_grade'=>$new_vip_level]);
        }
    }
    
}
