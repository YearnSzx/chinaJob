<template>
  <div>
    <div class="UserSetting">
      <div class="USBox">
        <div>
          <div class="usContent">
            <div class="usContentBox">
              <el-row>
                <el-col :span="24">
                  <div class="msgTitle">
                    {{ textTitle.PostingRecruitingInformation }}
                  </div>
                </el-col>
              </el-row>

              <el-form ref="form" :model="form" :rules="rulesFn()">
                <el-form-item prop="CName">
                  <div class="msgContentTitle1">{{ textTitle.CName }}</div>
                  <el-input
                    v-model="form.CName"
                    maxlength="20"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item prop="EName">
                  <div class="msgContentTitle1">{{ textTitle.EName }}</div>
                  <el-input
                    v-model="form.EName"
                    maxlength="15"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item prop="Titleofri">
                  <div class="msgContentTitle1">{{ textTitle.Titleofri }}</div>
                  <el-input v-model="form.Titleofri"></el-input>
                </el-form-item>

                <!-- <el-form-item prop="WorkingLocation">
                  
                  <el-input v-model="form.WorkingLocation"></el-input>
                </el-form-item> -->

                <el-form-item prop="WorkingLocation">
                  <div class="msgContentTitle1">
                    {{ textTitle.WorkingLocation }}
                  </div>
                  <el-cascader
                    v-model="form.WorkingLocation"
                    :placeholder="select"
                    :options="cityData"
                    @change="handleChange"
                  >
                  </el-cascader>
                </el-form-item>

                <el-form-item prop="WorkingMode">
                  <div class="msgContentTitle1">
                    {{ textTitle.WorkingMode }}
                  </div>
                  <el-radio-group v-model="form.WorkingMode">
                    <el-radio label="1">{{ textTitle.online }}</el-radio>
                    <el-radio label="2">{{ textTitle.onChina }}</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item>
                  <div class="msgContentTitle1">
                    {{ textTitle.SalaryRange }}
                  </div>
                  <el-col :span="11">
                    <el-form-item prop="minPay">
                      <el-input v-model="form.minPay"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">to</el-col>
                  <el-col :span="11">
                    <el-form-item prop="maxPay">
                      <el-input v-model="form.maxPay"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item prop="Benefits">
                  <div class="msgContentTitle1">{{ textTitle.Benefits }}</div>
                  <el-input
                    type="textarea"
                    v-model="form.Benefits"
                    :autosize="{ minRows: 6, maxRows: 25 }"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="JobDetails">
                  <div class="msgContentTitle1">{{ textTitle.JobDetails }}</div>
                  <el-input
                    type="textarea"
                    v-model="form.JobDetails"
                    :autosize="{ minRows: 6, maxRows: 25 }"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="Qualifications">
                  <div class="msgContentTitle1">
                    {{ textTitle.Qualifications }}
                  </div>
                  <el-input
                    type="textarea"
                    v-model="form.Qualifications"
                    :autosize="{ minRows: 6, maxRows: 25 }"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <div class="msgContentTitle1">{{ textTitle.UploadLogo }}</div>
                  <el-upload
                    action="http://admin.hichinajob.com/system/fileUpload/uploadFile"
                    list-type="picture-card"
                    :on-success="UpLoadSuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-change="handleLimit"
                    :on-remove="handleRemove"
                    :auto-upload="true"
                    :file-list="imageFileList"
                    :limit="1"
                    :class="{ disabled: uploadDisabled }"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item>

                <el-form-item class="submitMessage">
                  <el-button type="primary" @click="submitForm('form')">{{
                    textTitle.sub
                  }}</el-button>
                </el-form-item>

                <el-form-item>
                  <img :src="headimg" alt="" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orgApplyAdd, changeOrreMsg, orreRecruit4 } from '@/utils/index'  // 登陆接口
import { getCity } from '../../api/data'

