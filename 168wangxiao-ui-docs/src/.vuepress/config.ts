import { shikiPlugin } from "@vuepress/plugin-shiki";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";


export default defineUserConfig({
  base: "/168wangxiao-ui/",
  lang: "zh-CN",
  title: "168wangxiao-ui",
  description: "vuepress-theme-hope 的文档演示",
  plugins: [
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
