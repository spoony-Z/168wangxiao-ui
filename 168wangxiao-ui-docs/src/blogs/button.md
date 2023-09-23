---
order: 2
---

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)

# 按钮
::: vue-demo 可选的标题文字

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
    <el-button>fgsdfdsf</el-button>
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("powerful");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>

```


:::


