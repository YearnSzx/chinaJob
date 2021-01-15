=<template>
  <div id="forgotPw">
    <div class="forgotPw">
        <h2>{{formData.title}}</h2>
        <div class="form">
            <div class="formPs" v-if="show">
                <h3>
                    请您仔细阅读以下条款，如果您对本协议的任何条款表示异议，您
                    可以选择不进入Hichinajob。您只有完全同意下列所有服务条款，
                    才能使用Hichinajob相应的服务。Hichinajob可以对服务协议随
                    时做任何修改。您在使用Hichinajob服务时，有必要对最新的服务
                    协议进行仔细阅读和重新确认，当发生有关争议时，请以最新的服
                    务条款为准。
                </h3>
            </div>
            <div class="content">
                <p>{{formData.line1}}</p>
                <p>{{formData.line2}}</p>
                <p>{{formData.line3}}</p>
                <p>{{formData.line4}}</p>
                <p>{{formData.line5}}</p>
                <p>{{formData.line6}}</p>
                <p>{{formData.line7}}</p>
                <p>{{formData.line8}}</p>
            </div>
            <div class="bottom">
                <el-checkbox label="我同意并遵守上述的《服务协议》" v-model="checked"></el-checkbox>
            </div>
        </div>
        <div class="close">
            <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
        </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'forgotPw',
  data () {
    return {
        show:true,
        formData:[],
        checked:false
    }
  },
  created(){
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    

    if(sessionStorage.getItem('changeChinese') == 'false'){
        this.show = true
        this.formData={
            title:'Service Agreement',
            line1:'1.Hichinajob provides foreign teacher recruitment services via internet through the Hichinajob website helping people who are looking for a job online or in China to establish connection with Chinese employers.',
            line2:'2.Users must provide authentic personal information when registering on Hichinajob. Hichinajob shall not be liable for any problems or consequences arising from false information. The information safety of Hichinajob users is geared to Hichinajob’s privacy statement.',
            line3:'3.Hichinajob staff are not allowed to ask users for any kind of confidential information, such as the Hichinajob password or any other login passwords of other websites at any time in any way',
            line4:'4.In any of the following circumstances, Hichinajob reserves the right to unilaterally interrupt or terminate services without notice to you if unauthentic personal information is provided or any of the service terms/agreement is violated by you.',
            line5:'New Password',
            line6:'6.Employers and foreign teachers establish communication through the Hichinajob website. The two sides cooperate completely independently regarding related matters; therefore, Hichinajob is not responsible for the results of communication. Hichinajob does not guarantee a foreign teacher will be contacted nor does Hichinajob guarantee employment of any kind',
            line7:'Use a Letter, Number or Symbol, at least 6 characters',
            line8:'8.The establishment, implementation, interpretation and settlement of conflicts must conform to laws and regulations of the People’s Republic of China. Please refer to the applicable laws and regulations of the People’s Republic of China if any clause of this agreement contradicts any of them.'
        }
    }else{  
        this.show = false
        this.formData={
            title:'服务协议',
            line1:'1、Hichinajob通过互联网络为用户提供招聘服务，帮助求职者与招聘方建立联系。',
            line2:'2、用户在申请使用Hichinajob服务时，必须提供真实的个人资料。如果因提供的信息不真实而引起的问题及其后果，Hichinajob不承担任何责任。Hichinajob用户个人资料的信息安全遵循Hichinajob的隐私声明。',
            line3:'3、Hichinajob的服务人员不会在任何时候以任何方式要求用户提供各类密码信息，包括银行卡密码，各类网站登录密码等。',
            line4:'4、如发生下列任何一种情形，Hichinajob有权单方面中断或终止向您提供服务而无需通知：您提供的个人资料不真实；您违反本服务条款中规定的使用规则;您违反本服务条款中规定的使用规则。',
            line5:'5、Hichinajob需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成收费网络服务在合理时间内的中断，Hichinajob无需为此承担任何责任，但应尽可能事先进行通告。',
            line6:'6、Hichinajob中的招聘用户与求职者建立沟通后，双方完全自主协商合作相关事宜，Hichinajob不对双方的沟通结果负责。',
            line7:'7、Hichinajob中的求职者应确保在自身专业领域具备相关专业知识或经验，并向Hichinajob提交证明自身在某一方面具备专业能力的相关材料。求职者不得向招聘方提供超出个人专业领域以及能力的服务。如有违背，由此引发的纠纷完全由用户自行承担。',
            line8:'8、本协议的订立、执行、解释及争议的解决均应适用中华人民共和国法律及法规。如发生本协议部分内容与适用法律、法规相抵触时，此部分协议抵触内容应以适用法律为准。'
        }
    }
  },
  methods:{
      close:function(){
          this.$emit('closeTc')
      }
  },
  watch:{
      checked:{
          handler(newChecked,oldChecked){
            //   console.log(newChecked,oldChecked)
              if (newChecked) {
                  let data = {
                      Checked:true
                  }
                  this.$emit('toServiceA',data)
              }
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forgotPwBg{
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0.4;
}
#forgotPw{
    width: 100%;
    background: black;
}
.forgotPw{
    max-width: 1200px;
    width: 1200px;
    background: white;
    position: absolute;
    top: 370px;
    left: calc(50vw - 600px);
    z-index: 999;
}
.forgotPw>h2{
    text-align: center;
    font-size: 36px;
    color: #003AB8;
    margin-top: 90px;
    margin-bottom: 70px;
}
.forgotPw>div{
    text-align: center;
}
.form{
    color: gray;
}
.form>div{
    text-align: left;
    padding: 0 80px;
}
.formPs{
    margin-bottom: 70px;
}
.content>p{
    margin-bottom: 50px;
}
.bottom{
    border-top: 1px solid #CFCFCF;
}
.bottom>>>.el-checkbox__input{
    line-height: 30px;
}
.bottom>>>.el-checkbox__label{
    font-size: 24px;
    line-height: 96px;
}
.bottom>>>.el-checkbox__inner{
    width: 35px;
    height: 35px;
}
.bottom>>>.el-checkbox__inner::after{
    height: 25px;
    left: 15px;
}
.close{
    position: absolute;
    top: 15px;
    right: 15px;
}
.el-button.is-circle{
    padding: 5px;
}
</style>
