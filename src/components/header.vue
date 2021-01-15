<!--  -->
<template>
  <div>
    <header :class="{active:bgShow == 1}">
      <el-row>
        <el-col :span="18" :offset="4">
          <div class="header">
            <el-row>
              <el-col :span="4">
                <div class="logo">
                  <img :src="logoImgUrl" class="logo" alt="" @click="goHome" />
                </div>
              </el-col>
                
              <el-col :span="9" :class="{headerEn:dhEN == true}">
                  <el-menu
                      :default-active="activeIndex"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                  >
                      <el-menu-item index="1">
                        <router-link to="/" v-model="headerTitle.homePage" class="routerLink">{{headerTitle.homePage}}</router-link>
                      </el-menu-item>
                      <el-menu-item index="2">
                        <router-link to="/findJob" class="routerLink">{{headerTitle.findJob}}</router-link>
                      </el-menu-item>
                      <el-menu-item index="3">
                        <router-link to="/findTeach" class="routerLink">{{headerTitle.findTeach}}</router-link>
                      </el-menu-item>
                  </el-menu>
              </el-col>
              
              <el-col :span="CNorEN()">
                  <!-- 用户操作部分 -->
                <div class="user">
                  <div>
                    <div class="changeLanguage" :class="{changeLanguage2:changeEngAndChina == 'false'}">
                      <div>
                        <span @click="Chinese">{{headerTitle.chinese}}</span>
                        <div class="CL_line"></div>
                        <span @click="English">{{headerTitle.english}}</span>
                      </div>
                    </div>
                    <div class="registerAndSignIn" :class="{registerAndSignIn2:changeEngAndChina == 'false'}" v-if="rAndSshow">
                      <div>
                        <span class="showRegister" @click="showSignIn()">{{headerTitle.login}}</span>
                        <div class="CL_line"></div>
                        <span class="showRegister" @click="showReg()">{{headerTitle.register}}</span>
                      </div>
                    </div>
                    <!-- v-if="signInSuccess" -->
                    <div class="userImgAndName" v-if="signInSuccess">
                      <div>
                        <span>{{userName}}</span>
                        <div class="userHeadImg">
                            <img :src="userImgUrl" class="headImg" alt="" @mouseover="showMessageBox" @mouseout="outMessageBox(1)" />
                            <!-- 信息设置 --> 
                        </div>
                        <div class="informationSetting" v-show="messageBox" @mouseover="showMessageBox2" @mouseout="outMessageBox2">
                          <div class="sanjiao"></div>
                          <div class="tSetting" :class="{tSetting2:changeEngAndChina == 'false'}">
                            <ul>
                              <li>
                                <router-link :to="'/'+messageBoxDataPath.userWorkPage">
                                  {{messageBoxData.userWork}}
                                  <!-- 求职 -->
                                </router-link>
                              </li>
                              <li v-if="postMsg">
                                <router-link :to="'/'+messageBoxDataPath.userReleasePage">
                                  {{messageBoxData.userRelease}}
                                </router-link>
                              </li>
                              <li>
                                <router-link :to="'/'+messageBoxDataPath.userSettingPage" @click="clearData">
                                  {{messageBoxData.userSetting}}
                                  <!-- 设置 -->
                                </router-link>
                              </li>
                              <li class="signOut">
                                <button @click="signout" :disabled="isDisable" >
                                  <!-- {{userSetting}} -->
                                  {{messageBoxData.loginOut}}
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div class="jigouSetting"></div>
                        </div>
                      </div>
                      
                    </div>

                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

    </header>
    <!-- 注册 -->
    <div class="register" v-if="regShow">
      <register @toServiceA="toServiceAgrm" @registerSuccess="rSuccess"  @closeTc="close"></register>
      <div class="registerBg" @click="showReg()"></div>
    </div>
    <!-- 登陆 -->
    <div class="signIn" v-if="singInShow">
      <signIn @toRegister="goToReg" @toPsWd="toForgotPw" @signinSuccess="signSuccess" @closeTc="close"></signIn>
      <div class="signInBg" @click="showSignIn()"></div>
    </div>
    <!-- 忘记密码 -->
    <div class="forgotPassWord" v-if="forgotPassWordShow">
      <forgotPassWord @changePwdSuccess="forgotPwIn"  @closeTc="close"></forgotPassWord>
      <div class="forgotPwBg" @click="forgotPwIn()"></div>
    </div>
    <!-- 服务协议 -->
    <div class="ServiceAgreement" v-if="ServiceAgreementShow">
      <serviceAgreement @toServiceA="toServiceAgrm"  @closeTc="close"></serviceAgreement>
      <div class="ServiceAgmBg" @click="ServiceAIn()"></div>
    </div>
  </div>
