# 使用

## 在 vue2 项目组件中基本使用

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