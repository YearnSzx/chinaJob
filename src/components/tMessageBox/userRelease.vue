<template>
  <div>
    <div class="UserSetting">
      <div class="USBox">
        <div>
          <div class="usContent">
            <div class="usContentBox">

              <el-row>
                <el-col :span="24">
                  <div class="msgTitle"> {{ mTitle.CandidatesInformation}} </div>
                </el-col>
              </el-row>
              <div class="formBox">
                <el-form ref="form" :model="form" :rules="rules">
                  <el-form-item prop="name">
                    <div class="msgContentTitle1 must"> {{ mTitle.name}} </div>
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item prop="sex">
                    <div class="msgContentTitle2 must"> {{ mTitle.sex}} </div>
                    <el-radio-group v-model="form.sex">
                      <el-radio label="1">{{male}}</el-radio>
                      <el-radio label="2">{{female}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item prop="birthday">
                    <div class="msgContentTitle1 must"> {{ mTitle.BirthDate}} </div>
                    <el-date-picker
                      v-model="form.BirthDate"
                      type="date"
                      :placeholder="choiceDate"
                      format="yyyy - MM - dd "
                      value-format="yyyy-MM-dd"
                      >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item prop="country">
                    <div class="msgContentTitle1 must"> {{ mTitle.Nationality}} </div>
                    <!-- <el-input v-model="form.Nationality"></el-input> b89 mn -->
                    <el-select v-model="form.Nationality" :placeholder="mTitle.choice" filterable>
                      <el-option
                        v-for="item in Countrys"
                        :key="item.value"
                        :label="itemlabel(item)"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="nowLocation">
                    <div class="msgContentTitle1 must"> {{ mTitle.nowLocation}} </div>
                    <el-input v-model="form.nowLocation"></el-input>
                  </el-form-item>
                  <el-form-item prop="workplace">
                    <div class="msgContentTitle1 must"> {{ mTitle.workplace}} </div>
                    <el-radio-group v-model="form.workplace">
                      <el-radio label="1">{{ mTitle.online}}</el-radio>
                      <el-radio label="2">{{ mTitle.onChina}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item prop="ChineseStandard">
                    <div class="msgContentTitle1 must"> {{ mTitle.ChineseStandard}} </div>
                    <el-radio-group v-model="form.ChineseStandard">
                      <!-- 不会 -->
                      <el-radio label="0">{{ mTitle.ChineseStanNone}}</el-radio>
                      <!-- 一点点 -->
                      <el-radio label="1">{{ mTitle.ChineseStanLittle}}</el-radio>
                      <!-- 基本交流 -->
                      <el-radio label="2">{{ mTitle.ChineseStanNormal}}</el-radio>
                      <!-- 流利 -->
                      <el-radio label="3" style="margin-top:20px">{{ mTitle.ChineseStanGood}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item prop="education">
                    <div class="msgContentTitle1 must"> {{ mTitle.education}} </div>
                    <el-select v-model="form.education" :placeholder="eduBg">
                      <el-option
                        v-for="item in qualifications"
                        :key="item.label"
                        :label="itemlabel(item)"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <div class="msgContentTitle1 must"> {{ mTitle.hopePay}} </div>
                    <el-col class="line" :span="3">From</el-col>
                    <el-col :span="9">
                      <el-form-item prop="minPay">
                          <el-input v-model="form.minPay"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">to</el-col>
                    <el-col :span="9">
                      <el-form-item prop="maxPay">
                          <el-input v-model="form.maxPay"></el-input>
                      </el-form-item>
                    </el-col>

                  </el-form-item>
                
                  <el-form-item prop="workVisa">
                    <div class="msgContentTitle1 must"> {{ mTitle.workVisa}} </div>
                    <el-radio-group v-model="form.workVisa">
                      <el-radio label="1">{{ mTitle.haveVisa}}</el-radio>
                      <el-radio label="2" style="margin-top:20px">{{ mTitle.filesComplete}}</el-radio>
                      <el-radio label="3" style="margin-top:20px">{{ mTitle.noVisa}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item prop="workExp">
                    <div class="msgContentTitle1"> {{ mTitle.workExp}} </div>
                    <el-input 
                      type="textarea" 
                      v-model="form.workExp"
                      :autosize="{ minRows: 10, maxRows: 25}"
                      ></el-input>
                  </el-form-item>

                  <el-form-item prop="selfItd">
                    <div class="msgContentTitle1"> {{ mTitle.selfItd}} </div>
                    <el-input 
                      type="textarea" 
                      v-model="form.selfItd"
                      :autosize="{ minRows: 10, maxRows: 25}"
                      ></el-input>
                  </el-form-item>

                  <el-form-item prop="personPhoto">
                    <div class="msgContentTitle1"> {{ mTitle.personPhoto}} </div>
                    <el-upload
                      action="http://admin.hichinajob.com/system/fileUpload/uploadFile"
                      list-type="picture-card"
                      ref="upload"
                      :on-success="UpLoadSuccess"
                      :on-preview="handlePictureCardPreview"
                      :on-change="handleLimit"
                      :on-remove="handleRemove"
                      :auto-upload="true"
                      :limit='1'
                      :file-list="imageFileList"
                      :class="{disabled:uploadDisabled}"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  
                  <el-form-item class="submitMessage">
                    <el-button type="primary" @click="submitForm('form')"> {{ mTitle.sub}} </el-button>
                  </el-form-item>
                  
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ftApply,getCountry,ftApplyList} from '@/utils/index'  // 登陆接口
export default {
  props:['changeCNorEN','userId','userMessage'],
  data () {
    return {
      // 各个国家
      Countrys:'',
      nicheng:'',
      userName:'',
      userPassword:'',
      autoUp:false,
      headerimg:'',
      choiceDate:'',   // 选择日期
      male:'',
      female:'',
      eduBg:'',
      form: {
          name: '',             // 名字 ftapTeacherName 
          sex: '',              // 性别 ftapSex 1 or 2  
          BirthDate:'',         // 生日
          Nationality:'',
          nowLocation:'',       // 现在所在地 ftapCountry     
          workplace:'',         // 工作地点 ftapIntentionCity
          ChineseStandard:'',   // 中文水平 ftapCheineseLevel
          education:'',         // 教育水平 ftapEducationBackground
          minPay:'',            // 最低工资 ftapExpectedSalaryBottom
          maxPay:'',            // 最高工资 ftapExpectedSalaryTop
          workVisa:'',          // 工作签证 ftapHaveVisa
          workExp:'',           // 工作经验 ftapWorkExperience 
          selfItd:''            // 自我介绍 tapSelfIntroduction 
      },
      english:true,
      rules: {
        name: [
          { required: true, message: 'Please enter your name', trigger: 'blur' },
        ],
        sex: [
          {  required: true, message: 'Please enter your gender', trigger: 'change' }
        ],
        BirthDate: [
          { type: 'date', required: true, message: 'Please enter your birth date', trigger: 'change' }
        ],
        Nationality: [
          { required: true, message: 'Please enter your nationality', trigger: 'change' }
        ],
        nowLocation: [
          { required: true, message: 'Please enter your current residence', trigger: 'blur' }
        ],
        workplace: [
          { required: true, message: 'Please enter your work style', trigger: 'change' }
        ],
        ChineseStandard: [
          { required: true, message: 'Please input your Chinese level', trigger: 'change'  }
        ],
        education: [
          { required: true, message: 'Please enter your education background', trigger: 'change' }
        ],
        minPay: [
          { required: true, message: 'Please enter your minimum salary expectation', trigger: 'blur' }
        ],
        maxPay: [
          { required: true, message: 'Please enter your maximum salary expectation', trigger: 'blur' }
        ],
        workVisa: [
          { required: true, message: 'Please select your work visa status', trigger: 'change' }
        ]
      },
      qualifications:[
        {value:'junior college',label:'大专'},
        {value:'undergraduate',label:'本科'},
        {value:'jgraduate student',label:'研究生'},
        {value:'doctor',label:'博士'},
      ],
      mTitle:{
        CandidatesInformation:'',
        name:'',
        sex:'',
        BirthDate:'',
        Nationality:'',
        nowLocation:'',
        workplace:'',
        ChineseStandard:'',
        education:'',
        hopePay:'',
        workVisa:'',
        workExp:'',
        selfItd:'',
        personPhoto:'',
        sub:'',
        
        online:'',
        onChina:'',
        ChineseStanNone:'',
        ChineseStanLittle:'',
        ChineseStanNormal:'',
        ChineseStanGood:'',
        juniorCollege:'',
        undergraduate:'',
        graduateStudent:'',
        doctor:'',
        haveVisa:'',
        filesComplete:'',
        noVisa:'',

        choice:''
      },
      // 照片上传
      dialogImageUrl: '',
      dialogVisible: false,
      changeCNorEN2:'',
      userid:'',
      headImgPath:'',
      uploadDisabled:false,
      imageFileList:[]
    }
  },

  beforeCreate(){
    this.$emit('gotoJieShao',1)
  },
  created(){
    this.Countrys = getCountry()

    this.headerimg = this.userMessage.ftapImage
    // console.log(this.headerimg)

    this.$emit('gotoJieShao',1)
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if(this.english = true){
      this.choiceDate = 'Select a date'
      this.male = 'male'
      this.female = 'female'
      this.eduBg = 'educational background'
      this.mTitle={
        CandidatesInformation:'Candidates’ Information',
        name:'Name',
        sex:'Gender',
        BirthDate:'Date of Birth',
        Nationality:'Nationality',
        nowLocation:'Current Location',
        workplace:'Working expectation',
        ChineseStandard:'Chinese Standard',
        education:'Educcation Background',
        hopePay:'Salary Expectation',
        workVisa:'Work visa conditions',
        workExp:'Working experience',
        selfItd:'Self-Introduction',
        personPhoto:'Photos',
        sub:'Post',

        online:'Online',
        onChina:'Work in China',
        ChineseStanNone:'None',
        ChineseStanLittle:'Little',
        ChineseStanNormal:'Normal',
        ChineseStanGood:'Good',

        juniorCollege:'junior college',
        undergraduate:'undergraduate',
        graduateStudent:'graduate student',
        doctor:'doctor',

        haveVisa:'I’m holding a work visa',
        filesComplete:'All documents are complete',
        noVisa:'cannot apply for work visa',
        choice:'Please select'
      }
      // this.text.details = 'Job details'
    }else{
      this.male = '男'
      this.female = '女'
      this.eduBg = '教育背景'
      this.choiceDate = '选择日期'
      this.mTitle={
        CandidatesInformation:'求职者信息',
        name:'姓名',
        sex:'性别',
        BirthDate:'生日',
        Nationality:'国籍',
        nowLocation:'现在居住地',
        workplace:'工作方式',
        ChineseStandard:'中文水平',
        education:'教育背景',
        hopePay:'期望薪酬',
        workVisa:'工作签证',
        workExp:'工作经验',
        selfItd:'介绍自己',
        personPhoto:'照片',
        sub:'上传',

        online:'线上',
        onChina:'中国',
        ChineseStanNone:'没有',
        ChineseStanLittle:'一点点',
        ChineseStanNormal:'基本交流',
        ChineseStanGood:'流利',
        juniorCollege:'大专',
        undergraduate:'本科',
        graduateStudent:'研究生',
        doctor:'博士',
        haveVisa:'已经有签证了',
        filesComplete:'所有文件已完成',
        noVisa:'不能申请工作签证',
        choice:'请选择'
      }
    }
  },
  methods:{
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (this.imageFileList == '') {
            valid =false
            if(sessionStorage.getItem('changeChinese')=='false'){
              this.$notify({
                  title: 'failed',
                  message: 'Please add a picture',
                  type: 'error'
              });
            }else{
              this.$notify({
                title: '上传失败',
                message: '请添加头像',
                type: 'error'
              });
            }
            return false
          }
          // headerUserImg
          if (valid) {
              this.$refs.upload.submit() // 上传文件操作
              // console.log(this.userId)
              let uid = Number(sessionStorage.getItem('userId'))
              let data = {
                ftapUserId:uid,
                ftapTeacherName:this.form.name,
                ftapSex:Number(this.form.sex),
                ftapTeacherBirthday:this.form.BirthDate,
                ftapCity:this.form.nowLocation,
                ftapWorkType:this.form.workplace,
                ftapCountry:this.form.Nationality,
                ftapIntentionCity:Number(this.form.workplace),
                ftapCheineseLevel:String(this.form.ChineseStandard),
                ftapEducationBackground:this.form.education,
                ftapExpectedSalaryBottom:this.form.minPay,
                ftapExpectedSalaryTop:this.form.maxPay,
                ftapHaveVisa:Number(this.form.workVisa),
                ftapWorkExperience:this.form.workExp,
                ftapSelfIntroduction:this.form.selfItd,
                ftapImage:this.headImgPath
              }
              this.autoUp = true
              // console.log(data)
              
              ftApply(data).then((res)=>{
                // console.log(res)
                this.autoUp = false
                if (res.data.success) {
                  let fid = {
                    ftapUserId:Number(sessionStorage.getItem('userId'))
                  }
                  ftApplyList(fid).then(res=>{
                    // console.log(res.data.root)
                    if (res.data.root == []) {
                      // console.log('发布等于空')
                    }
                  })
                  if(this.english = true){
                    this.$notify({
                        title: 'success',
                        message: 'Added successfully',
                        type: 'success'
                    });
                  }else{
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    });
                  }
                  
                  setTimeout(() => {
                    this.$router.push({path:'/userWork'})
                  }, 700);
                }else{
                  if(this.english = true){
                    this.$notify({
                        title: 'faild',
                        message: 'Added faild',
                        type: 'faild'
                    });
                  }else{
                    this.$notify({
                        title: '失败',
                        message: '添加失败',
                        type: 'faild'
                    });
                  }
                  
                }
              })
          } else {
            alert('There are required items not filled in!');
            return false;
          }
        });
      },
   
     handleRemove(file, fileList) {
      // console.log(file, fileList);
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
     handleLimit(file,fileList){
      //  console.log(file,fileList)
        if(fileList.length == 1){
          this.uploadDisabled = true;
        }
      },
     handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
     },
     UpLoadSuccess(response, file, fileList){
        this.imageFileList.push({
          name: file.name,
          url: 'http://admin.hichinajob.com'+response.path,
          type: '.' + file.name.split(".")[file.name.split(".").length - 1]
        });
      //  console.log(response)
       this.headImgPath = 'http://admin.hichinajob.com'+response.path
      //  console.log(this.headImgPath)
      //  console.log(file)
      //  console.log(fileList)
     },
     itemlabel(item){
       if(this.english = true){
          return item.value
       }else{
          return item.label
       }
     }
  },
  mounted(){
    let data = {
      ftapUserId:Number(sessionStorage.getItem('userId'))
    }
    ftApplyList(data).then(res=>{
      // console.log(res)
      if (res.data.root[0]) {
        this.form = {
          name: res.data.root[0].ftapTeacherName,             // 名字 ftapTeacherName 
          sex: String(res.data.root[0].ftapSex),              // 性别 ftapSex 1 or 2  
          BirthDate:new Date(res.data.root[0].ftapTeacherBirthday),         // 生日
          Nationality:res.data.root[0].ftapCountry,
          nowLocation:res.data.root[0]. ftapCity,       // 现在所在地 ftapCountry     
          workplace:String(res.data.root[0].ftapWorkType),         // 工作地点 ftapIntentionCity
          ChineseStandard:res.data.root[0].ftapCheineseLevel,   // 中文水平 ftapCheineseLevel
          education:res.data.root[0].ftapEducationBackground,         // 教育水平 ftapEducationBackground
          minPay:res.data.root[0].ftapExpectedSalaryBottom,            // 最低工资 ftapExpectedSalaryBottom
          maxPay:res.data.root[0].ftapExpectedSalaryTop,            // 最高工资 ftapExpectedSalaryTop
          workVisa:res.data.root[0].ftapHaveVisa,          // 工作签证 ftapHaveVisa
          workExp:res.data.root[0].ftapWorkExperience	,           // 工作经验 ftapWorkExperience 
          selfItd:res.data.root[0].ftapSelfIntroduction            // 自我介绍 tapSelfIntroduction 
        }
        this.imageFileList = [];
        let img = res.data.root[0].ftapImage || '';
        this.imageFileList.push({
          name: img,
          url: img,
          type: '.' + img.split(".")[img.split(".").length - 1]
        });
        if (img) {
          this.uploadDisabled = true
        }
      }
      // console.log(this.imageFileList)
    })
    
  },
  watch:{
    changeCNorEN:{
      handler(newL,oldL){
        if(this.english = true){
          this.eduBg = 'educational background'
          this.male = 'male'
          this.female = 'female'
          this.choiceDate = 'Select a date'
          this.mTitle={
            CandidatesInformation:'Candidates’ Information',
            name:'Name',
            sex:'Gender',
            BirthDate:'Date of Birth',
            Nationality:'Nationality',
            nowLocation:'Current Location',
            workplace:'Working expectation',
            ChineseStandard:'Chinese Standard',
            education:'Educcation Background',
            hopePay:'Salary Expectation',
            workVisa:'Work visa conditions',
            workExp:'Working experience',
            selfItd:'Self-Introduction',
            personPhoto:'Photos',
            sub:'Post',

            online:'Online',
            onChina:'Work in China',
            ChineseStanNone:'None',
            ChineseStanLittle:'Little',
            ChineseStanNormal:'Normal',
            ChineseStanGood:'Good',
            juniorCollege:'junior college',
            undergraduate:'undergraduate',
            graduateStudent:'graduate student',
            doctor:'doctor',
            haveVisa:'I’m holding a work visa',
            filesComplete:'All documents are complete',
            noVisa:'cannot apply for work visa',

            choice:'Please select'
          }
          // this.text.details = 'Job details'
        }else{
          this.eduBg = '教育背景'
          this.man = '男'
          this.female = '女'
          this.choiceDate = '选择日期'
          this.mTitle={
            CandidatesInformation:'求职者信息',
            name:'姓名',
            sex:'性别',
            BirthDate:'生日',
            Nationality:'国籍',
            nowLocation:'现在居住地',
            workplace:'工作方式',
            ChineseStandard:'中文水平',
            education:'教育背景',
            hopePay:'期望薪酬',
            workVisa:'工作签证',
            workExp:'工作经验',
            selfItd:'介绍自己',
            personPhoto:'照片',
            sub:'上传',
            
            online:'线上',
            onChina:'中国',
            ChineseStanNone:'没有',
            ChineseStanLittle:'一点点',
            ChineseStanNormal:'基本交流',
            ChineseStanGood:'流利',
            juniorCollege:'大专',
            undergraduate:'本科',
            graduateStudent:'研究生',
            doctor:'博士',
            haveVisa:'已经有签证了',
            filesComplete:'所有文件已完成',
            noVisa:'不能申请工作签证',

            choice:'请选择'
          }
      }
      }
    },
    userMessage:{
      handler(newData,oldData){
        // console.log('434354')
      },
      deep:true
    }
  }
}

