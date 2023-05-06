<template>
  <div>
    <div class="top-btn" v-if="showColumns">
      <div>
        <slot name="table-top-btn"></slot>
      </div>
      <div>
        <slot name="table-right-btn"></slot>
        <el-button icon="el-icon-setting" size="small" @click="dialogVisible = true">自定义列</el-button>
      </div>
    </div>
    <el-table ref="table" :data="tempData" :header-cell-style="headerCellStyle" :cell-style="cellStyle" v-bind="$attrs"
      v-on="$listeners">
      <template v-if="$slots.append" slot="append">
        <slot name="append"></slot>
      </template>
      <template v-for="item in copyColumns">
        <el-table-column v-if="item.type && ['selection', 'index'].includes(item.type)" :key="`${item.prop}-if`"
          v-bind="item">
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
      <!-- 前端根据数据分页 -->
      <el-pagination v-if="frontendPaging && !$scopedSlots[`paging`]" class="pagination" v-bind="tempPagination"
        :current-page="currentPage" :page-size="fontPageSize" :total="fontTotal" @size-change="frontSizeChange"
        @current-change="frontCurrentChange"></el-pagination>

      <!-- 后端分页 -->
      <el-pagination class="pagination" v-else-if="!frontendPaging && !$scopedSlots[`paging`]"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="endPage.currentPage"
        :page-sizes="pageSizes" :page-size="endPage.pageSize" :layout="layout" :total="endPage.total">
      </el-pagination>

      <!-- 自定义分页 -->
      <div v-else-if="$scopedSlots[`paging`]">
        <slot name="paging" :tempData="tempData" :columns="copyColumns"></slot>
      </div>
    </div>

    <!-- 设置列 -->
    <el-dialog :visible.sync="dialogVisible" width="600px" v-if="showColumns">
      <template #title>
        <span class="dialog-title">自定义设置表格列</span>
      </template>
      <div style="padding-bottom: 20px;">请选择在表格中显示的数据列</div>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span> <el-checkbox disabled>多选项</el-checkbox></span>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="(item, index) in columns" :key="index" :label="item.prop">
            <el-tooltip placement="top" effect="light">
              <span slot="content">{{ item.label }}</span>
              <span class="isEllipsis">{{ item.label }}</span>
            </el-tooltip>
          </el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </span>
    </el-dialog>
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
    },
    pageSizes: {
      default() {
        return [10, 20, 30, 50, 100];
      },
      type: Array
    },
    layout: {
      default() {
        return 'total, sizes, prev, pager, next, jumper';
      },
      type: String
    },

    /** 是否显示自定义列 */
    showColumns: {
      default: false,
      type: Boolean
    },

  },
  data() {
    return {
      fontPageSize: 10,
      tempData: [],
      dialogVisible: false,
      checkList: [],
      copyColumns: [],
    }
  },
  computed: {
    paging() {
      const offset = (this.currentPage - 1) * this.fontPageSize
      return { offset, limit: this.fontPageSize }
    },
    fontTotal() {
      return this.data?.length || 0
    },
    tempPagination() {
      return { ...defaultPagination, ...this.FrontPage }
    }
  },
  watch: {
    'data': {
      handler() {
        this.tempData = this.data;
      },
      deep: true,
      immediate: true,
    },
    FrontPage: {
      handler(nVal) {
        this.currentPage = nVal.currentPage || 1
        this.fontPageSize = nVal.fontPageSize || nVal.pageSizes?.[0] || 10
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
    },
  },
  mounted() {
    const tempStore = this.$refs?.table || {}
    for (const key in tempStore) {
      if (typeof tempStore[key] === 'function') {
        this[key] = tempStore[key]
      }
    }
    this.processingColum();
    this.determine();
  },
  methods: {
    /**
     * 前端分页
     * @param {*} val 
     */
    frontSizeChange(val) {
      this.fontPageSize = val;
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

    /**
     * 后端分页 重写分页回调，解决与表格回调冲突
     * @param {*} val
     */
    handleCurrentChange(val) {
      this.$emit("current-paging", val)
    },

    handleSizeChange(val) {
      this.$emit("size-paging", val)
    },

    processingColum() {
      /** 列处理 */
      this.copyColumns = JSON.parse(JSON.stringify(this.columns));
      let itemColum = this.columns.filter((item) => item.show !== false)
      itemColum.map((item) => this.checkList.push(item.prop))
    },

    determine() {
      this.dialogVisible = false;
      let add = this.columns.filter(item => this.checkList.some(ele => ele === item.prop))
      this.copyColumns = add
      this.$refs.table.doLayout();
    }
  }

}
</script>

<style scoped>
.top-btn {
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
  align-items: flex-end;
}

.dialog-title {
  font-size: 18px;
  font-weight: bold;
}

>>> .isEllipsis {
  display: inline-block;
  width: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
}

>>>.el-checkbox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 0px
}

>>> .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 20px;
}
>>> .el-dialog__body {
  padding: 10px 20px 10px 20px;
}

>>> .el-card__header {
  padding: 10px 20px;
}
</style>