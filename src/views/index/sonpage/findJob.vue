<template>
  <div id="banner">
    <!--动态将图片轮播图的容器高度设置成与图片一致-->
    <el-carousel :height="bannerHeight + 'px'">
        <!--遍历图片地址,动态生成轮播图-->
        <el-carousel-item v-for="item in img_list" :key="item.id" >
            <img :src="item.idView" class="image">
        </el-carousel-item>
    </el-carousel>

    <!-- 筛选 -->
    <div id="jobChoice">
      <div class="jobChoice">
        <div class="jobChoiceBox" :class="{jobChoiceBox2:changeCNorEN == 'false'}">
          <div>
            <span>{{choiceBtnCN.WorkMode}}</span>
            <span>{{choiceBtnCN.IndustrialType}}</span>
            <span>{{choiceBtnCN.SchoolType}}</span>
          </div>
          <div class="btn btn1">
            <span :class="{active:show1 == null}" @click="column1(null)">{{choiceBtnCN.All}}</span>
            <span :class="{active:show2 == null}" @click="column2(null)">{{choiceBtnCN.All}}</span>
            <span :class="{active:show3 == null}" @click="column3(null)">{{choiceBtnCN.All}}</span>
          </div>
          <div class="btn btn2">
            <span :class="{active:show1 == 1}" @click="column1(1)">{{choiceBtnCN.Online}}</span>
            <span :class="{active:show2 == 1}" @click="column2(1)">{{choiceBtnCN.Preschool}}</span>
            <span :class="{active:show3 == 1}" @click="column3(1)">{{choiceBtnCN.TrainingCentre}}</span>
          </div>
          <div class="btn btn3">
            <span :class="{active:show1 == 2}" @click="column1(2)">{{choiceBtnCN.Offline}}</span>
            <span :class="{active:show2 == 2}" @click="column2(2)">{{choiceBtnCN.OtherCountries}}</span>
            <span :class="{active:show3 == 2}" @click="column3(2)">{{choiceBtnCN.PublicSchool}}</span>
          </div>
          <div class="btn btn4">
            <span></span>
            <span :class="{active:show2 == 3}" @click="column2(3)">{{choiceBtnCN.HighSchool}}</span>
            <span :class="{active:show3 == 3}" @click="column3(3)">{{choiceBtnCN.InternationalSchool}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="jobfindContent">
      <div class="jfcBox">
        <ul>
          <li v-for="item in allData" :key="item.orreId">
            <div class="userMsg" @click="goToJigouMessage(item.orreId)">
              <div>
                <p>{{item.orrePosition}}</p>
                <p>{{Salary}}：¥{{item.orreExpectedSalaryBottom}}-{{item.orreExpectedSalaryTop}}</p>
                <p>{{WorkingCity}}：{{item.orreWorkAddress}}</p>
                <!-- <p>{{item.orreOrgNameEn}}</p> -->

                <p v-if="nameEn == true">{{item.orreOrgNameEn}}</p>
                <p v-if="nameEn == false">{{item.orreOrgName}}</p>
              </div>
              
              <div class="jigouLogo">
                <img :src="item.orreLogo" class="logo">
              </div>
            </div>
            
          </li>
        </ul>
      </div>
    </div>

    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allDataLength">
      </el-pagination>
    </div>


  </div>
</template>
<style>

</style>


<script>
import {orreRecruit2,orreRecruit,orreRecruit3} from '@/utils/index'
export default {
  props:['changeCNorEN'],
  data() {
    return {
      nameEn:'',
      currentPage:1,
      pagesize :5,
      // 全部数据
      allData:[],
      allDataLength: 0,
      // 图片地址数组
      img_list:[
        {id:0,idView:require("../../../assets/图层748.png")}
      ], // 图片父容器高度
      bannerHeight: 0, // 浏览器宽度
      screenWidth: 0,
      jigouLogo:{id:0,idView:require("../../../assets/掌门.png")},
      choiceBtnCN:{
        WorkMode:'工作方式：',
        IndustrialType: '行业类别：',
        SchoolType:'学校类别：',

        All:'不限',

        Online:'在线',
        Preschool:'学前教育',
        TrainingCentre:'培训机构',


        Offline:'来中国工作',
        OtherCountries:'中等教育',
        PublicSchool:'公立学校',

        HighSchool:'高等教育',
        InternationalSchool:'国际学校'
      },
      changeCNorEN2:'',
      show1:null,
      show2:null,
      show3:null,
      // 薪资和工作城市
      Salary:'',
      WorkingCity:''
    };
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
      let data = {
        page:this.currentPage,
        limit:this.pagesize
      }
      orreRecruit(data).then((res)=>{
        // console.log(res.data.root)
        this.allData = res.data.root
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage,this.pagesize)  //点击第几页
      let data = {
        page:this.currentPage,
        limit:this.pagesize
      }
      orreRecruit(data).then((res)=>{
        // console.log(res.data.root)
        this.allData = res.data.root
      })
    },
    goToJigouMessage(orreId){
      // console.log(orreId)
      sessionStorage.setItem('orreId',orreId)
      this.$router.push({ name: 'JigouJieShao' })
      this.$emit('gotoJieShao',1)
    },
    column1(num){
      this.show1 = num
      this.currentPage = 1
      let data = {
        orreWorkType:this.show1,
        orreIndustryCategory:this.show2,
        orreSchoolType:this.show3,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log(data)
      orreRecruit3(data).then((res)=>{
        // console.log(res) 
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
    column2(num){
      this.show2 = num
      this.currentPage = 1
      let data = {
        orreWorkType:this.show1,
        orreIndustryCategory:this.show2,
        orreSchoolType:this.show3,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log(data)
      orreRecruit3(data).then((res)=>{
        // console.log(res) 
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
    column3(num){
      this.show3 = num
      this.currentPage = 1
      let data = {
        orreWorkType:this.show1,
        orreIndustryCategory:this.show2,
        orreSchoolType:this.show3,
        page:this.currentPage,
        limit:this.pagesize
      }
      // console.log(data)
      orreRecruit3(data).then((res)=>{
        // console.log(res) 
        this.allData = res.data.root
        this.allDataLength = res.data.totalSize
      })
    },
  },
  beforeCreate() {
    this.$emit('gotoJieShao',0)
  },
  created(){
    var data = {
      page:this.currentPage,
      limit:this.pagesize
    }
    orreRecruit(data).then((res)=>{
      // console.log(res) 
      this.allData = res.data.root
      this.allDataLength = res.data.totalSize
    })
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if (sessionStorage.getItem('changeChinese')=='false'){
      this.choiceBtnCN={
        WorkMode:'Work Mode: ',
        IndustrialType: 'Industrial Type: ',
        SchoolType:'School Type: ',

        All:'All',

        Online:'Online',
        Preschool:'Pre-school',
        TrainingCentre:'Training Centre',


        Offline:'Work in China',
        OtherCountries:'Middle School',
        PublicSchool:'Public School',

        HighSchool:'High School',
        InternationalSchool:'International School'
      }
      this.Salary='Salary',
      this.WorkingCity='Working City'
      this.nameEn = true
    }else{
      
      this.choiceBtnCN={
        WorkMode:'工作方式：',
        IndustrialType: '行业类别：',
        SchoolType:'学校类别：',

        All:'不限',

        Online:'在线',
        Preschool:'学前教育',
        TrainingCentre:'培训机构',


        Offline:'来中国工作',
        OtherCountries:'中等教育',
        PublicSchool:'公立学校',

        HighSchool:'高等教育',
        InternationalSchool:'国际学校'
      } 
      this.Salary='薪资',
      this.WorkingCity='工作城市'
      this.nameEn = false
    }
  },
 
  mounted() {  
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize(); // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
  },
  watch:{
    changeCNorEN:{
      handler(newL,oldL){
        if(newL=='false'){
          this.choiceBtnCN={
            WorkMode:'Work Mode: ',
            IndustrialType: 'Industrial Type: ',
            SchoolType:'School Type: ',

            All:'All',

            Online:'Online',
            Preschool:'Pre-school',
            TrainingCentre:'Training Centre',


            Offline:'Work in China',
            OtherCountries:'Middle School',
            PublicSchool:'Public School',

            HighSchool:'High School',
            InternationalSchool:'International School'
          }
          this.Salary='Salary',
          this.WorkingCity='Working City'
          this.nameEn = true
        }else{
          this.choiceBtnCN={
            WorkMode:'工作方式：',
            IndustrialType: '行业类别：',
            SchoolType:'学校类别：',

            All:'不限',

            Online:'在线',
            Preschool:'学前教育',
            TrainingCentre:'培训机构',


            Offline:'来中国工作',
            OtherCountries:'中等教育',
            PublicSchool:'公立学校',

            HighSchool:'高等教育',
            InternationalSchool:'国际学校'
          }
          this.Salary='薪资',
          this.WorkingCity='工作城市'
          this.nameEn = false
        }
      }
    }
  }
};
</script>



<style scoped>
.active{
  color: #17B5E5;
}
.el-pagination{
  text-align: center;
  padding: 100px 0;
  background: #F9F9F9;
}
.el-carousel__item h3{
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n){
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1){
}
/*   设置图片宽度和浏览器宽度一致 */
image{
  width: 100%;
  height: inherit;
}

#jobChoice{
  width: 100%;
  box-sizing: border-box;
}
.jobChoice{
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 66px;
}
.jobChoiceBox>div{
  display: inline-block;
  margin-bottom: 82px;
}
.jobChoiceBox>.btn{
  cursor: pointer;
}
.jobChoiceBox>div>span{
  display: block;
  margin-bottom: 25px;
  font-size: 24px;
}
.jobChoiceBox>div>span:last-child{
  margin-bottom: 0;
}
.jobChoiceBox2>div>span{
  display: block;
  font-size: 24px;
}
.jobChoiceBox>div:first-child{
    margin-right: 135px;
}

.jobChoiceBox>div:nth-child(3){
    margin-left: 159px;
}

.jobChoiceBox>div:nth-child(3),.jobChoiceBox>div:nth-child(4){
    text-align: center;
}
.jobChoiceBox>div:nth-child(4){
    margin: 0 158px;
}

.jobChoiceBox2>div:first-child{
    margin-right: 65px;
}
.jobChoiceBox2>div:nth-child(3){
    margin-left: 112px;
}
.jobChoiceBox2>div:nth-child(4){
    margin: 0 87px;
}
/* 内容 */
.jobfindContent{
  width: 100%;
  background: #F9F9F9;
}
.jfcBox{
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 82px;
}
.jfcBox>ul{
  width: 100%;
  background: #F9F9F9;;
}
.jfcBox>ul>li{
  margin-bottom: 18px;
  border-radius: 4px;
  background: white;
}
.jfcBox>ul>li:last-child{
  margin-bottom: 0px;
}
/* .jfcBox>ul>li>div{
  display: inline-block;
} */
.jfcBox>ul>li>div::after{
  clear: both;
}
.userMsg{
  padding: 20px 0 23px 41px;
  box-sizing: border-box;
  vertical-align: middle;
  position: relative;
  margin-right: 50px;
}
.userMsg>div{
  display: inline-block;
}
.userMsg>div>p{
  margin-bottom: 14px;
  font-size: 20px;
}
.userMsg>div>p:nth-child(2){
  font-size: 24px;
  font-weight: 600;
}
.userMsg>div>p:last-child{
  margin: 0;
}
.jigouLogo{
  font-size: 0;
  position: absolute;
  right: 0;
  top: 30px;
}
.jigouLogo>img{
  width: 170px;
  height: 124px;
}

.el-carousel__item>img{
  width: 100%;
  height: inherit;
}
</style>
