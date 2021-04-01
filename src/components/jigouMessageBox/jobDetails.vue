<template>
  <div>
    <div class="UserSetting">
      <div class="USBox">
        <div>
          <div class="usTitle">
            <span> {{ text.dMessage }} </span>
          </div>
          <div class="usContent">
            <div class="usContentBox">
              <div class="userMessage">
                <div class="msgTitle">
                  <p>{{ text.details }}</p>
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
                  <p>{{ item.orrePosition }}</p>
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
import { orreRecruit4, orgApplyList, delOrgList, userMessageList2 } from '@/utils/index'  // 登陆接口
export default {
  props: ['changeCNorEN'],
  data() {
    return {
      nicheng: '',
      userName: '',
      userPassword: '',
      del: '',
      modify: '',
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
      this.$router.push({ name: 'JgUserRelease' })
      sessionStorage.setItem('clearData', true)
      this.$emit('jigouWorkData', item)
    },
    toDelInfo: function (item) {
      // console.log(item)
      let data = {
        id: item.orreId
      }
      delOrgList(data).then(res => {
        // console.log(res)
        if (res.data.success) {
          // 删除成功后刷新
          let uid = {
            orreUserId: Number(sessionStorage.getItem('userId'))
          }
          // console.log(uid)
          // 不分页查询招聘 根据id
          orreRecruit4(uid).then(res => {
            // console.log(res)
            this.jobWanted = res.data.root
          })
        }

      })
    },
    goToAddData() {
      this.$router.push({ name: 'JgUserRelease' })
    }
  },
  beforeCreate() {
    this.$emit('gotoJieShao', 0)
  },
  created() {
    let uid = {
      orreUserId: Number(sessionStorage.getItem('userId'))
    }
    // console.log(uid)
    // 不分页查询招聘 根据id
    orreRecruit4(uid).then(res => {
      // console.log(res)
      this.jobWanted = res.data.root
      if (this.jobWanted.length == 0) {
        this.noData = true
      }
    })
    userMessageList2(Number(sessionStorage.getItem('userId'))).then(res => {
      // console.log(res.data.root[0])
      this.$emit('headerUserImg', res.data.root[0].userHeadImg)
    })

    this.$emit('gotoJieShao', 1)
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.del = 'del'
      this.modify = 'modify'
      this.text = {
        details: 'Job details',
        dMessage: 'Published position information',
        addData: 'No recruitment information, click',
        addLink: 'Link',
        addData2: 'to add recruitment information'
      }
      this.text.details = 'Job details'
    } else {
      this.del = '删除'
      this.modify = '修改'
      this.text = {
        details: '职位',
        dMessage: '已经发布的职位信息',
        addData: '暂无招聘信息点击',
        addLink: '链接',
        addData2: '添加招聘信息'
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
            details: '职位',
            dMessage: '已经发布的职位信息',
            addData: '暂无招聘信息点击',
            addLink: '链接',
            addData2: '添加招聘信息'
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
  position: relative;
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
