import { navbar } from "vuepress-theme-hope";

export default navbar([
  // "/",
  {
    text: "首页",
    icon: "home",
    link: "/"
  },
    {
    text: "组件",
    icon: "book",
    link: "/blogs/",
  },
  // "/demo/",
  // {
  //   text: "指南",
  //   icon: "home",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
