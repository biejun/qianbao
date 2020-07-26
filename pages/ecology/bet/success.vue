<template>
	<view class="touzhu-cg">
		<view class="success-img">
			<image src="../../../static/success.png" class="img"></image>
			<view class="success-text">{{$t('Bettingsuccessful')}}</view>
		</view>
		<view class="go-back">
			<button type="default" class="btn" @click="goBack">{{$t('GoHome')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				i18n: {
					zh: {
						Bettingsuccessful: "投注成功",
						GoHome: "返回首页"
					},
					en: {
						Bettingsuccessful: "Betting successful",
						GoHome: "Go Home"
					}
				},
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 4
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
				width: 180rpx;
				height: 200rpx;
				margin-bottom: 20rpx;
			}
			
			.success-text{
				font-size: 34rpx;
			}
		}
		
		.go-back{
			padding: 30rpx;
			
			.btn{
				background-color: $uni-color-primary;
				color: #fff;
				font-size: 34rpx;
			}
		}
	}
</style>
