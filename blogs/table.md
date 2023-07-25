---
# date: 2023/05/07
# categories:
#  - spoony-z
---

<!-- ![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg) -->

# 168wangxiao-table

## columns：表头数据

必须：是

类型：Array

默认值： []

字段说明：prop："对应 data 数据字段"，label："表头名称"

## data：列表数据

必须：是

类型：Array

默认值：[]

## showPagination：是否显示分页

类型：Boolean

默认值：true

可选值：true | false

## frontendPaging：前端分页

类型：Boolean

默认值：false

可选值：true | false

###  pagination：前端分页

​	类型：Object

​	默认值：false

​	可选值：true | false

:::tip 演示

```vue
  <wangxiao-table 
    :frontendPaging="true" 
    :data="dataata" 
    :columns="columns">
  </wangxiao-table>
```

:::

## BackendPaging：后端分页

类型：Boolean

默认值：false

可选值：true | false

### 分页参数：endPage

类型：Object

默认值：{

​     currentPage: 1,

​     pageSize: 10,

​     total: 0

​    }

## headerCellStyle：表头单元格样式配置

可选值：Function | Object

默认值：

```javascript
 {
 'background-color': '#f5f6f7',
 'font-size': '12px',
 'padding': '10px',
}
```

## cellStyle：表格单元格的样式配置

可选值：Function | Object

默认值：

```javascript
{
 'font-size': '12px',
 'padding': '10px'
}
```

## showColumns：是否显示自定义列

类型：Boolean

默认值：false

可选值：true | false

## drag 是否列拖拽

类型：Boolean

默认值：false

可选值：true | false

## paging：自定义分页

:::tip 演示

```vue
<wangxiao-table :data="data" :columns="columns">
	<template #paging="tempPagination">
    	分页
    </template>
</wangxiao-table>
```
:::

## 表头布局

:::tip 演示
```vue
    <wangxiao-table :data="data" :columns="columns" showColumns>
      <template #table-top-btn>
        <el-button>默认按钮</el-button>
      </template>
      <template #table-right-btn>
        <el-button>默认按钮</el-button>
      </template>
    </wangxiao-table>
```
:::

## 组件传参

```javascript
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
```