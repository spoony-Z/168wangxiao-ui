# 安装引入

## npm 安装

```sh
npm i 168wangxiao-ui -S
```

## 全部引入

```javascript
/** main.js 中 */
import WangxiaoUI from '168wangxiao-ui'
import '168wangxiao-ui/dist/168wangxiao-ui.css'
Vue.use(WangxiaoUI);
```

## 按需引入

```javascript
/** main.js 中 */
import { WangxiaoTable } from '168wangxiao-ui'
import '168wangxiao-ui/dist/168wangxiao-ui.css'
Vue.use(WangxiaoTable);
```