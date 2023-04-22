<template>
  <div id="app">
    <wangxiao-table :data="data" :columns="columns"></wangxiao-table>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: [{
        name: "杨胜军"
      }],
      columns: [
        {
          prop: "name",
          label: "姓名"
        }
      ]
    }
  }
}
</script>
