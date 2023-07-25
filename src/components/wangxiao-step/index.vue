<template>
  <div class="top-nav">
    <!-- <div class="imgs"><img src="@/assets/img/back.png" alt="" /></div> -->
    <div class="right">
      <div class="nav-div" v-for="(item, index) in dataList" :key="index">
        <div class="item-nav" :class="{ active: item['have-class'] }">
          <template v-if="$slots[item.prop]" >
            <slot :name="item.prop" :scope="item"></slot>
          </template>
          <div v-else>{{ item.name }}</div>
        </div>
        <div v-if="index !== list.length - 1" class="nav-middle-line" :class="{ active: item['have-class'] }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wangxiaoStep",
  props: {
    count: {
      type: [Number, String],
      default: 0,
    },
    /** 数据集合 */
    list: {
      type: Array,
      default: () => [],
    }
  },
  watch: {
    count: {
      handler(val) {
        const navList = JSON.parse(JSON.stringify(this.list))
        navList.forEach((item, index) => {
          const i = index + 1;
          if (i <= val) {
            item['have-class'] = true
          } else {
            item['have-class'] = false
          }
        });
        this.dataList = navList;
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      dataList: [],
    };
  },
  created() {

  }
};
</script>

<style scoped>
.top-nav {
  width: 100%;
  display: flex;
  align-items: center;
}

.imgs {
  width: 15px;
  height: 15px;
}

img {
  width: 100%;
  height: 100%;
}

.item-nav {
  min-width: 84px;
  height: 26px;
  border-radius: 20px 20px 20px 20px;
  border: 1px solid #999999;
  text-align: center;
  line-height: 26px;
  font-size: 13px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}

.nav-div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.right {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.nav-div:last-child {
  display: block;
  width: 50%;
}

.nav-middle-line {
  width: 100%;
  height: 0;
  border-top: 1px solid #999999;
  margin: 0 5px;
}

.active {
  background: rgba(0, 127, 206, 0.05) !important;
  border-color: #007fce !important;
  color: #007fce !important;
}</style>