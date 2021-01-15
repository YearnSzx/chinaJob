import {
  instance,
  instance2
} from '@/api/axiosFZ';
import Qs from "qs"


// 首页数据
// 分页查询
export function ftJobWanted(data) {
  // return instance.get("/foreignTeacherApply/getPageList", Qs.stringify(data) ,{ headers: { 'Content-Type': 'application/json'} })
  if (data) {
    return instance.get("/foreignTeacherApply/getPageList?page=" + data.page + "&limit=" + data.limit, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return instance.get("/foreignTeacherApply/getPageList", {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
export function ftJobWanted2(data) {
  return instance.get("/foreignTeacherApply/getPageList?" + Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function ftJobWanted3(data) {
  return instance.get("/foreignTeacherApply/getPageList?ftapId=" + data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 查询外教求职
export function ftApplyList(data) {
  if (data) {
    return instance.get("/foreignTeacherApply/getListByMySelf?ftapUserId=" + data.ftapUserId, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return instance.get("/foreignTeacherApply/getListByMySelf", {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
// 查询外教求职
// 根据id查询
export function ftApplyList2(data) {
  console.log(data)
  if (data) {
    return instance.get("/foreignTeacherApply/getList?ftapId=" + data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return instance.get("/foreignTeacherApply/getList", {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}


// 删除求职信息
export function delApplyList(data) {
  return instance.post("/foreignTeacherApply/delete", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}
// 删除招聘信息
export function delOrgList(data) {
  return instance.post("/orgRecruitment/delete", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}


// 分页查询 招聘 
export function orreRecruit(data) {
  console.log(data)
  if (data) {
    return instance.get("/orgRecruitment/getPageList?page=" + data.page + "&limit=" + data.limit, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return instance.get("/orgRecruitment/getPageList", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
// 不分页查询  招聘
export function orreRecruit2(data) {
  // return instance.get("/orgRecruitment/getList", data ,{ headers: { 'Content-Type': 'application/json'} })
  if (data) {
    return instance.get("/orgRecruitment/getList?orreId=" + data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return instance.get("/orgRecruitment/getList", {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
// /front/orgRecruitment/updateById
// 修改机构信息
export function changeOrreMsg(data) {
  return instance.post("/orgRecruitment/updateById", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function orreRecruit3(data) {
  return instance.get("/orgRecruitment/getPageList?" + Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// export function orreRecruit31(data1){ 
//   let data = Qs.stringify(data1)  
//   return instance.get("/orgRecruitment/getPageList?"+data,{ headers: { 'Content-Type': 'application/json;charset=UTF-8'} })
// }

// export function orreRecruit32(data){ 
//    // let data = Qs.stringify(data1)  
//   return instance.get("/orgRecruitment/getPageList?orreWorkType="+data.orreWorkType+
//                                                  "&orreIndustryCategory="+data.orreIndustryCategory+
//                                                  "&orreSchoolType="+data.orreSchoolType,
//                                                  { headers: { 'Content-Type': 'application/json;charset=UTF-8'} })
// }
// 不分页查询招聘 根据id
export function orreRecruit4(data) {
  if (data) {
    return instance.get("/orgRecruitment/getListByMySelf?orreUserId=" + data.orreUserId, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return instance.get("/orgRecruitment/getListByMySelf", {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}



// 新增加外教求职
export function ftApply(data) {
  return instance.post("/foreignTeacherApply/add", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}
// 查询外教信息
export function userMessageList(data) {
  return instance.get("/userInfo/getList", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 根据id查询外教信息
export function userMessageList2(data) {
  return instance.get("/userInfo/getList?userId=" + data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


// 修改信息
export function cMessage(data) {
  return instance.post("/userInfo/updateById", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}


// 查询机构职位
export function orgApplyList(data) {
  return instance.get("/orgRecruitment/getList", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}
// 新增加机构职位
export function orgApplyAdd(data) {
  return instance.post("/orgRecruitment/add", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}


// 登录
export function login(data) {
  return instance.post("/userInfo/login", Qs.stringify(data), {
    headers: {
      'Content-Type': '	application/x-www-form-urlencoded'
    }
  })
}
// 注册
export function register(data) {
  return instance.post("/userInfo/register", Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// // 修改密码
// export function changePwd(data){
//   return sendyzm.post('/userInfo/forgetAndChangePassword', Qs.stringify(data),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })
// }

// 忘记密码
export function findPassword(data) {
  return instance.post('/userInfo/forgetAndChangePassword', Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 发送验证码
export function sendyanzhengma(data) {
  return instance2.post('/sms/sendVerifyCode', Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 退出登录
export function signOut() {
  return instance.post("/userInfo/loginOut", {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 各国名字
export function getCountry() {
  return [
    {
        value: 'Afghanistan',
        lable: ' 阿富汗'
      }, {
        value: 'Aland Islands',
        lable: '奥兰群岛'
      }, {
        value: 'Albania',
        lable: ' 阿尔巴尼亚'
      }, {
        value: 'Algeria',
        lable: ' 阿尔及利亚'
      }, {
        value: 'American Samoa',
        lable: '美属萨摩亚'
      }, {
        value: 'Andorra',
        lable: ' 安道尔'
      }, {
        value: 'Angola',
        lable: ' 安哥拉'
      }, {
        value: 'Anguilla',
        lable: ' 安圭拉'
      }, {
        value: 'Antigua and Barbuda',
        lable: '安提瓜和巴布达'
      }, {
        value: 'Argentina',
        lable: ' 阿根廷'
      }, {
        value: 'Armenia',
        lable: ' 亚美尼亚'
      }, {
        value: 'Aruba',
        lable: ' 阿鲁巴'
      }, {
        value: 'Australia',
        lable: ' 澳大利亚'
      }, {
        value: 'Austria',
        lable: ' 奥地利'
      }, {
        value: 'Azerbaijan',
        lable: '阿塞拜疆'
      }, {
        value: 'Bangladesh',
        lable: '孟加拉'
      }, {
        value: 'Bahrain',
        lable: ' 巴林'
      }, {
        value: 'Bahamas',
        lable: '巴哈马'
      }, {
        value: 'Barbados',
        lable: '巴巴多斯'
      }, {
        value: 'Belarus',
        lable: '白俄罗斯'
      }, {
        value: 'Belgium',
        lable: ' 比利时'
      }, {
        value: 'Belize',
        lable: '伯利兹'
      }, {
        value: 'Benin',
        lable: ' 贝宁'
      }, {
        value: 'Bermuda',
        lable: ' 百慕大'
      }, {
        value: 'Bhutan',
        lable: ' 不丹'
      }, {
        value: 'Bolivia',
        lable: ' 玻利维亚'
      }, {
        value: 'Bosnia and Herzegovina',
        lable: '波斯尼亚和黑塞哥维那'
      }, {
        value: 'Botswana',
        lable: ' 博茨瓦纳'
      }, {
        value: 'Bouvet Island',
        lable: ' 布维岛'
      }, {
        value: 'Brazil',
        lable: '巴西'
      }, {
        value: 'Brunei',
        lable: ' 文莱'
      }, {
        value: 'Bulgaria',
        lable: '保加利亚'
      }, {
        value: 'Burkina Faso',
        lable: '布基纳法索'
      }, {
        value: 'Burundi',
        lable: ' 布隆迪'
      }, {
        value: 'Cambodia',
        lable: '柬埔寨'
      }, {
        value: ' Cameroon',
        lable: '喀麦隆'
      }, {
        value: 'Canada',
        lable: '加拿大'
      }, {
        value: 'Cape Verde',
        lable: '佛得角'
      }, {
        value: 'Central African Republic',
        lable: ' 中非'
      }, {
        value: 'Chad',
        lable: '乍得'
      }, {
        value: 'Chile',
        lable: '智利'
      }, {
        value: 'Christmas Islands',
        lable: '圣诞岛'
      }, {
        value: 'Cocos (keeling) Islands',
        lable: '科科斯（基林）群岛'
      }, {
        value: 'Colombia',
        lable: ' 哥伦比亚'
      }, {
        value: 'Comoros',
        lable: '科摩罗'
      }, {
        value: 'Congo (Congo-Kinshasa)',
        lable: '刚果（金）'
      }, {
        value: 'Congo',
        lable: '刚果'
      }, {
        value: 'Cook Islands',
        lable: '库克群岛'
      }, {
        value: 'Costa Rica',
        lable: '哥斯达黎加'
      }, {
        value: 'D\\\'Ivoire',
        lable: ' 科特迪瓦'
      }, {
        value: 'China',
        lable: '中国'
      }, {
        value: 'Croatia',
        lable: ' 克罗地亚'
      }, {
        value: 'Cuba',
        lable: '古巴'
      }, {
        value: 'Czech',
        lable: '捷克'
      }, {
        value: 'Cyprus',
        lable: '塞浦路斯'
      }, {
        value: 'Denmark',
        lable: ' 丹麦'
      }, {
        value: 'Djibouti',
        lable: ' 吉布提'
      }, {
        value: 'Dominica',
        lable: ' 多米尼加'
      }, {
        value: 'East Timor',
        lable: '东帝汶'
      }, {
        value: 'Ecuador',
        lable: '厄瓜多尔'
      }, {
        value: 'Egypt',
        lable: '埃及'
      }, {
        value: 'Equatorial Guinea',
        lable: '赤道几内亚'
      }, {
        value: 'Eritrea',
        lable: ' 厄立特里亚'
      }, {
        value: 'Estonia',
        lable: '爱沙尼亚'
      }, {
        value: 'Ethiopia',
        lable: ' 埃塞俄比亚'
      }, {
        value: 'Faroe Islands',
        lable: '法罗群岛'
      }, {
        value: 'Fiji',
        lable: ' 斐济'
      }, {
        value: 'Finland',
        lable: 'Finland,France',
        lable: '法国'
      }, {
        value: 'Franch Metropolitan',
        lable: ' 法国大都会'
      }, {
        value: 'Franch Guiana',
        lable: '法属圭亚那'
      }, {
        value: ' French Polynesia',
        lable: '法属波利尼西亚'
      }, {
        value: 'Gabon',
        lable: '加蓬'
      }, {
        value: 'Gambia',
        lable: '冈比亚'
      }, {
        value: 'Georgia',
        lable: '格鲁吉亚'
      }, {
        value: 'Germany',
        lable: ' 德国'
      }, {
        value: 'Ghana',
        lable: '加纳'
      }, {
        value: 'Gibraltar',
        lable: ' 直布罗陀'
      }, {
        value: 'Greece',
        lable: '希腊'
      }, {
        value: 'Grenada',
        lable: '格林纳达'
      }, {
        value: 'Guadeloupe',
        lable: ' 瓜德罗普岛'
      }, {
        value: 'Guam',
        lable: '关岛'
      }, {
        value: 'Guatemala',
        lable: ' 危地马拉'
      }, {
        value: 'Guernsey',
        lable: '根西岛'
      }, {
        value: 'Guinea-Bissau',
        lable: '几内亚比绍'
      }, {
        value: 'Guinea',
        lable: '几内亚'
      }, {
        value: 'Guyana',
        lable: '圭亚那'
      }, {
        value: 'Hong Kong',
        lable: '香港 （中国）'
      }, {
        value: 'Haiti',
        lable: ' 海地'
      }, {
        value: 'Honduras',
        lable: ' 洪都拉斯'
      }, {
        value: 'Hungary',
        lable: ' 匈牙利'
      }, {
        value: 'Iceland',
        lable: ' 冰岛'
      }, {
        value: 'India',
        lable: ' 印度'
      }, {
        value: 'Indonesia',
        lable: ' 印度尼西亚'
      }, {
        value: 'Iran',
        lable: ' 伊朗'
      }, {
        value: 'Iraq',
        lable: ' 伊拉克'
      }, {
        value: 'Ireland',
        lable: ' 爱尔兰'
      }, {
        value: 'Isle of Man',
        lable: ' 马恩岛'
      }, {
        value: 'Israel',
        lable: '以色列'
      }, {
        value: 'Italy',
        lable: ' 意大利'
      }, {
        value: 'Jamaica',
        lable: '牙买加'
      }, {
        value: 'Japan',
        lable: '日本'
      }, {
        value: 'Jersey',
        lable: '泽西岛'
      }, {
        value: 'Jordan',
        lable: '约旦'
      }, {
        value: 'Kazakhstan',
        lable: '哈萨克斯坦'
      }, {
        value: 'Kenya',
        lable: '肯尼亚'
      }, {
        value: 'Kiribati',
        lable: ' 基里巴斯'
      }, {
        value: ' Korea (South)',
        lable: '韩国'
      }, {
        value: 'Korea (North)',
        lable: ' 朝鲜'
      }, {
        value: 'Kuwait',
        lable: ' 科威特'
      }, {
        value: 'Kyrgyzstan',
        lable: '吉尔吉斯斯坦'
      }, {
        value: 'Laos',
        lable: '老挝'
      }, {
        value: 'Latvia',
        lable: '拉脱维亚'
      }, {
        value: 'Lebanon',
        lable: '黎巴嫩'
      }, {
        value: 'Lesotho',
        lable: ' 莱索托'
      }, {
        value: 'Liberia',
        lable: ' 利比里亚'
      }, {
        value: 'Libya',
        lable: '利比亚'
      }, {
        value: 'Liechtenstein',
        lable: ' 列支敦士登'
      }, {
        value: 'Lithuania',
        lable: ' 立陶宛'
      }, {
        value: 'Luxembourg',
        lable: ' 卢森堡'
      }, {
        value: 'Macau',
        lable: ' 澳门（中国）'
      }, {
        value: 'Macedonia',
        lable: ' 马其顿'
      }, {
        value: 'Malawi',
        lable: ' 马拉维'
      }, {
        value: 'Malaysia',
        lable: ' 马来西亚'
      }, {
        value: 'Madagascar',
        lable: '马达加斯加'
      }, {
        value: 'Maldives',
        lable: ' 马尔代夫'
      }, {
        value: 'Mali',
        lable: ' 马里'
      }, {
        value: 'Malta',
        lable: ' 马耳他'
      }, {
        value: 'Marshall Islands',
        lable: '马绍尔群岛'
      }, {
        value: 'Martinique',
        lable: ' 马提尼克岛'
      }, {
        value: 'Mauritania',
        lable: ' 毛里塔尼亚'
      }, {
        value: 'Mauritius',
        lable: ' 毛里求斯'
      }, {
        value: 'Mayotte',
        lable: ' 马约特'
      }, {
        value: 'Mexico',
        lable: ' 墨西哥'
      }, {
        value: 'Micronesia',
        lable: ' 密克罗尼西亚'
      }, {
        value: 'Moldova',
        lable: ' 摩尔多瓦'
      }, {
        value: 'Monaco',
        lable: ' 摩纳哥'
      }, {
        value: 'Mongolia',
        lable: ' 蒙古'
      }, {
        value: 'Montenegro',
        lable: ' 黑山'
      }, {
        value: 'Montserrat',
        lable: ' 蒙特塞拉特'
      }, {
        value: 'Morocco',
        lable: ' 摩洛哥'
      }, {
        value: 'Mozambique',
        lable: ' 莫桑比克'
      }, {
        value: 'Myanmar',
        lable: ' 缅甸'
      }, {
        value: ' Namibia',
        lable: ' 纳米比亚'
      }, {
        value: 'Nauru',
        lable: ' 瑙鲁'
      }, {
        value: 'Nepal',
        lable: ' 尼泊尔'
      }, {
        value: 'Netherlands',
        lable: ' 荷兰'
      }, {
        value: 'New Caledonia',
        lable: '新喀里多尼亚'
      }, {
        value: 'New Zealand',
        lable: '新西兰'
      }, {
        value: 'Nicaragua',
        lable: '尼加拉瓜'
      }, {
        value: 'Niger',
        lable: ' 尼日尔'
      }, {
        value: 'Nigeria',
        lable: ' 尼日利亚'
      }, {
        value: 'Niue',
        lable: ' 纽埃'
      }, {
        value: 'Norfolk Island',
        lable: ' 诺福克岛'
      }, {
        value: 'Norway',
        lable: ' 挪威'
      }, {
        value: 'Oman',
        lable: '阿曼'
      }, {
        value: 'Pakistan',
        lable: '巴基斯坦'
      }, {
        value: 'Palau',
        lable: '帕劳'
      }, {
        value: 'Palestine',
        lable: ' 巴勒斯坦'
      }, {
        value: 'Panama',
        lable: '巴拿马'
      }, {
        value: 'Papua New Guinea',
        lable: '巴布亚新几内亚'
      }, {
        value: 'Paraguay',
        lable: '巴拉圭'
      }, {
        value: 'Peru',
        lable: ' 秘鲁'
      }, {
        value: 'Philippines',
        lable: ' 菲律宾'
      }, {
        value: 'Pitcairn Islands',
        lable: '皮特凯恩群岛'
      }, {
        value: 'Poland',
        lable: ' 波兰'
      }, {
        value: 'Portugal',
        lable: ' 葡萄牙'
      }, {
        value: 'Puerto Rico',
        lable: '波多黎各'
      }, {
        value: 'Qatar',
        lable: ' 卡塔尔'
      }, {
        value: 'Reunion',
        lable: ' 留尼汪岛'
      }, {
        value: 'Romania',
        lable: '罗马尼亚'
      }, {
        value: 'Rwanda',
        lable: '卢旺达'
      }, {
        value: 'Russian Federation',
        lable: '俄罗斯联邦'
      }, {
        value: 'Saint Helena',
        lable: '圣赫勒拿'
      }, {
        value: 'Saint Kitts-Nevis',
        lable: '圣基茨和尼维斯'
      }, {
        value: 'Saint Lucia',
        lable: '圣卢西亚'
      }, {
        value: 'Saint Vincent and the Grenadines',
        lable: '圣文森特和格林纳丁斯'
      }, {
        value: 'El Salvador',
        lable: '萨尔瓦多'
      }, {
        value: 'Samoa',
        lable: '萨摩亚'
      }, {
        value: ' San Marino',
        lable: ' 圣马力诺'
      }, {
        value: 'Sao Tome and Principe',
        lable: '圣多美和普林西比'
      }, {
        value: 'Saudi Arabia',
        lable: '沙特阿拉伯'
      }, {
        value: 'Senegal',
        lable: '塞内加尔'
      }, {
        value: 'Seychelles',
        lable: '塞舌尔'
      }, {
        value: 'Sierra Leone',
        lable: '塞拉利昂'
      }, {
        value: 'Singapore',
        lable: '新加坡'
      }, {
        value: 'Serbia',
        lable: '塞尔维亚'
      }, {
        value: 'Slovakia',
        lable: '斯洛伐克'
      }, {
        value: 'Slovenia',
        lable: '斯洛文尼亚'
      }, {
        value: 'Solomon Islands',
        lable: '所罗门群岛'
      }, {
        value: 'Somalia',
        lable: '索马里'
      }, {
        value: 'South Africa',
        lable: ' 南非'
      }, {
        value: 'Spain',
        lable: '西班牙'
      }, {
        value: 'Sri Lanka',
        lable: '斯里兰卡'
      }, {
        value: 'Sudan',
        lable: '苏丹'
      }, {
        value: 'Suriname',
        lable: ' 苏里南'
      }, {
        value: 'Swaziland',
        lable: '斯威士兰'
      }, {
        value: 'Sweden',
        lable: '瑞典'
      }, {
        value: 'Switzerland',
        lable: ' 瑞士'
      }, {
        value: 'Syria',
        lable: '叙利亚'
      }, {
        value: 'Tajikistan',
        lable: ' 塔吉克斯坦'
      }, {
        value: 'Tanzania',
        lable: '坦桑尼亚'
      }, {
        value: 'Taiwan',
        lable: '台湾 （中国）'
      }, {
        value: 'Thailand',
        lable: ' 泰国'
      }, {
        value: 'Trinidad and Tobago',
        lable: '特立尼达和多巴哥'
      }, {
        value: 'Timor-Leste',
        lable: '东帝汶'
      }, {
        value: 'Togo',
        lable: '多哥'
      }, {
        value: 'Tokelau',
        lable: ' 托克劳'
      }, {
        value: 'Tonga',
        lable: '汤加'
      }, {
        value: 'Tunisia',
        lable: '突尼斯'
      }, {
        value: 'Turkey',
        lable: ' 土耳其'
      }, {
        value: 'Turkmenistan',
        lable: ' 土库曼斯坦'
      }, {
        value: 'Tuvalu',
        lable: '图瓦卢'
      }, {
        value: 'Uganda',
        lable: '乌干达'
      }, {
        value: 'Ukraine',
        lable: ' 乌克兰'
      }, {
        value: ' United Arab Emirates',
        lable: ' 阿拉伯联合酋长国'
      }, {
        value: 'United Kingdom',
        lable: ' 英国'
      }, {
        value: 'United States',
        lable: ' 美国'
      }, {
        value: 'Uruguay',
        lable: ' 乌拉圭'
      }, {
        value: 'Uzbekistan',
        lable: '乌兹别克斯坦'
      }, {
        value: 'Vanuatu',
        lable: ' 瓦努阿图'
      }, {
        value: 'Vatican City',
        lable: '梵蒂冈'
      }, {
        value: 'Venezuela',
        lable: '委内瑞拉'
      }, {
        value: 'Vietnam',
        lable: ' 越南'
      }, {
        value: 'Wallis and Futuna',
        lable: '瓦利斯群岛和富图纳群岛'
      }, {
        value: 'Western Sahara',
        lable: '西撒哈拉'
      }, {
        value: 'Yemen',
        lable: '也门'
      }, {
        value: 'Yugoslavia',
        lable: '南斯拉夫'
      }, {
        value: 'Zambia',
        lable: '赞比亚'
      }, {
        value: 'Zimbabwe',
        lable: ' 津巴布韦'
      }
  ]
}