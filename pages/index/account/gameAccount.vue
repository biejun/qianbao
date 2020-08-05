<template>
	<view class="game-account">
		<view class="amount-wrap">
			<u-navbar
			:background="{background:'linear-gradient(180deg,rgba(246,211,101,1), rgba(248 ,198, 110,0.45))'}"
			 back-icon-size="40rpx"
			 back-icon-color="#fff"
			 :back-text-style="{verticalAlign: '-10rpx'}"
			 title-color="#fff"
			 :border-bottom="false" 
			 class="navbar"
			 :title="$t('gameAccount')">
			</u-navbar>
			<view class="current-type">
				{{$t('totalAssets')}}
			</view>
			<view class="current-amount">
				<view>
					{{amount}} <text class="unit">GCN</text>
				</view>
				<view class="right-btn" @click="goAccount">
					{{$t('Transfer')}} 
				</view>
			</view>
		</view>
		<view class="withdrawal-date-cate">
			<view class="reward">
				{{$t('detail')}} <text class="small-text">GCN</text> 
			</view>
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">{{$t('all')}}</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">{{$t('oneMonth')}}</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">{{$t('threeMonths')}}</view>
			</view>
		</view>
		<view class="withdrawal-list"  :class="[detail.length ? '' :'no-data' ]">
			<u-cell-group v-if="detail.length">
				<u-cell-item v-for="(item, index) in detail" :key="index" 
				:title-style="{fontSize:'28rpx',fontWeight:'bold'}"
				:title="item.changeType === 1 ? $t('Income') : $t('Expenditure')" center :use-label-slot="true" :arrow="false">
					<view slot="label" class="withdrawal-label">
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
	import { dateFormat, accAdd } from '@/common/utils.js';
	export default{
		data() {
			return {
				dateType: 0,
				detail: [],
				amount: 0,
				i18n: {
					zh: {
						totalAssets: '總資產',
						all: '全部',
						oneMonth: "壹個月",
						threeMonths: "三個月",
						Withdrawalrecord: "提幣記錄",
						Rechargerecord: "充幣記錄",
						Transfer: "轉入/轉出",
						detail: "收支明細",
						time: "時間",
						currency: "幣種",
						recipient: "接收",
						quantity: "數量",
						digitalAccount: '錢包賬戶',
						Income: '收入',
						Expenditure: '支出',
						gameAccount: "遊戲賬戶",
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
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d');
			}
		},
		created() {
			this.getData();
			this.getUserAmount();
		},
		onPullDownRefresh() {
			this.getData();
			this.getUserAmount();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
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
			getUserAmount() {
				this.$u.api.getUserAmount().then(res => {
					let totalGameAmount = 0;
					res.data.forEach(v => {
						let gameAmount = v.gameAmount || 0;
						totalGameAmount = accAdd(totalGameAmount, gameAmount); // GCN 资产
					});
					console.log(totalGameAmount)
					this.amount = totalGameAmount;
					//this.totalGameAmount = totalGameAmount;
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
			padding: 30rpx 80rpx 80rpx 80rpx;
			color: #fff;
			background:linear-gradient(180deg,rgba(246,211,101,1),rgba(253,160,133,1));
			
			.navbar{
				margin-left: -80rpx;
				margin-top: -30rpx;
				margin-right: -80rpx;
			
				/deep/ .u-icon-wrap{
					margin-top: -10rpx;
				}
			}
			
			.current-type{
				font-size: 28rpx;
				margin-bottom: 10rpx;
				margin-top: 60rpx;
			}
			.current-amount{
				display: flex;
				justify-content: space-between;
				font-size: 50rpx;
				
				.unit{
					font-size: 30rpx;
					margin-left: 10rpx;
				}
			}
		}
		
		.withdrawal-date-cate{
			display: flex;
			height: 100rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx;
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
						color: #FF0000;
						border-color: #FF0000;
					}
				}
			}
			.reward{
				font-size: 32rpx;
				color: #333;
				.small-text{
					font-size: 22rpx;
					font-weight: bold;
				}
			}
		}
		
		.withdrawal-amount{
			color: #333;
			font-size: 32rpx;
			margin-right: 60rpx;
			font-weight: bold;
			
			&.is-add{
				color: #F1333D;
			}
		}
		
		.withdrawal-label{
			color: #A5A5A5;
			margin-top: -10rpx;
			font-weight: normal;
		}
		
		.withdrawal-list.no-data{
			/deep/ .u-empty{
				min-height: 500rpx;
			}
		}
	}
</style>
