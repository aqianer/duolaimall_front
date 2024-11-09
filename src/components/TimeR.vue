<template>
  <div class="dat-time">
    <div style="font-size: 25px;" class="time-box">
      <div style="width: 40px; height: 40px;padding: 3px; background: #999999; text-align: center">
        <span>{{time_h1}}{{time_h2}}</span>
      </div>
      <div style="">&nbsp;:&nbsp; </div>
      <div style=" width: 40px; height: 40px;padding: 3px; background: #999999; text-align: center">
        <span>{{time_m1}}{{time_m2}}</span>
      </div>
      <div style="">&nbsp;:&nbsp;</div>
      <div style="width: 40px; height: 40px;padding: 3px; background: #999999; text-align: center">
        <span>{{time_s1}}{{time_s2}}</span>
      </div>
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
    mounted () {
      this.countdowm(this.endTime) // 调用计时器
    },
    methods: {
      countdowm (endTime) {
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
  .time-box{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row ;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
</style>
