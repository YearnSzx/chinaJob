<template>
  <div id="banner">
      <!--动态将图片轮播图的容器高度设置成与图片一致-->
      <el-carousel :height="bannerHeight + 'px'">
          <!--遍历图片地址,动态生成轮播图-->
          <el-carousel-item v-for="item in img_list" :key="item.id">
              <img :src="item.idView" class="image">
          </el-carousel-item>
      </el-carousel>
<!-- choiceBtnCN:{
        JobStatus:'工作方式',
        Nationality:'国籍',
        Gender:'性别',
        WorkPermit:'工作签证',

        All:'不限',
        Online:'在线',
        Offline:'来中国工作',

        NativeCountries:'母语国家',
        OtherCountries:'非母语国家',

        Male:'男',
        Female:'女',

        HoldWorkpermit:'已有工签',
        NewApplicant:'需要办理签证'
      } -->
    <!-- 筛选 -->
    <div id="jobChoice">
      <div class="jobChoice">
        <div class="jobChoiceBox" :class="{jobChoiceBox2:changeCNorEN == 'false'}">
          <div>
            <span>{{choiceBtnCN.JobStatus}}：</span>
            <span>{{choiceBtnCN.Nationality}}：</span>
            <span>{{choiceBtnCN.Gender}}：</span>
            <span>{{choiceBtnCN.WorkPermit}}：</span>
          </div>
          <div class="btn">
            <span :class="{active:show1 == null}" @click="column1(null)">{{choiceBtnCN.All}}</span>
            <span :class="{active:show2 == null}" @click="column2(null)">{{choiceBtnCN.All}}</span>
            <span :class="{active:show3 == null}" @click="column3(null)">{{choiceBtnCN.All}}</span>
            <span :class="{active:show4 == null}" @click="column4(null)">{{choiceBtnCN.All}}</span>
          </div>
          <div class="btn">
            <span :class="{active:show1 == 1}" @click="column1(1)">{{choiceBtnCN.Online}}</span>
            <span :class="{active:show2 == 1}" @click="column2(1)">{{choiceBtnCN.NativeCountries}}</span>
            <span :class="{active:show3 == 1}" @click="column3(1)">{{choiceBtnCN.Male}}</span>
            <span :class="{active:show4 == 1}" @click="column4(1)">{{choiceBtnCN.HoldWorkpermit}}</span>
          </div>
          <div class="btn">
            <span :class="{active:show1 == 2}" @click="column1(2)">{{choiceBtnCN.Offline}}</span>
            <span :class="{active:show2 == 2}" @click="column2(2)">{{choiceBtnCN.OtherCountries}}</span>
            <span :class="{active:show3 == 2}" @click="column3(2)">{{choiceBtnCN.Female}}</span>
            <span :class="{active:show4 == 2}" @click="column4(2)">{{choiceBtnCN.NewApplicant}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="FB_mt_message">
        <ul class="FB_mt_mesageBox">
        <li v-for="item in allData" :key="item.ftapId" @click="goToTeachMessage(item)">
            <div class="headImage">
              <img :src="item.ftapImage" alt="">
            </div>
            <div class="FB_mt_personMessage">
              <p>{{tData.tName}}:{{item.ftapTeacherName}}</p>
              <span>{{tData.tCountry}}:{{item.ftapCountry}}</span>
              <p>{{tData.hopePay}}:</p>
              <p>¥{{item.ftapExpectedSalaryBottom}}--{{item.ftapExpectedSalaryTop}}</p>
            </div>
        </li>
        </ul>
    </div>


    <div class="currentPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allDataLength">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {ftJobWanted,ftApplyList,ftJobWanted2} from '@/utils/index'
export default {
  name: "Banner",
  props:['changeCNorEN'],
  data() {
    return {
      currentPage:1,
      pagesize :10,
      // 全部数据
      allData:[],
      allDataLength:0,
      // 图片地址数组
      img_list:[
        {id:0,idView:require("../../../assets/图层747.png")}
      ], // 图片父容器高度
      bannerHeight: 0, // 浏览器宽度
      screenWidth: 0,
      choiceBtnCN:{
        JobStatus:'工作方式：',
        Nationality:'国籍：',
        Gender:'性别：',
        WorkPermit:'工作签证：',

        All:'不限',
        Online:'在线',
        Offline:'来中国工作',

        NativeCountries:'母语国家',
        OtherCountries:'非母语国家',

        Male:'男',
        Female:'女',

        HoldWorkpermit:'已有工签',
        NewApplicant:'需要办理签证'
      },
      changeCNorEN2:'',
      show1:null,
      show2:null,
      show3:null,
      show4:null,
      // 外教部分英文化
      tData:{
        tName:'',
        tCountry:'',
        hopePay:''
      }
    };
  },
  beforeCreate() {
    this.$emit('gotoJieShao',0)
  },
  created(){
    var data = {
      page:this.currentPage,
      limit:this.pagesize
    }
    ftJobWanted(data).then((res)=>{
      // console.log(res)
      this.allData = res.data.root
      this.allDataLength = res.data.totalSize
    })
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if (sessionStorage.getItem('changeChinese')=='false'){
      this.tData={
        tName:'Name',
        tCountry:'Nationality',
        hopePay:'Salary Expectation'
      }
      this.choiceBtnCN = {
        JobStatus:'JobStatus',
        Nationality:'Nationality',
        Gender:'Gender',
        WorkPermit:'WorkPermit',

        All:'All',
        Online:'Online',
        Offline:'Offline',

        NativeCountries:'Native Countries',
        OtherCountries:'Other Countries',

        Male:'Male',
        Female:'Female',

        HoldWorkpermit:'Holding Workvisa',
        NewApplicant:'New Applicant'
      }
    }else{
      this.tData={
        tName:'姓名',
        tCountry:'国籍',
        hopePay:'期望薪资'
      }
      this.choiceBtnCN = {
          JobStatus:'工作方式',
          Nationality:'国籍',
          Gender:'性别',
          WorkPermit:'工作签证',

          All:'不限',
          Online:'在线',
          Offline:'来中国工作',

          NativeCountries:'母语国家',
          OtherCountries:'非母语国家',

          Male:'男',
          Female:'女',

          HoldWorkpermit:'已有工签',
          NewApplicant:'需要办理签证'
      }
    }
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (350 / 900)*this.screenWidth;
      // console.log(this.screenWidth)
    },
    handleSizeChange(size) {
      this.pagesize = size;
      // console.log(this.pagesize)  //每页下拉显示数据
      // console.log(this.show1,this.show2,this.show3,this.show4)  //点击第几页

      if (this.show1 || this.show2 || this.show3 || this.show4) {
        // console.log(123)
        let data = {
          ftapWorkType:this.show1,
          ftapCountryType:this.show2,
          ftapSex:this.show3,
          ftapHaveVisa:this.show4,
          page:this.currentPage,
          limit:this.pagesize
        }
        // console.log(data)

        ftJobWanted2(data).then(res=>{
          // console.log(res)  
          this.allData = res.data.root
          this.allDataLength = res.data.totalSize
        })
      }else{
        // console.log(456)
        let data = {
          page:this.currentPage,
          limit:this.pagesize
        }
        ftJobWanted(data).then((res)=>{
          // console.log(res.data.root)
          this.allData = res.data.root
          this.allDataLength = res.data.totalSize
        })
      }
      
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage)  //点击第几页
      // console.log(this.show1,this.show2,this.show3,this.show4)  //点击第几页

      if (this.show1 || this.show2 || this.show3 || this.show4) {
        // console.log(123)
        let data = {
          ftapWorkType:this.show1,
          ftapCountryType:this.show2,
          ftapSex:this.show3,
          ftapHaveVisa:this.show4,
          page:this.currentPage,
          limit:this.pagesize
        }
        // console.log(data)

        ftJobWanted2(data).then(res=>{
          // console.log(res)
          this.allData = res.data.root
          this.allDataLength = res.data.totalSize


        })
      }else{
        // console.log(456)
        let data = {
          page:this.currentPage,
          limit:this.pagesize
        }
        ftJobWanted(data).then((res)=>{
          // console.log(res.data.root)
          this.allData = res.data.root
          // this.allDataLength = res.data.totalSize

        })
      }
   
    },
    column1(num){
      this.show1 = num
      this.currentPage = 1
      let data = {
        ftapWorkType:this.show1,
        ftapCountryType:this.show2,
        ftapSex:this.show3,
        ftapHaveVisa:this.show4,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log(data)

      ftJobWanted2(data).then(res=>{
        // console.log(res)
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
    column2(num){
      this.show2 = num
      // ftap County Type
      this.currentPage = 1
      let data = {
        ftapWorkType:this.show1,
        ftapCountryType:this.show2,
        ftapSex:this.show3,
        ftapHaveVisa:this.show4,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log('总数据'+data)
      ftJobWanted2(data).then(res=>{
        // console.log(res)
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
    column3(num){
      this.show3 = num
      this.currentPage = 1
      let data = {
        ftapWorkType:this.show1,
        ftapCountryType:this.show2,
        ftapSex:this.show3,
        ftapHaveVisa:this.show4,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log(data)
      ftJobWanted2(data).then(res=>{
        // console.log(res)
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
    column4(num){
      this.show4 = num
      this.currentPage = 1
      let data = {
        ftapWorkType:this.show1,
        ftapCountryType:this.show2,
        ftapSex:this.show3,
        ftapHaveVisa:this.show4,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log(data)
      ftJobWanted2(data).then(res=>{
        // console.log(res)
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
    goToTeachMessage(item){
      // console.log(item)
      sessionStorage.setItem('ftapId',item.ftapId)
      // console.log(item.ftapId)
      this.$router.push({ name: 'TeachJieShao' })
      // this.$emit('gotoJieShao',1)
    },
  },

  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize(); // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };

    // ftApplyList().then((res)=>{
      // console.log(res)
    // })
  },
  watch:{
    changeCNorEN:{
      handler(newL,oldL){
        if(newL=='false'){
          this.tData={
            tName:'Name',
            tCountry:'Nationality',
            hopePay:'Salary Expectation'
          }
          this.choiceBtnCN = {
            JobStatus:'JobStatus',
            Nationality:'Nationality',
            Gender:'Gender',
            WorkPermit:'WorkPermit',

            All:'All',
            Online:'Online',
            Offline:'Offline',

            NativeCountries:'Native Countries',
            OtherCountries:'Other Countries',

            Male:'Male',
            Female:'Female',

            HoldWorkpermit:'Holding Workvisa',
            NewApplicant:'New Applicant'
          }
        }else{
          this.tData={
            tName:'姓名',
            tCountry:'国籍',
            hopePay:'期望薪资'
          }
          this.choiceBtnCN = {
              JobStatus:'工作方式',
              Nationality:'国籍',
              Gender:'性别',
              WorkPermit:'工作签证',

              All:'不限',
              Online:'在线',
              Offline:'来中国工作',

              NativeCountries:'母语国家',
              OtherCountries:'非母语国家',

              Male:'男',
              Female:'女',

              HoldWorkpermit:'已有工签',
              NewApplicant:'需要办理签证'
          }
        }
      }
    }
  }
};
</script>



<style scoped>
.currentPage{
  background: white;
}
.currentPage>.el-pagination{
  text-align: center;
  padding: 76px 0;
}
.el-carousel__item h3{
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}
.active{
  color: #17B5E5;
}

/*   设置图片宽度和浏览器宽度一致 */
img{
  width: 100%;
  height: inherit;
}

#jobChoice{
  width: 100%;
  box-sizing: border-box;
  box-shadow: 6px 30px 30px -15px grey;
}
.jobChoice{
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 66px;
}
.jobChoiceBox>div{
  display: inline-block;
  margin-bottom: 65px;
}
.jobChoiceBox>.btn{
  cursor: pointer;
}
.jobChoiceBox>div>span{
  display: block;
  margin-bottom: 24px;
}
.jobChoiceBox>div>span{
  display: block;
  font-size: 24px;
}
.jobChoiceBox2>div>span{
  display: block;
  font-size: 24px;
}
.jobChoiceBox>div:first-child{
    margin-right: 120px;
}
.jobChoiceBox2>div:first-child{
    margin-right: 160px;
}
.jobChoiceBox>div:nth-child(3){
    margin: 0 185px;
}
.jobChoiceBox2>div:nth-child(3){
    margin: 0 170px;
}
.jobChoiceBox>div:nth-child(3),.jobChoiceBox>div:nth-child(4){
    text-align: center;
}

.FB_mt_message{
  max-width: 1200px;
  margin: 0 auto
}
.FB_mt_mesageBox{
  margin-top: 25px;
}
.FB_mt_mesageBox>li{
  display: inline-block;
  margin-right: 82px;
}
.FB_mt_mesageBox>li:nth-child(5n){
  margin-right: 0;
}
.headImage{
  width: 174px;
  height: 168px;
  background: #CFCFCF;
  display: inline-block;
  margin-bottom: 30px;
  margin-top: 78px;

}
.FB_mt_personMessage{
  width: 174px;
  text-align: left;
  font-size: 18px;
  color: #0E0E0E;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.FB_mt_personMessage>p,.FB_mt_personMessage>span{
  line-height: 30px;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.FB_mt_personMessage>p:last-child{
  color: gray;
}
.ohterTongue{
  margin-top: 153px;
  margin-bottom: 23px;
}
.ohterTongue>img{
  width: 410px;
  height: 78px;
}

.FB_ot_message{
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 310px;
}
.FB_ot_mesageBox>li{
  display: inline-block;
  margin-right: 82px;
}
.FB_ot_mesageBox>li:nth-child(5n){
  margin-right: 0;
}
.headImage{
  width: 174px;
  height: 168px;
  background: #CFCFCF;
  display: inline-block;
  margin-bottom: 14px;
  margin-top: 47px;

}
.FB_ot_personMessage{
  text-align: left;
  font-size: 18px;
  color: #0E0E0E;
}
.FB_ot_personMessage>p,.FB_mt_personMessage>span{
  line-height: 36px;
}
</style>
