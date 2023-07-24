<template>
  <div id="app">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabl" :label="item.name" :key="item.id" :name="item.id">
        <wangxiao-table1 :key="activeName" drag row-key="id" :data="data" :columns="tablist" showColumns :frontendPaging="true"></wangxiao-table1>
        <!-- <wangxiao-table1 drag row-key="id" :data="data" :columns="columns2" showColumns :frontendPaging="true"></wangxiao-table1>
        <wangxiao-table1 drag row-key="id" :data="data" :columns="columns3" showColumns :frontendPaging="true"></wangxiao-table1> -->
      </el-tab-pane>
    </el-tabs>
    <!-- <Wangxiao-sidebar :name='name' v-model="name">
      kdkdkdk
    </Wangxiao-sidebar> -->

    <!-- 倒计时 -->
  </div>
</template>

<script>
import assblay from "./assblay";
import { data, columns, columns2, columns3, tabl } from "./api";
import wangxiaoTable1 from "./components/wangxiao-table";
export default {
  name: 'App',
  components: {
    wangxiaoTable1
  },
  data() {
    return {
      name: 'Demi',
      data,
      tabl,
      columns,
      columns2,
      columns3,
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
            this.tablist = JSON.parse(JSON.stringify(columns))
            break;
          case '2':
            this.tablist = JSON.parse(JSON.stringify(columns2))
            break;
          case '3':
            this.tablist = JSON.parse(JSON.stringify(columns3))
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
      this.tablist = []
      console.log(tab, event);
      this.$forceUpdate()
    },
  }
}
</script>