</template>

<script>
import register from './register.vue'
import signIn from './signIn.vue'
import forgotPassWord from './forgotPassWord.vue'
import serviceAgreement from './ServiceAgreement.vue'

import {ftJobWanted,orreRecruit,signOut,login,userMessageList2,ftApplyList,orreRecruit4} from '@/utils/index'  
export default {
  components:{register,signIn,forgotPassWord,serviceAgreement},
  props:['changeHeadBg','changeHeadImg'],
  data() {
    return {
      // 显示header背景与否
      bgShow:0,
      activeIndex: "1",
      logoImgUrl: "",
      // 展示注册界面
      regShow:false,
      // 展示登陆界面  
      singInShow:false,
      // 展示与否登录注册板块   
      rAndSshow:true,
      // 忘记密码
      forgotPassWordShow:false,
      ServiceAgreementShow:false,
      // 接收登陆页面传的值
      toForgotPsw:'',
      // 登陆成功
      signInSuccess:false,
      // 头像
      userImgUrl:'',
      // 用户
      userName:'',
      // 判断登陆后是教师还是机构
      show:'',
      // 弹出框
      messageBox:false,
      messageBoxData:[],
      postMsg:false,
      // 以下为点击之后弹出的页面
      messageBoxDataPath:[],
      // 是否进入弹出框
      inMessageBox:false,
      // 头部专用中英文案
      headerTitle:{
        homePage:'首页',
        findJob:'找工作',
        findTeach:'找老师',
        chinese:'中文',
        english:'English',
        login:'登录',
        register:'注册',
      },
      userid:'', //唯一标识
      // 设置一个控制中英文的数据
      changeEngAndChina:true,
      uimg:'',
      isDisable:false,
      // 英文状态下的导航
      dhEN:false
    };
  },
  methods:{
    clearData(){
      // console.log(123)
    },
    goHome(){
      if (this.$route.path != '/') {
        this.$router.push({path:'/'})
      }
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    showReg(){
      this.regShow = !this.regShow
    },
    showSignIn(){
      this.singInShow = !this.singInShow
      // console.log(this.userName)
    },
    // 忘记密码
    forgotPwIn(){
      this.forgotPassWordShow = !this.forgotPassWordShow
    },
    // 忘记密码出现
    toForgotPw(){
      this.singInShow = !this.singInShow
      this.forgotPassWordShow = !this.forgotPassWordShow
    },
    // 从登陆跳转到注册
    goToReg(){
      this.singInShow = !this.singInShow
      this.regShow = !this.regShow
    },
    ServiceAIn(){
      this.ServiceAgreementShow = !this.ServiceAgreementShow
    },
    // 服务协议出现
    toServiceAgrm(data){
      // console.log(data)
      if (data.Checked) {
        this.$message('您已同意本服务协议,3秒后将跳转至注册界面');
        setTimeout(() => {
          this.regShow = !this.regShow
          this.ServiceAgreementShow = !this.ServiceAgreementShow
        }, 2000);
      }else{
        this.regShow = !this.regShow
        this.ServiceAgreementShow = !this.ServiceAgreementShow
      }
      
    },
    // 登陆成功,头部更换
    signSuccess(data){
      this.userid = data.userid
      // console.log(data)
      sessionStorage.getItem('userHeadImg',data.userHeadImg)
      let uid = {
        ftapUserId:data.userid
      }
      // let uid = {
      //     ftapUserId:sessionStorage.getItem('userId')
      //   }
        userMessageList2(Number(sessionStorage.getItem('userId'))).then(res=>{
          // userHeadImg 头像地址
          // console.log(res)
          if (res.data.root[0].userHeadImg == 'null' || res.data.root[0].userHeadImg == null || res.data.root[0].userHeadImg == '' ) {
            this.userImgUrl = require("@/assets/logo.png");
          }else{
            this.userImgUrl = res.data.root[0].userHeadImg
          }
        })
      // if (sessionStorage.getItem('userShow') == '1') {
      //   let uid = {
      //     ftapUserId:sessionStorage.getItem('userId')
      //   }
      //   userMessageList2(Number(sessionStorage.getItem('userId'))).then(res=>{
      //     // userHeadImg 头像地址
      //     console.log(res)
      //     if (res.data.root[0].userHeadImg == 'null' || res.data.root[0].userHeadImg == null || res.data.root[0].userHeadImg == '' ) {
      //       this.userImgUrl = require("@/assets/logo.png");
      //     }else{
      //       this.userImgUrl = res.data.root[0].userHeadImg
      //     }
      //   })
      // }else{
      //   let uid = {
      //     orreUserId:Number(sessionStorage.getItem('userId'))
      //   }
      //   orreRecruit4(uid).then(res=>{
      //     console.log(res.data.root)
      //     if(res.data.root&&res.data.root.length>0){
      //       let obj = res.data.root[0]
      //       if(obj.orreLogo!==null&&obj.orreLogo!==''&&obj!==''){
      //         this.userImgUrl =obj.orreLogo
      //         console.log(obj)
      //       }else{
      //         this.userImgUrl = require("@/assets/logo.png");
      //       }
      //     }else{
      //       this.userImgUrl = require("@/assets/logo22.png");
      //     }
      //   })
      // }

      sessionStorage.setItem('userId',data.userid)
      this.userName = data.name
      this.show = Number(sessionStorage.getItem("userShow"))
      // console.log(sessionStorage.getItem("changeChinese"))
      if (this.show == 1 ) {
        this.postMsg = false
        if (sessionStorage.getItem("changeChinese")=='false') {
          this.messageBoxData = {
            userWork:'Job details',
            userRelease : 'Post job',
            userSetting : 'Settings',
            loginOut : 'OutLogin'
          }
        }else{
          this.messageBoxData = {
            userWork:'求职',
            userRelease : '发布求职',
            userSetting : '设置',
            loginOut : '退出登录'
          }
        }
        this.messageBoxDataPath = {
          userWorkPage : 'userWork',
          userReleasePage : 'userRelease',
          userSettingPage : 'userSetting'
        }
      }else{
        this.postMsg = true
        if (sessionStorage.getItem("changeChinese")=='false') {
          this.messageBoxData = {
            userWork:'Job details',
            userRelease : 'Recruit',
            userSetting : 'Settings',
            loginOut : 'OutLogin'
          }
        }else{
          this.messageBoxData = {
            userWork:'职位',
            userRelease : '发布招聘',
            userSetting : '设置',
            loginOut : '退出登录'
          }
        }
        this.messageBoxDataPath = {
          userWorkPage : 'JgUserWork',
          userReleasePage : 'JgUserRelease',
          userSettingPage : 'userSetting'
        }
      }
      this.singInShow = !this.singInShow 
      // 登陆注册隐藏
      this.rAndSshow = !this.rAndSshow
      // 用户出现
      this.signInSuccess = !this.signInSuccess
    },
    // 注册成功
    rSuccess(){
      this.regShow = false
      this.singInShow = true
    },
    signout:function(){
      this.isDisable = true
      setTimeout(() => {
      this.isDisable = false
      }, 1000)
      signOut().then((res)=>{
        // console.log(res.data.success)
        this.userImgUrl = ''  //清空照片
        if (res.data.success) {
          this.activeIndex = '1'
          // console.log(this.activeIndex)
          sessionStorage.setItem('userName','')
          // 登陆注册出现
          this.rAndSshow = !this.rAndSshow
          // 用户隐藏
          this.signInSuccess = !this.signInSuccess
          if (this.$route.path != '/') {
            this.$router.push({path:'/'})
          }
          // 改变头部颜色
          this.bgShow = 0
          this.$notify({
            title: '退出',
            message: '退出成功',
            type: 'success'
          });
          // 退出登录以后弹出框消失
          this.inMessageBox = false
          this.messageBox = false

          // 清除数据
          // localStorage.clear();
          sessionStorage.clear()
          // console.log(this.changeEngAndChina)
          sessionStorage.setItem('changeChinese',this.changeEngAndChina)
          sessionStorage.setItem('userHeadImg','')
        }
        
      })
    },
    showMessageBox2:function(){
      this.inMessageBox = true;
      this.messageBox = true
    },
    outMessageBox2:function(){
      this.inMessageBox = false
      this.messageBox = false
    },
    showMessageBox:function(){
      this.messageBox = true
    },
    outMessageBox:function(val){
      if (val == 1) {
        // console.log(this.inMessageBox)
        setTimeout(() => {
          if (this.inMessageBox == false) {
            // console.log('消失')
            this.messageBox = false
          }else{
            // console.log('出现')
            this.messageBox = true
          }
        }, 500);
      }
      
    },

    // 转换为中文
    Chinese:function(){
      sessionStorage.setItem('changeChinese',true)
      // console.log('切换为中文'+sessionStorage.getItem('changeChinese'))
      this.changeEngAndChina = sessionStorage.getItem('changeChinese')
      this.$emit("changeLanguage", this.changeEngAndChina)
    },
    English:function(){
      sessionStorage.setItem('changeChinese',false)
      // console.log('切换为英文'+sessionStorage.getItem('changeChinese'))
      this.changeEngAndChina = sessionStorage.getItem('changeChinese')
      this.$emit("changeLanguage", this.changeEngAndChina)
    },
    updateData:function(){
      this.changeEngAndChina = sessionStorage.getItem('changeChinese')
    },
    CNorEN:function(){
      if (sessionStorage.getItem("changeChinese")=='false') {
        return 10
      }else{
        return 8
      }
    },
    close:function(){
      this.regShow=false,
      this.singInShow=false
      this.forgotPassWordShow=false
      this.ServiceAgreementShow=false
    },

  },
  // created 初始化页面的时候监听本地有没有数据
  created() {
    if(sessionStorage.getItem('bgshow')){
      this.bgShow = 1
    }
    let urlTemp = "assets/chinajoblogo2.png";
    this.logoImgUrl = require("@/" + urlTemp);
    let uid = {
      ftapUserId:sessionStorage.getItem('userId')
    }
    userMessageList2(Number(sessionStorage.getItem('userId'))).then(res=>{
      // userHeadImg 头像地址
      // console.log(res)
      if (res.data.root != '' && res.data.root != []) {
        if (res.data.root[0].userHeadImg == 'null' || res.data.root[0].userHeadImg == null || res.data.root[0].userHeadImg == '' ) {
          this.userImgUrl = require("@/assets/logo.png");
        }else{
          this.userImgUrl = res.data.root[0].userHeadImg
        }
      }
    })
    // if (sessionStorage.getItem('userShow') == '1') {
    //   let uid = {
    //     ftapUserId:sessionStorage.getItem('userId')
    //   }
    //   userMessageList2(Number(sessionStorage.getItem('userId'))).then(res=>{
    //     // userHeadImg 头像地址
    //     console.log(res)
        
    //     if (res.data.root[0].userHeadImg == 'null' || res.data.root[0].userHeadImg == null || res.data.root[0].userHeadImg == '' ) {
    //       this.userImgUrl = require("@/assets/logo.png");
    //     }else{
    //       this.userImgUrl = res.data.root[0].userHeadImg
    //     }
        
    //   })
    // }else{
    //   let uid = {
    //     orreUserId:Number(sessionStorage.getItem('userId'))
    //   }
    //   orreRecruit4(uid).then(res=>{
    //     console.log(res.data.root)
    //     // if (res.data.root == []) {
    //     //   this.userImgUrl = require("@/assets/logo22.png");
    //     // }else{
    //     //   if (res.data.root[0].orreLogo == 'null' || res.data.root[0].orreLogo == null || res.data.root[0].orreLogo == '' ) {
    //     //     this.userImgUrl = require("@/assets/logo.png");
    //     //   }else{
    //     //     this.userImgUrl = res.data.root[0].orreLogo
    //     //   }
    //     // }
    //     if(res.data.root&&res.data.root.length>0){
    //       let obj = res.data.root[0]
    //       if(obj.orreLogo!==null&&obj.orreLogo!==''&&obj!==''){
    //         this.userImgUrl =obj.orreLogo
    //         console.log(obj)
    //       }else{
    //         this.userImgUrl = require("@/assets/logo.png");
    //       }
    //     }else{
    //       this.userImgUrl = require("@/assets/logo22.png");
    //     }
        
    //   })
    // }
    

    let userName = sessionStorage.getItem('userName')
    let userShow = sessionStorage.getItem('userShow')
    if(userName && userShow){
      // 登陆注册隐藏
      this.rAndSshow = !this.rAndSshow
      // 用户出现
      this.signInSuccess = !this.signInSuccess
      this.userName = userName
      this.show = userShow
      
      if (this.show == 1) {
        this.postMsg = false
        if (sessionStorage.getItem("changeChinese")=='false') {
          this.messageBoxData = {
            userWork:'Job details',
            userRelease : 'Post job',
            userSetting : 'Settings',
            loginOut : 'OutLogin'
          }
        }else{
          this.messageBoxData = {
            userWork:'求职',
            userRelease : '发布求职',
            userSetting : '设置',
            loginOut : '退出登录'
          }
        }
        this.messageBoxDataPath = {
          userWorkPage : 'userWork',
          userReleasePage : 'userRelease',
          userSettingPage : 'userSetting'
        }
        
      }else{
        if (sessionStorage.getItem('changeChinese')=='false') {
          this.postMsg = true
          this.messageBoxData = {
            userWork:'Job details',
            userRelease : 'Recruit',
            userSetting : 'Settings',
            loginOut : 'OutLogin'
          }
        }else{
          this.messageBoxData = {
            userWork:'职位',
            userRelease : '发布职位',
            userSetting : '设置',
            loginOut : '退出登录'
          }
        }

        this.messageBoxDataPath = {
          userWorkPage : 'JgUserWork',
          userReleasePage : 'JgUserRelease',
          userSettingPage : 'userSetting'
        }
      }
    }
    this.changeEngAndChina = sessionStorage.getItem('changeChinese')
    // 监测中英文切换
    if (sessionStorage.getItem('changeChinese')=='false') {
      this.dhEN = true
      this.headerTitle = {
        homePage:'Home',
        findJob:'Jobs',
        findTeach:'Teachers',
        chinese:'Chinese',
        english:'English',
        login:'Login',
        register:'Rigister',
      }
    }else{
      this.dhEN = false
      this.headerTitle = {
        homePage:'首页',
        findJob:'找工作',
        findTeach:'找老师',
        chinese:'中文',
        english:'English',
        login:'登录',
        register:'注册',
      }
    }
    
  },
  mounted(){
    
  },
  watch:{
    changeEngAndChina :{
        handler(newName, oldName) {
            // console.log(newName,oldName) 
            if (newName == 'false') {
              this.dhEN = true
              let headerText = {
                  homePage:'Home',
                  findJob:'Jobs',
                  findTeach:'Teachers',
                  chinese:'Chinese',
                  english:'English',
                  login:'Login',
                  register:'Rigister',
                }
                this.headerTitle = headerText
                if (this.show == 1) {
                  this.postMsg = false
                  this.messageBoxData = {
                    userWork:'Job details',
                    userRelease : 'Post job',
                    userSetting : 'Settings',
                    loginOut : 'OutLogin'
                  }
                  
                  this.messageBoxDataPath = {
                    userWorkPage : 'userWork',
                    userReleasePage : 'userRelease',
                    userSettingPage : 'userSetting'
                  }
                }else{
                  this.postMsg = true
                  this.messageBoxData = {
                    userWork:'Job details',
                    userRelease : 'Recruit',
                    userSetting : 'Settings',
                    loginOut : 'OutLogin'
                  }

                  this.messageBoxDataPath = {
                    userWorkPage : 'JgUserWork',
                    userReleasePage : 'JgUserRelease',
                    userSettingPage : 'userSetting'
                  }
                }
            }else{
              this.dhEN = false
              let headerText = {
                  homePage:'首页',
                  findJob:'找工作',
                  findTeach:'找老师',
                  chinese:'中文',
                  english:'English',
                  login:'登录',
                  register:'注册',
                }
                this.headerTitle = headerText

                if (this.show == 1) {
                    this.postMsg = false
                    this.messageBoxData = {
                      userWork:'求职',
                      userRelease : '发布求职',
                      userSetting : '设置',
                      loginOut : '退出登录'
                    }
                    
                    this.messageBoxDataPath = {
                      userWorkPage : 'userWork',
                      userReleasePage : 'userRelease',
                      userSettingPage : 'userSetting'
                    }

                }else{
                    this.postMsg = true
                    this.messageBoxData = {
                      userWork:'职位',
                      userRelease : '发布职位',
                      userSetting : '设置',
                      loginOut : '退出登录'
                    }
                    this.messageBoxDataPath = {
                      userWorkPage : 'JgUserWork',
                      userReleasePage : 'JgUserRelease',
                      userSettingPage : 'userSetting'
                    }
                }
            }
        },
      },
    changeHeadBg:{
      handler(newNum, oldNum) {
        // console.log(newNum,oldNum)
        if (newNum == 1) {
          // console.log(newNum,oldNum+'top')
          this.bgShow = Number(newNum)
        }else{
          // console.log(newNum,oldNum+'bot')
          this.bgShow = Number(newNum)
        }
      }
    },
    changeHeadImg:{
      handler(newImg,oldImg){
        this.userImgUrl = this.changeHeadImg.userHeadImg
        this.userName = this.changeHeadImg.userRealName
        // console.log(newImg,oldImg)
        // console.log(this.changeHeadImg)
        if (newImg.userHeadImg == null || newImg.userHeadImg == 'null' || newImg.userHeadImg == undefined || newImg.userHeadImg == 'undefined') {
          this.userImgUrl = require("@/assets/logo.png");
        }
        if (!newImg.userRealName) {
          this.userName = sessionStorage.getItem("userName")
        }
      }
    },
    uimg:{
      handler(newL,oldL){
        // console.log('本地储存现在的地址是:'+newL)
        // console.log('本地储存之前的地址是:'+oldL)
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family:PingFangSC-Regular;
  src: url('../assets/PingFangSCRegular.ttf');
}
.active{
  background: #060606;
  position:static;
}
header {
  width: 100%;
  position: absolute;
  z-index: 99;
}
.header {
  padding: 30px 0;
  padding-left: 45px;
  padding-bottom: 50px;
}
.header > div {
  width: 100%;
  font-size: 0;
}
.header > div > div {
  vertical-align: middle;
  display: inline-block;
}
.header > div > div:nth-child(2){
  text-align: end;
}
.selectPage {
  margin-left: 16.2%;
}
.selectPage > div > a {
  color: white;
  line-height: 60px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
}
.selectPage > div {
  display: inline-block;
}
.selectPage > div:first-child {
  /* border-bottom: 4px solid white; */
}
.fjob {
  margin-left: 168px;
  margin-right: 164px;
}
.logo {
  /* width: 100%; */
  max-width: 170px;
  cursor: pointer;
}
.changeLanguage {
  font-size: 18px;
  color: white;
  display: inline-block;
  margin-right: 13%;
  /* vertical-align: middle; */
}
.changeLanguage>div>span{
  cursor: pointer;
}

.registerAndSignIn {
  font-size: 18px;
  color: white;
  display: inline-block;
  /* vertical-align: middle; */
}
.registerAndSignIn>div>span{
    cursor: pointer;
}
.changeLanguage2>div>div,.registerAndSignIn2>div>div{
  margin: 0 5px;
  height: 16px;
}
.CL_line {
  width: 2px;
  height: 18px;
  background: white;
  display: inline-block;
  margin: 0 7px;
}
.changeLanguage>div>span,.changeLanguage>div>div{
  /* vertical-align: middle; */
  font-family: PingFangSC-Regular;
}
.user{
  text-align: right;
}
/* .user>div{
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

/* 以下是登陆成功之后的 */
.userImgAndName {
  font-size: 18px;
  color: white;
  display: inline-block;
  /* vertical-align: middle; */
  position: relative;
}
.userImgAndName>div>span{
  cursor: pointer;
  /* vertical-align: middle; */
}
.userImgAndName>div>div{
  vertical-align: middle;
}
.userHeadImg{    
    width: 48px;
    height: 48px;
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
}
.userHeadImg>img{
    font-size: 0;
    width: 100%;
}

/* 设置模块 */
.informationSetting{
  position: absolute;
  top: 85px;
  right: -38px;
  width: 124px;
  z-index: 10;
}
.tSetting{
  background: white;
}
.tSetting>ul{
  padding-top: 3px;
  padding-bottom: 6px;
}
.tSetting>ul>li{
  /* padding-bottom: 18px; */
  padding: 9px 22px;
  background: white;
  color:#717171;
  text-align: center;
}
.tSetting2>ul>li:first-child{
  padding: 18px 20px;
}
.tSetting>ul>li:hover{
  background: #E9E9E9;
}
.tSetting>ul>li>a{
  color: #717171;
  font-size: 18px;
}
.tSetting>ul>li>p{
  color: #717171;
  font-size: 20px;
  cursor: pointer;
}
.sanjiao{
  margin: 0 auto;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 20px solid white;
}

/* element */
.el-menu {
  background: none;
  position: static;
  display: inline-block;
  vertical-align: middle;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.el-menu-item {
  font-size: 22px;
  color: white;
  margin-right:52px;
  letter-spacing: 200;
  padding: 0;
  line-height: inherit;
  height: 38px;
}
.el-menu-item:last-child{
  margin-right: 0;
}

.el-main {
  padding: 0;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: white;
  border-bottom: 4px solid white;
}
.el-menu>.el-menu-item:hover{
  background: none;
}

/* 特殊 */
.registerBg{
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0.4;
}
.signInBg{
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0.4;
}
.forgotPwBg{
  background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0.4;
}
.ServiceAgmBg{
  background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0.4;
}
.signIn{
    font-size: 0;
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus{
  background: none;
}
.routerLink {
  /* line-height: 56px; */
  /* display: inline-block; */
  padding-bottom: 15px;
  letter-spacing: 3px;
  font-family: PingFangSC-Regular;
}
.headerEn>ul>li>a{
  letter-spacing: 0;
}
.signOut>button{
  font-size: 18px;
  border: none;
  background: none;
  color: #717171;
  cursor: pointer;
  outline: none;
}
[class*=el-col-]{
    float: none;
}
</style>
