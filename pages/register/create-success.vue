<template>
	<view class="common-bg create-success">
		<view class="item-SEFW">
			<view class="item-label-DESC2">您的私钥：</view>
			<view>
				<u-input v-model="vuex_privateKey" type="password"/>
			</view>
		</view>
		<view class="item-SEFW">
			<view class="item-label-DESC2">您的身份/地址：</view>
			<view>
				<u-input v-model="vuex_address" type="password"/>
			</view>
		</view>
		<view class="item-right-tip">这是您在区块链上的身份，也是数字货币GCN的转账地址！</view>
		<button type="default" class="submit-button" @click="submit">生成私钥助记词</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
			}
		},
		methods: {
			submit() {
				uni.navigateTo({
					url: '/pages/mnemonic/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.create-success{
		padding: 30rpx;
		
		.item-SEFW{
			padding: 28rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			
			.item-label-DESC2{
				margin-bottom: 10rpx;
				font-size: 28rpx;
				color: #8F8F8F;
			}
		}
		.item-right-tip{
			text-align: right;
			color: #5B5959;
			font-size: 20rpx;
		}
		.submit-button{
			margin-top: 100rpx;
			font-size: 32rpx;
			background-color: #FFC000;
			color: #fff;
		}
	}
</style>
