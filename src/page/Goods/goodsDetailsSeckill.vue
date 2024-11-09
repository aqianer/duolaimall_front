<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.productName">
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big" :alt="product.productName">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4 style="color: #df5000;">限时秒杀</h4>
          <h4>{{product.productName}}</h4>
          <div style="text-align: right;">
            <time-r2 @endGoods=endGoods :endTime="sessionSeconds"></time-r2>
          </div>
          <hr style="margin: 5px 0px 10px 0px;">
          <h6>
            <span>{{product.subTitle}}</span>
            <div class="price">
               <em style="color: silver">
                 原价¥
               </em>
              <i style="color: silver;text-decoration:line-through" >
                {{product.salePrice.toFixed(2)}}
              </i>&nbsp;&nbsp;
              <br>
               <em style="color: white; font-size: 12px">
                 秒杀¥
               </em>
              <i style="color: white;  font-size: 12px">
                {{product.promoPrice.toFixed(2)}}
              </i> &nbsp;&nbsp;
            </div>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span> &nbsp;&nbsp; 1
<!--          <buy-num @edit-num="editNum" :limit="Number(1)"></buy-num>-->
        </div>
        <div class="buy">
          <y-button text="立即秒杀"
                    v-show="stopSeckill===0"
                    @btnClick="addCart(product)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
<!--          <y-button text="立即购买"-->
<!--                    v-show="stopSeckill===0"-->
<!--                    @btnClick="checkout(product.productId)"-->
<!--                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>-->
          <el-button type="success" v-show="stopSeckill===1">该场次商品秒杀已结束</el-button>
          <el-button type="success" v-show="stopSeckill===2">商品已经秒完</el-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <el-tabs v-model="activeTab" @tab-click="_handleTabClick" style="background: #fff;border-radius: 5px;padding: 0 50px">
      <el-tab-pane label="产品信息" name="itemInfo">
        <div class="item-info" style="border-radius: 5px">
          <div>
            <div class="img-item" v-if="productMsg">
              <div v-html="productMsg">{{ productMsg }}</div>
            </div>
            <div class="no-info" v-else>
              <img src="/static/images/no-data.png">
              <br>
              该商品暂无内容数据
            </div>
          </div>
        </div>
      </el-tab-pane>
<!--      <el-tab-pane label="评论" name="comment">-->
<!--        <span slot="label">评论（{{totalCommentCount}})</span>-->

<!--        <div style="min-height: 300px">-->
<!--          <div style="display: flex;justify-content: center;padding-top: 130px" v-if="!commentList || commentList.length === 0">-->
<!--            <span style="font-size: 20px">当前商品无评价</span>-->
<!--          </div>-->
<!--          <div v-else>-->

<!--          </div>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>
<script>
  import { productDetSeckil, getAllComments, getAllCommentsCount } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '/components/shelf'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  import { getStore } from '/utils/storage'
  import TimeR2 from './TimeR2'
  export default {
    data () {
      return {
        productMsg: {},
        small: [],
        big: '',
        product: {
          salePrice: 0,
          promoPrice: 0
        },
        productNum: 1,
        userId: '',
        // form
        pageForm: {
          page: 0,
          size: 10
        },

        // data
        activeTab: 'itemInfo',
        totalCommentCount: 0,
        commentList: [],
        commentType: null,
        psId: 0,
        productId: 0,
        nextSession: 0,
        sessionSeconds: 0,
        stopSeckill: 0
      }
    },
    mounted () {
      this.psId = this.$route.query.psId
      this.productId = this.$route.query.productId
      this.nextSession = this.$route.query.nextSession
      var now = new Date()
      var nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
      var nextSeconds = this.nextSession * 3600
      this.sessionSeconds = nextSeconds - nowSeconds
      this._productDet(this.$route.params.productId)
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      endGoods () {
        // this.stopSeckill = 1
      },
      _productDet (productIdP) {
        var _this = this
        // TODO
        productDetSeckil({productId: parseInt(productIdP), psId: parseInt(this.psId)}).then(res => {
          let result = res.result.promoProductDetailDTO
          this.product = result
          if (res.code !== 200) {
            alert('秒杀商品不存在')
            setTimeout(() => {
              // TODO 跳转到首页
              _this.$router.push({ path: '/' })
            }, 1000)
          }
          this.productMsg = result.detail || ''
          this.small = result.productImageSmall
          this.big = this.small[0]
        }).catch(error => {
          console.log(error)
        })
      },
      _productCommentCount (productId) {
        let params = {
          productId,
          type: this.commentType
        }
        getAllCommentsCount({params: params}).then(res => {
          let result = res.result
          console.log('%c[goodsDetails-res]', 'color: #63ADD1', result)
        })
      },
      _productCommentList (productId) {
        // let params = {
        //   productId,
        //   type: this.commentType,
        //   page: this.pageForm.page,
        //   size: this.pageForm.size
        // }
        // getAllComments({params: params}).then(res => {
        //   let result = res.result
        //   console.log('%c[goodsDetails-res]', 'color: #63ADD1', result)
        // })
      },
      _handleTabClick (tabComponent) {
        let {name} = tabComponent
        if (name === 'comment') {
          if (this.totalCommentCount !== 0) {
            this.pageForm.page = 0
            this._productCommentList(this.$route.params.productId)
          }
        }
      },

      addCart (product) {
        product['productNum'] = this.productNum
        product['big'] = this.big
        this.$router.push({path: '/checkoutSeckill', query: { psId: this.psId, product: product }})
      },

      editNum (num) {
        this.productNum = num
      }
    },
    components: {
      YShelf, BuyNum, YButton, TimeR2
    },
    watch: {
      $route (to, from) {
        if (to.fullPath.includes('/product/')) {
          let id = this.$route.params.productId
          this._productDet(id)
          this.userId = getStore('userId')
        }
      }
    },
    created () {
      let id = this.$route.params.productId
      this._productCommentCount(id)
      this.userId = getStore('userId')
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 450px;
      margin-left: 10px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    background: red;
    border-radius:7px;
    padding-top: 7px;
    padding-bottom: 5px;
    width: 100%;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
</style>
