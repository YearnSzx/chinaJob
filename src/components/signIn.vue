<template>
  <div>
      <div class="signIn">
          <div class="leftImg">
              <img :src="logoImgUrl" alt="">
          </div>
          <div class="rightContent">
            <div class="form" :class="{form2:changeCNorEN2 == 'false'}">
                <div class="choise">
                    <span :class="{active:show == 1}" @click="teachShow()">{{inpData.forTeach}}</span>
                    <span :class="{active:show == 2}" @click="jigouShow()">{{inpData.forJigou}}</span>
                </div>
                <!-- 外教登录 -->
                <div class="teachSignIn" v-if="teach">
                    <div>
                        <i class="iconUser"></i>
                        <input type="text" name="teachUsername" v-model="userName" :placeholder="inpData.phoneNumber">
                    </div>
                    <div>
                        <i class="iconPw"></i>
                        <input type="password" name="teachPassword" id="password" v-model="passWord" :placeholder="inpData.passWord">
                    </div>
                </div>
                <!-- 机构登录 -->
                <div class="jigouSignIn" v-if="jigou">
                    <div>
                        <i class="iconUser"></i>
                        <input type="text" name="jigouUsername" v-model="userName" :placeholder="inpData.phoneNumber">
                    </div>
                    <div>
                        <i class="iconPw"></i>
                        <input type="password" name="jigouPassword" v-model="passWord" :placeholder="inpData.passWord" >
                    </div>
                </div>
                <!-- 记住账户忘记密码 -->
                <div class="rememberForget">
                    <div class="rememberUser">
                        <el-checkbox v-model="checked" size="medium">{{inpData.rememberMe}}</el-checkbox>
                    </div>

                </div>

                <!-- 登录按钮 -->
                <div class="signInButton">
                    <button @click="submit()">{{inpData.login}}</button>
                    <div class="forgetPassword" @click="toForgotPw">
                        <p>{{inpData.forgetPwd}}</p>
                    </div>
                    <p @click="toRegister">{{inpData.register}}</p>
                </div>
            </div>
            <div class="close">
                <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import {login,login2,signOut,userMessageList,ftApplyList,orreRecruit4} from '@/utils/index'