export default {
  props: ['changeCNorEN', 'jigouMessage'],
  data() {
    return {
      nicheng: '',
      userName: '',
      userPassword: '',
      autoUp: false,
      headimg: '',
      form: {
        CName: '',
        EName: '',
        Titleofri: '',
        WorkingLocation: '',
        WorkingMode: '',
        maxPay: '',
        minPay: '',
        Benefits: '',
        JobDetails: '',
        Qualifications: '',
        UploadLogo: ''
      },
      rules: {
        CName: [
          { required: true, message: 'Please enter the Chinese name of the organization', trigger: 'blur' },
        ],
        EName: [
          { required: true, message: 'Please enter the English name of the organization', trigger: 'blur' },
        ],
        Titleofri: [
          { required: true, message: 'Please enter the title of Recruitment Information', trigger: 'blur' }
        ],
        WorkingLocation: [
          { required: true, message: 'Please enter work location', trigger: 'blur' }
        ],
        WorkingMode: [
          { required: true, message: 'Please select the working mode', trigger: 'change' }
        ],
        minPay: [
          { required: true, message: 'Please enter the minimum expected salary', trigger: 'blur' }
        ],
        maxPay: [
          { required: true, message: 'Please enter the maximum expected salary', trigger: 'blur' }
        ],
        Benefits: [
          { required: true, message: 'Please enter other benefits', trigger: 'blur' }
        ],
        JobDetails: [
          { required: true, message: 'Please input the work content', trigger: 'blur' }
        ],
        Qualifications: [
          { required: true, message: 'Please enter job requirements', trigger: 'blur' }
        ]
      },
      rulesChinese: {
        CName: [
          { required: true, message: '请输入机构中文名', trigger: 'blur' },
        ],
        EName: [
          { required: true, message: '请输入机构英文名', trigger: 'blur' },
        ],
        Titleofri: [
          { required: true, message: '请输入招聘信息的标题', trigger: 'blur' }
        ],
        WorkingLocation: [
          { required: true, message: '请输入工作地点', trigger: 'blur' }
        ],
        WorkingMode: [
          { required: true, message: '请输入工作方式', trigger: 'change' }
        ],
        minPay: [
          { required: true, message: '请输入最低期望薪资', trigger: 'blur' }
        ],
        maxPay: [
          { required: true, message: '请输入最高期望薪资', trigger: 'blur' }
        ],
        Benefits: [
          { required: true, message: '请输入其他福利', trigger: 'blur' }
        ],
        JobDetails: [
          { required: true, message: '请输入工作内容', trigger: 'blur' }
        ],
        Qualifications: [
          { required: true, message: '请输入工作要求', trigger: 'blur' }
        ]
      },
      imageFileList: [],
      textTitle: {
        PostingRecruitingInformation: '',
        CName: '',
        EName: '',
        Titleofri: '',
        WorkingLocation: '',
        WorkingMode: '',
        SalaryRange: '',
        Benefits: '',
        JobDetails: '',
        Qualifications: '',
        UploadLogo: '',
        sub: '',

        online: '',
        onChina: ''
      },
      changeCNorEN2: '',
      // 照片上传
      dialogImageUrl: '',
      dialogVisible: false,
      headImgPath: '',
      uploadDisabled: false,
      modefyData: '',

      select: '',
      cityData: ''
    }
  },
  methods: {
    handleChange(value) {
      console.log()
    },
    rulesFn() {
      if (sessionStorage.getItem('changeChinese') == 'false') {
        return this.rules
      } else {
        return this.rulesChinese
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid == false) {
          if (sessionStorage.getItem('changeChinese') == 'false') {
            this.$notify({
              title: 'success',
              message: 'Please add a picture',
              type: 'error'
            });
          } else {
            this.$notify({
              title: '失败',
              message: '有必填项为空',
              type: 'error'
            });
          }
          return false
        }
        if (this.imageFileList == '') {
          valid = false
          if (sessionStorage.getItem('changeChinese') == 'false') {
            this.$notify({
              title: 'failed',
              message: 'Please add a picture',
              type: 'error'
            });
          } else {
            this.$notify({
              title: '上传失败',
              message: '请添加头像',
              type: 'error'
            });
          }
          return false
        }
        if (valid) {
          // console.log(this.imageFileList)
          let routeFrom = Number(sessionStorage.getItem('routerFrom'))
          // console.log(this.modefyData)
          if (routeFrom == 2 && this.modefyData) {
            let oid = this.jigouMessage.orreId
            let uid = this.jigouMessage.orreUserId
            // console.log(this.form.WorkingLocation)
            // if(this.form.WorkingLocation){

            // }
            this.form.WorkingLocation = this.form.WorkingLocation[1]
            let data = {
              orreId: oid,
              orreUserId: uid,
              orreOrgName: this.form.CName,
              orreOrgNameEn: this.form.EName,
              orrePosition: this.form.Titleofri,
              orreWorkAddress: this.form.WorkingLocation,
              orreWorkType: this.form.WorkingMode,
              orreExpectedSalaryTop: this.form.maxPay,
              orreExpectedSalaryBottom: this.form.minPay,
              orreOtherWelfare: this.form.Benefits,
              orreWorkContent: this.form.JobDetails,
              orreWorkRequirements: this.form.Qualifications,
              orreLogo: this.headImgPath
            }
            console.log(data)
            changeOrreMsg(data).then(res => {
              // console.log(res)
              if (res.data.success) {
                this.$router.push({ path: '/jobDetails' })
              }
            })
          } else {
            let uid = Number(sessionStorage.getItem('userId'))
            let data = {
              orreUserId: uid,
              orreOrgName: this.form.CName,
              orreOrgNameEn: this.form.EName,
              orrePosition: this.form.Titleofri,
              orreWorkAddress: this.form.WorkingLocation,
              orreWorkType: this.form.WorkingMode,
              orreExpectedSalaryTop: this.form.maxPay,
              orreExpectedSalaryBottom: this.form.minPay,
              orreOtherWelfare: this.form.Benefits,
              orreWorkContent: this.form.JobDetails,
              orreWorkRequirements: this.form.Qualifications,
              orreLogo: this.headImgPath
            }
            // console.log(data)
            orgApplyAdd(data).then((res1) => {
              // console.log(res1)
              if (res1.data.success) {
                if (sessionStorage.getItem('changeChinese') == 'false') {
                  this.$notify({
                    title: 'success',
                    message: 'Added successfully',
                    type: 'success'
                  });
                } else {
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                  });
                }
                setTimeout(() => {
                  this.$router.push({ path: '/jobDetails' })
                }, 500);
              } else {
                if (sessionStorage.getItem('changeChinese') == 'false') {
                  this.$notify({
                    title: 'success',
                    message: 'Added faild',
                    type: 'success'
                  });
                } else {
                  this.$notify({
                    title: '失败',
                    message: '添加失败',
                    type: 'faild'
                  });
                }
              }
            })
          }

        } else {
          return false;
        }
      });
    },

    handleRemove(file, fileList) {
      this.uploadDisabled = false;
      let list = [];
      if (fileList.length === 0) {
        this.imageFileList = list;
      } else {
        for (var i = 0; i < fileList.length; i++) {
          list.push({
            name: fileList[i].name,
            url: fileList[i].url
          })
        }
        this.imageFileList = list;
      }
    },
    handleLimit(file, fileList) {
      if (fileList.length == 1) {
        this.uploadDisabled = true;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    UpLoadSuccess(response, file, fileList) {
      this.imageFileList.push({
        name: file.name,
        url: 'http://admin.hichinajob.com' + response.path,
        type: '.' + file.name.split(".")[file.name.split(".").length - 1]
      });
      this.headImgPath = 'http://admin.hichinajob.com' + response.path
    },
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 1)
  },
  created() {
    // 城市的中英切换
    let citys = getCity();
    if (sessionStorage.getItem('changeChinese') == 'false') {
      citys.forEach(city => {
        if (city.children) {
          city.label = city.value
          let citySons = city.children
          citySons.forEach(citySon => {
            citySon.label = citySon.value
          });
        }
      });
    }
    this.cityData = citys

    this.$emit('gotoJieShao', 1)
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.textTitle = {
        PostingRecruitingInformation: 'Posting recruiting information',
        CName: 'Company’s Name ( Chinese )',
        EName: 'Company’s Name ( English )',
        Titleofri: 'Title of recruitment information',
        WorkingLocation: 'Working Location',
        WorkingMode: 'Working Mode',
        SalaryRange: 'Salary Range',
        Benefits: 'Benefits',
        JobDetails: 'Job Details',
        Qualifications: 'Qualifications',
        UploadLogo: 'Upload Logo',
        sub: 'Post',

        online: 'Online',
        onChina: 'In China'
      }
      this.select = 'Please select'
    } else {
      this.textTitle = {
        PostingRecruitingInformation: '发布招聘信息',
        CName: '机构中文名',
        EName: '机构英文名',
        Titleofri: '招聘信息的标题（请用英语填写）',
        WorkingLocation: '工作地点',
        WorkingMode: '工作方式',
        SalaryRange: '期望薪资',
        Benefits: '其他福利（请用英语填写）',
        JobDetails: '工作内容（请用英语填写）',
        Qualifications: '任职要求（请用英语填写）',
        UploadLogo: '企业logo上传',
        sub: '上传',

        online: '线上',
        onChina: '中国'
      }
      this.select = '请选择'
    }
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 0)
  },
  mounted() {
    // 判断是否是从修改过来
    if (sessionStorage.getItem('clearData') == 'true') {
      this.modefyData = this.jigouMessage
    }
    // console.log(getCity())
    let citys = getCity()
    citys.forEach(city => {
      if (city.children) {
        let citySons = city.children
        citySons.forEach(citySon => {
          // console.log(citySon.value)
          if (this.modefyData.orreWorkAddress == citySon.value) {
            // console.log('成功了')
          }
        });
      }
    });
    // console.log(this.modefyData.orreWorkAddress)
    this.form = {
      CName: this.modefyData.orreOrgName,
      EName: this.modefyData.orreOrgNameEn,
      Titleofri: this.modefyData.orrePosition,
      WorkingLocation: this.modefyData.orreWorkAddress,
      WorkingMode: this.modefyData.orreWorkType,
      maxPay: this.modefyData.orreExpectedSalaryTop,
      minPay: this.modefyData.orreExpectedSalaryBottom,
      Benefits: this.modefyData.orreOtherWelfare,
      JobDetails: this.modefyData.orreWorkContent,
      Qualifications: this.modefyData.orreWorkRequirements,
    }
    let img = this.modefyData.orreLogo || '';
    this.imageFileList.push({
      name: img,
      url: img,
      type: '.' + img.split(".")[img.split(".").length - 1]
    });
    if (img) {
      this.uploadDisabled = true
    }
    // console.log(this.imageFileList[0].url)
    if (this.imageFileList[0].url == '') {
      this.imageFileList = []
      let data = {
        orreUserId: Number(sessionStorage.getItem('userId'))
      }
      orreRecruit4(data).then(res => {
        // console.log(res.data.root.length)
        let leng = Number(res.data.root.length) - 1
        // console.log(res.data.root[leng])
        if (res.data.root && res.data.root.length > 0) {
          // console.log('发布过招聘信息')
          let obj = res.data.root[leng]
          if (obj.orreLogo !== null && obj.orreLogo !== '' && obj !== '') {

            this.imageFileList = [];
            let img = obj.orreLogo || '';
            this.imageFileList.push({
              name: img,
              url: img,
              type: '.' + img.split(".")[img.split(".").length - 1]
            });
            if (img) {
              this.uploadDisabled = true
            }

          }
        } else {
          // this.userImgUrl = require("@/assets/logo22.png");
          // console.log('还未曾发布过招聘信息')
        }
      })
    } else {
      // console.log(this.imageFileList)
    }
    sessionStorage.setItem('clearData', false)
  },
  watch: {
    changeCNorEN: {
      handler(newL, oldL) {
        if (sessionStorage.getItem('changeChinese') == 'false') {
          this.textTitle = {
            PostingRecruitingInformation: 'Posting recruiting information',
            CName: 'Company’s Name ( Chinese )',
            EName: 'Company’s Name ( English )',
            Titleofri: 'Title of recruitment information',
            WorkingLocation: 'Working Location',
            WorkingMode: 'Working Mode',
            SalaryRange: 'Salary Range',
            Benefits: 'Benefits',
            JobDetails: 'Job Details',
            Qualifications: 'Qualifications',
            UploadLogo: 'Upload Logo',
            sub: 'Post',

            online: 'Online',
            onChina: 'In China'
          }
          this.select = 'Please select'

          let citys = getCity();
          if (sessionStorage.getItem('changeChinese') == 'false') {
            citys.forEach(city => {
              if (city.children) {
                city.label = city.value
                let citySons = city.children
                citySons.forEach(citySon => {
                  citySon.label = citySon.value
                });
              }
            });
          }
          this.cityData = citys
        } else {
          this.textTitle = {
            PostingRecruitingInformation: '发布招聘信息',
            CName: '机构中文名',
            EName: '机构英文名',
            Titleofri: '招聘信息的标题（请用英语填写）',
            WorkingLocation: '工作地点',
            WorkingMode: '工作方式',
            SalaryRange: '期望薪资',
            Benefits: '其他福利（请用英语填写）',
            JobDetails: '工作内容（请用英语填写）',
            Qualifications: '任职要求（请用英语填写）',
            UploadLogo: '企业logo上传',
            sub: '上传',

            online: '线上',
            onChina: '中国'
          }
          this.select = '请选择'

          let citys = getCity();
          this.cityData = citys
        }
      }
    },
  }
}

