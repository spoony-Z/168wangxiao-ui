// 只允许弹出一个弹窗
import { Message } from 'element-ui'

const showMessage = Symbol('showMessage')

class gtMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage](type, options, single) {
    if (single) {
      if (!document.querySelector('.el-message')) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

const gtMessageCase = new gtMessage()
export default gtMessageCase;
