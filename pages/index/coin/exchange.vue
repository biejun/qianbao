<template>
	<view class="common-bg coin-exchange" @click="onClick">
		<view class="exchange-inner">
			<view class="exchange-box">
				<view class="exchange-box__header" :class="isReverse ? 'is-reverse' :''">
					<view class="exchange-coin is-left">
						<image src="../../../static/index/content/icon_BTC.png" class="exchange-coin-image"></image>
						<text class="exchange-coin-name" @click.stop="visible = true">{{currentValue}}</text>
						<text class="exchange-coin-dropdown" @click.stop="visible = true">▼</text>
						<view class="exchange-dropdown" v-show="visible">
							<view class="exchange-item" @click="selectedItem('BTC')">
								<image src="../../../static/index/content/icon_BTC.png" class="exchange-item-image"></image>
								<view class="exchange-item-name">BTC</view>
							</view>
							<view class="exchange-item" @click="selectedItem('BTC')">
								<image src="../../../static/index/content/icon_BTC.png" class="exchange-item-image"></image>
								<view class="exchange-item-name">USDT</view>
							</view>
						</view>
					</view>
					<view class="exchange-btn" @click="isReverse = !isReverse">
						<image src="../../../static/index/duihuan-icon.png" class="exchange-icon"></image>
					</view>
					<view class="exchange-coin is-right">
						<text class="exchange-coin-name">ETH</text>
						<image src="../../../static/index/content/icon_BTC.png" class="exchange-coin-image"></image>
					</view>
				</view>
				<view class="exchange-box__body">
					<view class="exchange-number">
						<input type="text" class="input" v-model="value" placeholder="兑换数量">
						<view class="item">
							<text class="item-name">当前可用:</text>
							<text class="item-value">2333</text>
							<text class="item-btn-all">全部</text>
						</view>
						<view class="item">
							<text class="item-name">手续费:</text>
							<text class="item-value">451.000000</text>
						</view>
					</view>
					<view class="exchange-spea">
						
					</view>
					<view class="exchange-number">
						<input type="text" class="input" v-model="value" placeholder="兑换数量">
						<view class="item">
							<text class="item-name">汇率:</text>
							<text class="item-value">451.000000</text>
						</view>
						<view class="item">
							<text class="item-value">手续费将从兑出数量中扣减</text>
						</view>
					</view>
				</view>
			</view>
			<view class="exchange-wrap">
				<button type="warn" class="exchange-wrap-button" :disabled="true">确认兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				value: '',
				visible: false,
				currentValue: 'BTC',
				isReverse: false
			}
		},
		methods: {
			onClick() {
				this.visible = false
			},
			selectedItem(item) {
				this.visible = false
				this.currentValue = item;
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './transaction'
			})
		},
	}
</script>

<style lang="scss">
	.coin-exchange{
		.exchange-inner{
			padding: 30rpx;
			.exchange-box{
				background-color: #fff;
				padding: 0 30rpx;
				border-radius: 26rpx;
				
				.exchange-coin{
					position: relative;
					display: flex;
					flex: 1;
					align-items: center;
					
					.exchange-coin-image{
						width: 80rpx;
						height: 80rpx;
					}
					.exchange-coin-name{
						font-size: 30rpx;
						color: #333333;
						margin-left: 20rpx;
						margin-right: 20rpx;
						font-weight: bold;
					}
					
					.exchange-coin-dropdown{
						font-size: 20rpx;
					}
					
					.exchange-dropdown{
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						border-radius: 20rpx;
						background-color: #fff;
						z-index: 999;
						border: 2rpx solid #ededed;
						box-shadow: 2rpx 2rpx 5rpx rgba(0,0,0,.15);
						padding: 20rpx 30rpx;
						
						.exchange-item{
							display: flex;
							height: 70rpx;
							align-items: center;
							margin-bottom: 20rpx;
							
							&:last-child{
								margin-bottom: 0;
							}
							
							.exchange-item-image{
								width: 70rpx;
								height: 70rpx;
							}
							.exchange-item-name{
								margin-left: 20rpx;
								font-size: 30rpx;
								color: #333;
								font-weight: bold;
							}
						}
					}
				}
				
				.exchange-btn{
					width: 60rpx;
					margin-top: 10rpx;
					text-align: center;
					order: 2;
					
					.exchange-icon{
						width: 44rpx;
						height: 44rpx;
					}
				}
				
				.exchange-box__header{
					display: flex;
					align-items: center;
					height: 150rpx;
					
					.exchange-coin{
						&.is-left{
							order: 1;
							justify-content: flex-start;
						}
						&.is-right{
							order: 3;
							justify-content: flex-end;
						}
					}
					
					&.is-reverse{
						
						.exchange-coin{
							&.is-left{
								order: 3;
								flex-direction: row-reverse;
								justify-content: flex-start;
							}
							&.is-right{
								order: 1;
								flex-direction: row-reverse;
								justify-content: flex-end;
							}
						}

					}
				}
				
				.exchange-box__body{
					display: flex;
					justify-content: space-between;
					padding-bottom: 20rpx;
				}
				
				.exchange-number{
					flex: 1;
					padding-bottom: 10rpx;
					
					.input{
						padding: 20rpx 0;
						color: #A5A5A5;
						font-size: 34rpx;
						border-bottom: 3rpx solid #f3f3f3;
					}
					
					.item{
						padding-top: 8rpx;
						.item-name{
							color: #A5A5A5;
							font-size: 24rpx;
						}
						.item-value{
							color: #333333;
							font-size: 24rpx;
							margin-left: 10rpx;
						}
						.item-btn-all{
							font-size: 24rpx;
							color: #0F9BE9;
							margin-left: 10rpx;
						}
					}
					
					&:last-child{
						.input{
							text-align: right;
						}
						.item{
							text-align: right;
						}
					}
				}
				
				.exchange-spea{
					width: 50rpx;
				}

			}
			.exchange-wrap{
				padding: 80rpx 50rpx;
				
				.exchange-wrap-button{
					border-radius: 50rpx;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