</script>

<style scoped>
.UserSetting {
  width: 100%;
  background: #f6f6f8;
  display: inline-block;
}
.USBox {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  margin-bottom: 108px;
}
.usContent {
  width: 100%;
  /* height: 900px; */
  background: white;
}
.usContentBox {
  width: 100%;
  display: inline-block;
  font-size: 0;
  box-sizing: border-box;
  padding: 56px 0;
}

.msgTitle {
  font-size: 32px;
  color: #080808;
  line-height: 40px;
  padding-bottom: 30px;
  text-align: center;
  font-weight: 600;
  border-bottom: 10px solid #26282c;
  margin-bottom: 57px;
}
.msgContentTitle1 {
  font-size: 22px;
  color: #080808;
  margin-bottom: 10px;
  line-height: initial;
}
.msgContentTitle1::before {
  content: "*";
  color: red;
  margin-right: 5px;
}
.msgContentTitle2 {
  font-size: 22px;
  color: #080808;
  margin-bottom: 10px;
}
.line {
  text-align: left;
}
.submitMessage {
  text-align: right;
}
.submitMessage > div > button {
  padding: 20px 52px;
  font-size: 26px;
  background: #003ab8;
}

.usContentBox >>> .el-input {
  width: 100% !important;
}
.usContentBox >>> .el-select {
  display: block;
}
.usContentBox >>> .el-form-item {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 25px;
}
.usContentBox >>> .el-input__inner {
  height: 58px;
  font-size: 25px;
}
.usContentBox >>> .el-radio__label {
  font-size: 24px;
  padding-left: 24px;
  vertical-align: middle;
}
.usContentBox >>> .el-radio__inner {
  width: 24px;
  height: 24px;
}
.usContentBox >>> .el-col-2 {
  line-height: 58px;
  font-size: 32px;
  text-align: center;
}
.usContentBox >>> .el-textarea__inner {
  font-size: 25px;
}

/* // .el-upload--picture-card 控制加号部分 */
.usContentBox >>> .disabled .el-upload--picture-card {
  display: none !important;
}

.usContentBox >>> .el-cascader {
  width: 100%;
}
</style>
