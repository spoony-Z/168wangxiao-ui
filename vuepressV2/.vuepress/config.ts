import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "168wangxiao-ui",
  description: "168wangxiao-ui",
  base: '/168wangxiao-ui/',
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    // author: "168wangxiao技术团队",
    authorAvatar: "/head.png",

    /** z主题色 */
    // primaryColor: '#1989fa',

    /** 主题 */
    // colorMode: 'dark',

    /** 文档源文件的仓库 URL 它将会用于生成 编辑此页 的链接。如果你不设置该选项，则默认会使用 repo 配置项。但是如果你的文档源文件是在一个不同的仓库内，你就需要设置该配置项了。 */
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",

    /** 文档源文件的仓库分支。它将会用于生成 编辑此页 的链接 */
    // docsBranch: "main",

    /** 文档源文件存放在仓库中的目录名。它将会用于生成 编辑此页 的链接 */
    // docsDir: "example",

    /** 最近更新时间戳 标签的文字 */
    lastUpdatedText: "168wangxiao-ui版本升级",

    // series 为原 sidebar
    series: {
      // "/docs/java/": [
      //   {
      //     text: "module two",
      //     children: ["api", "plugin"],
      //   },
      // ],
      "/blogs/": [ 'InstallIntroduc', 'use', 'table', 'button' ],
    },
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      // {
      //   text: "Docs",
      //   children: [
      //     { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
      //   ],
      // },
    ],
    bulletin: {
      body: [
        {
          type: "text",
          content: `基于element-ui封装的表格组件，便利开发，慎用！慎用！慎用！慎用！🎉🎉🎉`,
          style: "font-size: 14px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "联系方式",
        },
        {
          type: "text",
          content: `
          <ul>
            <li>QQ：暂无</li>
            <li>微信：暂无</li>
            <li>电话：暂无</li>
            <li>邮箱：暂无</li>
          </ul>`,
          style: "font-size: 12px;",
        },
        // {
        //   type: "buttongroup",
        //   children: [
        //     {
        //       text: "打赏",
        //       link: "/docs/others/donate.html",
        //     },
        //   ],
        // },
      ],
    },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   notify: true,
    //   recordIP: true,
    //   hideComments: true // 隐藏评论
    // },
  }),
  debug: true,
});
