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
    <div v-if="showPagination">
      <!-- 前端根据数据列表分页 -->
      <el-pagination v-if="frontendPaging && !$scopedSlots[`paging`]" class="pagination" v-bind="tempPagination" :current-page="currentPage" :page-size="pageSize"
        :total="total" @size-change="frontSizeChange" @current-change="frontCurrentChange"></el-pagination>
        
        <!-- 后端分页 -->
        <el-pagination v-on="$listeners"  v-else-if="!frontendPaging && !$scopedSlots[`paging`]" class="pagination" :current-page="endPage.currentPage" :page-size="endPage.pageSize"
        :total="endPage.total"></el-pagination>
       
        <!-- 自定义分页 -->
        <div v-else-if="$scopedSlots[`paging`]">
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
    frontendPaging: {
      type: Boolean,
      default: false,
    },
    /** 前端分页参数 */
    FrontPage: {
      type: Object,
      default: () => ({})
    },

    /** 后端分页 */
    BackendPaging: {
      type: Boolean,
      default: true,
    },
    /** 后端分页参数 */
    endPage: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0
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
      return { ...defaultPagination, ...this.FrontPage }
    }
  },
  watch: {
    FrontPage: {
      handler(nVal) {
        this.currentPage = nVal.currentPage || 1
        this.pageSize = nVal.pageSize || nVal.pageSizes?.[0] || 10
      },
      immediate: true,
      deep: true,
    },
    paging: {
      handler() {
        this.frontGetTableData()
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
    /**
     * 前端分页
     * @param {*} val 
     */
    frontSizeChange(val) {
      this.pageSize = val;
      this.frontGetTableData();
    },
    frontCurrentChange(val) {
      this.currentPage = val;
      this.frontGetTableData();
    },
    frontGetTableData() {
      const { offset, limit } = this.paging || {};
      this.tempData = this.data.filter((v, i) => i >= offset && i < (offset + limit))
    },
  }

}
</script>