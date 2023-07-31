---
order: 1
---

# 安装/使用

## 安装

### npm 安装

```sh
npm i 168wangxiao-ui -S
```

### 全部引入

```javascript
/** main.js 中 */
import WangxiaoUI from '168wangxiao-ui'
import '168wangxiao-ui/dist/168wangxiao-ui.css'
Vue.use(WangxiaoUI);
```

### 按需引入

```javascript
/** main.js 中 */
import { WangxiaoTable } from '168wangxiao-ui'
import '168wangxiao-ui/dist/168wangxiao-ui.css'
Vue.use(WangxiaoTable);
```

## 使用
### 基本使用

```vue
<template>
  	<wangxiao-table 
      :data="gridData"
      :columns="columns" 
      @size-change="endSizeChange" 
      @current-change="endCurrentChange">
    </wangxiao-table>
<template>
```

```javascript
export default {
  data(){
    return {
      gridData: [{
        name: "168wangxiao",
        age: 168
      }],
      columns: [
          {
            prop: 'selection',
            type: 'selection',
            width: 80
    		  },{
            prop: "name",
            label: "姓名",
            width: 200,
       	  },{
            prop: "age",
            label: "年龄",
            width: 200,
        	  sortable: true, 
       	  }],
      }
  },
  methods: {
    endSizeChange(val){
      console.log(val);
    },
    endCurrentChange(val){
      console.log(val);
    }
  }
}
```