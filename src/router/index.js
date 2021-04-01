import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'

import HomePage from '@/views/index/sonpage/homePage'  // 主页
import Findjob from '@/views/index/sonpage/findJob'     // 找工作
import FindTeacher from '@/views/index/sonpage/findTeacher'   //找老师

import Application from '@/components/tMessageBox/application'  // 求职
import ApplicationModify from '@/components/tMessageBox/applicationModify'  // 求职
import UserSetting from '@/components/tMessageBox/userSetting'  // 设置

import JobDetails from '@/components/jigouMessageBox/jobDetails'  // 求职
import JgUserRelease from '@/components/jigouMessageBox/JgUserRelease'  // 求职

import PositionDetails from '@/components/positionDetails'  // 机构信息页面
import TeacherInformation from '@/components/teacherInformation'  // 外教信息页面

import WhiteHouse from '@/components/whiteHouse'  // 中转地

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {path: '/', name: 'HomePage', component: HomePage},//子路由的<router-view>必须在HelloWorld.vue中出现
        {path: '/findJob', name: 'Findjob', component: Findjob},
        {path: '/findTeacher', name: 'FindTeacher', component: FindTeacher},

        // 以下为外教弹出框的路由
        {path: '/application', name: 'Application', component: Application},
        {path: '/applicationModify', name: 'ApplicationModify', component: ApplicationModify},
        {path: '/userSetting', name: 'UserSetting', component: UserSetting},

        // 以下为机构弹出框的路由
        {path: '/jobDetails', name: 'JobDetails', component: JobDetails},
        {path: '/JgUserRelease', 
        name: 'JgUserRelease', 
        component: JgUserRelease,
        beforeEnter: (to, from, next) => {
          // console.log(to.path)
          // console.log(from.path)
          if(from.path == '/jobDetails'){
            sessionStorage.setItem('routerFrom',2)
            console.log(to.path)
            next()
          }else{
            sessionStorage.setItem('routerFrom',1)
            console.log(to.path)
            next()
          }
        }
      },

        {path: '/positionDetails', name: 'PositionDetails', component: PositionDetails},
        {path: '/teacherInformation', name: 'TeacherInformation', component: TeacherInformation},
      ]
    },
    {
      path:'/whiteHouse',name:'whiteHouse',component:WhiteHouse
    },
    { path: '*', component: HomePage }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.name === 'HomePage' || to.path === '/findJob' || to.path === '/findTeacher' || to.path === '/positionDetails' || to.path === '/teacherInformation' || to.path === '/whiteHouse') {
    next();
  } else {
    let token = sessionStorage.getItem('userId')
    if (token == 'null' || token === '' || token == null) {
      next('/');
    } else {
      next();
    }
  }
});

export default router;