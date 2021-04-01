<template>
  <div id="banner">
        <!--动态将图片轮播图的容器高度设置成与图片一致-->
        <el-carousel :height="bannerHeight + 'px'">
            <!--遍历图片地址,动态生成轮播图-->
            <el-carousel-item v-for="item in img_list" :key="item.id">
                <img :src="item.idView" class="image" />
      </el-carousel-item>
    </el-carousel>

    <!-- 最新招聘 -->
    <div id="recruit">
      <div class="recruit">
        <div
          class="recruitImg"
          :class="{ recruitImg2: changeCNorEN == 'false' }"
        >
          <img :src="redirect" alt="" />
        </div>
        <div class="recruitMessage">
          <ul class="RMBox">
            <li
              v-for="item in rm_message"
              :key="item.orreId"
              @mouseover="selectStyle(item)"
              :class="{ active: item.active }"
              @mouseout="outStyle(item)"
              @click="goToJigouMessage(item.orreId)"
            >
              <div class="RMBox_sBox_top">
                <p>{{ item.orrePosition }}</p>
                <span
                  >¥{{ item.orreExpectedSalaryBottom }}--¥{{
                    item.orreExpectedSalaryTop
                  }}
                  month</span
                >
              </div>
              <div class="RMBox_sBox_bot">
                <div>
                  <div class="greyBlock">
                    <img :src="item.orreLogo" alt="" />
                  </div>
                  <p v-if="orreNameEn == 'true'">{{ item.orreOrgName }}</p>
                  <p v-if="orreNameEn == 'false'">{{ item.orreOrgNameEn }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最新求职 -->
    <div id="findJob">
      <div class="findJob">
        <div
          class="findJobBg"
          :class="{ findJobBg2: changeCNorEN == 'false' }"
          style="font-size: 0"
        >
          <img :src="findJobBgImg" alt="" />
          <div class="motherTongue">
            <img :src="motherTongueImg" alt="" />
          </div>
        </div>
        <!-- 文字部分 母语国家-->
        <div class="FB_mt_message">
          <ul class="FB_mt_mesageBox">
            <li
              v-for="item in motherTongue"
              :key="item.ftapId"
              @click="goToTeachMessage(item.ftapId)"
            >
              <div class="headImage">
                <!-- <img :src="item.ftapImage" alt="" /> -->
                <div class="demo-image">
                  <div class="block">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item.ftapImage"
                    ></el-image>
                  </div>
                </div>
              </div>

              <div class="FB_mt_personMessage">
                <p>{{ tData.tName }}:{{ item.ftapTeacherName }}</p>
                <span>{{ tData.tCountry }}:{{ item.ftapCountry }}</span>
                <p>
                  {{ tData.hopePay }}:¥{{ item.ftapExpectedSalaryBottom }}/month
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 其他国家 -->
        <div class="ohterTongue">
          <img :src="ohterTongueImg" alt="" />
        </div>
        <!-- 文字部分 其他国家-->
        <div class="FB_ot_message">
          <ul class="FB_ot_mesageBox">
            <li
              v-for="item in motherTongue2"
              :key="item.ftapId"
              @click="goToTeachMessage(item.ftapId)"
            >
              <div class="headImage">
                <img :src="item.ftapImage" alt="" />
              </div>
              <div class="FB_ot_personMessage">
                <p>{{ tData.tName }}:{{ item.ftapTeacherName }}</p>
                <span>{{ tData.tCountry }}:{{ item.ftapCountry }}</span>
                <p>
                  {{ tData.hopePay }}:¥{{ item.ftapExpectedSalaryBottom }}/month
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

import { ftJobWanted, ftJobWanted2, orreRecruit, userMessageList } from '@/utils/index'
export default {
  name: "Banner",
  props: ['changeCNorEN'],
  data() {
    return {
      active: false,  
      findJobBgImg: require("../../../assets/最新求职.jpg"),
      motherTongueImg: require('../../../assets/母语国家.jpg'),
      ohterTongueImg: require('../../../assets/其他国家.jpg'),
      // 图片地址数组
      img_list: [
        { id: 0, idView: require("../../../assets/banner1.png") },
        { id: 1, idView: require("../../../assets/banner2.png") },
        { id: 2, idView: require("../../../assets/banner3.png") },
      ], // 图片父容器高度
      bannerHeight: 0, // 浏览器宽度
      screenWidth: 0,
      redirect: require("../../../assets/最新招聘.jpg"),
      rm_message: [],
      motherTongue: [],
      motherTongue2: [],
      changeCNorEN2: '',
      // 外教部分英文化
      tData: {
        tName: '',
        tCountry: '',
        hopePay: ''
      },
      orreNameEn: 'false',
    };
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (350 / 900) * this.screenWidth;
      // console.log(this.screenWidth)
    },
    selectStyle(item) {
      var _this = this;
      this.$nextTick(() => {
        this.rm_message.forEach(function (item) {
          _this.$set(item, 'active', false);
        });
        this.$set(item, 'active', true);
      });
    },
    outStyle(item) {
      this.$set(item, 'active', false);
    },


    goToTeachMessage(ftapId) {
      sessionStorage.setItem('ftapId', ftapId)
      this.$router.push({ name: 'TeacherInformation' })
      this.$emit('gotoJieShao', 1)
    },
    goToJigouMessage(orreId) {
      // console.log(orreId)
      sessionStorage.setItem('orreId', orreId)
      this.$router.push({ name: 'PositionDetails' })
      this.$emit('gotoJieShao', 1)
    }
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 0)
  },
  created() {
    userMessageList().then(res => {
      console.log(res)
    })

    // 控制中英文的数据
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    // this.changeCNorEN = sessionStorage.getItem('changeChinese')
    // console.log(this.changeCNorEN2)
    // console.log(this.orreNameEn)
    if (this.orreNameEn === null || this.orreNameEn === '' || this.orreNameEn === [] || this.orreNameEn === 'null') {
      this.orreNameEn = 'false'
    }
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.tData = {
        tName: 'Name',
        tCountry: 'Nationality',
        hopePay: 'Salary'
      }
      this.redirect = require("../../../assets/EHome/img1.png")
      this.findJobBgImg = require("../../../assets/EHome/img2.png")
      this.motherTongueImg = require("../../../assets/EHome/img3.png")
      this.ohterTongueImg = require("../../../assets/EHome/img4.png")
    } else {
      this.tData = {
        tName: '姓名',
        tCountry: '国籍',
        hopePay: '期望薪资'
      }
      this.redirect = require("../../../assets/最新招聘.png"),
        this.findJobBgImg = require("../../../assets/最新求职.png"),
        this.motherTongueImg = require('../../../assets/母语国家.png'),
        this.ohterTongueImg = require('../../../assets/其他国家.png')
    }
    let data = {
      page: 1,
      limit: 6
    }
    orreRecruit(data).then((res) => {
      this.rm_message = res.data.root
    })
    var data2 = {
      page: 1,
      limit: 20,
      ftapCountryType: 1
    }
    ftJobWanted2(data2).then((res) => {
      // console.log(res)
      this.motherTongue = res.data.root
    })

    let data3 = {
      page: 1,
      limit: 20,
      ftapCountryType: 2
    }
    ftJobWanted2(data3).then((res) => {
      // console.log(res)
      this.motherTongue2 = res.data.root
    })
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
  watch: {
    changeCNorEN: {
      handler(newL, oldL) {
        this.orreNameEn = newL
        if (this.orreNameEn === null || this.orreNameEn === '' || this.orreNameEn === [] || this.orreNameEn === 'null') {
          this.orreNameEn = 'false'
        }
        this.tData = {
          tName: 'Name',
          tCountry: 'Nationality',
          hopePay: 'Salary'
        }
        if (newL == 'false') {
          this.redirect = require("../../../assets/EHome/img1.png")
          this.findJobBgImg = require("../../../assets/EHome/img2.png")
          this.motherTongueImg = require("../../../assets/EHome/img3.png")
          this.ohterTongueImg = require("../../../assets/EHome/img4.png")
        } else {
          this.tData = {
            tName: '姓名',
            tCountry: '国籍',
            hopePay: '期望薪资'
          }
          this.redirect = require("../../../assets/最新招聘.png"),
            this.findJobBgImg = require("../../../assets/最新求职.png"),
            this.motherTongueImg = require('../../../assets/母语国家.png'),
            this.ohterTongueImg = require('../../../assets/其他国家.png')
        }
      }
    }
  }
};
</script>



