<template>
  <div>
    <div class="UserSetting">
      <div class="USBox">
        <div>
          <div class="usTitle">
            <span>{{ settingTxt.Settings }}</span>
          </div>
          <div class="usContent">
            <div class="usContentBox">
              <div>
                <div class="touxiang">
                  <p>{{ settingTxt.ProfilePhoto }}</p>
                </div>
                <div class="headImg">
                  <el-upload
                    action="http://admin.hichinajob.com/system/fileUpload/uploadFile"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="true"
                    :on-success="UpLoadSuccess"
                    :on-change="handleLimit"
                    :on-preview="handlePictureCardPreview"
                    :file-list="imageFileList"
                    :before-upload="haveHeadImg"
                    :class="{ disabled: uploadDisabled == true }"
                    :on-remove="handleRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </div>
              </div>

              <div class="userMessage">
                <div class="">
                  <p>{{ settingTxt.Name }}</p>
                </div>
                <div>
                  <el-input v-model="nicheng" :placeholder="nicheng"></el-input>
                </div>
              </div>

              <div class="userMessage">
                <div class="">
                  <p>{{ settingTxt.LoginID }}</p>
                </div>
                <div>
                  <el-input
                    v-model="userName"
                    :placeholder="userName"
                  ></el-input>
                </div>
              </div>

              <div class="userMessage">
                <div class="">
                  <p>{{ settingTxt.Password }}</p>
                </div>
                <div>
                  <el-input v-model="userPassword" show-password></el-input>
                </div>
              </div>
            </div>
            <div class="changeMessage">
              <div class="changeMessageBox">
                <div>
                  <el-button type="primary" @click="submit">{{
                    settingTxt.sub
                  }}</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
