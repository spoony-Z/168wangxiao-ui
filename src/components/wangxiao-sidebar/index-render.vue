<script>
export default {
  name: "WangxiaoSidebar",
  props: {
    level: {
      require: true,
      type: Number,
    },
    name: {
      require: true,
    }
  },
  /**
   * h 函数是 createElement 的简写
   * h 函数有三个参数 String | Object | Function
   *    String：html 标签
   *    Object： 一个含有数据的组件选项对象
   *    Function： 返回一个含有标签名或者组件选项对象的 async 函数
   * 
   *    第一个参数是必填的，可以是 String | Object | Function
   *      例如：
   *            String
   *            return createElement('h1');
   * 
   *            Object
   *            return h({
   *              template: " <div>锄禾日当午</div> "
   *            })
   * 
   *            Function
   *            let domFun = function () {
   *            return {
   *                template: " <div> 锄禾日当午</div> "
   *              }
   *            }
   *            return createElement(domFun())
   * 
   *    第二个参数是选填的，一个与模板中属性对应的数据对象 常用的有class | style | attrs | domProps | on
   *      例如：
   *          return createElement('div', {
              与 `v-bind:class` 的 API 相同，
              接受一个字符串、对象或字符串和对象组成的数组
              'class': {
                foo: true,
                bar: false
              },

              与 `v-bind:style` 的 API 相同，
              接受一个字符串、对象，或对象组成的数组
              style: {
                color: 'red',
                fontSize: '14px'
              },

              普通的 HTML 特性
              attrs: {
                id: 'foo'
              },

              组件 prop
              props: {
                myProp: 'bar'
              },

              DOM 属性
              domProps: {
                innerHTML: 'baz'
              },

              事件监听器在 `on` 属性内，
              但不再支持如 `v-on:keyup.enter` 这样的修饰器。
              需要在处理函数中手动检查 keyCode。
              on: {
                click: this.clickHandler
              },

              仅用于组件，用于监听原生事件，而不是组件内部使用
              `vm.$emit` 触发的事件。
              nativeOn: {
                click: this.nativeClickHandler
              },

              自定义指令。注意，你无法对 `binding` 中的 `oldValue`
              赋值，因为 Vue 已经自动为你进行了同步。
              directives: [
                {
                  name: 'my-custom-directive',
                  value: '2',
                  expression: '1 + 1',
                  arg: 'foo',
                  modifiers: {
                    bar: true
                  }
                }
              ],

              作用域插槽的格式为
              { name: props => VNode | Array<VNode> }
              scopedSlots: {
                default: props => createElement('span', props.text)
              },

              如果组件是其它组件的子组件，需为插槽指定名称
              slot: 'name-of-slot',

              其它特殊顶层属性
              key: 'myKey',
              ref: 'myRef',
              
              如果你在渲染函数中给多个元素都应用了相同的 ref 名，
              那么 `$refs.myRef` 会变成一个数组。
              refInFor: true
            })

   *   第三个参数是选填的，代表子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，正常来讲接收的是一个字符串或者一个数组，一般数组用的是比较多的
   *      例如:
   *           return h('div', {
                  attrs: {
                    id: "content"
                  }
                }, [
                    h('h1', '我是H1标题'),
                    h('h6', '我是H6标题')
                  ]
                )
   * 注意：
   *    在render函数中，没有提供v-model的实现，所以你必须自己实现相应的逻辑。这就是深入底层的代价，但与v-model相比，这可以让你更好地控制交互细节。
   * 
   * 事件修饰符
   *    对于.passive，.capture， .once 这些事件修饰符, Vue 提供了相应的前缀可以用于 on
   *    
   *    修饰符      前缀
   *    .passive    &
   *    .capture    !
   *    .once       ~
   *    .capture.once 或.once.capture    ~!
   * 例如：
   *   on: {
          '!click': this.doThisInCapturingMode,
          '~keyup': this.doThisOnce,
          '~!mouseover': this.doThisOnceInCapturingMode
        }
   * 
   * @param {*} h 
   */

  render(h) {
    let that = this
    return h('el-input', {
      domProps: {
        value: that.name
      },
      on: {
        input(event) {
          that.$emit('input', event.target.value)
        }
      }
    })
  }
}
</script>