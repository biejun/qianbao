<template>
	<view class="game-account">
		<view class="amount-wrap">
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
					<view class="value">{{ckRate.yestodayEarn}}</view>
				</div>
				<div class="income-item">
					<view class="label">{{$t('CumulativeIncome')}}</view>
					<view class="value">{{ckRate.totalEarn}}</view>
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
		<view class="withdrawal-list">
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
				ckRate: {
					yubiBaoRate: 0,
					totalEarn: 0,
					yestodayEarn: 0
				},
				i18n: {
					zh: {
						cunKuanBao: '存款宝',
						DailyYield: "日收益",
						CumulativeIncome: "累计收益",
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
						IncomeExpenditure: "收/支"
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
						IncomeExpenditure: "Income/Expenditure"
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
			this.getUserRate();
			this.setNavBarTitle('cunKuanBao');
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
			changeDateType(type) {
				this.dateType = type;
				this.getData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game-account{
		
		/deep/ .u-tr{
			border-bottom: 1px solid #eee;
		}
		/deep/ .u-th{
			background-color: #fff;
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
			height: 280rpx;
			padding: 60rpx 30rpx 60rpx 30rpx;
			color: #fff;
			background:linear-gradient(180deg,rgba(246,211,101,1),rgba(253,160,133,1));
			
			.amount-top{
				display: flex;
				justify-content: space-between;
			}
			.current-type{
				font-size: 28rpx;
				margin-bottom: 10rpx;
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
				margin-top: 30rpx;
				display: flex;
				justify-content: center;
				.income-item{
					margin-left: 20rpx;
					margin-right: 20rpx;
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
				color: #FF0707;
			}
		}
	}
</style>
