<template>
  <div id="register">
    <!-- <router-link to="/teach">asdasdasdasd</router-link>
    <router-link to="/jigou">dddfsdfsfsdfdsfdd</router-link>
    <router-view></router-view> -->
    <div class="register" :class="{ register2: changeCNorEN2 == 'false' }">
      <h2>{{ teachReg.freeReg }}</h2>
      <div class="choice">
        <span :class="{ active: show == 1 }" @click="teachShow()">{{
          teachReg.imTeach
        }}</span>
        <span :class="{ active: show == 2 }" @click="jigouShow()">{{
          teachReg.imJigou
        }}</span>
      </div>
      <div class="form" v-show="jigou">
        <el-form
          :model="jigouData"
          label-width="115px"
          ref="jigouData"
          :rules="rules2()"
          label-position="left"
        >
          <div class="must deepCss">
            <el-form-item :label="teachReg.JPNumber" prop="jigouPhoneNumber">
              <el-input
                v-model="jigouData.jigouPhoneNumber"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
            <div class="mustRight">{{ teachReg.tRightTip }}</div>
          </div>
          <div class="deepCss">
            <el-form-item :label="teachReg.JYanZhengMa" prop="jigouYanZhengMa">
              <el-input
                v-model="jigouData.jigouYanZhengMa"
                auto-complete="off"
                maxlength="6"
                clearable
              >
                <template slot="append"></template>
                <el-button slot="append" :disabled="phoneYZM" @click="sendYzm"
                  >{{ teachReg.getYzm }}
                  <span v-if="waitHalfMin">({{ secondsLeft }}s)</span>
                </el-button>
              </el-input>
            </el-form-item>
          </div>
          <div class="must deepCss">
            <el-form-item :label="teachReg.JPassWord" prop="jigouPassWord">
              <el-input
                v-model="jigouData.jigouPassWord"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
            <div class="mustBottom">{{ teachReg.tBottomTip }}</div>
            <div class="mustRight">{{ teachReg.tRightTip }}</div>
          </div>
        </el-form>
      </div>
      <div class="form2" v-show="teach">
        <el-form
          :model="teachData"
          label-width="115px"
          ref="teachData"
          :rules="rule2()"
          label-position="left"
        >
          <div class="must deepCss">
            <el-form-item :label="teachReg.tPNumber" prop="tPhoneNubmer">
              <el-input
                v-model="teachData.tPhoneNubmer"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
            <div class="mustTop">
              <p>{{ teachReg.tTopTip }}</p>
              <p :class="{ tTopTip2: changeCNorEN2 == 'false' }">
                {{ teachReg.tTopTip2 }}
              </p>
            </div>
            <div class="mustRight">{{ teachReg.tRightTip }}</div>
          </div>
          <div class="deepCss">
            <el-form-item :label="teachReg.tEmail" prop="tEmail">
              <el-input
                v-model="teachData.tEmail"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="deepCss">
            <el-form-item label="WhatAPP" prop="tWhatAPP">
              <el-input
                v-model="teachData.tWhatAPP"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="deepCss">
            <el-form-item label="Facebook" prop="tFacebook">
              <el-input
                v-model="teachData.tFacebook"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="deepCss">
            <el-form-item label="Wechat" prop="tWechat">
              <el-input
                v-model="teachData.tWechat"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="deepCss">
            <el-form-item label="Skype" prop="tSkype">
              <el-input
                v-model="teachData.tSkype"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="must deepCss">
            <el-form-item :label="teachReg.tPassWord" prop="tPassWord">
              <el-input
                v-model="teachData.tPassWord"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
            <div class="mustBottom">{{ teachReg.tBottomTip }}</div>
            <div class="mustRight">{{ teachReg.tRightTip }}</div>
          </div>
        </el-form>
      </div>
      <el-button
        class="submit"
        ref="submit"
        @click="zhuCe"
        :disabled="submitShow"
        >{{ teachReg.registerZH }}</el-button
      >
      <p class="xieyi">
        {{ teachReg.lastTip
        }}<strong @click="toServiceA">{{ teachReg.fwxy }}</strong>
      </p>
      <div class="close">
        <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="close"
        ></el-button>
      </div>
    </div>
  </div>
