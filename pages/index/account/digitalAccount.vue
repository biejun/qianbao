<template>
	<view class="digital-account" @click="showDropdown = false">
		<view class="amount-wrap">
			<view class="current-type">
				{{$t('totalAssets')}}
			</view>
			<view class="current-amount">
				<view>
					{{amount}}
				</view>
				<view class="right-btn" @click="goUrl('ecology/my/index')">
					{{$t('Transfer')}}
				</view>
			</view>
		</view>
		<view class="record-entry">
			<view class="record-btn" @click="goUrl('index/coin/withdrawDetail')">{{$t('Withdrawalrecord')}}</view>
			<view class="record-btn" @click="goUrl('index/coin/rechargeDetail')">{{$t('Rechargerecord')}}</view>
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
					<u-th>{{$t('currency')}}</u-th>
					<u-th>{{$t('recipient')}}</u-th>
					<u-th>{{$t('quantity')}}</u-th>
				</u-tr>
				<u-tr v-for="(item, index) in detail" :key="item.id">
					<u-td>{{item.createTime | dateFormat}}</u-td>
					<u-td>{{item.coinName}}</u-td>
					<u-td>{{item.businessRemark}}</u-td>
					<u-td class="withdrawal-amount" :class="item.changeType == 1?'is-add':''">
					 {{item.changeType == 1 ? '+' : '-'}}{{item.amount}}
					</u-td>
				</u-tr>
			</u-table>
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
				showDropdown: false,
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
						digitalAccount: '钱包账户'
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
					}
				}
			}
		},
		onPullDownRefresh() {
			this.getData();
			this.getUserAmount();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		created() {
			this.getData();
			this.getUserAmount();
			this.setNavBarTitle('digitalAccount');
		},
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s');
			}
		},
		// onNavigationBarButtonTap(e) {
		// 	// e.index 拿到当前点击顶部按钮的索引
		// 	// 取消红点或者角标 
		// 	if(e.index === 0) {
		// 		uni.navigateTo({
		// 			url: '/pages/ecology/my/index'
		// 		})
		// 	}
		// },
		methods: {
			getData() {
				this.$u.api.getAccountDetail(1, this.dateType).then(res => {
					this.detail = res.data;
				})
			},
			changeDateType(type) {
				this.dateType = type;
				this.getData();
			},
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/' + page
				})
			},
			getUserAmount() {
				this.$u.api.getUserAmount().then(res => {
					let totalAmount = 0;
					let totalGameAmount = 0;
					res.data.forEach(v => {
						let gameAmount = v.gameAmount || 0;
						let cnyAmount = v.cnyAmount || 0;
						totalAmount = accAdd(totalAmount, cnyAmount).toFixed(2); // 持有总USDT 相当于 GCN 的总资产
						totalGameAmount = accAdd(totalGameAmount, gameAmount); // GCN 资产
					});
					this.amount = totalAmount;
					//this.totalGameAmount = totalGameAmount;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.digital-account{
		
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
				font-size: 50rpx;
				display: flex;
				justify-content: space-between;
			}
		}
		/deep/ .u-tr{
			border-bottom: 1px solid #eee;
		}
		/deep/ .u-th{
			background-color: #fff;
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
	.record-entry{
		padding: 10rpx;
		display: flex;
		justify-content: center;
		
		.record-btn{
			padding: 10rpx 20rpx;
			border: 2rpx solid #a5a5a5;
			margin-left: 10rpx;
			margin-right: 10rpx;
			border-radius: 10rpx;
		}
	}
</style>
