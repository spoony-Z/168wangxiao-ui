<template>
  <div id="app">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabl" :label="item.name" :key="item.id" :name="item.id">
        <wangxiao-table1 @dragRow="dragRow" :key="activeName" drag row-key="id" :data="data" :columns="tablist"
          showColumns :frontendPaging="true"></wangxiao-table1>
        <!-- <wangxiao-table1 drag row-key="id" :data="data" :columns="columns2" showColumns :frontendPaging="true"></wangxiao-table1>
        <wangxiao-table1 drag row-key="id" :data="data" :columns="columns3" showColumns :frontendPaging="true"></wangxiao-table1> -->
      </el-tab-pane>
    </el-tabs>
    <Wangxiao-sidebar :sideList="semesterList" label="names" prop="fieldName">
      <template #aaa>
        <span>ififififi</span>
      </template>
      <template #default>的基督教的角度讲</template>
    </Wangxiao-sidebar>
    <wangxiaoStep :count="count" :list="list">
      <template #ssd>
        <div>插槽</div>
      </template>
    </wangxiaoStep>
    <div style="display: flex; margin: 50px;">
      <WangxiaoUpload @removeFile="removeFile" :initialFileList="initialFileList" :automatic-upload="automaticUpload" style="margin-right: 20px; width: 406px;" :suffixArray="['jpg', 'png', 'jpeg', 'doc', 'docx', 'pdf']" :multiple="false">
      </WangxiaoUpload>

      <!-- <WangxiaoUpload echo="card" style="width: 406px;" :suffixArray="['jpg', 'png', 'jpeg']" :multiple="false">
      </WangxiaoUpload> -->
    </div>

    <div style="display: flex; margin: 50px;">
      <!-- <wangxiao-upload id-card frontBack="front" style="margin-right: 20px;width: 406px;"
        :suffixArray="['jpg', 'png', 'jpeg']" :multiple="false"></wangxiao-upload>
      <wangxiao-upload idCard frontBack="back" style="width: 406px;" :suffixArray="['jpg', 'png', 'jpeg']"
        :multiple="false"></wangxiao-upload> -->
    </div>

    <!-- <wangxiao-upload frontBack="back" style="margin: 50px; width: 406px;" :suffixArray="['jpg', 'png', 'jpeg']"
      :multiple="false">
      <template #content>
        <div>自定义内容</div>
      </template>
    </wangxiao-upload> -->

    <wangxiao-editor></wangxiao-editor>
    <wangxiaoRender age="111111" @chenage="onChenage">
      <template #ages>
        打卡打卡打卡打卡
      </template>
    </wangxiaoRender>

    <!-- 倒计时 -->
  </div>
</template>

<script>
import assblay from "./assblay";
import { data, columns, columns2, columns3, tabl } from "./api";
import wangxiaoTable1 from "./components/wangxiao-table";
import wangxiaoStep from "./components/wangxiao-step";
import WangxiaoUpload from "./components/wangxiao-upload";
import wangxiaoRender from "./components/render/wangxiao-render";
export default {
  name: 'App',
  components: {
    wangxiaoTable1,
    wangxiaoStep,
    wangxiaoRender,
    WangxiaoUpload,
  },
  data() {
    return {
      name: 'Demi',
      initialFileList: ["https://168wangxiao.oss-cn-beijing.aliyuncs.com/graduateFile/08ba047f-991f-48cf-9209-9ee76dd02df2_新建 DOC 文档.doc"],
      data,
      tabl,
      columns,
      columns2,
      columns3,
      activeName: '1',
      tablist: [],
      semesterList: [
        {
          state: 1,
          names: "第一学期",
          fieldName: 'aaa',
        },
        {
          state: 0,
          names: "第二学期",
          fieldName: 'bbb'
        },
        {
          state: 0,
          names: "第三学期",
          fieldName: 'ccc'
        },
        {
          state: 0,
          names: "第四学期",
          fieldName: 'ddd'
        },
        {
          state: 0,
          names: "第五学期",
          fieldName: 'ggg'
        },
      ],
      count: 2,
      list: [
        {
          id: 1,
          prop: 'ssd',
          name: "论文选题",
        },
        {
          name: "选题审核",
          id: 2,
        },
        {
          name: "论文提交",
          id: 3,
        },
        {
          name: "论文审核",
          id: 4,
        },
        {
          name: "答辩成绩",
          id: 5,
        },
      ],
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
    console.log(assblay);
    function getRootPath() {

      //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp

      var curWwwPath = window.document.location.href;

      //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp

      var pathName = window.document.location.pathname;

      var pos = curWwwPath.indexOf(pathName);

      //获取主机地址，如： http://localhost:8083

      var localhostPaht = curWwwPath.substring(0, pos);

      //获取带"/"的项目名，如：/uimcardprj

      var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

      return (localhostPaht + projectName);

    }
    console.log(getRootPath(), "********");
  },
  methods: {
    removeFile(file) {
      console.log(file);
      this.initialFileList = JSON.parse(JSON.stringify([]))
    },
    automaticUpload(file, files) {
      console.log(file, files, "*****");
    },
    handleClick(tab, event) {
      this.tablist = []
      console.log(tab, event);
      this.$forceUpdate()
    },
    dragRow(i1, i2, i3, i4, i5) {
      console.log(i1, i2, i3, i4, i5);
    },
    onChenage(item, i) {
      console.log(item, i);
    }
  }
}
</script>