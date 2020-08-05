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
						Bettingsuccessful: "投註成功",
						GoHome: "繼續投註"
					},
					en: {
						Bettingsuccessful: "Betting successful",
						GoHome: "Keep betting"
					}
				},
			}
		},
		created() {
			setTimeout(this.goBack, 3000);
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 2
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
				background-color: #fcc82b;
				color: #fff;
				font-size: 34rpx;
			}
		}
	}
</style>
