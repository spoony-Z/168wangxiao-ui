<template>
  <el-card shadow="never" class="box-card">
    <div v-for="(item, index) in semesterList" :key="index" class="list"
      :class="{ active: activeTemp === index }" @click="handleClick(index, item)">
      <template v-if="$scopedSlots[item[prop]]">
        <slot :name="item[prop]" :scope="item" :index="index"></slot>
      </template>
      <div v-else>{{ item[label] }}</div>
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
    },
    /** 渲染的字段名 默认为 name */
    label: {
      type: String,
      default: 'name',
    },
    /** 具名插槽 字段名 */
    prop: {
      type: String,
      default: '',
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
    handleClick(e, item) {
      this.activeTemp = e;
      this.$emit("chenage", e, item)
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