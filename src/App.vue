<template>
  <div id="app">
    <wangxiao-table drag row-key="id" :data="data" :columns="columns" showColumns :frontendPaging="true">
      <template #table-top-btn>
        <el-button>默认按钮</el-button>
      </template>
      <template #table-right-btn>
        <el-button>默认按钮</el-button>
      </template>
    </wangxiao-table>
    <Wangxiao-sidebar :name='name' v-model="name">
      kdkdkdk
    </Wangxiao-sidebar>
  </div>
</template>

<script>
import assblay from "./assblay";
export default {
  name: 'App',
  data() {
    return {
      name: 'Demi',
      data: [{
        id: 1,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 2,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      }, {
        id: 3,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      }, {
        id: 4,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      }, {
        id: 5,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      }, {
        id: 6,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 7,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 8,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 9,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 10,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 11,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        id: 12,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "++++++++++++",
        qita2: "++++++++++++",
        qita3: "++++++++++++",
      },
      {
        id: 13,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "++++++++++++",
        qita2: "++++++++++++",
        qita3: "++++++++++++",
      },
      {
        id: 14,
        name: 222,
        age: 30,
        lang: 666,
        qita1: "++++++++++++",
        qita2: "++++++++++++",
        qita3: "++++++++++++",
      }],
      columns: [{
        prop: "name",
        label: "姓名水电费都发SD粉色防守打法",
        show: false,
      },
      {
        prop: "age",
        label: "年龄",
        show: true,
      },
      {
        prop: "lang",
        label: "升高"
      },
      {
        prop: "qita1",
        label: "其他1发撒地方撒发水电费水电费水电费"
      },
      {
        prop: "qita2",
        label: "其他2"
      },
      {
        prop: "qita3",
        label: "其他3"
      }],
    }
  },
  watch: {
    name(val) {
      console.log(val);
    }
  },
  created(){
    console.log(assblay)
  },
}
</script>