<style scoped>
.active {
  box-shadow: 0 0 15px grey;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}
/*   设置图片宽度和浏览器宽度一致 */
img {
  /* width: 100%; */
  height: inherit;
}

/* 最新招聘 */
#recruit {
  width: 100%;
}
.recruit {
  width: 100%;
  /* margin-top: 15px; */
  box-sizing: border-box;
  background: url("../../../assets/招聘.png") no-repeat;
  background-size: contain;
  background-position-x: center;
}
.recruitImg {
  position: relative;
  text-align: center;
}
.recruitImg > img {
  width: 838px;
  /* height: 125px; */
  padding: 68px 0 90px 0;
}
.recruitImg2 > img {
  width: 838px;
  height: 139px;
  padding: 68px 0 60px 0;
}

.recruitMessage {
  max-width: 1200px;
  box-sizing: border-box;
  text-align: center;
  margin: 0 auto;
}
.RMBox {
  width: 100%;
  text-align: center;
}
.RMBox > li {
  width: 380px;
  /* height: 276px; */
  display: inline-block;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  margin-bottom: 28px;
  text-align: left;
}
/* .RMBox>div:nth-child(2){
  margin: 0 25px;
} */
.RMBox > li:nth-child(2),
.RMBox > li:nth-child(5) {
  margin: 0 25px;
  margin-bottom: 28px;
}

