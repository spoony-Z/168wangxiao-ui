import { arrList } from "./lilst"
export default {
    name: 'Son',
    props: {
        age: String
    },
    render() {
        const { age } = this
        return (
            <div>
                <div >我是render函数的子组件也是render函数{age}</div>
                <div>
                    {
                        arrList.map((item, index) => (
                            <div>
                                序号：{index}
                                年龄：{item.age}
                            </div>
                        ))
                    }
                </div>
                    {
                        this.$scopedSlots.hender()
                    }
            </div>
        )
    },
}