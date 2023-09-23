import Son1 from './son'
import scopendHender from "./scopendHender"

// const Son2 = {
//     name: "Son",
//     props: {
//         age: String
//     },
//     render(){
//         const {age} = this
//         return (
//             <div>我是定义的renter函数{age}</div>
//         )
//     }
// }
export default {
    name: "WangxiaoRender",
    props: {
        age: String
    },
    data() {
        return {
            heightData: "身高"
        }
    },
    methods: {
        cliskTest(entData) {
            this.$emit("chenage", this.heightData,entData)
        }
    },
    render() {
        const { age, cliskTest } = this
        const scopedSlots = {
            hender: () => {
               return <scopendHender></scopendHender>
            } 
        }
        return (
            <div>
                {/* 事件传参必须使用高阶(箭头)函数， 不然会报错 */}
                <div onClick={() => cliskTest("事件传参")} style={{ backgroundColor: 'red' }}>我是render{age}</div>
                {/* render函数中使用子组件和传参 */}
                {/* <Son2 age={'22222'}></Son2> */}
                <Son1 age={'11111'} scopedSlots={ scopedSlots }></Son1>
                {
                    this.$scopedSlots.ages()
                }
            </div>
        )
    },
    created(){
        console.log("生命周期也可以正常触发 created");
        this.$nextTick(() => {
        console.log("生命周期也可以正常触发 nextTick");
        })
    },
    mounted(){
        console.log("生命周期也可以正常触发 mounted");
    }
}