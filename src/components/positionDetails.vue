<template>
  <div>
    <el-container>
      <el-main>
        <div class="main">
          <div class="mainBox">
            <div class="mainBoxLeft">
              <div class="mLeftTop">
                <div>
                  <div class="zhangMenImg">
                    <img :src="zhangMenImgUrl" alt="" />
                  </div>
                  <p v-if="orreNameEn == 'true'">{{ orreData.orreOrgName }}</p>
                  <p v-if="orreNameEn == 'false'">
                    {{ orreData.orreOrgNameEn }}
                  </p>
                </div>
              </div>
              <div class="mLeftbottom">
                <div>
                  <div class="yingPJobTitle">
                    <p>{{ EnglishData.ApplyFA }}</p>
                  </div>
                  <div class="chatTools">
                    <div>
                      <img :src="WeChat" alt="" @click="wechatClick" />
                    </div>
                    <div>
                      <img :src="PhoneNumber" alt="" @click="phoneClick" />
                    </div>
                    <div>
                      <img :src="Whats" alt="" @click="whatsApp" />
                    </div>
                    <div>
                      <img :src="FaceBook" alt="" @click="FBook" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mainBoxRight">
              <div>
                <div class="rightContent">
                  <div class="rContentTitle">
                    <span>{{ orreData.orrePosition }}</span>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div>
                      <p>{{ EnglishData.Location }}</p>
                      <span>{{ orreData.orreWorkAddress }}</span>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div>
                      <p>{{ EnglishData.WorkingMode }}</p>
                      <span>{{ orreWorkType }}</span>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div>
                      <p>{{ EnglishData.JobDetails }}</p>
                      <!-- <span>公司安排授课，无需担心生源</span><br> -->
                      <!-- <span class="condition">
                        {{orreData.orreWorkContent}}
                      </span> -->
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        v-model="orreData.orreWorkContent"
                        :disabled="true"
                      ></el-input>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div>
                      <p>{{ EnglishData.JobQualifications }}</p>
                      <!-- <span>要求：</span><br> -->
                      <!-- <span class="condition">
                        {{orreData.orreWorkRequirements}}
                      </span> -->
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        v-model="orreData.orreWorkRequirements"
                        :disabled="true"
                      ></el-input>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div>
                      <p>{{ EnglishData.SalaryRange }}</p>
                      <span class="money"
                        >{{ orreData.orreExpectedSalaryBottom }} -
                        {{ orreData.orreExpectedSalaryTop }}</span
                      >
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace lastOne">
                    <div>
                      <p>{{ EnglishData.OtherBenefits }}</p>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        v-model="orreData.orreOtherWelfare"
                        :disabled="true"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <div class="wechat">
      <el-dialog
        :title="wechat.wechatTitle"
        :visible.sync="centerDialogVisible"
        width="375px"
        height="190px"
      >
        <span v-if="weChatMsgNone == false">{{ ifMsgNone }}</span>
        <span v-if="weChatMsgNone"
          >{{ wechat.wechatMessage }}：{{ GWData.userWechat }}</span
        >
        <span v-if="weChatMsgNone" slot="footer" class="dialog-footer">
          <el-button
            @click="copy()"
            v-clipboard:copy="GWData.userWechat"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >{{ Copy }}</el-button
          >
        </span>
      </el-dialog>
    </div>

    <div class="phone">
      <el-dialog
        :title="phone.phoneTitle"
        :visible.sync="centerDialogVisible2"
        width="375px"
      >
        <span v-if="phoneMsgNone == false">{{ ifMsgNone }}</span>
        <span v-if="phoneMsgNone"
          >{{ phone.phoneMessage }}：{{ GWData.userPhone }}</span
        >
        <span v-if="phoneMsgNone" slot="footer" class="dialog-footer">
          <el-button
            v-clipboard:copy="GWData.userPhone"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            @click="copy()"
            >{{ Copy }}</el-button
          >
        </span>
      </el-dialog>
    </div>

    <div class="whatapp">
      <el-dialog
        :title="whatapp.whatappTitle"
        :visible.sync="whatsapp"
        width="375px"
      >
        <span v-if="whatsAPPMsgNone == false">{{ ifMsgNone }}</span>
        <span v-if="whatsAPPMsgNone"
          >{{ whatapp.whatappMessage }}：{{ GWData.userWhatsapp }}</span
        >
        <span v-if="whatsAPPMsgNone" slot="footer" class="dialog-footer">
          <el-button
            v-clipboard:copy="GWData.userWhatsapp"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            @click="copy()"
            >{{ Copy }}</el-button
          >
        </span>
      </el-dialog>
    </div>

    <div class="facebok">
      <el-dialog
        :title="faceBook.faceBookTitle"
        :visible.sync="FaceBookShow"
        width="375px"
      >
        <span v-if="FaceBookMsgNone == false">{{ ifMsgNone }}</span>
        <span v-if="FaceBookMsgNone"
          >{{ faceBook.faceBookMessage }}：{{ GWData.userFacebook }}</span
        >
        <span v-if="FaceBookMsgNone" slot="footer" class="dialog-footer">
          <el-button
            v-clipboard:copy="GWData.userFacebook"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            @click="copy()"
            >{{ Copy }}</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { orreRecruit2, userMessageList2 } from '@/utils/index'
