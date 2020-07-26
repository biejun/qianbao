<template>
	<view class="common-bg learn-ex">
		<view class="inner">
			<view class="text">
				区块链玩家支持把USDT、BTC、ETH兑换成GNC，无矿工费。
			</view>
			<view class="text">
				区块链玩家支持把GCN兑换成USDT、BTC、ETH，无矿工费。
			</view>
			<view class="text">
				区块链玩家不支持USDT、BTC、ETH间互相兑换， 如果有兑换需求。请到交易所兑换，需要付矿工费。
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.learn-ex{
		height: 100%;
		
		.inner{
			padding: 30rpx;
			
			.text{
				position: relative;
				font-size: 29rpx;
				color: #585858;
				padding: 10rpx 0 10rpx 40rpx;
				
				&::before{
					position: absolute;
					left: 0;
					top: 50%;
					content: "";
					width: 20rpx;
					height: 20rpx;
					margin-top: -10rpx;
					background: #F6B37F;
					border-radius: 50%;
				}
			}
		}
	}
</style>
