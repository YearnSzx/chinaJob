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
                    <img :src="headImg" alt="" />
                  </div>
                  <div>
                    <p>{{ mTitle.ContactThisTeacher }}</p>
                  </div>
                  <div class="WeChatAndPhone">
                    <div>
                      <img :src="weChatImg" alt="" @click="clickWechat" />
                    </div>
                    <div>
                      <img :src="phoneImg" alt="" @click="clickPhone" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mLeftbottom">
                <div>
                  <div class="yingPJobTitle">
                    <p>{{ mTitle.ShareWechat }}</p>
                  </div>
                  <div class="chatTools">
                    <div>
                      <img :src="WeChat" alt="" @click="shareWechatFn" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mainBoxRight">
              <div>
                <div class="rightContent">
                  <div class="rContentTitle">
                    <span>{{ userData.ftapTeacherName }}</span>
                    <div class="SexImg">
                      <img :src="sexImgUrl" alt="" />
                    </div>
                  </div>
                  <div class="rContent">
                    <div>
                      <div>
                        <span>{{ mTitle.Age }}：{{ userData.ftapAge }}</span>
                      </div>
                      <div>
                        <span
                          >{{ mTitle.Nationality }}：{{
                            userData.ftapCountry
                          }}</span
                        >
                      </div>
                      <div>
                        <span
                          >{{ mTitle.CurrentLocation }}：{{
                            userData.ftapCity
                          }}</span
                        >
                      </div>
                      <div>
                        <span
                          >{{ mTitle.ChineseLevell }}：{{
                            userData.ftapCheineseLevel
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace education">
                    <div>
                      <p>{{ mTitle.EducationalBackground }}</p>
                    </div>
                    <div>
                      <span>{{ userData.ftapEducationBackground }}</span>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace working">
                    <div>
                      <div>
                        <p>{{ mTitle.WorkingExperience }}</p>
                      </div>
                      <div class="workContent">
                        <div class="workContentBox">
                          <div class="workCompany">
                            <!-- <span>{{ userData.ftapWorkExperience }}</span> -->
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 6, maxRows: 8 }"
                              v-model="userData.ftapWorkExperience"
                              :disabled="true"
                            ></el-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div class="salary">
                      <p>{{ mTitle.SalaryExpectation }}</p>
                      <div>
                        <span class="money"
                          >{{ userData.ftapExpectedSalaryBottom }} -
                          {{ userData.ftapExpectedSalaryTop }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace">
                    <div class="salary">
                      <p>{{ mTitle.WorkPermit }}</p>
                      <div>
                        <span class="money">{{ visa }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rightContent">
                  <div class="workPlace lastOne">
                    <div>
                      <p>{{ mTitle.SelfIntroduction }}</p>
                      <div>
                        <!-- <p>{{userData.ftapSelfIntroduction}}</p> -->
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 6, maxRows: 8 }"
                          v-model="userData.ftapSelfIntroduction"
                          :disabled="true"
                        ></el-input>
                      </div>
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

    <div class="wechat">
      <el-dialog
        :title="shareWechatTitle"
        :visible.sync="shareWechat"
        width="243px"
        height="190px"
      >
        <span>
          <div id="qrcode" ref="qrcode"></div>
        </span>
      </el-dialog>
    </div>
    <div id="qrcode" ref="qrcode" style="display: none"></div>
  </div>
</template>

<script>
import { userMessageList, userMessageList2, ftApplyList2 } from '@/utils/index'
import QRCode from 'qrcodejs2'
export default {
  name: 'index',
  props: ['changeCNorEN'],
  data() {
    return {
      ChinaJobwebsite: 'http://www.Hi Chinajob.com ThisTeacher.com',
      shareWechat: false,
      shareWechatTitle: '',
      weChatMsgNone: true,
      phoneMsgNone: true,
      ifMsgNone: '',
      // 弹出微信框
      centerDialogVisible: false,
      centerDialogVisible2: false,
      // 改变弹出框颜色
      cBgColor: false,
      zhangMenImgUrl: '',
      WeChat: '',
      weChatImg: '',
      PhoneNumber: '',
      phoneImg: '',
      Whats: '',
      FaceBook: '',
      sexImgUrl: '',
      changeCNorEN2: '',
      mTitle: {
        ContactThisTeacher: '',
        ShareWechat: '',
        Age: '',
        Nationality: '',
        CurrentLocation: '',
        ChineseLevell: '',
        EducationalBackground: '',
        WorkingExperience: '',
        SalaryExpectation: '',
        WorkPermit: '',
        SelfIntroduction: '',
      },
      userData: [],
      GWData: [],
      headImg: '',
      visa: '',
      wechat: {
        wechatTitle: '',
        wechatMessage: '',
      },
      phone: {
        phoneTitle: '',
        phoneMessage: '',
      },
      Copy: ''
    };
  },
  methods: {
    clickWechat() {
      this.centerDialogVisible = true
    },
    clickPhone() {
      this.centerDialogVisible2 = true
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
    },
    shareWechatFn() {
      this.shareWechat = true
      if (document.getElementById('qrcode')) {
        document.getElementById('qrcode').innerHTML = ''//在调用qrCode前使用js原生方法清空元素内容
      }
      this.$nextTick(function () {
        let qrcode = new QRCode('qrcode', {
          width: 200, //图像宽度
          height: 200, //图像高度
          typeNumber: 4,
          correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
        })
        qrcode.makeCode(window.location.href) //生成另一个新的二维码
      })
    },
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 1)
  },
  created() {
    let urlTemp = "assets/logo.png";
    this.zhangMenImgUrl = require("@/" + urlTemp);
    this.WeChat = require("@/assets/wechat/微信(1).png")

    let _this = this
    let ftapId = Number(sessionStorage.getItem('ftapId'))
    ftApplyList2(ftapId).then(res => {
      console.log(res)
      userMessageList2(res.data.root[0].ftapUserId).then(res2 => {
        // console.log(res2)
        _this.userData = []
        _this.userData = Object.assign({}, res.data.root[0], res2.data.root[0])
        // console.log(_this.userData)
        _this.headImg = _this.userData.ftapImage
        if (_this.userData.ftapSex == 1) {
          _this.sexImgUrl = require('../assets/wechat/男.png')
        } else {
          _this.sexImgUrl = require('../assets/wechat/女.png')
        }

        if (sessionStorage.getItem('changeChinese') == 'false') {
          if (_this.userData.ftapWorkVisa == 1) {
            _this.visa = 'I’m holding a work visa'
          } else if (_this.userData.ftapWorkVisa == 2) {
            _this.visa = 'All documents are complete'
          } else {
            _this.visa = 'cannot apply for work visa'
          }

          if (_this.userData.ftapEducationBackground == '大专') {
            _this.userData.ftapEducationBackground = 'junior college'
          } else if (_this.userData.ftapEducationBackground == '本科') {
            _this.userData.ftapEducationBackground = 'undergraduate'
          } else if (_this.userData.ftapEducationBackground == '研究生') {
            _this.userData.ftapEducationBackground = 'graduate student'
          } else if (_this.userData.ftapEducationBackground == '博士') {
            _this.userData.ftapEducationBackground = 'doctor'
          }

          if (_this.userData.ftapCheineseLevel == '0') {
            _this.userData.ftapCheineseLevel = 'None'
          } else if (_this.userData.ftapCheineseLevel == '1') {
            _this.userData.ftapCheineseLevel = 'Little'
          } else if (_this.userData.ftapCheineseLevel == '2') {
            _this.userData.ftapCheineseLevel = 'Normal'
          } else {
            _this.userData.ftapCheineseLevel = 'Good'
          }
        } else {
          if (_this.userData.ftapWorkVisa == 1) {
            _this.visa = '已有工作签证'
          } else if (_this.userData.ftapWorkVisa == 2) {
            _this.visa = '所有文件已完成'
          } else {
            _this.visa = '不能申请工作签证'
          }

          if (_this.userData.ftapCheineseLevel == '0') {
            _this.userData.ftapCheineseLevel = '不会'
          } else if (_this.userData.ftapCheineseLevel == '1') {
            _this.userData.ftapCheineseLevel = '一点点'
          } else if (_this.userData.ftapCheineseLevel == '2') {
            _this.userData.ftapCheineseLevel = '基本交流'
          } else {
            _this.userData.ftapCheineseLevel = '流利'
          }

          if (_this.userData.ftapEducationBackground == 'junior college') {
            _this.userData.ftapEducationBackground == '大专'
          } else if (_this.userData.ftapEducationBackground == 'undergraduate') {
            _this.userData.ftapEducationBackground = '本科'
          } else if (_this.userData.ftapEducationBackground == 'graduate student') {
            _this.userData.ftapEducationBackground = '研究生'
          } else {
            _this.userData.ftapEducationBackground = '博士'
          }
        }

      })

      userMessageList2(res.data.root[0].ftapSellerId).then(res3 => {
        // console.log(res3)
        this.GWData = res3.data.root[0]
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
      })
    })

    // 控制中英文的数据
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    // this.changeCNorEN = sessionStorage.getItem('changeChinese')
    // console.log(this.changeCNorEN2)
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.weChatImg = require('../assets/wechat/微信Eng.png'),
        this.phoneImg = require('../assets/wechat/电话Eng.png'),
        this.mTitle = {
          ContactThisTeacher: 'Contact this teacher',
          ShareWechat: 'Share in Wechat',
          Age: 'Age',
          Nationality: 'Nationality',
          CurrentLocation: 'Current Location',
          ChineseLevell: 'Chinese Levell',
          EducationalBackground: 'Educational Background',
          WorkingExperience: 'Working Experience',
          SalaryExpectation: 'Salary Expectation',
          WorkPermit: 'Work Permit',
          SelfIntroduction: 'Self-introduction',
        }
      this.ifMsgNone = 'The foreign teacher / organization has no telephone / wechat'
      this.Copy = 'Copy'
      this.wechat = {
        wechatTitle: 'Wechat',
        wechatMessage: 'Wechat',
      },
        this.phone = {
          phoneTitle: 'Phone Number',
          phoneMessage: '+86',
        }
      this.shareWechatTitle = 'Share to wechat'


      if (this.userData.ftapWorkVisa == 1) {
        this.visa = 'I’m holding a work visa'
      } else if (this.userData.ftapWorkVisa == 2) {
        this.visa = 'All documents are complete'
      } else {
        this.visa = 'cannot apply for work visa'
      }
    } else {
      this.weChatImg = require('../assets/wechat/微信.png'),
        this.phoneImg = require('../assets/wechat/电话.png'),
        this.mTitle = {
          ContactThisTeacher: '联系该外教',
          ShareWechat: '分享到微信',
          Age: '年龄',
          Nationality: '国籍',
          CurrentLocation: '当前所在地',
          ChineseLevell: '中文水平',
          EducationalBackground: '教育背景',
          WorkingExperience: '工作经验',
          SalaryExpectation: '期望薪资',
          WorkPermit: '工作签证',
          SelfIntroduction: '自我介绍',
        },
        this.ifMsgNone = '该外教/机构未设置电话/微信'
      this.Copy = '复制',
        this.wechat = {
          wechatTitle: '微信',
          wechatMessage: '微信号',
        },
        this.phone = {
          phoneTitle: '电话',
          phoneMessage: '+86',
        }
      this.shareWechatTitle = '分享到微信'

      if (this.userData.ftapCheineseLevel == '0') {
        this.userData.ftapCheineseLevel = '不会'
      } else if (this.userData.ftapCheineseLevel == '1') {
        this.userData.ftapCheineseLevel = '一点点'
      } else if (this.userData.ftapCheineseLevel == '2') {
        this.userData.ftapCheineseLevel = '基本交流'
      } else {
        this.userData.ftapCheineseLevel = '流利'
      }
      if (this.userData.ftapWorkVisa == 1) {
        this.visa = '已有工作签证'
      } else if (this.userData.ftapWorkVisa == 2) {
        this.visa = '所有文件已完成'
      } else {
        this.visa = '不能申请工作签证'
      }
    }
  },
  watch: {
    changeCNorEN: {
      handler(newL, oldL) {
        // console.log(this.changeCNorEng)
        if (newL == 'false') {
          this.weChatImg = require('../assets/wechat/微信Eng.png'),
            this.phoneImg = require('../assets/wechat/电话Eng.png'),
            this.mTitle = {
              ContactThisTeacher: 'Contact this teacher',
              ShareWechat: 'Share in Wechat',
              Age: 'Age',
              Nationality: 'Nationality',
              CurrentLocation: 'Current Location',
              ChineseLevell: 'Chinese Levell',
              EducationalBackground: 'Educational Background',
              WorkingExperience: 'Working Experience',
              SalaryExpectation: 'Salary Expectation',
              WorkPermit: 'Work Permit',
              SelfIntroduction: 'Self-introduction',

              weChatImg: require('../assets/wechat/微信Eng.png'),
              phoneImg: require('../assets/wechat/电话Eng.png'),
            }
          this.ifMsgNone = 'The foreign teacher / organization has no telephone / wechat'
          this.Copy = 'Copy'
          this.wechat = {
            wechatTitle: 'Wechat',
            wechatMessage: 'Wechat',
          },
            this.phone = {
              phoneTitle: 'Phone Number',
              phoneMessage: '+86',
            }
          this.shareWechatTitle = 'Share to wechat'

          if (this.userData.ftapCheineseLevel == '不会') {
            this.userData.ftapCheineseLevel = 'None'
          } else if (this.userData.ftapCheineseLevel == '一点点') {
            this.userData.ftapCheineseLevel = 'Little'
          } else if (this.userData.ftapCheineseLevel == '基本交流') {
            this.userData.ftapCheineseLevel = 'Normal'
          } else {
            this.userData.ftapCheineseLevel = 'Good'
          }
          if (this.userData.ftapWorkVisa == 1) {
            this.visa = 'I’m holding a work visa'
          } else if (this.userData.ftapWorkVisa == 2) {
            this.visa = 'All documents are complete'
          } else {
            this.visa = 'cannot apply for work visa'
          }

          if (this.userData.ftapEducationBackground == '大专') {
            this.userData.ftapEducationBackground = 'junior college'
          } else if (this.userData.ftapEducationBackground == '本科') {
            this.userData.ftapEducationBackground = 'undergraduate'
          } else if (this.userData.ftapEducationBackground == '研究生') {
            this.userData.ftapEducationBackground = 'graduate student'
          } else if (this.userData.ftapEducationBackground == '博士') {
            this.userData.ftapEducationBackground = 'doctor'
          }
        } else {
          this.weChatImg = require('../assets/wechat/微信.png'),
            this.phoneImg = require('../assets/wechat/电话.png'),
            this.mTitle = {
              ContactThisTeacher: '联系该外教',
              ShareWechat: '分享到微信',
              Age: '年龄',
              Nationality: '国籍',
              CurrentLocation: '当前所在地',
              ChineseLevell: '中文水平',
              EducationalBackground: '教育背景',
              WorkingExperience: '工作经验',
              SalaryExpectation: '期望薪资',
              WorkPermit: '工作签证',
              SelfIntroduction: '自我介绍',

              weChatImg: require('../assets/wechat/微信.png'),
              phoneImg: require('../assets/wechat/电话.png'),
            }
          this.ifMsgNone = '该外教/机构未设置电话/微信'
          this.Copy = '复制',
            this.wechat = {
              wechatTitle: '微信',
              wechatMessage: '微信号',
            },
            this.phone = {
              phoneTitle: '电话',
              phoneMessage: '+86',
            }
          this.shareWechatTitle = '分享到微信'


          if (this.userData.ftapCheineseLevel == 'None') {
            this.userData.ftapCheineseLevel = '不会'
          } else if (this.userData.ftapCheineseLevel == 'Little') {
            this.userData.ftapCheineseLevel = '一点点'
          } else if (this.userData.ftapCheineseLevel == 'Normal') {
            this.userData.ftapCheineseLevel = '基本交流'
          } else {
            this.userData.ftapCheineseLevel = '流利'
          }
          if (this.userData.ftapWorkVisa == 1) {
            this.visa = '已有工作签证'
          } else if (this.userData.ftapWorkVisa == 2) {
            this.visa = '所有文件已完成'
          } else {
            this.visa = '不能申请工作签证'
          }

          if (this.userData.ftapEducationBackground == 'junior college') {
            this.userData.ftapEducationBackground = '大专'
          } else if (this.userData.ftapEducationBackground == 'undergraduate') {
            this.userData.ftapEducationBackground = '本科'
          } else if (this.userData.ftapEducationBackground == 'graduate student') {
            this.userData.ftapEducationBackground = '研究生'
          } else {
            this.userData.ftapEducationBackground = '博士'
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
.SexImg {
  display: inline-block;
  vertical-align: middle;
}
.SexImg > img {
  width: 44px;
  height: 44px;
  margin-left: 26px;
}
.el-main {
  background: rgb(246, 246, 248);
}
.main {
  padding: 57px 0 57px 0;
  margin-left: 13%;
  box-sizing: border-box;
  background: rgb(246, 246, 248);
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
  background: white;
}
.mLeftTop > div {
  text-align: center;
}
.zhangMenImg {
  font-size: 0;
}
.zhangMenImg > img {
  width: 268px;
  height: 268px;
  padding-top: 32px;
  padding-bottom: 38px;
  border-radius: 50%;
}
.mLeftTop > div > div > p {
  font-size: 28px;
  color: #080808;
  padding-bottom: 27px;
  box-sizing: border-box;
  margin: 0 17px;
  border-bottom: 1px solid #e5e5e5;
}
.WeChatAndPhone > div:first-child {
  padding: 31px 0 23px 0;
}
.WeChatAndPhone > div:last-child {
  padding: 0 0 47px 0;
}
.WeChatAndPhone > div > img {
  cursor: pointer;
}
.mLeftbottom {
  background: white;
  margin-top: 19px;
}
.mLeftbottom > div {
  text-align: center;
}
.yingPJobTitle {
  box-sizing: border-box;
}
.yingPJobTitle > p {
  font-size: 28px;
  color: #080808;
  padding: 25px 105px 27px;
  font-weight: bold;
}
.chatTools > div {
  padding-bottom: 33px;
}
.chatTools > div > img {
  cursor: pointer;
}

.mainBoxRight {
  max-width: 68%;
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
  padding: 74px 0 79px 0;
  width: 976px;
}
.rContentTitle > span {
  font-size: 36px;
  color: #000000;
  font-weight: bold;
  vertical-align: middle;
}
.rContent {
  border-bottom: 2px solid #e5e5e5;
}
.rContent > div {
  display: inline-block;
  padding-bottom: 41px;
}
.rContent > div > div {
  display: inline-block;
}
.rContent > div > div:nth-child(3) {
  margin-top: 31px;
}
.rContent > div > div:first-child {
  margin-right: 103px;
}
.rContent > div > div:nth-child(2) {
  margin-right: 117px;
}
.rContent > div > div:nth-child(4) {
  display: block;
  margin-top: 31px;
}
.rContent > div > div > span {
  font-size: 26px;
  line-height: 36px;
  color: #080808;
}

.workPlace {
  padding: 30px 0;
  border-bottom: 2px solid #e5e5e5;
  position: relative;
}
.lastOne {
  border: none;
  padding-bottom: 110px;
}
.lastOne > div > p {
  padding-bottom: 32px;
}
.lastOne > div > div > p {
  font-size: 24px;
  color: #51596f;
}
.workPlace::before {
  content: "";
  width: 6px;
  height: 24px;
  background: #003ab8;
  display: inline-block;
  position: absolute;
  top: 34px;
}
.workPlace > div {
  margin-left: 23px;
}
.workPlace > div > p {
  font-size: 24px;
  color: #080808;
}
.workPlace > div > span {
  font-size: 18px;
  color: #080808;
  line-height: 36px;
  font-weight: 700;
}
.workPlace > div > .eduTime {
  font-size: 14px;
  color: #8b90a1;
}
.workPlace > div > .condition {
  font-size: 22px;
  font-family: PingFangSC-Regular;
}
.salary {
  position: relative;
}
.salary > p {
  display: inline-block;
}
.salary > div {
  display: inline-block;
  position: absolute;
  right: 55px;
  top: 4px;
}
.salary > div > .money {
  font-size: 18px;
  font-weight: bold;
}
.fuli > li {
  display: inline-block;
  padding: 7px 16px;
  border: 1px solid #dfdfdf;
  border-radius: 23px;
  margin-right: 38px;
}
.working > div > .workContent:last-child {
  background: white;
}
.working > div {
  margin-left: 0;
}
.working > div > div:first-child {
  margin-left: 23px;
}
.working > div > div > p {
  font-size: 24px;
  color: #080808;
}
.working > div > div:first-child {
  margin-bottom: 15px;
}
.workContent {
  background: rgb(242, 245, 249);
}
.workContentBox > div:first-child {
  padding-top: 24px;
}
.workContentBox > div > span {
  font-size: 18px;
  font-weight: 700;
  color: #080808;
}
.workCompany > span {
  margin-right: 88px;
}

.workPart {
  padding-bottom: 17px;
}
.workPart > span:first-child {
  margin-right: 32px;
}
.workPart > span:last-child {
  margin-left: 32px;
}
.workContentBox > div > small {
  font-size: 14px;
  color: #8b90a1;
  font-weight: 700;
}

.workContentBox > span:first-child {
  margin-right: 64px;
}
.workResponsibility > div > p:first-child {
  color: #080808;
  font-weight: 700;
}
.workResponsibility > div > p {
  font-size: 16px;
  color: #8b90a1;
}
.workContent > div {
  padding-left: 23px;
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
.education > div:first-child {
  margin-bottom: 49px;
}
.education > div:nth-child(2) {
  margin-bottom: 41px;
}
.education > div > span:first-child {
  margin-right: 50px;
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
</style>
