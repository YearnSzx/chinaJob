import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'

import HomePage from '@/views/index/sonpage/homePage'  // 主页
import Findjob from '@/views/index/sonpage/findJob'     // 找工作
import FindTeach from '@/views/index/sonpage/findTeach'   //找老师

import UserWork from '@/components/tMessageBox/userWork'  // 求职
import UserRelease from '@/components/tMessageBox/userRelease'  // 求职
import UserSetting from '@/components/tMessageBox/userSetting'  // 设置

import JgUserWork from '@/components/jigouMessageBox/JgUserWork'  // 求职
import JgUserRelease from '@/components/jigouMessageBox/JgUserRelease'  // 求职

import JigouJieShao from '@/components/jigouJieShao'  // 机构信息页面
import TeachJieShao from '@/components/teachJieShao'  // 外教信息页面

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
        {path: '/findTeach', name: 'FindTeach', component: FindTeach},

        // 以下为外教弹出框的路由
        {path: '/userWork', name: 'UserWork', component: UserWork},
        {path: '/userRelease', name: 'UserRelease', component: UserRelease},
        {path: '/userSetting', name: 'UserSetting', component: UserSetting},

        // 以下为机构弹出框的路由
        {path: '/JgUserWork', name: 'JgUserWork', component: JgUserWork},
        {path: '/JgUserRelease', 
        name: 'JgUserRelease', 
        component: JgUserRelease,
        beforeEnter: (to, from, next) => {
          // console.log(to.path)
          // console.log(from.path)
          if(from.path == '/JgUserWork'){
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

        {path: '/jigouJieShao', name: 'JigouJieShao', component: JigouJieShao},
        {path: '/teachJieShao', name: 'TeachJieShao', component: TeachJieShao},
      ]
    },
    {
      path:'/whiteHouse',name:'whiteHouse',component:WhiteHouse
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.name === 'HomePage' || to.path === '/findJob' || to.path === '/findTeach' || to.path === '/jigouJieShao' || to.path === '/teachJieShao' || to.path === '/whiteHouse') {
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