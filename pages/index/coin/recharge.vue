<template>
	<view class="common-bg recharge-add">
		<view class="recharge-add-inner">
			<view class="dropdown-addon" :class="coinListShow ? 'is-fixed' : ''">
				<view class="dropdown-header">
					<view class="dropdown-header__left">
						BTC
					</view>
					<view class="dropdown-header__right" @click="coinListShow = !coinListShow">
						<text>切换币种</text>
						<u-icon name="arrow-up-fill" class="icon" :class="coinListShow ? '' : 'is-down'"></u-icon>
					</view>
				</view>
				<view v-show="coinListShow" class="dropdown-content">
					<view class="dropdown-content-item">
						ETC
					</view>
					<view class="dropdown-content-item">
						USDT
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				coinListShow: false,
				coinMethodShow: false,
				value: ''
			}
		}
	}
</script>

<style lang="scss">
	.recharge-add{
		.recharge-add-inner{
			padding: 30rpx;
		}
	}
	// 带笼罩层的下拉
	.dropdown-addon{
		margin-bottom: 30rpx;
		
		.dropdown-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 26rpx 30rpx;
			
			&__left{
				font-size: 32rpx;
				font-weight: bold;
			}
			
			&__right{
				font-size: 28rpx;
				color: #A5A5A5;
				> *{
					vertical-align: middle;
				}
				.icon{
					margin-left: 15rpx;
					font-size: 20rpx;
					
					&.is-down{
						transform: rotate(-180deg);
					}
				}
			}
		}
		&.is-fixed{
			position: relative;
			z-index: 1000;
			
			.dropdown-header{
				border-radius: 10rpx 10rpx 0 0;
			}
		}
		.dropdown-content{
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background-color: #fff;
			border-radius: 0 0 10rpx 10rpx;
			padding: 0 30rpx;
			
			.dropdown-content-item{
				padding: 20rpx 0;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
</style>