</template>
<style>
/* element输入框样式修改 */
/* .el-input-group__append{
    position: absolute;
    top: 0;
    right: 2px;
    line-height: 78px;
    width: 85px;
    background: none;
    border: none;
}
.register>.form{
    padding-left: 143px;
}
.el-input__inner{
    width: 530px;
    height: 78px;
    font-size: 24px;
}
.register2>.form2>form>div>div>label{
    width: 171px!important;
}
.register2>.form>form>div>div>label{
    width: 200px!important;
    text-align-last:left;
}
.register2>.form2>form>div>div:nth-child(2){
    left: 225px;
}
.register2>.form>form>div>.mustBottom{
    left: 255px;
}
.el-form-item__label{
    width: 100px;
    font-size: 24px;
    padding: 0;
    margin-right: 53px;
    color: black;
    text-align-last: justify;
    line-height: 78px;
}
.el-form-item__label::before{
    display: none;
}
.must .el-form-item::after{
    content: '*';
    font-size: 30px;
    color: #BA1200;
    line-height: 36px;
    position: absolute;
    top: 25px;
    left: -30px;
}
.el-form-item__content{
    display: inline-block;
    margin-left: 0!important;
} */
</style>
<script>
import { register, sendyanzhengma } from '@/utils/index'
export default {
  name: 'register',
  data() {
    let phoneNum = /^[0-9]{8,11}$/;
    let isPhoneNum = (rule, value, callback) => {
      if (!phoneNum.test(value)) {
        return callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    };
    let phoneYzm = /^.{3,20}$/;
    let isPhoneYzm = (rule, value, callback) => {
      if (!phoneYzm.test(value)) {
        return callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    };
    let password = /^.{3,20}$/;
    let isPassword = (rule, value, callback) => {
      if (!password.test(value)) {
        return callback(new Error('请确认密码'))
      } else {
        callback()
      }
    };

    return {
      show: 1,
      jigou: false,
      teach: true,
      // 验证码是否可点击
      phoneYZM: true,
      // 注册按钮是否可可用
      submitShow: false,
      // 外教注册上传数据
      jigouData: {
        jigouPhoneNumber: '',
        jigouYanZhengMa: '',
        jigouPassWord: ''
      },
      // 机构注册上传数据
      teachData: {
        tPhoneNubmer: '',
        tEmail: '',
        tWhatAPP: '',
        tFacebook: '',
        tWechat: '',
        tSkype: '',
        tPassWord: ''
      },
      //   剩余30秒
      secondsLeft: 30,
      waitHalfMin: false,
      rules: {
        jigouPhoneNumber: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: isPhoneNum }
        ],
        jigouYanZhengMa: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为 6 个字符', trigger: 'blur' },
          { validator: isPhoneYzm }
        ],
        jigouPassWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: isPassword }
        ],
      },
      rule: {
        tPhoneNubmer: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: isPhoneNum }
        ],
        tPassWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: isPassword }
        ],
      },
      rulesEnglish: {
        jigouPhoneNumber: [
          { required: true, message: 'Mobile phone number cannot be empty', trigger: 'blur' },
          { min: 8, max: 11, message: 'Please input the correct phone number', trigger: 'blur' },
          { validator: isPhoneNum }
        ],
        jigouYanZhengMa: [
          { required: true, message: 'Verification code cannot be empty', trigger: 'blur' },
          { min: 6, max: 6, message: 'The length is 6 characters', trigger: 'blur' },
          { validator: isPhoneYzm }
        ],
        jigouPassWord: [
          { required: true, message: 'Password cannot be empty', trigger: 'blur' },
          { min: 6, max: 16, message: 'The length is between 6 and 16 characters', trigger: 'blur' },
          { validator: isPassword }
        ],
      },
      ruleEnglish: {
        tPhoneNubmer: [
          { required: true, message: 'Mobile phone number cannot be empty', trigger: 'blur' },
          { min: 8, max: 11, message: 'Please input the correct phone number', trigger: 'blur' },
          { validator: isPhoneNum }
        ],
        tPassWord: [
          { required: true, message: 'Password cannot be empty', trigger: 'blur' },
          { min: 6, max: 16, message: 'The length is between 6 and 16 characters', trigger: 'blur' },
          { validator: isPassword }
        ],
      },
      teachReg: {
        freeReg: '免费注册',
        imTeach: '我是外教',
        imJigou: '我是机构',

        tPNumber: '手机号码',   // 外教
        tEmail: '邮箱',
        tPassWord: '密码',

        tTopTip: '*请至少填写三种最常用的联系方式',
        tRightTip: '*为必填项',
        tBottomTip: '密码需由字母、数字或英文组成，最少6位',

        JPNumber: '手机号码',   // 机构
        JYanZhengMa: '验证码',
        getYzm: '获取验证码',
        JPassWord: '密码',

        registerZH: '注册账号',
        lastTip: '点击注册，表明你同意我们的',
        fwxy: '《服务协议》'
      },
      changeCNorEN2: ''
    }
  },
  methods: {
    rule2() {
      if (sessionStorage.getItem('changeChinese') == 'false') {
        return this.ruleEnglish
      } else {
        return this.rule
      }
    },
    rules2() {
      if (sessionStorage.getItem('changeChinese') == 'false') {
        return this.rulesEnglish
      } else {
        return this.rules
      }
    },
    jigouShow: function () {
      this.show = 2;
      this.jigou = true;
      this.teach = false
    },
    teachShow: function () {
      this.show = 1;
      this.jigou = false;
      this.teach = true
    },
    // 手机号码输入后可以获取验证码
    sendYzm: function () {
      let data = {
        phone: this.jigouData.jigouPhoneNumber
      }
      sendyanzhengma(data).then((res) => {
        //   console.log(res)
      })
      this.waitHalfMin = true
      let sleft = setInterval(() => {
        this.secondsLeft--
        this.phoneYZM = true
        if (this.secondsLeft == 0) {
          this.secondsLeft = 30
          this.waitHalfMin = false
          this.phoneYZM = false
          clearInterval(sleft);
        }
      }, 1000);

    },
    zhuCe: function () {
      if (this.show == 1) {
        //   console.log('注册')
        //   console.log(this.teachData.tPhoneNubmer,this.teachData.tPassWord)
        if (this.teachData.tPhoneNubmer && this.teachData.tPassWord) {
          // 外教注册上传的数据
          let data = {
            phone: this.teachData.tPhoneNubmer,
            password: this.teachData.tPassWord,
            userEmail: this.teachData.tEmail,
            userWhatsapp: this.teachData.tWhatAPP,
            userFacebook: this.teachData.tFacebook,
            userWechat: this.teachData.tWechat,
            userSkype: this.teachData.tSkype,
            // 分辨是机构还是外教注册
            userRoleId: 3
          }
          // console.log(data)
          register(data).then((res) => {
            // console.log(res.data)
            // 注册成功和失败提示
            if (res.data.success) {
              if (sessionStorage.getItem('changeChinese') == 'false') {
                this.$message({
                  message: 'Register successfully, 2 seconds later jump into the landing page!',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '注册成功,2秒后跳入登陆页面！',
                  type: 'success'
                });
              }
              setTimeout(() => {
                this.$emit('registerSuccess')
              }, 1500);
            } else {
              if (sessionStorage.getItem('changeChinese') == 'false') {
                this.$notify({
                  title: 'login has failed',
                  message: res.data.failReason,
                  type: 'faild'
                });
              } else {
                this.$notify({
                  title: 'Error注册失败',
                  message: res.data.failReason,
                  type: 'faild'
                });
              }
            }
          })
        } else {
          if (sessionStorage.getItem('changeChinese') == 'false') {
            this.$alert('failed', 'login has failed', { confirmButtonText: 'OK' });
          } else {
            this.$alert('失败', '注册失败', { confirmButtonText: '确定' });
          }
        }
      } else {
        if (this.jigouData.jigouPhoneNumber && this.jigouData.jigouPassWord) {
          // 机构注册上传的数据
          let data = {
            phone: this.jigouData.jigouPhoneNumber,
            password: this.jigouData.jigouPassWord,
            msgCode: this.jigouData.jigouYanZhengMa,
            // 分辨是机构还是外教注册
            userRoleId: 4
          }
          // console.log(data)
          register(data).then((res) => {
            // console.log(res)
            // 注册成功和失败提示
            if (res.data.success) {
              if (sessionStorage.getItem('changeChinese') == 'false') {
                this.$message({
                  message: 'Register successfully, 2 seconds later jump into the landing page!',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '注册成功,2秒后跳入登陆页面！',
                  type: 'success'
                });
              }
              setTimeout(() => {
                this.$emit('registerSuccess')
              }, 1500);
            } else {
              if (sessionStorage.getItem('changeChinese') == 'false') {
                this.$notify({
                  title: 'login has failed',
                  message: res.data.failReason,
                  type: 'faild'
                });
              } else {
                this.$notify({
                  title: 'Error注册失败',
                  message: res.data.failReason,
                  type: 'faild'
                });
              }
            }
          })
        } else {
          if (sessionStorage.getItem('changeChinese') == 'false') {
            this.$alert('failed', 'login has failed', { confirmButtonText: 'OK' });
          } else {
            this.$alert('失败', '注册失败', { confirmButtonText: '确定' });
          }
        }

      }
    },
    toServiceA() {
      let data = {
        Checked: false
      }
      this.$emit('toServiceA', data)
    },
    close: function () {
      this.$emit('closeTc')
    }
  },
  created() {
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动

    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.teachReg = {
        freeReg: 'Free Registration',
        imTeach: "I'm a Foreign Teacher ",
        imJigou: "I'm an Employee",

        tPNumber: 'Phone number',   // 外教
        tEmail: 'Email',
        tPassWord: 'Password',

        tTopTip: 'Please fill your contact details ',
        tTopTip2: '(* must be filled, the minimum is 3)',
        tRightTip: '*Required Fields',
        tBottomTip: 'Use a Letter, Number or Symbol, at least 6 characters ',

        JPNumber: 'Phone number',   // 机构
        JYanZhengMa: 'Verification code',
        getYzm: 'Get captcha',
        JPassWord: 'Password',

        registerZH: 'Register',
        lastTip: 'By clicking register, you will agree to our Privacy Statement and ',
        fwxy: 'Service Agreement'
      }
    } else {
      this.teachReg = {
        freeReg: '免费注册',
        imTeach: '我是外教',
        imJigou: '我是机构',

        tPNumber: '手机号码',   // 外教
        tEmail: '邮箱',
        tPassWord: '密码',

        tTopTip: '*请至少填写三种最常用的联系方式',
        tRightTip: '*为必填项',
        tBottomTip: '密码需由字母、数字或英文组成，最少6位',

        JPNumber: '手机号码',   // 机构
        JYanZhengMa: '验证码',
        getYzm: '获取验证码',
        JPassWord: '密码',

        registerZH: '注册账号',
        lastTip: '点击注册，表明你同意我们的',
        fwxy: '《服务协议》'
      }
    }
  },

  watch: {
    'jigouData.jigouPhoneNumber': {
      handler(newName, oldName) {
        if (newName.length > 7 && newName.length < 11 && Number(newName)) {
          this.phoneYZM = false
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerBg {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  opacity: 0.4;
}
#register {
  width: 100%;
  background: black;
  position: relative;
}
.register {
  width: 824px;
  background: white;
  position: absolute;
  top: 200px;
  left: calc(50vw - 430px);
  z-index: 999;
  border-radius: 6px;
}
.register > h2 {
  text-align: center;
  font-size: 30px;
  margin-top: 41px;
  margin-bottom: 44px;
}
.register > div {
  text-align: center;
}
.choice {
  font-size: 0;
  margin-bottom: 52px;
}
.register2 > .choice > span {
  letter-spacing: 0;
  font-size: 18px;
}
.choice > span {
  padding: 12px 50px;
  font-size: 24px;
  border: 2px solid #d3d3d3;
  cursor: pointer;
  line-height: 80px;
  letter-spacing: 10px;
}
.choice > span:first-child {
  margin-right: 59px;
}
.register2 > .choice > span:first-child {
  padding: 14px 25px;
  margin-right: 72px;
}
.active {
  color: #003ab8;
  border: 2px solid #003ab8 !important;
}
.register > .form {
  text-align: left;
  padding-left: 147px;
}
.register > .form2 {
  text-align: left;
  padding-left: 147px;
}
form > div {
  /* margin-bottom: 40px; */
}
form > div > div {
  display: inline-block;
  position: relative;
}
.sendPhone {
  position: absolute;
  padding: 27px;
  border: none;
  background: white;
  font-size: 18px;
  right: 2px;
  bottom: 2px;
  cursor: pointer;
}
.sendPhone:focus {
  /* border: none;
    outline: none; */
}
label {
  width: 100px;
  font-size: 24px;
  display: inline-block;
  color: black;
  margin-right: 53px;
  position: relative;
  text-align-last: justify;
}
.hasToF {
  position: relative;
}
.hasTo {
  position: absolute;
  top: 25px;
  left: -23px;
  font-size: 30px;
  color: red;
}
input {
  width: 530px;
  height: 78px;
  font-size: 24px;
}

.xieyi {
  font-size: 16px;
  margin-top: 16px;
  color: #b1b1b1;
  margin-bottom: 68px;
}
.register2 > .xieyi {
  font-size: 14px;
  line-height: 18px;
  width: 325px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 50px;
}
.register2 > button {
  letter-spacing: 0;
}
strong {
  cursor: pointer;
}
/* 账号密码提示 */
.must {
  position: relative;
}
.mustTop {
  color: #ba1200;
  position: absolute !important;
  top: -25px;
  left: 120px;
}
.mustTop > p:nth-child(2) {
  display: none;
}
.tTopTip2 {
  display: block !important;
}
.register2 > .form2 > .el-form > div > .mustTop {
  text-align: center;
  top: -40px;
  left: 180px;
  z-index: -1;
}
.mustRight {
  color: #ba1200;
  left: 12px;
}
.mustBottom {
  color: #ba1200;
  position: absolute !important;
  left: 120px;
  bottom: -15px;
}

/* element输入框样式修改 */
.deepCss >>> .el-input-group__append {
  position: absolute;
  top: 0;
  right: 20px;
  line-height: 48px;
  width: 85px;
  background: none;
  border: none;
  padding: 0;
}
.register > .form {
  padding-left: 143px;
}
.deepCss >>> .el-input__inner {
  width: 352px;
  height: 48px;
  font-size: 24px;
}
.register2 >>> .form2 {
  padding-left: 123px;
}
.register2 >>> .form2 > form > div > div > label {
  width: 128px !important;
  margin: 0;
}
.register2 >>> .form > form > div > div > label {
  width: 146px !important;
  text-align-last: left;
  margin: 0;
}
.register2 >>> .form2 > form > div > div:nth-child(2) {
  left: 128px;
  font-size: 14px;
  bottom: -14px;
}
.register2 >>> .form > form > div > .mustBottom {
  left: 144px;
  font-size: 12px;
  bottom: -10px;
}
.register2 >>> .form > form > div > .mustRight {
  font-size: 12px;
  left: 9px;
}
.deepCss >>> .el-form-item__label {
  width: 80px !important;
  font-size: 18px;
  padding: 0;
  margin-right: 40px;
  color: black;
  text-align-last: justify;
  line-height: 48px;
}
.deepCss >>> .el-form-item__label::before {
  display: none;
}
.must >>> .el-form-item::after {
  content: "*";
  font-size: 30px;
  color: #ba1200;
  line-height: 36px;
  position: absolute;
  top: 12px;
  left: -20px;
}
.deepCss >>> .el-form-item__content {
  display: inline-block;
  margin-left: 0 !important;
}
.register2 >>> .form2 > .el-form > .must > .mustRight {
  font-size: 14px;
}
.el-button {
  padding: 12px 13px;
}
.submit {
  padding: 12px 82px;
  font-size: 24px;
  background: #003ab8;
  color: white;
  letter-spacing: 10px;
  border: none;
  margin-top: 66px;
  cursor: pointer;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
}
.el-button.is-circle {
  padding: 5px;
}
.el-input-group__append button.el-button {
  border: none !important;
  background: none !important;
}
</style>