export default {
  name: 'index',
  props: ['changeCNorEN'],
  data() {
    return {
      // 下面四个控制数据为空做反应
      weChatMsgNone: true,
      phoneMsgNone: true,
      whatsAPPMsgNone: true,
      FaceBookMsgNone: true,
      ifMsgNone: '',
      centerDialogVisible: false,
      centerDialogVisible2: false,
      whatsapp: false,
      FaceBookShow: false,
      zhangMenImgUrl: '',
      WeChat: '',
      PhoneNumber: '',
      Whats: '',
      FaceBook: '',
      orreData: [],
      orreWorkType: '',
      // 控制是否英文标题
      orreNameEn: '',
      EnglishData: {
        ApplyFA: '',              // 应聘该工作
        Location: '',             // 工作地点
        WorkingMode: '',          // 工作方式
        JobDetails: '',           // 工作内容
        JobQualifications: '',    // 任职要求
        SalaryRange: '',          // 薪资待遇
        OtherBenefits: '',        // 其他福利
      },
      GWData: [],
      changeCNorEN2: '',
      wechat: {
        wechatTitle: '',
        wechatMessage: '',
      },
      phone: {
        phoneTitle: '',
        phoneMessage: '',
      },
      whatapp: {
        whatappTitle: '',
        whatappMessage: '',
      },
      faceBook: {
        faceBookTitle: '',
        faceBookMessage: '',
      },
      Copy: ''
    };
  },
  methods: {
    wechatClick() {
      this.centerDialogVisible = true
    },
    phoneClick() {
      this.centerDialogVisible2 = true
    },
    whatsApp() {
      this.whatsapp = true
    },
    FBook() {
      this.FaceBookShow = true
    },
    onCopy() {
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    onError() {
      this.$message({
        message: '复制失败',
        type: 'faild'
      });
    }
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 1)
  },
  created() {
    let _this = this
    let orreid = sessionStorage.getItem('orreId')
    // console.log(orreid)
    orreRecruit2(orreid).then((res) => {
      // console.log(res)      
      if (res.data.root[0].orreLogo == '' || res.data.root[0].orreLogo == 'null' || res.data.root[0].orreLogo == null || res.data.root[0].orreLogo == 'undefined' || res.data.root[0].orreLogo == undefined) {
        let urlTemp = "assets/logo.png";
        this.zhangMenImgUrl = require("@/" + urlTemp);
      } else {
        this.zhangMenImgUrl = res.data.root[0].orreLogo;
      }

      if (sessionStorage.getItem('changeChinese') == 'false') {
        if (res.data.root[0].orreWorkType == '1') {
          this.orreWorkType = 'Online'
        } else if (res.data.root[0].orreWorkType == '2') {
          this.orreWorkType = 'Work in China'
        }
      } else {
        if (res.data.root[0].orreWorkType == '1') {
          this.orreWorkType = '线上'
        } else if (res.data.root[0].orreWorkType == '2') {
          this.orreWorkType = '在中国工作'
        }
      }

      userMessageList2(res.data.root[0].orreUserId).then(res2 => {
        _this.orreData = Object.assign({}, res.data.root[0], res2.data.root[0])
        // console.log(_this.orreData) 


      })

      userMessageList2(res.data.root[0].orreSellerId).then(res => {
        // console.log(res.data.root[0])
        this.GWData = res.data.root[0]

        if (this.GWData.userWechat == '' || this.GWData.userWechat == 'null' || this.GWData.userWechat == null) {
          this.weChatMsgNone = false
        } else {
          this.weChatMsgNone = true
        }
        if (this.GWData.userPhone == '' || this.GWData.userPhone == 'null' || this.GWData.userPhone == null) {
          this.phoneMsgNone = false
        } else {
          this.phoneMsgNone = true
        }


        if (this.GWData.userWhatsapp == '' || this.GWData.userWhatsapp == 'null' || this.GWData.userWhatsapp == null) {
          this.whatsAPPMsgNone = false
        } else {
          this.whatsAPPMsgNone = true
        }

        if (this.GWData.userFacebook == '' || this.GWData.userFacebook == 'null' || this.GWData.userFacebook == null) {
          this.FaceBookMsgNone = false
        } else {
          this.FaceBookMsgNone = true
        }
      })
    })
    this.$emit('gotoJieShao', 1)





    // 控制中英文的数据
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    // this.changeCNorEN = sessionStorage.getItem('changeChinese')
    // console.log(this.changeCNorEN2)
    this.orreNameEn = this.changeCNorEN2
    // console.log(this.orreNameEn)
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.WeChat = require("@/assets/jiGouMessage/微信Eng.png")
      this.PhoneNumber = require("@/assets/jiGouMessage/电话Eng.png")
      this.Whats = require("@/assets/jiGouMessage/whatsapp.png")
      this.FaceBook = require("@/assets/jiGouMessage/facebook.png")
      this.EnglishData = {
        ApplyFA: 'Apply For ASAP',              // 应聘该工作
        Location: 'Location',             // 工作地点
        WorkingMode: 'Working Mode',          // 工作方式
        JobDetails: 'Job Details ',           // 工作内容
        JobQualifications: 'Job Qualifications',    // 任职要求
        SalaryRange: 'Salary Range',          // 薪资待遇
        OtherBenefits: 'Other Benefits',        // 其他福利
      }
      this.ifMsgNone = 'The foreign teacher / organization has no telephone / wechat / WhatsApp/ Facebook'
      this.Copy = 'Copy'
      this.wechat = {
        wechatTitle: 'Wechat',
        wechatMessage: 'Wechat',
      },
        this.phone = {
          phoneTitle: 'Phone Number',
          phoneMessage: '+86',
        }
      this.whatapp = {
        whatappTitle: 'Whats APP',
        whatappMessage: 'ID',
      }
      this.faceBook = {
        faceBookTitle: 'Face Book',
        faceBookMessage: 'ID',
      }


    } else {
      this.WeChat = require("@/assets/jiGouMessage/wechat.png")
      this.PhoneNumber = require("@/assets/jiGouMessage/phone.png")
      this.Whats = require("@/assets/jiGouMessage/whatsapp.png")
      this.FaceBook = require("@/assets/jiGouMessage/facebook.png")
      this.EnglishData = {
        ApplyFA: '应聘该工作',              // 应聘该工作
        Location: '工作地点',             // 工作地点
        WorkingMode: '工作方式',          // 工作方式
        JobDetails: '工作内容 ',           // 工作内容
        JobQualifications: '任职要求',    // 任职要求
        SalaryRange: '薪资待遇',          // 薪资待遇
        OtherBenefits: '其他福利',        // 其他福利
      }
      this.ifMsgNone = '该外教/机构未设置电话/微信/WhatsApp/Facebook'
      this.Copy = '复制',
        this.wechat = {
          wechatTitle: '微信',
          wechatMessage: '微信号',
        },
        this.phone = {
          phoneTitle: '电话',
          phoneMessage: '+86',
        }
      this.whatapp = {
        whatappTitle: 'Whats APP',
        whatappMessage: '账号',
      },
        this.faceBook = {
          faceBookTitle: 'Face Book',
          faceBookMessage: '账号',
        }
    }
  },

  watch: {
    changeCNorEN: {
      handler(newL, oldL) {
        // console.log(this.changeCNorEng)
        this.orreNameEn = newL
        if (newL == 'false') {
          this.WeChat = require("@/assets/jiGouMessage/微信Eng.png")
          this.PhoneNumber = require("@/assets/jiGouMessage/电话Eng.png")
          this.Whats = require("@/assets/jiGouMessage/whatsapp.png")
          this.FaceBook = require("@/assets/jiGouMessage/facebook.png")
          this.EnglishData = {
            ApplyFA: 'Apply For ASAP',              // 应聘该工作
            Location: 'Location',             // 工作地点
            WorkingMode: 'Working Mode',          // 工作方式
            JobDetails: 'Job Details ',           // 工作内容
            JobQualifications: 'Job Qualifications',    // 任职要求
            SalaryRange: 'Salary Range',          // 薪资待遇
            OtherBenefits: 'Other Benefits',        // 其他福利
          }
          this.ifMsgNone = 'The foreign teacher / organization has no telephone / wechat / WhatsApp/ Facebook'
          this.Copy = 'Copy'
          this.wechat = {
            wechatTitle: 'Wechat',
            wechatMessage: 'Wechat',
          },
            this.phone = {
              phoneTitle: 'Phone Number',
              phoneMessage: '+86',
            }
          this.whatapp = {
            whatappTitle: 'Whats APP',
            whatappMessage: 'ID',
          }
          this.faceBook = {
            faceBookTitle: 'Face Book',
            faceBookMessage: 'ID',
          }

          if (this.orreWorkType === '线上') {
            this.orreWorkType = 'Online'
          } else if (this.orreWorkType === '在中国工作') {
            this.orreWorkType = 'Work in China'
          }
        } else {
          this.WeChat = require("@/assets/jiGouMessage/wechat.png")
          this.PhoneNumber = require("@/assets/jiGouMessage/phone.png")
          this.Whats = require("@/assets/jiGouMessage/whatsapp.png")
          this.FaceBook = require("@/assets/jiGouMessage/facebook.png")
          this.EnglishData = {
            ApplyFA: '应聘该工作',              // 应聘该工作
            Location: '工作地点',             // 工作地点
            WorkingMode: '工作方式',          // 工作方式
            JobDetails: '工作内容 ',           // 工作内容
            JobQualifications: '任职要求',    // 任职要求
            SalaryRange: '薪资待遇',          // 薪资待遇
            OtherBenefits: '其他福利',        // 其他福利
          }
          this.ifMsgNone = '该外教/机构未设置电话/微信/WhatsApp/Facebook'
          this.Copy = '复制',
            this.wechat = {
              wechatTitle: '微信',
              wechatMessage: '微信号',
            },
            this.phone = {
              phoneTitle: '电话',
              phoneMessage: '+86',
            }
          this.whatapp = {
            whatappTitle: 'Whats APP',
            whatappMessage: '账号',
          },
            this.faceBook = {
              faceBookTitle: 'Face Book',
              faceBookMessage: '账号',
            }

          if (this.orreWorkType == 'Online') {
            this.orreWorkType = '线上'
          } else if (this.orreWorkType == 'Work in China') {
            this.orreWorkType = '在中国工作'
          }
        }
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: PingFangSC-Regular;
  src: url("../assets/PingFangSCRegular.ttf");
}
.main {
  padding: 57px 0 57px 14%;
  box-sizing: border-box;
  background: rgb(246, 246, 248);
}
.mainBox {
  /* max-width: 1415px; */
}
.mainBox > div {
  display: inline-block;
  vertical-align: top;
}
.mainBoxLeft {
  /* width: 348px; */
  /* height: 880px; */
  margin-right: 20px;
}
.mainBox > div {
  display: inline-block;
  vertical-align: top;
  max-width: 67%;
}
.mainBox > .mainBoxLeft {
  margin-right: 20px;
  max-width: 30%;
}
.mLeftTop {
  /* width: 348px; */
  height: 335px;
  background: white;
}
.mLeftTop > div {
  text-align: center;
}
.zhangMenImg > img {
  width: 210px;
  height: 200px;
  padding-top: 37px;
}
.mLeftTop > div > p {
  font-size: 36px;
  color: #080808;
}

.mLeftbottom {
  /* width: 348px; */
  /* height: 452px; */
  background: white;
  margin-top: 19px;
}
.mLeftbottom > div {
  text-align: center;
}
.yingPJobTitle {
  padding: 15px;
  padding-bottom: 31px;
  box-sizing: border-box;
}
.yingPJobTitle > p {
  font-size: 28px;
  color: #080808;
  padding: 25px 89px 27px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: bold;
}
.chatTools > div {
  padding-bottom: 23px;
}
.chatTools > div > img {
  cursor: pointer;
}

.mainBoxRight {
  max-width: 1049px;
  background: white;
}
.mainBoxRight > div {
  width: 100%;
  padding: 0 37px;
  box-sizing: border-box;
}
.rightContent {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.rContentTitle {
  width: 976px;
  padding: 74px 0 100px 0;
  border-bottom: 2px solid #e5e5e5;
}
.rContentTitle > span {
  font-size: 36px;
  color: #000000;
  font-weight: bold;
}
.workPlace {
  padding: 34px 0;
  border-bottom: 2px solid #e5e5e5;
  position: relative;
}
.lastOne {
  border: none;
  padding-bottom: 110px;
}
.workPlace::before {
  content: "";
  width: 6px;
  height: 24px;
  background: #003ab8;
  display: inline-block;
  position: absolute;
  top: 43px;
}
.workPlace > div {
  display: inline-block;
  margin-left: 23px;
  width: 790px;
}
.workPlace > div > p {
  font-size: 30px;
  color: #080808;
  padding-bottom: 19px;
}
.workPlace > div > span {
  font-size: 24px;
  color: #51596f;
  line-height: 36px;
}
.workPlace > div > .condition {
  font-size: 22px;
  font-family: PingFangSC-Regular;
}
.workPlace > div > .money {
  font-weight: bold;
}

/* 特殊 */
.el-menu {
  background: none;
  position: static;
  display: inline-block;
  vertical-align: middle;
  margin-left: 263px;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.el-menu-item {
  font-size: 24px;
  color: white;
  margin: 0 30px;
}
.el-main {
  padding: 0;
}
.el-menu-item {
  padding: 0 50px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: white;
  border-bottom: 4px solid white;
}
/* 特殊 */

.el-footer {
  width: 100%;
  height: 494px !important;
  background: #1d1d1d;
  color: white;
  text-align: center;
  padding: 0;
}

.showRegister {
  cursor: pointer;
}

/* 弹出框效果 */
/* .wechat>>>.el-dialog{
  height: 190px;
} */
.wechat >>> .el-dialog__header {
  padding: 20px;
  background: rgb(106, 182, 88);
}
.wechat >>> .el-dialog__header > span {
  color: white;
}
.wechat >>> .el-button {
  width: 75px;
  height: 25px;
  background: rgb(106, 182, 88);
  padding: 0;
  color: white;
}
.wechat >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.wechat >>> .el-dialog__headerbtn {
  top: 24px;
}
.phone >>> .el-dialog__header {
  padding: 20px;
  background: rgb(209, 58, 59);
}
.phone >>> .el-dialog__header > span {
  color: white;
}
.phone >>> .el-button {
  width: 75px;
  height: 25px;
  background: rgb(209, 58, 59);
  padding: 0;
  color: white;
}
.phone >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.phone >>> .el-dialog__headerbtn {
  top: 24px;
}

.whatapp >>> .el-dialog__header {
  padding: 20px;
  background: rgb(65, 91, 150);
}
.whatapp >>> .el-dialog__header > span {
  color: white;
}
.whatapp >>> .el-button {
  width: 75px;
  height: 25px;
  background: rgb(65, 91, 150);
  padding: 0;
  color: white;
}
.whatapp >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.whatapp >>> .el-dialog__headerbtn {
  top: 24px;
}

.facebok >>> .el-dialog__header {
  padding: 20px;
  background: rgb(65, 91, 150);
}
.facebok >>> .el-dialog__header > span {
  color: white;
}
.facebok >>> .el-button {
  width: 75px;
  height: 25px;
  background: rgb(154, 230, 150);
  padding: 0;
  color: white;
}
.facebok >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.facebok >>> .el-dialog__headerbtn {
  top: 24px;
}
</style>
