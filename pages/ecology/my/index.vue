<template>
	<view class="lecai-my-index">
		<view class="my-assets">
			<view class="assets-title">可转出数量</view>
			<view class="asset-amount">
				279.24
				<text class="asset-unit">GCN</text>
			</view>
			<view class="asset-result">
				待结算数量: 12.15 GCN
			</view>
		</view>
		<view class="buttons">
			<u-button type="error" plain class="btn-plain">转入</u-button>
			<u-button type="error">转出</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
