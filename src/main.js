import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import wangXiaoUi from "./index";

/** 工具的使用 */
// import { testA } from 'ts-tool-list';
// console.log(testA());

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(wangXiaoUi);

new Vue({
    render: h => h(App),
}).$mount('#app')