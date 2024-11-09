<template>
  <footer>
    <div id="footerCode"></div>
    <div class="float-fixed"></div>
    <div id="footer">
      <div class="footer-contert">
        <div class="footer-content-logo">
          <img style="width: 220px; height: 70px" src="../../static/images/8.png" alt="底部LOGO">
          <span>多来买,一站式商城</span>
        </div>
        <div class="footer-content-aboutUs">
          <ul>
            <li>关于我们</li>
            <li><a href="#">了解多来买</a></li>
            <li><a href="#">加入多来买</a></li>
            <li><a href="#">投资多来买</a></li>
          </ul>
        </div>
        <div class="footer-content-service">
          <ul>
            <li>服务与支持</li>
            <li><a href="#">帮助中心</a></li>
            <li><a href="#">服务支持</a></li>
            <li><a @click="open1()">商务合作</a></li>
          </ul>
        </div>
        <div class="footer-content-img">
          <div class="footer-content-img-wx">
            <span>
              <img style="width: 80px; height: 80px" src="../../static/images/duo.jpg" alt="微信">
            </span>
            <span>官方微信</span>
          </div>
          <div class="footer-content-img-wb">
            <a href="//weibo.com/" target="_blank">
              <span  class="weibo">
                <img src="../../static/images/foot-web.png" alt="微博">
              </span>
              <span>官方微博</span>
          </a></div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
      }
    },
    methods: {
      open1 () {
        this.$notify.info({
          title: '法律声明',
          message: '本网站将会严格遵守国家和政府有关法律法规'
        })
      },
      open2 () {
        this.$notify.info({
          title: '隐私条款',
          message: '本网站将会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息'
        })
      }
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    padding: 50px 0 20px;
    border-top: 1px solid #e6e6e6;
    background: #fafafa;
    margin-top: 60px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 1220px;
  }
  #footer{
    width:100%;
    padding: 50px 0 20px;
    border-top: 1px solid #e6e6e6;
    background: #fafafa;
    margin-top: 60px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #footer>.footer-contert{
    width:1200px;
    margin:auto;
    overflow:hidden;
    padding-bottom:40px;
    /*height:50px;*/
  }
  #footer>.footer-contert div{
    float:left;
  }
  .footer-content-logo{
    margin-right:120px;
  }
  .footer-content-logo>span{
    display:block;
    color:#5e6062;
    font-size:14px;
    margin-top:30px;
  }
  .footer-content-aboutUs{
    margin-right:170px;
    margin-left: 60px;
  }
  .footer-content-aboutUs>ul li{
    font-size:18px;
    color:#5e6062;
  }
  .footer-content-aboutUs>ul li:first-child{
    margin-bottom:33px;
  }
  .footer-content-aboutUs>ul li>a{
    color:#5e6062;
    font-size:14px;
  }

  .footer-content-service>ul li{
    font-size:18px;
    color:#5e6062;
  }
  .footer-content-service>ul li:first-child{
    margin-bottom:33px;
  }
  .footer-content-service>ul li>a{
    color:#5e6062;
    font-size:14px;
  }

  #footer>.footer-contert>.footer-content-img{
    float:right;
  }
  #footer>.footer-contert>.footer-content-img span{
    display:block;
    color:#5e6062;
    text-align:center;
    font-size:14px;
  }
  #footer>.footer-contert>.footer-content-img span.weibo{
    border-radius: 10px;
    overflow: hidden;
    width: 80px;
    height: 80px;
  }
  #footer>.footer-contert>.footer-content-img>.footer-content-img-wx{
    margin-right:60px;
  }
  .footer-copy{
    width:100%;
    height:52px;
    text-align:center;
    line-height:52px;
    color:#5e6062;
    border-top: 1px solid #eaeaea;
    font-size:14px;
  }
  .footer-copy>a{
    color:#5e6062;
  }
</style>
