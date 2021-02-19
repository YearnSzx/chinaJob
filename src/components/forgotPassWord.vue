=<template>
  <div id="forgotPw">
    <div class="forgotPw">
      <h2>{{ formData2.ForgetPassword }}</h2>
      <div class="phoneNumber">
        <span>{{ formData2.title }}</span>
      </div>
      <div class="form" :class="{ form2: changeL == true }">
        <el-form
          :model="formData"
          label-width="115px"
          ref="formData"
          :rules="rules"
          label-position="left"
        >
          <div class="must deepCss">
            <el-form-item :label="formData2.PhoneNumber" prop="PhoneNumber">
              <el-input
                v-model="formData.PhoneNumber"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="deepCss">
            <el-form-item :label="formData2.VerificationCode" prop="YanZhengMa">
              <el-input
                v-model="formData.YanZhengMa"
                auto-complete="off"
                maxlength="6"
                clearable
              >
                <template slot="append"></template>
                <el-button
                  slot="append"
                  ref="sendyzm"
                  :disabled="phoneYZM"
                  @click="sendYzm"
                  >{{ formData2.getYzm
                  }}<span v-if="waitHalfMin"
                    >({{ secondsLeft }}s)</span
                  ></el-button
                >
              </el-input>
            </el-form-item>
          </div>
          <div class="must deepCss">
            <el-form-item :label="formData2.NewPassword" prop="Password">
              <el-input
                v-model="formData.PassWord"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div class="must deepCss">
            <el-form-item :label="formData2.ConfirmPassword" prop="NewPassWord">
              <el-input
                v-model="formData.NewPassword"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
            <div class="botTip">{{ formData2.mustTip }}</div>
          </div>
        </el-form>
      </div>
      <div class="button" :class="{ button2: changeL == true }">
        <button class="submit" @click="submit">{{ formData2.Confirm }}</button>
      </div>
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

