order: 5

# 上传

## 预览
![](./../images/upload.png)

## 基本使用

```vue
    <div style="display: flex; margin: 50px;">
      <wangxiao-upload 
        style="margin-right: 20px; width: 406px;" 
        :suffixArray="['jpg', 'png', 'jpeg']" 
        :multiple="false">
      </wangxiao-upload>
  
      <wangxiao-upload 
        style="width: 406px;" 
        echo="card" 
        :suffixArray="['jpg', 'png', 'jpeg']"
        :multiple="false">
      </wangxiao-upload>
    </div>

    <div style="display: flex; margin: 50px;">
      <wangxiao-upload 
        style="margin-right: 20px;width: 406px;" 
        IDNumber 
        frontBack="front" 
        :suffixArray="['jpg', 'png', 'jpeg']"
        :multiple="false">
      </wangxiao-upload>

      <wangxiao-upload 
        IDNumber 
        frontBack="back" 
        style="width: 406px;" 
        :suffixArray="['jpg', 'png', 'jpeg']"
        :multiple="false">
      </wangxiao-upload>
    </div>

    <wangxiao-upload 
      frontBack="back" 
      style="margin: 50px; width: 406px;" 
      :suffixArray="['jpg', 'png', 'jpeg']"
      :multiple="false">
      <template #content>
        <div>自定义内容</div>
      </template>
    </wangxiao-upload>
```


## API

### Attribute

| 名称        | 描述                                               | 类型    | 默认值                                                       | 可选值        | 是否必填 |
| ----------- | -------------------------------------------------- | ------- | ------------------------------------------------------------ | ------------- | -------- |
| text        | 按钮文案                                           | String  | 上传文件                                                     | ———           | 否       |
| describe    | 描述                                               | String  | 点击上传 / 拖拽到此区域上传                                  | ———           | 否       |
| prompt      | 提示说明                                           | String  | 支持扩展名：word文件(.doc .docx) 、 PDF文件(.pdf)、文件大小在500M内 | ———           | 否       |
| dimension   | 警告说明                                           | Boolean | ———                                                          | ———           | 否       |
| multiple    | 是否支持多选文件上传                               | Boolean | true                                                         | true \| false | 否       |
| suffixArray | 限制文件类型                                       | Array   | ["doc", "docx", "pdf"]                                       | ———           | 否       |
| fileSize    | 限制文件大小                                       | Number  | 500                                                          | ———           | 否       |
| IDNumber    | 是否显示身份证上传样式                             | Boolean | false                                                        | true \| false | 否       |
| echo        | 文件回显样式                                       | String  | list                                                         | card \| list  | 否       |
| frontBack   | 身份证上传 正反面（只当 IDNumber 为 true 时生效）  | String  | front                                                        | front \| back | 否       |
| IDprompt    | 身份证上传提示说明（只当 IDNumber 为 true 时生效） | String  | "支持扩展名：.jpg .jpeg .png，文件大小在5M内"                | ———           | 否       |
| IDdescribe  | 身份证上传描述（只当 IDNumber 为 true 时生效）     | String  | "点击上传 / 拖拽到此区域上传头像面"                          | ———           | 否       |
| IDdimension | 身份证上传警告说明（只当 IDNumber 为 true 时生效） | String  | ———                                                          | ———           | 否       |


### slots
| 名称        | 描述                                                |
| ----------- | -------------------------------------------------- |
| content        | 自定义内容                                       |
