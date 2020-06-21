<template>
	<view class="lecai-my-index">
		<view class="my-assets">
			<view class="assets-title">可转出数量</view>
			<view class="asset-amount">
				{{totalGameAmount}}
				<text class="asset-unit">GCN</text>
			</view>
			<view class="asset-result">
				待结算数量: {{totalFreezeAmount}} GCN
			</view>
		</view>
		<view class="buttons">
			<u-button type="error" plain class="btn-plain" @click="goUrl('./transfer?amount='+totalAmount)">转入</u-button>
			<u-button type="error" @click="goUrl('./transfer?isReverse=1&amount='+totalGameAmount)">转出</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalAmount: 0,
				totalGameAmount: 0,
				totalFreezeAmount: 0
			}
		},
		created() {
			this.getCoinList();
		},
		methods: {
			goUrl(page) {
				uni.navigateTo({
					url: page
				})
			},
			getCoinList() {
				this.$u.api.getUserAmount().then(res => {
					if(res.data.length) {
						let totalGameAmount = 0;
						let totalFreezeAmount = 0;
						let totalAmount = 0;
						res.data.forEach(v => {
							if(v.coinName === 'GCN') {
								totalGameAmount = v.gameAmount || 0;
								totalFreezeAmount = v.frozenAmount || 0;
								totalAmount = v.amount || 0;
							}
						});
						this.totalAmount = totalAmount;
						this.totalGameAmount = totalGameAmount;
						this.totalFreezeAmount = totalFreezeAmount;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.lecai-my-index{
		padding: 30rpx;
		.my-assets{
			padding: 100rpx 0;
			
			.assets-title{
				text-align: center;
				font-size: 30rpx;
				color: #343434;
			}
			.asset-amount{
				text-align: center;
				font-size: 52rpx;
				color: #343434;
				
				.asset-unit{
					font-size: 24rpx;
					margin-left: 15rpx;
				}
			}
			.asset-result{
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #A5A5A5;
				text-align: center;
			}
		}
		.buttons{
			display: flex;
			
			.u-btn{
				width: 44%;
			}
			.u-btn.btn-plain{
				background-color: #fff!important;
				border: 2rpx solid #FA4444!important;
			}
		}
	}
</style>
