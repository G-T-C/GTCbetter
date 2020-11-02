<?php

namespace app\common\model;

use think\Model;

class Bandcard extends Model
{
   
   public function AccountOpeningBank(){
     return $this->belongsTo('Account_opening_bank', 'open_id', 'id');
   }

}
