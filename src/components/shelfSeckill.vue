<template>
  <div class="gray-box" v-if="show">
    <div class="title">
      <h2>限时秒杀</h2>
<!--      <div style="float: right; width: 50px; height: 19px;line-height: 19px;">-->
<!--        <div @click="clickChange('last')" style="float: left; padding: 2px; border: 1px solid silver">-->
<!--          <svg class="icon" aria-hidden="true" style="font-size: 17px">-->
<!--            <use xlink:href="#icon-fanhui"></use>-->
<!--          </svg>-->
<!--        </div>-->
<!--        <div @click="clickChange('next')" style="float: right; padding: 2px; border: 1px solid silver">-->
<!--          <svg class="icon" aria-hidden="true" style="font-size: 17px">-->
<!--            <use xlink:href="#icon-jinru"></use>-->
<!--          </svg>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <!--内容-->
    <div>
      <div class="hot1">
        <mall-seckill :seckillstyle="1" :session="session" :sessionHint="sessionHint" :sessionSeconds="sessionSeconds"></mall-seckill>
        <mall-seckill :seckillstyle="2"  :nextSession="nextSession" :goods="iitem" :psId="psId" v-for="(iitem,j) in panelContentItems1" :key="j"></mall-seckill>
      </div>
    </div>
  </div>
</template>
<script>
  import seckillSession from '../api/config'
  import { seckilllist } from '/api/index.js'
  import mallSeckill from './mallSeckill'
  export default {
    props: {
      show: {
        type: Boolean,
        default: true,
        required: false
      }
    },
    components: {
      mallSeckill
    },
    data () {
      return {
        listNow: 0,
        sessionId: 0,
        session: '0:00',
        sessionHint: '未开始',
        sessionSeconds: 0,
        nextSession: 0,
        psId: 0,
        setIntervalList: 0,
        panelContentItems1: [
          // {
          //   id: 29,
          //   inventory: 0, // 商品库存
          //   price: 100, // 商品原价
          //   seckillPrice: 50, // 商品秒杀价格
          //   picUrl: 'https://resource.smartisan.com/resource/3e931e9d0d270dae19b7fe9695551b4c.png?x-oss-process=image/resize,w_609/format,jpg/quality,Q_100',
          //   productName: '地平线 8 号旅行箱'
          // }
        ]
      }
    },
    created () {
      var now = new Date()
      var nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
      var middlesession = 0
      var middlesessionHint = '距离下一场还有'
      var middlesessionSeconds = 0

      var tag = 0
      for (const sessionTag of seckillSession.sessionListTag) {
        this.nextSession = sessionTag
        var nextSeconds = sessionTag * 3600 // 该次遍历场次所在时间(秒)
        if (nextSeconds > nowSeconds) {
          // 当前遍历的场次 在 当前时间之后
          if (tag === 0) {
            middlesession = seckillSession.sessionList[tag]
            middlesessionHint = '开场倒计时'
            middlesessionSeconds = nextSeconds - nowSeconds
            break
          }
          middlesessionSeconds = nextSeconds - nowSeconds
          break
        } else {
          // 当前遍历的场次 在 当前时间之前
          middlesession = seckillSession.sessionList[tag]
          tag++
          continue
        }
      }
      this.session = middlesession
      this.sessionHint = middlesessionHint
      this.sessionSeconds = middlesessionSeconds
      if (seckillSession.sessionList[seckillSession.sessionList.length - 1] === this.session) {
        // 最后一场
        this.sessionHint = '秒杀火热进行中...'
      }
    },
    mounted () {
      this.seckilllist()
      this.setIntervalList = setInterval(this.seckilllist, 60000)
    },
    beforeDestroy () {
      clearInterval(this.setIntervalList)
    },
    methods: {
      seckilllist () {
        let tag = seckillSession.sessionList.indexOf(this.session)
        this.sessionId = seckillSession.sessionIdS[tag]
        let params = {
          params: {
            sessionId: this.sessionId
          }
        }
        seckilllist(params).then(res => {
          if (res.success === false) {
            this.error = true
            return
          }
          this.panelContentItems1 = res.result.productList
          this.psId = res.result.psId
        }).catch(err => {
          console.log(err)
        })
      },
      clickChange (str) {
        if (str === 'last') {
          if (this.listNow === 0) {
            // 标识最前面一页
          } else {
            this.listNow--
            // TODO 发送请求触发上一页内容
            var mid = this.panelContentItems2
            this.panelContentItems2 = this.panelContentItems1
            this.panelContentItems1 = mid
          }
        } else if (str === 'next') {
          this.listNow++
          // TODO 发送请求触发下一页内容
          mid = this.panelContentItems2
          this.panelContentItems2 = this.panelContentItems1
          this.panelContentItems1 = mid
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .gray-box {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, .14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    .title {
      padding-left: 30px;
      position: relative;
      z-index: 10;
      height: 60px;
      padding: 0 10px 0 24px;
      border-bottom: 1px solid #d4d4d4;
      border-radius: 8px 8px 0 0;
      box-shadow: rgba(0, 0, 0, .06) 0 1px 7px;
      background: #f3f3f3;
      background: -webkit-linear-gradient(#fbfbfb, #ececec);
      background: linear-gradient(#fbfbfb, #ececec);
      line-height: 60px;
      font-size: 18px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
      }
    }
  }
  .hot1 {
    display: flex;
    > div {
      /*flex: 1;*/
      width: 20%;
    }
  }
</style>
