import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import util from './assets/util'
import install from './install'

import animate from 'animate.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(animate);

Vue.prototype.$store = store;
Vue.prototype.$util = util;

Vue.config.productionTip = false;
if (process.env.NODE_ENV === "development") {
  Vue.config.debug = true;
}

install.install(Vue);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

