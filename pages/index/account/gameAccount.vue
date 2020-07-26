<template>
	<view class="game-account">
		<view class="amount-wrap">
			<view class="current-type">
				{{$t('totalAssets')}}
			</view>
			<view class="current-amount">
				<view>
					{{amount}}
				</view>
				<view class="right-btn" @click="goAccount">
					{{$t('Transfer')}}
				</view>
			</view>
		</view>
		<view class="withdrawal-date-cate">
			<view class="reward">
				{{$t('detail')}}
			</view>
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">{{$t('all')}}</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">{{$t('oneMonth')}}</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">{{$t('threeMonths')}}</view>
			</view>
		</view>
		<view class="withdrawal-list">
			<u-cell-group v-if="detail.length">
				<u-cell-item v-for="(item, index) in detail" :key="index" 
				:title="item.changeType === 1 ? $t('Income') : $t('Expenditure')" center :use-label-slot="true" :arrow="false">
					<view slot="label">
						<view>{{item.businessRemark}}</view>
						<view>{{item.createTime | dateFormat}}</view>
					</view>
					<view class="withdrawal-amount" :class="item.changeType == 1 ? 'is-add' : ''">
						{{item.changeType == 1 ? '+' : '-'}}{{item.amount}}
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-empty v-else text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				dateType: 0,
				detail: [],
				amount: 0,
				i18n: {
					zh: {
						totalAssets: '总资产',
						all: '全部',
						oneMonth: "一个月",
						threeMonths: "三个月",
						Withdrawalrecord: "提币记录",
						Rechargerecord: "充币记录",
						Transfer: "转入转出",
						detail: "收支明细",
						time: "时间",
						currency: "币种",
						recipient: "接收",
						quantity: "数量",
						digitalAccount: '钱包账户',
						Income: '收入',
						Expenditure: '支出',
						gameAccount: "游戏账户",
					},
					en: {
						totalAssets: 'Total Assets',
						all: 'All',
						oneMonth: "One Mon",
						threeMonths: "Three Mos.",
						Withdrawalrecord: "Withdrawal record",
						Rechargerecord: "Recharge record",
						Transfer: "Transfer in/out",
						detail: "Detail",
						time: "Time",
						currency: "Currency",
						recipient: "Recipient",
						quantity: "Quantity",
						digitalAccount: "Wallet Account",
						Income: 'Income',
						Expenditure: 'Expenditure',
						gameAccount: "Game Account",
					}
				}
			}
		},
		onLoad(options) {
			this.amount = options.amount;
		},
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s');
			}
		},
		created() {
			this.getData();
			this.setNavBarTitle('gameAccount');
		},
		// onNavigationBarButtonTap(e) {
		// 	// e.index 拿到当前点击顶部按钮的索引
		// 	// 取消红点或者角标 
		// 	if(e.index === 0) {
		// 		this.goAccount();
		// 	}
		// },
		methods: {
			goAccount() {
				uni.navigateTo({
					url: '/pages/ecology/my/index'
				})	
			},
			getData() {
				this.$u.api.getAccountDetail(2, this.dateType).then(res => {
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
	.game-account{
		
		.right-btn{
			margin-top: -20rpx;
			border: 4rpx solid #fff;
			border-radius: 10rpx;
			padding: 0 30rpx;
			font-size: 30rpx;
			height: 70rpx;
			line-height: 60rpx;
		}
		
		.amount-wrap{
			height: 240rpx;
			padding: 70rpx 30rpx 60rpx 30rpx;
			color: #fff;
			background:linear-gradient(180deg,rgba(246,211,101,1),rgba(253,160,133,1));
			
			.current-type{
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			.current-amount{
				display: flex;
				justify-content: space-between;
				font-size: 50rpx;
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
			
			&.is-add{
				color: #F1333D;
			}
		}
	}
</style>