</script>

<style scoped>
.UserSetting{
  width: 100%;
  background: #F6F6F8;
  display: inline-block;
}
.USBox{
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  margin-bottom: 108px;
}
.usContent{
  width: 100%;
  /* height: 900px; */
  background: white;
}
.usContentBox{
  width: 100%;
  display: inline-block;
  font-size: 0;
  box-sizing: border-box;
  padding: 40px 0;
}

.msgTitle{
  font-size: 30px;
  color: #080808;
  line-height: 40px;
  padding-bottom: 34px;
  text-align: center;
  font-weight: 600;
  border-bottom:10px solid #26282C;
  margin-bottom: 60px;
}
.msgContentTitle1{
  font-size: 26px;
  color: #080808;
  margin-bottom: 11px;
}
.msgContentTitle2{
  font-size: 26px;
  color: #080808;
  margin-bottom: 30px;
}
.line{
  text-align: left;
}
.submitMessage{
  text-align: right;
}
.submitMessage>div>button{
  padding: 20px 52px;
  font-size: 26px;
  background: #003AB8;
}




.el-input{
  width: 100%!important;
}
.el-select{
  display: block;
}
.el-form-item{
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 25px;
}
.formBox>>>.el-input__inner{
  height: 58px;
  font-size: 25px;
}
.formBox>>>.el-radio__label{
  font-size: 24px;
  padding-left: 34px;
  vertical-align: middle;
}
.el-radio__inner{
  width: 24px;
  height: 24px;
}
.el-col-3{
  line-height: 55px;
  font-size: 20px;
  text-align: center;
}
.el-textarea__inner{
  font-size: 25px;
}



/* // .el-upload--picture-card 控制加号部分 */
.formBox>>>.disabled .el-upload--picture-card {
    display: none!important;
}
.headimg{
  display: inline-block;
}
.headimg>img{
  width: 148px;
  height: 148px;
}



.must::before{
  content: '*';
  color: red;
}
</style>
