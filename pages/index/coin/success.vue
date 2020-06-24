<template>
	<view class="touzhu-cg">
		<view class="success-img">
			<image src="../../../static/success.png" class="img"></image>
			<view class="success-text">{{msg}}</view>
		</view>
		<view class="go-back">
			<button type="warn" @click="goBack">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '',
				back: 1
			}
		},
		onLoad(options) {
			this.msg = options.msg;
			this.back = Number(options.back);
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '提交成功'
			});	
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: this.back
				})
			}
		}
	}
</script>

<style lang="scss">
	.touzhu-cg{
		padding: 30rpx;
		
		.success-img{
			padding: 100rpx 0;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.img{
				width: 200rpx;
				height: 200rpx;
			}
			
			.success-text{
				font-size: 34rpx;
			}
		}
		
		.go-back{
			padding: 30rpx;
		}
	}
</style>