<script>
import { sendyanzhengma, findPassword } from '@/utils/index'
export default {
  name: 'forgotPw',
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
      //   剩余30秒
      secondsLeft: 30,
      waitHalfMin: false,
      show: 1,
      changeCNorEN2: '',
      changeL: false,
      formData2: {
        ForgetPassword: '忘记密码',
        title: '请输入已绑定的手机号码',
        PhoneNumber: '手机号码',
        VerificationCode: '验证码',
        getYzm: '获取验证码',
        NewPassword: '新密码',
        ConfirmPassword: '确认密码',
        mustTip: '密码需由字母、数字或英文组成，最少6位',
        Confirm: '确定'
      },
      // 验证码是否可点击
      phoneYZM: true,
      // 外教注册上传数据
      formData: {
        PhoneNumber: '',
        YanZhengMa: '',
        PassWord: '',
        NewPassword: ''
      },
      rules: {
        PhoneNumber: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的号码', trigger: 'blur' },
          { validator: isPhoneNum }
        ],
        YanZhengMa: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为 6 个字符', trigger: 'blur' },
          { validator: isPhoneYzm }
        ],
        PassWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: isPassword }
        ],
      },
      mEnter: false,
    }
  },
  created() {
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动


    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.changeL = true
      this.formData2 = {
        ForgetPassword: 'Forget Password',
        title: 'Please enter the bound mobile phone number',
        PhoneNumber: 'Phone Number',
        VerificationCode: 'Verification Code',
        getYzm: 'Get captcha',
        NewPassword: 'New Password',
        ConfirmPassword: 'Confirm Password',
        mustTip: 'Use a Letter, Number or Symbol, at least 6 characters',
        Confirm: 'Confirm'
      }
    } else {
      this.changeL = false
      this.formData2 = {
        ForgetPassword: '忘记密码',
        title: '请输入已绑定的手机号码',
        PhoneNumber: '手机号码',
        VerificationCode: '验证码',
        getYzm: '获取验证码',
        NewPassword: '新密码',
        ConfirmPassword: '确认密码',
        mustTip: '密码需由字母、数字或英文组成，最少6位',
        Confirm: '确定'
      }
    }
  },
  methods: {
    // 手机号码输入后可以获取验证码
    sendYzm: function () {
      let data = {
        phone: this.formData.PhoneNumber
      }
      sendyanzhengma(data).then((res) => {
        // console.log(res)
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
    submit: function () {
      let data = {
        phone: this.formData.PhoneNumber,
        password: this.formData.PassWord,
        confirmPassword: this.formData.NewPassword,
        msgCode: this.formData.YanZhengMa,
      }
      findPassword(data).then(res => {
        //   console.log(res)
        if (res.data.success) {
          this.$message({
            message: '修改密码成功',
            type: 'success'
          })
          this.$emit('changePwdSuccess')
        } else {
          this.$message.error(res.data.failReason);
        }
      })
    },
    close: function () {
      this.$emit('closeTc')
    },
  },
  watch: {
    'formData.PhoneNumber': {
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
.forgotPw {
  width: 824px;
  background: white;
  position: absolute;
  top: 200px;
  left: calc(50vw - 430px);
  z-index: 999;
  border-radius: 6px;
}
.forgotPw > h2 {
  text-align: center;
  font-size: 30px;
  margin-top: 53px;
  margin-bottom: 11px;
}
.phoneNumber {
  margin-bottom: 50px;
}
.phoneNumber > span {
  font-size: 18x;
  color: #b1b1b1;
}
.forgotPw > div {
  text-align: center;
}
.choice {
  font-size: 0;
  margin-bottom: 108px;
}
.choice > span {
  padding: 34px 132px;
  font-size: 32px;
  border: 2px solid #d3d3d3;
  cursor: pointer;
  line-height: 115px;
  letter-spacing: 10px;
}
.choice > span:first-child {
  margin-right: 59px;
}
.active {
  color: #003ab8;
  border: 2px solid #003ab8 !important;
}
.forgotPw > .form {
  text-align: left;
  padding-left: 190px;
}
form > div {
  margin-bottom: 24px;
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
.hasTo::before {
  content: "*";
  position: absolute;
  top: 2px;
  left: -23px;
  color: red;
  font-size: 30px;
}
input {
  width: 530px;
  height: 78px;
  font-size: 24px;
}
.el-form--label-left {
  padding-right: 165px;
}
.form2 .deepCss >>> .el-form-item__label {
  padding: 0;
  width: 125px !important;
}
.deepCss >>> .el-form-item__label {
  padding: 0;
  width: 78px !important;
}
.deepCss >>> .el-form-item__label:before {
  content: "" !important;
}
.form2 .deepCss >>> .el-form-item__content {
  margin-left: 158px !important;
}
.deepCss >>> .el-form-item__content {
  margin-left: 90px !important;
}
.must >>> .el-form-item {
  position: relative;
}
.must >>> .el-form-item::before {
  content: "*";
  color: #ba1200;
  font-size: 30px;
  position: absolute;
  top: 5px;
  left: -20px;
}
.form >>> .el-form > .must:last-child {
  position: relative;
}
.form2 .botTip {
  font-size: 12px;
  color: #ba1200;
  position: absolute;
  top: 45px;
  left: 158px;
}
.botTip {
  font-size: 16px;
  color: #ba1200;
  position: absolute;
  top: 45px;
  left: 90px;
}
/* .form>>>.el-form>.must:last-child::after{
    content: '密码需由字母、数字或英文组成，最少6位';
    font-size: 16px;
    color: #BA1200;
    position: absolute;
    top: 45px;
    left: 90px;
} */
.button2 .submit {
  letter-spacing: 1px;
}
.submit {
  padding: 4px 110px;
  font-size: 24px;
  background: #003ab8;
  color: white;
  letter-spacing: 10px;
  border: none;
  margin-top: 178px;
  margin: 60px auto;
  cursor: pointer;
  border-radius: 6px;
  line-height: 36px;
}
.xieyi {
  font-size: 18px;
  margin-top: 16px;
  color: #b1b1b1;
  margin-bottom: 128px;
}
.button {
  text-align: center;
}
.close {
  position: absolute;
  top: 15px;
  right: 15px;
}
.el-button.is-circle {
  padding: 5px;
}
.form >>> .el-input__inner {
  border-radius: 0;
}
.form >>> .el-input-group__append .el-button {
  background: none;
  border: none;
}
.form >>> .el-input-group__append {
  background: none;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: absolute;
  top: 10px;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
  right: 85px;
}
</style>
