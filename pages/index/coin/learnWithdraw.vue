<template>
	<view class="learn-ex">
		<view class="inner">
			<u-parse :html="content" :selectable="true"></u-parse>
<!-- 			<view class="text">
				提币是把USDT、BTC、ETH提到区块玩家外部的数字钱包或者交易所。
			</view>
			<view class="text">
				GCN暂时不支持交易所，所以只能提到外部的钱包，不能提到交易所。
			</view>
			<view class="text">
				把以上数字货币提到区块玩家之外的数字钱包，矿工打包区块记录提币交易，所以提币时区块链产生矿工费。
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				content: ""
			}
		},
		created() {
			this.$u.api.getTextContext(2).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.textTitle
				})
				this.content = res.data.content;
			})
		}
	}
</script>

<style lang="scss">
	.learn-ex{
		height: 100%;
		background-color: #F2F3FE;
		
		.inner{
			padding: 30rpx;
			
			/deep/ p{
				word-wrap: break-word;
				word-break: break-all;
			}
			
			/deep/ .text{
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