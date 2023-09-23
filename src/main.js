import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import wangXiaoUi from "./index";
import gtMessage from "./utils/message";

/** 工具的使用 */
import { arrJudge, fileUrlType } from 'ts-tool-list';

Vue.config.productionTip = false
Vue.prototype.$message = gtMessage;
Vue.use(ElementUI);
Vue.use(wangXiaoUi);

/** 挂载方法 */
/** 判断是否为数组（不包含空数组） */
Vue.prototype.arrJudge = arrJudge;
Vue.prototype.fileUrlType = fileUrlType;

new Vue({
    render: h => h(App),
}).$mount('#app')