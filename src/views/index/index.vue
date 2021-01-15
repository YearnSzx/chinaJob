<template>
  <div>
    <el-container>
      <!-- hea是引入头部的组件 -->
      <hea 
      @changeLanguage='changeCorE' 
      v-bind:changeHeadBg="changeHeadbg" 
      @signs='signSuccess'
      v-bind:changeHeadImg="headerImg"
      ></hea>
      <el-main>
        <router-view 
        v-bind:changeCNorEN="message" 
        v-bind:userId="uid" 
        v-bind:userMessage="userData" 
        v-bind:jigouMessage="jigouData" 
        @changeLanguage='changeCorE' 
        @gotoJieShao='changeHead' 
        @userWorkData='getUserDataChange'
        @headerUserImg="headUserImg"
        @jigouWorkData='getJigouDataChange'
         />
      </el-main>
      
      <el-footer>
        <foot></foot>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import hea from '../../components/header';   // 头部 
import foot from '../../components/footer';   // 底部 

export default {
  name:'index',
  components:{hea,foot},
  data() {
    return {
      message:'',
      uid:'',
      changeHeadbg:'',
      userData:'',
      jigouData:'',
      headerImg:''
    };
  },
  methods:{
    changeCorE(data){
      // console.log(data)
      this.message = data
    },
    signSuccess(data){
      // console.log(data)
      this.uid = data
    },
    changeHead(data){
      // console.log(data)
      this.changeHeadbg = data
    },
    getUserDataChange(data){
      this.userData = data
    },
    getJigouDataChange(data){
      // console.log('上传一次')
      this.jigouData = data
    },
    headUserImg(data){
      // console.log(data)
      this.headerImg = data
      // console.log(this.headerImg)
    }
  }
};
</script>

<style scoped>

/* 特殊 */
.el-menu{
  background: none;
  position: static;
  display: inline-block;
  vertical-align: middle;
  margin-left: 263px;
}
.el-menu.el-menu--horizontal{
  border: none;
}
.el-menu-item {
  font-size: 24px;
  color: white;
  margin: 0 30px;
}
.el-main{
  padding: 0;
  min-height: 631px;
}
.el-menu-item{
  padding: 0 50px;
}
.el-menu--horizontal>.el-menu-item.is-active{
  color: white;
  border-bottom: 4px solid white
}
/* 特殊 */

.el-footer {
  width: 100%;
  height: 200px !important;
  background: #1D1D1D;
  color: white;
  text-align: center;
  padding: 0;
}


.showRegister{
  cursor: pointer;
}
.register{
  
}
</style>
