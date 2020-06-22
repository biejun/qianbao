<template>
	<view class="digital-account" @click="showDropdown = false">
		<view class="amount-wrap">
			<view class="current-type">
				数字账户
			</view>
			<view class="current-amount">
				<view>
					{{amount}}
				</view>
				<view class="right-coin" @click.stop="showDropdown = !showDropdown">
					{{currentCoin}}
					<u-icon name="arrow-down" size="20"></u-icon>
					<view class="dropdown" v-show="showDropdown">
						<view class="dropdown-item">
							BTC
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="withdrawal-date-cate">
			<view class="reward">
				收支明细
			</view>
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">全部</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">一个月</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">三个月</view>
			</view>
		</view>
		<view class="withdrawal-list">
			<u-cell-group v-if="detail.length">
				<u-cell-item v-for="(item, index) in detail" :key="index" :title="item.businessRemark" :label="item.createTime" :arrow="false">
					<view class="withdrawal-amount is-add">
						{{item.changeType == 1 ? '+' : '-'}}{{item.amount}}
					</view>
<!-- 					<view>
						手续费：{{item.fee}}
					</view>
					<view>月</view> -->
				</u-cell-item>
			</u-cell-group>
			<u-empty v-else text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				dateType: 0,
				currentCoin: 'USDT',
				detail: [
					// {
					// 	"accountId": 0,
					// 	"accountType": 0,
					// 	"amount": 0,
					// 	"businessRemark": "ddd",
					// 	"businessType": 0,
					// 	"changeType": 0,
					// 	"coinName": "",
					// 	"createTime": "20202-111",
					// 	"id": 0,
					// 	"userId": 0
					// }
				],
				amount: 0,
				showDropdown: false
			}
		},
		onLoad(options) {
			this.amount = options.amount;
		},
		created() {
			this.getData();
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			// 取消红点或者角标 
			if(e.index === 0) {
				uni.navigateTo({
					url: '/pages/ecology/my/index'
				})
			}
		},
		methods: {
			getData() {
				this.$u.api.getAccountDetail(1, this.dateType).then(res => {
					this.detail = res.data;
				})
			},
			changeDateType(type) {
				this.dateType = type;
				this.getData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.digital-account{
		
		.right-coin{
			position: relative;
			
			.dropdown{
				position: absolute;
				top: 100%;
				width: 250rpx;
				right: 0;
				padding: 10rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0 1px 10px rgba(0,0,0,.1);
				
				.dropdown-item{
					padding: 10rpx 15rpx;
					font-size: 34rpx;
					color: #333;
				}
			}
		}
		
		.amount-wrap{
			height: 240rpx;
			padding: 70rpx 30rpx 60rpx 30rpx;
			color: #fff;
			background-color: #F1333D;
			
			.current-type{
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			.current-amount{
				font-size: 50rpx;
				display: flex;
				justify-content: space-between;
			}
		}
		
		.withdrawal-date-cate{
			display: flex;
			height: 100rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			background-color: #F3F3F3;
			
			.date-tags{
				display: flex;
				
				.date-tag{
					height: 40rpx;
					padding: 0 20rpx;
					border: 2rpx solid #A5A5A5;
					border-radius: 20rpx;
					font-size: 22rpx;
					margin-left: 16rpx;
					line-height: 38rpx;
					&.is-active{
						color: $uni-color-primary;
						border-color: $uni-color-primary;
					}
				}
			}
			.data-cate{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.cate-name{
					color: #666666;
					font-size: 30rpx;
					margin-right: 30rpx;
					&.is-actve{
						color: $uni-color-primary;
						font-weight: bold;
					}
				}
			}
			.reward{
				font-size: 28rpx;
				color: #333;
			}
		}
		.withdrawal-amount{
			color: #333;
		}
	}
</style>
