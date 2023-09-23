---
order: 3
---

<!-- ![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg) -->

# 表格

:::tip 演示 一

```vue
  <wangxiao-table 
    :frontendPaging="true" 
    :data="dataata" 
    :columns="columns">
  </wangxiao-table>
```

:::

:::tip 演示 二

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


## API

### Attribute

| 名称            | 描述                                 | 类型    | 默认值                                                       | 可选值         | 是否必填 |
| --------------- | ------------------------------------ | ------- | ------------------------------------------------------------ | -------------- | -------- |
|                 |                                      |         |                                                              |                |          |
| columns         | 表头数据                             | Array   | ————                                                         | ————           | 是       |
| data            | 列表数据                             | String  | ————                                                         | ————           | 是       |
| showPagination  | 是否显示分页                         | Boolean | true                                                         | true \| false  | 否       |
| frontendPaging  | 前端分页                             | Boolean | true                                                         | true \| false  | 否       |
| BackendPaging   | 后端分页                             | Boolean | true                                                         | true \| false  | 否       |
| endPage         | 分页参数(数据总数，当前页，每页数据) | Object  | total:0,<br />currentPage:1,<br />pageSize:10                | ————           | 否       |
| headerCellStyle | 表头单元格样式配置                   | Object  | 'background':'#f5f6f7',<br />'font-size': '12px',<br />'padding': '10px', | ————           | 否       |
| cellStyle       | 表格单元格的样式配置                 | Object  | 'font-size': '12px',<br />'padding': '10px'                  | ————           | 否       |
| showColumns     | 显示自定义列                         | Boolean | false                                                        | true  \| false | 否       |
| drag            | 列拖拽                               | Boolean | false                                                        | true \| false  | 否       |
| pageSizes       | 每页显示个数选择器的选项设置         | Array   | [10, 20, 30, 50, 100]                                        | ————           | 否       |

### Event

| 方法名         | 描述                                                         | 回调参数                                              |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| current-paging | currentPage 改变时会触发(重写 table 分页回调，不要使用`current-change`) | 当前页                                                |
| size-paging    | pageSize 改变时会触发                                        | 每页条数                                              |
| dragRow        | 拖拽行时触发                                                 | Function(oldIndex,oldData,newIndex, currRow,tempData) |

### Slot

| 名称  | 描述           |
| ------- | -------------- |
| table-top-btn | 表头右上内容（showColumns 必须为true） |
| table-right-btn | 表头左上内容（showColumns 必须为true） |
| tempPagination | 自定义分页 |