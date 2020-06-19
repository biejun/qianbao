<template>
	<view class="service">
		<view class="kfh">如遇到问题，请使用微信联系客服</view>
   <image src="../../static/index/userCenter/icon_kefu.png" mode=""></image>
		<!-- <image src="../../static/kf.jpg" mode=""></image> -->
		<view class="kfh">微信</view>
		<view class="kfh">客服号：{{txt}}<text @click="copy(txt)">复制</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:"asdasdasdasdasd"
			};
		},
		methods:{
			copy(value){
			uni.setClipboardData({
							data: value
				});
			}
		}
	}
</script>

<style lang="scss">
	.service{
		text-align: center;
		padding: 150rpx;
		height: 100%;
		font-size: 30rpx;
		image{
			width: 210rpx;
			height: 210rpx;
			padding: 50rpx;
		}
		.kfh{
			font-size: 30rpx;
			text{
				color: #1296DB;
				padding-left: 20rpx;
			}
		}
	}
</style>
 