import { cMessage, userMessageList2, ftApplyList } from '@/utils/index'  // 登陆接口
export default {
  props: ['changeCNorEN', 'userId'],
  data() {
    return {
      nicheng: '',
      userName: '',
      userPassword: '',
      changeCNorEN2: '',
      uploadDisabled: false,
      settingTxt: {
        Settings: '',
        ProfilePhoto: '',
        Name: '',
        LoginID: '',
        Password: '',
        sub: ''
      },
      // 头像
      dialogImageUrl: '',
      dialogVisible: false,
      autoUp: false,
      imageFileList: [],
      headImg: '',
      userRoleId: ''
    }
  },
  methods: {
    submit: function () {
      let uid = sessionStorage.getItem('userId')
      // console.log(uid)
      let data = {
        userId: uid,
        userRealName: this.nicheng,
        userAccount: this.userName,
        userPassword: this.userPassword,
        userHeadImg: this.headImg,
        userRoleId: this.userRoleId
      }
      // console.log(data)
      let timeOut = setTimeout(() => {
        if (sessionStorage.getItem('changeChinese') == 'false') {
          this.$message({
            message: 'Modification failed, network error, please try again later',
            type: 'error'
          });
        } else {
          this.$message({
            message: '修改失败,网络错误,请稍后再试',
            type: 'error'
          });
        }
      }, 5000);
      cMessage(data).then((res) => {
        // console.log(res)
        if (res.data.success) {
          clearTimeout(timeOut)
          if (sessionStorage.getItem('changeChinese') == 'false') {
            this.$message({
              message: 'Modified successfully',
              type: 'success'
            });
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
          // this.$router.replace({path:'/whiteHouse'}) // 白宫中转
        } else {
          if (sessionStorage.getItem('changeChinese') == 'false') {
            this.$message({
              message: 'Modified faild',
              type: 'error'
            });
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            });
          }
        }
      })
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
    haveHeadImg(file) {
      // console.log(file)
    },
    handleLimit(file, fileList) {
      // console.log(file,fileList)
      if (fileList.length == 1) {
        this.uploadDisabled = true;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    UpLoadSuccess(response, file, fileList) {
      // console.log(response.path)
      this.imageFileList.push({
        name: file.name,
        url: 'http://admin.hichinajob.com' + response.path,
        type: '.' + file.name.split(".")[file.name.split(".").length - 1]
      });
      // console.log(response)
      let uid = sessionStorage.getItem('userId')
      // console.log(this.imageFileList)
      this.headImg = 'http://admin.hichinajob.com' + response.path
      this.$emit('headerUserImg', this.headImg)
      // console.log(this.headImgPath)
      // console.log(file)
      // console.log(fileList)
    }
  },
  created() {
    let userid = sessionStorage.getItem('userId')
    // console.log(sessionStorage.getItem('userId'))
    userMessageList2(userid).then((res) => {
      // console.log(res)
      // userRoleId
      this.userRoleId = res.data.root[0].userRoleId
      this.nicheng = res.data.root[0].userRealName
      this.userName = res.data.root[0].userAccount
      this.headImg = res.data.root[0].userHeadImg
      if (res.data.root[0]) {
        this.imageFileList = [];
        let img = res.data.root[0].userHeadImg || '';
        this.imageFileList.push({
          name: img,
          url: img,
          type: '.' + img.split(".")[img.split(".").length - 1]
        });
        if (img) {
          this.uploadDisabled = true
        }
        if (this.imageFileList[0].url == '') {
          this.imageFileList = []
        }
      }
    })
    let dataId = {
      ftapUserId: Number(sessionStorage.getItem('userId'))
    }
    ftApplyList(dataId).then(res => {
      // console.log(res)
      this.nicheng = res.data.root[0].ftapTeacherName
    })
    this.$emit('gotoJieShao', 1)
    this.changeCNorEN2 = sessionStorage.getItem('changeChinese')
    this.$emit("changeLanguage", this.changeCNorEN2)//在上传一次，就可以让值变动
    if (sessionStorage.getItem('changeChinese') == 'false') {
      this.settingTxt = {
        Settings: 'Settings',
        ProfilePhoto: 'Profile Photo',
        Name: 'Name',
        LoginID: 'Login ID',
        Password: 'Password',
        sub: 'Confirm the changes'
      }
    } else {
      this.settingTxt = {
        Settings: '设置',
        ProfilePhoto: '头像',
        Name: '昵称',
        LoginID: '登陆账号',
        Password: '登陆密码',
        sub: '确认修改'
      }
    }
  },
  mounted() {
    // userMessageList2(Number(sessionStorage.getItem('userId'))).then(res=>{
    // console.log(res)


    // })
  },
  watch: {
    changeCNorEN: {
      handler(newL, oldL) {
        if (newL == 'false') {
          this.settingTxt = {
            Settings: 'Settings',
            ProfilePhoto: 'Profile Photo',
            Name: 'Name',
            LoginID: 'Login ID',
            Password: 'Password',
            sub: 'Confirm the changes'
          }
        } else {
          this.settingTxt = {
            Settings: '设置',
            ProfilePhoto: '头像',
            Name: '昵称',
            LoginID: '登陆账号',
            Password: '登陆密码',
            sub: '确认修改'
          }
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
}

.usContentBox > div {
  padding: 35px 109px 35px 73px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid #e5e5e5;
}
.usContentBox > div:first-child {
  padding: 88px 100px 88px 73px;
}
.usContentBox > div::after {
  clear: both;
}
.usContentBox > div > div {
  display: inline-block;
}
.touxiang {
  float: left;
}
.usContentBox > div > .touxiang > p {
  font-size: 26px;
  color: #060606;
  line-height: 140px;
}
.headImg {
  float: right;
}

.userMessage {
  font-size: 26px;
  box-sizing: border-box;
  display: inline-block;
}
.userMessage > div:first-child {
  float: left;
}
.userMessage > div:last-child {
  float: right;
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

.changeMessageBox >>> .el-button {
  padding: 22px 98px;
  font-size: 26px;
  background: #003ab8;
}
/* 头像 */
.headImg >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.headImg >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.headImg >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.headImg >>> .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.headImg >>> .disabled .el-upload--picture-card {
  display: none !important;
}
</style>
