<template>
  <div>
    <el-table ref="table" :data="tempData" :header-cell-style="headerCellStyle" :cell-style="cellStyle" v-bind="$attrs"
      v-on="$listeners">
      <template v-if="$slots.append" slot="append">
        <slot name="append"></slot>
      </template>
      <template v-for="item in columns">
        <el-table-column v-if=" item.type && ['selection', 'index'].includes(item.type)" :key="`${item.prop}-if`" v-bind="item">
          <template #header="scope">
            <slot :name="`header-${item.prop}`" v-bind="scope"></slot>
          </template>
        </el-table-column>

        <el-table-column v-else :key="item.prop" v-bind="item">
          <template #header="scope">
            <span v-if="$scopedSlots[`header-${item.prop}`]">
              <slot :name="`header-${item.prop}`" v-bind="scope"></slot>
            </span>
            <span v-else>{{ scope.column.label }}</span>
          </template>
          <template slot-scope="scope">
            <span v-if="$scopedSlots[item.prop]">
              <slot :name="item.prop" :scope="scope" :item="item"></slot>
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showPagination" :style="pagingStyle">
      <!-- 前端根据数据列表分页 -->
      <el-pagination  v-if="FrontendPaging && !$scopedSlots[`paging`]" class="pagination" v-bind="tempPagination" :current-page="currentPage" :page-size="pageSize"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
      <!-- 后端分页 -->
        <el-pagination v-else-if="BackendPaging && !$scopedSlots[`paging`]" class="pagination" v-bind="tempPagination" :current-page="currentPage" :page-size="pageSize"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        <div v-else-if="!BackendPaging && !BackendPaging && $scopedSlots[`paging`]">
          <slot name="paging" :tempData="tempData" :columns="columns"></slot>
        </div>
    </div>
  </div>
</template>
<script>
const defaultPagination = { background: true, layout: 'total, sizes, prev, pager, next, jumper' }
export default {
  name: 'WangxiaoTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    },
    headerCellStyle: {
      type: Function || Object,
      default: () => {
        return {
          'background-color': '#f5f6f7',
          'font-size': '12px',
          'padding': '10px',
        }
      }
    },
    cellStyle: {
      type: Function || Object,
      default: () => {
        return {
          'font-size': '12px',
          'padding': '10px'
        }
      }
    },
    /** 是否显示分页 */
    showPagination: {
      type: Boolean,
      default: true,
    },
    /** 前端分页 */
    FrontendPaging: {
      type: Boolean,
      default: false,
    },
    /** 后端分页 */
    BackendPaging: {
      type: Boolean,
      default: true,
    },
    pagingStyle: {
      type: Object,
      default: () => {
        return {
          'text-align': 'right'
        }
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tempData: [],
    }
  },
  computed: {
    paging() {
      const offset = (this.currentPage - 1) * this.pageSize
      return { offset, limit: this.pageSize }
    },
    total() {
      // return this.data?.length || 0
      return this.data?.length || 0
    },
    tempPagination() {
      return { ...defaultPagination, ...this.pagination }
    }
  },
  watch: {
    pagination: {
      handler(nVal) {
        this.currentPage = nVal.currentPage || 1
        this.pageSize = nVal.pageSize || nVal.pageSizes?.[0] || 10
      },
      immediate: true,
      deep: true,
    },
    paging: {
      handler() {
        this.getTableData()
      },
      immediate: true,
      deep: true,
    }
  },
  mounted() {
    const tempStore = this.$refs?.table || {}
    for (const key in tempStore) {
      if (typeof tempStore[key] === 'function') {
        this[key] = tempStore[key]
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    getTableData() {
      const { offset, limit } = this.paging || {};
      this.tempData = this.data.filter((v, i) => i >= offset && i < (offset + limit))
    },
  }

}
</script>