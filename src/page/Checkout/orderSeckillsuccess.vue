<template>
  <div class="w">
    <y-shelf title="秒杀成功" style="text-align: center">
      <div slot="content" class="content">
        <p>
          <i class="el-icon-circle-check icon-success"></i>
          恭喜秒杀<span>预定成功</span>，请在30分钟内支付订单<br><br>
        </p>
        <div style="margin-top: 20px;">
          <router-link to="/user">
            <y-button text="查看订单" style="width: 150px;height: 50px;line-height: 48px;font-size: 20px"
                      classStyle="main-btn"></y-button>

          </router-link>
          <router-link to="/home">
            <y-button text="继续选购" style="width: 150px;height: 50px;line-height: 48px;font-size: 20px"
                      classStyle="main-btn"></y-button>

          </router-link>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
      }
    },
    components: {
      YShelf,
      YButton
    },
    mounted () {
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    padding: 150px 0;
    font-size: 30px;
  }

  .icon-success {
    font-size: 33px;
    color: #01b401;
  }

  span.price {
    color: #d44d44;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
  }
</style>
