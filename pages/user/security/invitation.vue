<template>
  <view class="invitation">
    <view class="container-bottom">
      <view class="canvasid">
        <canvas canvas-id="qrcode"/>
      </view>
      <view class="cb-text2">
        <view>我的邀请码: {{txt}}<text @tap="copy(txt)">复制</text></view>
      </view>
    </view>
  </view>
</template>

<script>
  import uQRCode from '@/common/uqrcode.js'
  export default {
    data() {
      return {
        txt: "",
        reslist: '',
        money: 0,
      };
    },
    onLoad() {
      this.uQRCodelist()
    },
    methods: {
      make(resurl) {
        uQRCode.make({
          canvasId: 'qrcode',
          componentInstance: this,
          text: this.reslist,
          size: 160,
          margin: 10,
          backgroundColor: '#ffffff',
          foregroundColor: '#000000',
          fileType: 'jpg',
          correctLevel: uQRCode.defaults.correctLevel,
          success: res => {}
        })
      },
      async uQRCodelist() {
        await this.$u.get('/uUser/userInvite/' + 2, {}).then(res => {
          let a = res.data
          let arr=a.split("?");
          console.log()
          this.txt = arr[1].split("=")[1];
          this.reslist = res.data
          this.make()
        })
      },
      copy(value) {
        uni.setClipboardData({
          data: value
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .canvasid {
    position: relative;
    left: 50%;
    margin-left: -190rpx;
    // height: 380rpx;
  }

  .container-bottom {
    text-align: center;
    position: relative;
    .cb-text2 {
      padding-top: 20px;
      padding-right: 20px;
      text {
        color: #1296DB;
        text-decoration: underline;
        padding-left: 30rpx;
      }
    }
  }
</style>
