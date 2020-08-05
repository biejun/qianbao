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
			 :title="$t('cunKuanBao')">
			</u-navbar>
			<view class="amount-top">
				<view class="current-type">
					{{$t('totalAssets')}}
				</view>
				<view class="current-amount">
					<view class="amount">
						{{amount}}
					</view>
					 <text class="unit">GCN</text>
				</view>
				<view class="right-btn" @click="goAccount">
					{{$t('Transfer')}}
				</view>
			</view>
			<view class="amount-bottom">
				<div class="income-item">
					<view class="label">{{$t('DailyYield')}}</view>
					<view class="value">+{{ckRate.yestodayEarn}} GCN</view>
				</div>
				<div class="income-item">
					<view class="label">{{$t('CumulativeIncome')}}</view>
					<view class="value">+{{ckRate.totalEarn}} GCN</view>
				</div>
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
		<view class="withdrawal-list" :class="[detail.length ? '' :'no-data' ]">
			<u-table v-if="detail.length" border-color="#fff">
				<u-tr>
					<u-th>{{$t('time')}}</u-th>
					<u-th>{{$t('IncomeExpenditure')}}</u-th>
					<u-th>{{$t('quantity')}}</u-th>
				</u-tr>
				<u-tr v-for="(item, index) in detail" :key="item.id">
					<u-td>{{item.createTime | dateFormat}}</u-td>
					<u-td>{{item.businessRemark}}</u-td>
					<u-td class="withdrawal-amount" :class="item.changeType == 1?'is-add':''">{{item.changeType == 1 ? '+' : '-'}}{{item.amount}}</u-td>
				</u-tr>
			</u-table>
			<u-empty v-else :text="$t('noData')" mode="list"></u-empty>
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
				ckRate: {
					yubiBaoRate: 0,
					totalEarn: 0,
					yestodayEarn: 0
				},
				i18n: {
					zh: {
						cunKuanBao: '存款寶',
						DailyYield: "日收益",
						CumulativeIncome: "累計收益",
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
						IncomeExpenditure: "收/支",
						noData: "暫無消息"
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
						cunKuanBao: 'CunKuan Bao',
						DailyYield: "Yield",
						CumulativeIncome: "Cumulative",
						IncomeExpenditure: "Income/Expenditure",
						noData: "No Data"
					}
				}
			}
		},
		// onLoad(options) {
		// 	this.amount = options.amount;
		// },
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d');
			}
		},
		created() {
			this.getData();
			this.getUserRate();
			this.getUserAmount();
		},
		onPullDownRefresh() {
			this.getData();
			this.getUserRate();
			this.getUserAmount();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1500);
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
					url: '/pages/ecology/my/transfer'
				})	
			},
			getData() {
				this.$u.api.getAccountDetail(3, this.dateType).then(res => {
					this.detail = res.data;
				})
			},
			getUserRate() {
				this.$u.api.getUserRate().then(res => {
					this.ckRate = res.data;
				})
			},
			getUserAmount() {
				this.$u.api.getUserAmount().then(res => {
					let totalYBB = 0;
					res.data.forEach(v => {
						let yubiBaoAmount = v.yubiBaoAmount || 0;
						totalYBB = accAdd(totalYBB, yubiBaoAmount);
					});
					this.amount = totalYBB;
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
		
		/deep/ .u-tr:first-child{
			border-bottom: 1px solid #eee;
		}
		/deep/ .u-tr{
			border-bottom: 1px solid #f3f3f3;
		}
		/deep/ .u-th{
			background-color: #fff;
			padding: 20rpx 0!important;
		}
		/deep/ .u-td{
			padding: 30rpx 0!important;
		}
		
		.right-btn{
			border: 4rpx solid #fff;
			border-radius: 10rpx;
			padding: 0 30rpx;
			font-size: 30rpx;
			height: 70rpx;
			line-height: 60rpx;
		}
		
		.amount-wrap{
			padding: 30rpx 40rpx 60rpx 40rpx;
			color: #fff;
			background:linear-gradient(180deg,rgba(246,211,101,1),rgba(253,160,133,1));
			
			.navbar{
				margin-left: -40rpx;
				margin-top: -30rpx;
				margin-right: -40rpx;
				
				/deep/ .u-icon-wrap{
					margin-top: -10rpx;
				}
			}
			
			.amount-top{
				display: flex;
				justify-content: space-between;
				margin-top: 50rpx;
			}
			.current-type{
				font-size: 28rpx;
				margin-left: 20rpx;
			}
			.current-amount{
				display: flex;
				align-items: baseline;
				.amount{
					font-size: 50rpx;
				}
				.unit{
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
			
			.amount-bottom{
				margin-top: 50rpx;
				display: flex;
				justify-content: space-around;
				.income-item{
					margin-left: 30rpx;
					margin-right: 30rpx;
					text-align: center;
					
					.label{
						font-size: 24rpx;
					}
					.value{
						font-size: 24rpx;
					}
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
				font-size: 32rpx;
				color: #333;
			}
		}
		
		.withdrawal-amount{
			color: #333;
			&.is-add{
				color: #FF0707!important;
			}
		}
		
		.withdrawal-list.no-data{
			/deep/ .u-empty{
				min-height: 500rpx;
			}
		}
	}
</style>
