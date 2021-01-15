// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import ElementUI from 'element-ui'
import store from './store'
import router from './router'
import locale from 'element-ui/lib/locale/lang/en'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
