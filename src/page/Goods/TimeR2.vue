<template>
  <div>
    <div style="margin-bottom: 15px; ">
      <span>该场次结束倒计时</span>
        <span  style="background: red; padding: 5px; color: white;border-radius:4px;">{{time_h1}}{{time_h2}}</span>
     &nbsp;:&nbsp;
        <span style="background: red; padding: 5px; color: white;border-radius:4px;">{{time_m1}}{{time_m2}}</span>
     &nbsp;:&nbsp;
        <span style="background: red; padding: 5px; color: white;border-radius:4px;">{{time_s1}}{{time_s2}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TimeR',
    data () {
      return {
        content: '',
        time_s1: 0,
        time_s2: 0,
        time_m1: 0,
        time_m2: 0,
        time_h1: 0,
        time_h2: 0,
        timer: ''
      }
    },
    props: {
      endTime: {
        // 父组件传入的时间
        type: Number,
        default: ''
      }
    },
    watch: {
      endTime: function () {
        console.log(this.endTime)
        this.countdowm(this.endTime)
      }
    },
    mounted () {
      // console.log(this.endTime)
      // this.countdowm(this.endTime) // 调用计时器
    },
    methods: {
      countdowm (endTime) {
        console.log('低啊哟哟')
        let _self = this
        _self.timer = setInterval(() => {
          if (endTime > 0) { // 判断倒计时剩余的时间
            endTime--
            _self.formateSeconds(endTime) // 将秒数转化为特定格式
          } else {
            clearInterval(_self.timer) // 清除循环计时器
            _self._callback() // 倒计时结束调用回调函数
          }
        }, 1000)
      },
      // 将秒转化为时分秒
      formateSeconds (endTime) {
        let _self = this
        let secondTime = parseInt(endTime)
        let minTime = 0
        let hTime = 0
        if (secondTime > 60) {
          minTime = parseInt(secondTime / 60)
          secondTime = parseInt(secondTime % 60)
          if (minTime > 60) {
            hTime = parseInt(minTime / 60)
            minTime = parseInt(minTime % 60)
          }
        }
        _self.time_s1 = _self.x(secondTime, 0, 1)
        _self.time_s2 = _self.x(secondTime, 1, 2)
        _self.time_m1 = _self.x(minTime, 0, 1)
        _self.time_m2 = _self.x(minTime, 1, 2)
        _self.time_h1 = _self.x(hTime, 0, 1)
        _self.time_h2 = _self.x(hTime, 1, 2)
      },
      x (num, s1, s2) {
        return num
          .toString()
          .padStart(2, 0)
          .substring(s1, s2)
      },
      _callback () {
        this.$emit('endGoods')
      }
    }
  }
</script>

<style scoped>
</style>