.RMBox_sBox_top {
  padding: 37px;
  padding-top: 36px;
  padding-bottom: 36px;
}
.RMBox_sBox_top > p {
  width: 100%;
  font-size: 14px;
  color: #0e0e0e;
  /* min-height: 35px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.RMBox_sBox_top > span {
  font-size: 24px;
  color: #0e0e0e;
  margin-top: 38px;
  display: block;
  font-family: PingFangSC-Semibold;
}
.RMBox_sBox_bot {
  padding: 13px;
  padding-top: 0;
}
.RMBox_sBox_bot > div {
  padding-left: 25px;
  padding-top: 15px;
  border-top: 1px solid #dadada;
}
.greyBlock {
  width: 38px;
  height: 38px;
  background: #dadada;
  vertical-align: middle;
}
.RMBox_sBox_bot > div > p {
  font-size: 14px;
  vertical-align: middle;
  padding-left: 18px;
}
.RMBox_sBox_bot > div > div,
.RMBox_sBox_bot > div > p {
  display: inline-block;
}

/* 最新求职 */
#findJob {
  width: 100%;
  box-sizing: border-box;
}
.findJob {
  width: 100%;
  box-sizing: border-box;
  background: url("../../../assets/求职.png") no-repeat;
  background-size: contain;
  text-align: center;
}
.findJobBg > img {
  width: 838px;
  /* height: 125px; */
  padding-top: 180px;
  padding-bottom: 75px;
}
.findJobBg2 > img {
  width: 838px;
  height: 139px;
  padding-top: 180px;
  padding-bottom: 49px;
}
.motherTongue > img {
  /* width: 410px;
  height: 78px; */
}
.FB_mt_message {
  max-width: 1200px;
  margin: 0 auto;
}
.FB_mt_mesageBox {
  margin-top: 25px;
  text-align: left;
}
.FB_mt_mesageBox > li {
  display: inline-block;
  margin-right: 82px;
}
.FB_mt_mesageBox > li:nth-child(5n) {
  margin-right: 0;
}
.FB_mt_personMessage {
  width: 174px;
  text-align: left;
  font-size: 14px;
  color: #0e0e0e;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.FB_mt_personMessage > p,
.FB_mt_personMessage > span {
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.FB_mt_personMessage > p > :last-child {
  color: gray;
}
.FB_ot_personMessage > p > :last-child {
  color: gray;
}

.ohterTongue {
  margin-top: 119px;
  margin-bottom: 25px;
}
.ohterTongue > img {
  /* width: 410px;
  height: 78px; */
}

.FB_ot_message {
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 310px;
}
.FB_ot_mesageBox {
  text-align: left;
}
.FB_ot_mesageBox > li {
  display: inline-block;
  margin-right: 82px;
}
.FB_ot_mesageBox > li:nth-child(5n) {
  margin-right: 0;
}
.headImage {
  max-width: 174px;
  height: 156px;
  display: inline-block;
  margin-bottom: 14px;
  margin-top: 47px;
  text-align: center;
}
.FB_ot_personMessage {
  text-align: left;
  font-size: 14px;
  color: #0e0e0e;
  width: 174px;
}
.FB_ot_personMessage > p,
.FB_mt_personMessage > span {
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-image {
  width: 100% !important;
  height: 100% !important;
}
</style>
