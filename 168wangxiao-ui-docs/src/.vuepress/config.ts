import { shikiPlugin } from "@vuepress/plugin-shiki";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";



export default defineUserConfig({
  base: "/168wangxiao-ui/",
  lang: "zh-CN",
  title: "168wangxiao-ui",
  description: "vuepress-theme-hope 的文档演示",
  plugins: [
    /** 注册vue组件插件 */
    registerComponentsPlugin({
      // 配置项
    }),
    // shikiPlugin({
    //   theme: "one-dark-pro",
    // }),
    searchProPlugin({
      indexContent: true,
    }),
  ],
  theme,
  // Enable it with pwa
  // shouldPrefetch: false,
});
