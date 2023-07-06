<template>
  <div id="app">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabl" :label="item.name" :key="item.id" :name="item.id">
        <wangxiao-table drag row-key="id" :data="data" :columns="tablist" showColumns :frontendPaging="true">
        </wangxiao-table>
      </el-tab-pane>
    </el-tabs>
    <!-- <Wangxiao-sidebar :name='name' v-model="name">
      kdkdkdk
    </Wangxiao-sidebar> -->
  </div>
</template>

<script>
import assblay from "./assblay";
import { data, columns, columns2, columns3, tabl } from "./api";
export default {
  name: 'App',
  data() {
    return {
      name: 'Demi',
      data,
      tabl,
      // columns,
      // columns2,
      // columns3,
      activeName: '1',
      tablist: [],
    }
  },
  watch: {
    name(val) {
      console.log(val);
    },
    activeName: {
      handler(val) {
        switch (val) {
          case '1':
            this.tablist = columns
            break;
          case '2':
            this.tablist = columns2
            break;
          case '3':
            this.tablist = columns3
            break;
        }
      },
      immediate: true,
    }
  },
  created() {
    console.log(assblay)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}
</script>