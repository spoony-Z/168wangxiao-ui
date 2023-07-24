import WangxiaoTable from "./components/wangxiao-table/index.js";

import WangxiaoBtn from "./components/wangxiao-btn/index.js";
import WangxiaoSidebar from "./components/wangxiao-sidebar/index.js";
import WangxiaoStep from "./components/wangxiao-step/index.js";

// 组件
const components = [WangxiaoTable, WangxiaoBtn, WangxiaoSidebar];

// 指令
// const directives = [xxxx]
// 过滤器
// const filters = [xxxx]

// 定义 install 方法，Vue 作为参数
const install = Vue => {
    // 判断是否安装，安装过就不用继续执行
    if (install.installed) return;
    install.installed = true;
    // 遍历注册所有组件
    components.map((component) => Vue.component(component.name, component));

    // 遍历注册所有指令
    // directives.map(directives => Vue.use(directives))

    // 遍历过滤器
    // filters.map(filters => Vue.use(filters))
};

// 检测到 Vue 再执行
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}
export { WangxiaoTable, WangxiaoBtn, WangxiaoSidebar, WangxiaoStep } // 按需引入 导出
export default {
    install,
    // 所有组件，必须具有 install 方法才能使用 Vue.use()
    WangxiaoTable,
};