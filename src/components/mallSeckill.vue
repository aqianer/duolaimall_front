<template>
  <div style="">
    <Card style="width:103%; height: 350px; background: #f1eded "  v-if="seckillstyle==1" shadow>
      <div class="divselect" onselectstart="return false;" style="text-align:center">
        <div style="margin-top: 5px;margin-bottom: 10px; font-size: 25px; color: red">
          秒杀<br>
          {{session}}&nbsp;场
        </div>
        <svg class="icon" aria-hidden="true" style="font-size: 65px">
          <use xlink:href="#icon-shandian"></use>
        </svg>
        <div style="font-size: 20px" v-if="endSession===0">
        <h3 style="margin: 5px"><b>限时秒杀</b></h3>
          今日秒杀活动结束
        </div>
        <div v-else>
          <h3 style="margin: 5px"><b>限时秒杀</b></h3>
          <h3 style="margin-top: 15px; font-size: 20px">{{sessionHint}}</h3>
          <time-r @endGoods="endGoods" style="margin-top: 15px" :endTime="sessionSeconds"></time-r>
        </div>

      </div>
    </Card>
    <Card style="width:97%; height: 350px; margin-left:3% " :bordered="false"  v-if="seckillstyle==2">
      <div  @click="openProduct(goodsThis.id)"  style="text-align:center">
        <img :src="goodsThis.picUrl"  width="80%" height="200px" style="overflow: hidden">
        <h5 style="margin-top: 4px">剩余数量&nbsp;&nbsp;{{goodsThis.inventory}}</h5>
        <h6 style="color: #cccccc;margin-top: 8px">{{goodsThis.productName}}</h6>
        <span style="color: red">{{goodsThis.seckillPrice}}元</span>
        <span style="margin-top: 4px;color: silver;text-decoration:line-through" v-if="goodsThis.price && goodsThis.price !== 0 ">{{goodsThis.price}}元</span>
        <span style="margin-top: 4px;color: silver;text-decoration:line-through" v-else>{{goodsThis.seckillPrice  * 2}}元</span>
        <br>
        <el-button style="margin-top: 5px" size="mini" type="danger" v-if="goodsThis.inventory > 0" round>秒杀</el-button>
        <el-button style="margin-top: 5px" size="mini" type="success" v-else round>已经抢空</el-button>
      </div>
    </Card>
  </div>
</template>
<script>
  import TimeR from './TimeR'
  // import { seckill } from '/api/index.js'
  import { mapState } from 'vuex'
  export default {
    props: {
      goods: {
        salePrice: 0
      },
      seckillstyle: 0,
      session: 0,
      sessionHint: 0,
      sessionSeconds: 0,
      nextSession: 0,
      psId: 0
    },
    components: {
      TimeR
    },
    computed: {
      ...mapState([
        'cartList', 'login', 'receiveInCart', 'showCart', 'userInfo'
      ])
    },
    data () {
      return {
        endSession: 1,
        goodsThis: {}
      }
    },
    methods: {
      endGoods () {
        // TODO 该场次倒计时结束, 发一个新场次的请求
      },
      openProduct (id) {
        if (this.goodsThis.inventory <= 0) {
          alert('该货物已经秒杀结束')
          return
        }
        var str = '/productSeckill/' + id
        this.$router.push({path: str, query: { psId: this.psId, productId: id, nextSession: this.nextSession }})
      }
    },
    mounted () {
      this.goodsThis = this.goods
    }
  }
</script>
<style>
  .shadow:hover{
    -webkit-box-shadow: #ccc 0px 10px 10px;
    -moz-box-shadow: #ccc 0px 10px 10px;
    box-shadow: #ccc 0px 10px 10px;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .divselect{
    /*-moz-user-select:none;!*火狐*!*/
    /*-webkit-user-select:none;!*webkit浏览器*!*/
    /*-ms-user-select:none;!*IE10*!*/
    /*-khtml-user-select:none;!*早期浏览器*!*/
    /*user-select:none;*/
  }
</style>
