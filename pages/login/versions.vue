<template>
	<view class="versions">
		<!-- <image src="share4.png" mode="" class="img"></image> -->
    <image src="../../static/logo/xiazaibj.png" mode="" class="img"></image>
    <view class="flexzxlist">
      <image src="../../static/logo/android.png" mode=""></image>
      <image src="../../static/logo/iphone.png" mode=""></image>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
  .versions{
    .flexzxlist{
      height: 300rpx;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      align-items: center;
      padding-top: 50rpx;
    }
    .img{
      width: 100%;
      height: 800rpx;
    }
    image{
       width: 400rpx;
       height: 100rpx;
    }
  }
</style>
