<template>
  <div id="app">
    <wangxiao-table :data="data" :columns="columns">
      <template #table-top-btn>
        <el-button>默认按钮</el-button>
      </template>
      <template #table-right-btn>
        <el-button>默认按钮</el-button>
      </template>
    </wangxiao-table>


  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: [{
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },
      {
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },{
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },{
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },{
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      },{
        name: 222,
        age: 30,
        lang: 666,
        qita1: "空军基地就",
        qita2: "空军基地就",
        qita3: "空军基地就",
      }],
      columns: [{
          prop: "name",
          label: "姓名",
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
          label: "其他1"
        },
        {
          prop: "qita2",
          label: "其他2"
        },
        {
          prop: "qita3",
          label: "其他3"
        }]
    }
  },
  computed: {
      bindTableColumns() {
        return this.columns.filter((column) => column.show);
      },
      checkedTableColumns: {
        get() {
          return this.bindTableColumns.map((column) => column.prop);
        },
        set(checked) {
          // 设置表格列的显示与隐藏
          this.columns.forEach((column) => {
            // 如果选中，则设置列显示
            if (checked.includes(column.prop)) {
              column.show = true;
            } else {
              // 如果未选中，则设置列隐藏
              column.show = false;
            }
          });
        },
      },
    },
    beforeUpdate() {
      this.$nextTick(() => {
        // 在数据加载完，重新渲染表格
        this.$refs.table.doLayout();
      });
    },
}
</script>

<style>
  .column-options {
    width: 1500px;
    margin: 50px auto;
  }
  .column-display {
    width: 180px;
  }
  .operate-btn {
    padding: 15px 0;
    text-align: right;
  }

</style>
