<template>
  <el-card shadow="never" class="box-card">
    <div v-for="(item, index) in semesterList" :key="item.key" class="list" :value="item.key"
      :class="{ active: activeTemp === index }" @click="handleClick(index)">
      {{ item.name }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "WangxiaoSidebar",
  props: {
    /** 默认选中 */
    active: {
      type: Number,
      default: 0,
    },
    /** 侧边栏数据 */
    sideList: {
      type: Array,
      default: () => [],
      required: true,
    }
  },
  data() {
    return {
      semesterList: [],
      activeTemp: this.active,
    };
  },
  watch: {
    sideList: {
      handler(val) {
        if(this.arrJudge(val) && val.length != 0){
          this.semesterList = val
        }
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    handleClick(e) {
      this.activeTemp = e;
      this.activeName = "first";
    },
  },
};
</script>

<style scoped>
.active {
  background-color: rgba(0, 127, 207, 0.15);
  border-right: 4px solid #007FCF;
}

.box-card .list {
  line-height: 60px;
  height: 60px;
  font-size: 14px;
  padding-left: 20px;
  cursor: pointer;
}

.el-card {
  width: 200px !important;
}

>>>.el-card__body,
.el-main {
  padding: 0 !important;
}
</style>