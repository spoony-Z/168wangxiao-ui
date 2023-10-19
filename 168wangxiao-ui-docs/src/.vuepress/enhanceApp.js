import WangxiaoUI from '168wangxiao-ui'
import '168wangxiao-ui/dist/168wangxiao-ui.css'

export default ({
 Vue,
 options,
 router
}) => {
 Vue.prototype._ = lodash;
 Vue.use(WangxiaoUI)
}