export default {
  data () {
    return {
        show:1,  // 1 外教登陆样式  2 机构登录样式
        userName:'',// 用户名
        passWord:'',// 密码
        userId:'',  //唯一标识
        logoImgUrl:'',// logo地址
        teach:true, // 默认外教登录
        jigou:false, // 机构登录与否
        checked: false,   // 记住账户
        signInSuccess:true,
        blueInput:false,
        inpData:{
            forTeach:'外教登录',
            forJigou:'机构登录',
            phoneNumber:'请输入手机号',
            passWord:'请输入密码',
            rememberMe:'记住我的账户',
            forgetPwd:'忘记密码',
            login:'登录',
            register:'免费注册'
        },
        changeCNorEN2:''
    }
  },
  methods:{
      teachShow:function(){
          this.show = 1;
          this.teach = true;
          this.jigou = false
      },
      jigouShow:function(){
          this.show = 2;
          this.teach = false;
          this.jigou = true
      },
      submit:function(){
        let _this = this
        // console.log(this.userName)
        let userMessage = {
            account:_this.userName,
            password:_this.passWord
        }
        login(userMessage).then((res)=>{
            // console.log(res)
            if (this.checked) {
                localStorage.setItem('uName',this.userName)
                localStorage.setItem('uPassw',this.passWord)
            }
            if (this.show == 1) {
                if(res.data.success){
                    // console.log('接口通，外教登录登陆')
                    if (res.data.root[0].userRoleId == 3) {
                        // console.log(res.data.root[0].userId)
                        sessionStorage.setItem('userId',res.data.root[0].userId)
                        if (sessionStorage.getItem('changeChinese') == 'false') {
                            this.$message({
                                message:'Successful login',
                                type:'success'
                            });
                        }else{
                            this.$message({
                                message:'登陆成功',
                                type:'success'
                            });
                        }
                        let fid = {
                            ftapUserId:res.data.root[0].userId
                        }
                        ftApplyList(fid).then((res2)=>{
                            // console.log(res2)
                            if (res2.data.root!=''&&res2.data.root!=[]&&res2.data.root) {
                                let data = {
                                    name : res2.data.root[0].ftapTeacherName,
                                    show : _this.show,
                                    userid : _this.userId,
                                }
                                sessionStorage.setItem("userName", res2.data.root[0].ftapTeacherName)

                                // console.log(data)
                                this.$emit('signinSuccess',data)
                            }else{
                                let data = {
                                    name : _this.userName,
                                    show : _this.show,
                                    userid : _this.userId,
                                }
                                this.$router.push({name:'UserRelease'})
                                this.$emit('signinSuccess',data)
                                sessionStorage.setItem("userName", _this.userName)
                            }
                            
                        })
                        let uId = res.data.root[0].userId
                        this.userId = uId
                        sessionStorage.setItem("userShow", _this.show)
                        
                    }else{
                        if (sessionStorage.getItem('changeChinese') == 'false') {
                            this.$message('This is the organization account. Please change the login channel');
                            signOut().then(res=>{
                                // this.$router.push({path:'/'})
                            })
                        }else{
                            this.$message('这是机构账号，请更换登陆通道');
                            signOut().then(res=>{
                                // this.$router.push({path:'/'})
                            })
                        }
                    }
                }else{
                    if (sessionStorage.getItem('changeChinese') == 'false') {
                        this.$notify({
                            title: 'Foreign teacher login failed',
                            message: 'login failed',
                            type: 'faild'
                        });
                    }else{
                        this.$notify({
                            title: '外教登录失败',
                            message: '登陆失败',
                            type: 'faild'
                        });
                    }
                    
                    this.$message(res.data.failReason);
                }
            }else if(this.show == 2){
                if(res.data.success){
                    // console.log('接口通，机构登录登陆')
                    if (res.data.root[0].userRoleId == 4) {
                        sessionStorage.setItem('userId',res.data.root[0].userId)
                        if (sessionStorage.getItem('changeChinese') == 'false') {
                            this.$message({
                                message:'Successful login',
                                type:'success'
                            });
                        }else{
                            this.$message({
                                message:'登陆成功',
                                type:'success'
                            });
                        }
                        let uId = res.data.root[0].userId
                        let fid = {
                            orreUserId:res.data.root[0].userId
                        }
                        // console.log(fid)
                        orreRecruit4(fid).then((res2)=>{
                            // console.log(res2)
                            let leng = res2.data.root.length -1
                            // if (res2.data.root == '') {
                            //     this.$router.push({name:'JgUserRelease'})
                            // }
                            // let data = {
                            //     name :res2.data.root[leng].orreOrgNameEn,
                            //     show : _this.show,
                            //     userid : _this.userId,
                            // }
                            // this.$emit('signinSuccess',data)
                            // sessionStorage.setItem("userName2", res2.data.root[leng].orreOrgNameEn)

                            if (res2.data.root!=''&&res2.data.root!=[]&&res2.data.root) {
                                let data = {
                                    name : res2.data.root[leng].orreOrgNameEn,
                                    show : _this.show,
                                    userid : _this.userId,
                                }
                                sessionStorage.setItem("userName", res2.data.root[leng].orreOrgNameEn)

                                // console.log(data)
                                this.$emit('signinSuccess',data)
                            }else{
                                let data = {
                                    name : _this.userName,
                                    show : _this.show,
                                    userid : _this.userId,
                                }
                                this.$router.push({name:'JgUserRelease'})
                                this.$emit('signinSuccess',data)
                                sessionStorage.setItem("userName", _this.userName)
                            }
                        })
                        this.userId = uId
                        sessionStorage.setItem("userName", _this.userName)
                        sessionStorage.setItem("userShow", _this.show)
                        
                    }else{
                        if (sessionStorage.getItem('changeChinese') == 'false') {
                            this.$message('This is the foreign teacher account. Please change the login channel');

                            signOut().then(res=>{
                                // this.$router.push({path:'/'})
                            })
                        }else{
                            this.$message('这是外教账号，请更换登陆通道');
                            signOut().then(res=>{
                                // this.$router.push({path:'/'})
                            })
                        }
                        signOut().then(res=>{
                            // this.$router.push({path:'/'})
                        })
                    }
                }else{
                    if (sessionStorage.getItem('changeChinese') == 'false') {
                        this.$notify({
                            title: 'Institution login failed',
                            message: 'login failed',
                            type: 'faild'
                        });
                    }else{
                        this.$notify({
                            title: '机构登录失败',
                            message: '登陆失败',
                            type: 'faild'
                        });
                    }
                    
                    this.$message(res.data.failReason);
                }
            }
            
        })
      },
      toForgotPw:function(){
          this.$emit('toPsWd')
      },
      toRegister:function(){
          this.$emit('toRegister')
      },
      close:function(){
          this.$emit('closeTc')
      }
  },
  created() {
    let urlTemp = "assets/弹窗底.png";
    this.logoImgUrl = require("@/" + urlTemp);

    // 检测是否点击记住
    if (localStorage.getItem('uName') && localStorage.getItem('uPassw')) {
      let userMessage = {
        account:localStorage.getItem('uName'),
        password:localStorage.getItem('uPassw')
      }
      this.userName = localStorage.getItem('uName')
      this.passWord = localStorage.getItem('uPassw')
      this.show = localStorage.getItem('uShow')
      this.checked = Boolean(localStorage.getItem('uChecked'))
    }

    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动

    if(sessionStorage.getItem('changeChinese') == 'false'){
        this.inpData={
            forTeach:'For English Teacher',
            forJigou:'For Company',
            phoneNumber:'Phone Number',
            passWord:'PassWord',
            rememberMe:'Remember Me',
            forgetPwd:'Forget Password',
            login:'Login',
            register:'Register for free'
        }
    }else{
        this.inpData={
            forTeach:'外教登录',
            forJigou:'机构登录',
            phoneNumber:'请输入手机号',
            passWord:'请输入密码',
            rememberMe:'记住我的账户',
            forgetPwd:'忘记密码',
            login:'登录',
            register:'免费注册'
        }
    }
  },
  mounted(){
      
  },
  watch:{
      checked :{
        handler(newName, oldName) {
            if (newName == true) {
                localStorage.setItem('uName',this.userName)
                localStorage.setItem('uPassw',this.passWord)
                localStorage.setItem('uShow',this.show)
                localStorage.setItem('uChecked',this.checked)
            }else{
                localStorage.clear()
            }
        },
      }
  }
}

