<template>
  <div class="footerBox">
    <div>
      <div class="erweima">
        <img :src="erweimaImg" alt="">
      </div>
      <div class="erweimaTitle">
        <p>
          关注官方公众号
        </p>
      </div>
    </div>
    <div class="midLine"></div>
    <div class="footer">
        <p class="f1">
        友情链接： <a href="https://www.ketabc.com/ktabc-off/index.html" target="_blank">客厅ABC</a>&nbsp;
                  <a href="https://www.jiemodui.com/" target="_blank">芥末堆</a>&nbsp;
                  <a href="http://www.duozhi.com/" target="_blank">多知网</a>&nbsp;
                  <a href="http://www.tesoltraining.co.uk/" target="_blank">TESOL</a>&nbsp;
                  <a href="https://www.tefllondon.com" target="_blank">TEFL</a>&nbsp;
                  <a href="https://www.ardmoreteachertraining.com" target="_blank">外教培训网</a>
        </p>
        <p class="f2">外教直聘网是上海近贤教育科技有限公司旗下品牌</p>
        <p class="f3">公司地址：上海市虹口区东大名路501号10F</p>
        <p class="f3">沪ICP备：002918038038</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      erweimaImg:require("../assets/footer.png")
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.footerBox{
  height: 100%;
}
.footerBox>div{
  display: inline-block;
}
.footer {
  padding-top: 52px;
}
.f1 {
  font-size: 12px;
  margin-bottom: 14px;
  color: #858484;
}
.f1 >a{
  font-size: 16px;
  color: #858484;
}
.f2 {
  font-size: 18px;
  margin-bottom: 14px;
}
.f3 {
  font-size: 12px;
  margin-bottom: 15px;
  color: #858484;
}
.erweima{
  margin-bottom: 12px;
}
.erweima>img{
  width: 96px;
  height: 96px;
}
.erweimaTitle>p{
  font-size: 12px;
  color: #CECECE;
}
.midLine{
  width: 1px;
  height: 130px;
  background: #6D6D6D;
  margin: 0 73px;
}
</style>
