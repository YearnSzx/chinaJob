<template>
  <div>
    <div class="UserSetting">
      <div class="USBox">
        <div>
          <div class="usTitle">
            <span>{{ text.details }}</span>
          </div>
          <div class="usContent">
            <div class="usContentBox">
              <div class="userMessage">
                <div class="msgTitle">
                  <p>{{ text.dMessage }}</p>
                </div>
              </div>

              <div class="userMessage" v-if="noData">
                <div>
                  <p>
                    {{ text.addData
                    }}<strong @click="goToAddData"> {{ text.addLink }} </strong
                    >{{ text.addData2 }}
                  </p>
                </div>
              </div>

              <div
                class="userMessage"
                v-for="(item, index) in jobWanted"
                :key="index"
              >
                <div>
                  <p>{{ item.ftapTeacherName }}</p>
                </div>
                <div class="UOperation">
                  <div class="modifyinfo">
                    <p @click="toModifInfo(item)">{{ modify }}</p>
                  </div>
                  <div class="cLine"></div>
                  <div class="delinfo">
                    <p @click="toDelInfo(item)">{{ del }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orreRecruit, ftApplyList, delApplyList, userMessageList2 } from '@/utils/index'
export default {
  props: ['changeCNorEN'],
  data() {
    return {
      nicheng: '',
      userName: '',
      userPassword: '',
      modify: '',
      del: '',
      jobWanted: [],
      text: {
        details: '',
        dMessage: ''
      },
      changeCNorEN2: '',
      noData: false
    }
  },
  methods: {
    toModifInfo: function (item) {
      // console.log(item)
      this.$router.push({ name: 'ApplicationModify' })
      this.$emit('userWorkData', item)
    },
    toDelInfo: function (item) {
      // console.log(item.ftapId)
      let data = {
        id: item.ftapId
      }
      delApplyList(data).then(res => {
        // console.log(res)
        if (res.data.success) {
          let data = {
            ftapUserId: Number(sessionStorage.getItem('userId'))
          }
          // console.log(data)
          ftApplyList(data).then((res) => {
            // console.log(res.data.root)
            // this.jobWanted = Object.assign({},res.data.root)
            this.jobWanted = res.data.root
            // console.log(this.jobWanted)
          })
        }
      })
    },
    goToAddData() {
      this.$router.push({ name: 'ApplicationModify' })
    }
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 1)
  },
  created() {
    // console.log(sessionStorage.getItem('userId'))
    let data = {
      ftapUserId: Number(sessionStorage.getItem('userId'))
    }
    // console.log(data)
    ftApplyList(data).then((res) => {
      console.log(res)
      this.jobWanted = res.data.root
      if (this.jobWanted.length == 0) {
        this.noData = true
      }
    })
    userMessageList2(Number(sessionStorage.getItem('userId'))).then(res => {
      console.log(res)
      let data = {
        userRealName: res.data.root[0].userRealName,
        userHeadImg: res.data.root[0].userHeadImg
      }
      this.$emit('headerUserImg', data)
    })

    // this.$emit('gotoJieShao',1)
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.del = 'del'
      this.modify = 'modify'
      this.text = {
        details: 'Job details',
        dMessage: 'Published job search information',
        addData: 'No recruitment information, click',
        addLink: 'Link',
        addData2: 'to add recruitment information'
      }
      this.text.details = 'Job details'
    } else {
      this.del = '删除'
      this.modify = '修改'
      this.text = {
        details: '求职',
        dMessage: '已经发布的求职信息',
        addData: '暂无求职信息点击',
        addLink: '链接',
        addData2: '添加求职信息'
      }
    }
  },
  watch: {
    changeCNorEN: {
      handler(newL, oldL) {
        // console.log(this.changeCNorEng)
        if (newL == 'false') {
          this.del = 'del'
          this.modify = 'modify'
          this.text = {
            details: 'Job details',
            dMessage: 'Published job search information',
            addData: 'No recruitment information, click',
            addLink: 'Link',
            addData2: 'to add recruitment information'
          }
          this.text.details = 'Job details'
        } else {
          this.del = '删除'
          this.modify = '修改'
          this.text = {
            details: '求职',
            dMessage: '已经发布的求职信息',
            addData: '暂无求职信息点击',
            addLink: '链接',
            addData2: '添加求职信息'
          }
        }
      }
    },
    jobWanted: {
      handler(newL, oldL) {
        // console.log(newL,oldL)
        if (newL.length == 0) {
          this.noData = true
        } else {
          this.noData = false
        }
      }
    }
  },
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
.usTitle > span {
  font-size: 32px;
  display: inline-block;
  padding: 23px 0;
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
}

.usContentBox > div {
  padding: 28px 0 28px 30px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid #e5e5e5;
}
.usContentBox > div:first-child {
  padding: 68px 0 54px 30px;
}
.usContentBox > div > div {
  display: inline-block;
}

.userMessage {
  font-size: 30px;
  box-sizing: border-box;
  display: inline-block;
  color: #717171;
  position: relative;
}
.userMessage > div > p {
  font-size: 24px;
}
.userMessage > div > p > strong {
  cursor: pointer;
}
.msgTitle {
  font-size: 26px;
  font-weight: 600;
  color: #060606;
}

.changeMessage {
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
}
.changeMessageBox {
  margin: 0 auto;
  padding-top: 98px;
  padding-bottom: 88px;
}
.changeMessageBox > div {
  text-align: center;
}

.UOperation {
  position: absolute;
  right: 30px;
}
.UOperation > div {
  display: inline-block;
}
.UOperation > div > p {
  font-size: 24px;
  cursor: pointer;
}
.cLine {
  width: 1px;
  height: 30px;
  border-left: 1px solid gray;
  vertical-align: middle;
}
</style>