</script>

<style scoped>
.signIn{
    width: 850px;
    height: 470px;
    z-index: 100;
    background: white;
    position: absolute;
    top: 303px;
    border-radius: 30px;
    left: calc(50% - 440px);
    font-size: 0;
}
.signIn>div{
    width: 50%;
    display: inline-block;
    vertical-align: top;
}
.form{
    text-align: center;
    padding: 0 50px;
    padding-left: 0;
    padding-top: 55px;
}
.choise{
    margin-bottom: 42px;
}
.choise>span{
    /* width: 47%; */
    padding: 9px 46px;
    font-size: 20px;
    display: inline-block;
    color: #B1B1B1;
    border: 1px solid #B1B1B1;
    box-sizing: border-box;
    cursor: pointer;
}
.choise>span:first-child{
    margin-right: 25px;
}


.teachSignIn>div>input{
    width: 100%;
    height: 48px;
    margin-bottom: 17px;
    padding-left: 45px;
    box-sizing: border-box;
    font-size: 20px;
}
.jigouSignIn>div>input{
    width: 100%;
    height: 48px;
    margin-bottom: 17px;
    padding-left: 45px;
    box-sizing: border-box;
    font-size: 20px;
}
.active{
    color: #003AB8!important;
    border: 2px solid #003AB8!important;
}
.jigouSignIn>div,.teachSignIn>div{
    position: relative;
}
.iconUser{
    position: absolute;left: 0;z-index:5;
    background-image: url('../assets/手机.png'); /*引入图片图片*/
    background-repeat: no-repeat; /*设置图片不重复*/
    background-position: -20px -20px; /*图片显示的位置*/
    width: 45px; /*设置图片显示的宽*/
    height: 48px; /*图片显示的高*/
}
.iconPw{
    position: absolute;left: 0;z-index:5;
    background-image: url('../assets/密码.png'); /*引入图片图片*/
    background-repeat: no-repeat; /*设置图片不重复*/
    background-position: -22px -22px; /*图片显示的位置*/
    width: 45px; /*设置图片显示的宽*/
    height: 48px; /*图片显示的高*/
}
.rememberForget{
    text-align: left;
}
.rememberForget>div{
    display: inline-block;
}
.rememberForget>div:first-child{
    margin-right: 196px;
}
.forgetPassword{
    font-size: 18px;
    display: inline-block;
}
.forgetPassword>p{
    cursor: pointer;
    color: #003AB8;
    font-weight: bold;
}
.signInButton{
    width: 100%;
    margin-top: 55px;
    box-sizing: border-box;
    text-align: right;
}
.signInButton>button{
    width: 100%;
    height: 48px;
    font-size: 24px;
    color: white;
    background: #003AB8;
    font-weight: normal;
    letter-spacing: 15px;
    cursor: pointer;
}
.signInButton>p{
    font-size: 18px;
    color: #003AB8;
    font-weight: bold;
    text-align: right;
    padding-top: 9px;
    display: inline-block;
    margin-left: 30px;
    cursor: pointer;
}
.blueBorder{
    outline: 1px solid #003AB8;
}

/* 改变语言之后的css */
.form2>.choise>span{
    font-size: 16px;
    padding: 16px 10px;
}
.form2>.choise>span:last-child{
    padding: 16px 35px 16px 35px;;
}
.form2>.rememberForget>div:first-child{
    margin-right: 60px;
}
/* .form2>.teachSignIn>div:last-child>input{
    margin-bottom: 20px;
} */
/* .form2>.teachSignIn>div>input{
    font-size: 20px;
} */
.form2>.signInButton>button{
    letter-spacing: 0;
}
.form2>.signInButton>p{
    text-align: center;
}
.form2>.teachSignIn>div>input{
    font-size: 16px;
}
.form2>.signInButton>p{
    font-size: 14px;
}
.form2>.signInButton>.forgetPassword{
    font-size: 14px;
}
.form2>.jigouSignIn>div>input{
    font-size: 16px;
}


.rememberUser >>> .el-checkbox__label{
    font-size: 16px;
}
.rememberUser >>> .el-checkbox__inner{
    width: 16px;
    height: 16px;
}
.close{
    position: absolute;
    top: 15px;
    right: 15px;
}
.el-button.is-circle{
    padding: 5px;
}
/* .rememberUser >>> .el-checkbox__inner::after{
    height: 15px;
    left: 10px;
    top: 2px;
} */
</style>

<style>
/* .el-checkbox__label{
    font-size: 24px;
}
.el-checkbox__inner{
    width: 24px;
    height: 24px;
    top: -3px;
}
.el-checkbox__inner::after{
    height: 15px;
    left: 10px;
    top: 2px;
} */
</style>