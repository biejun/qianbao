<template>
	<view class="common-bg transaction">
		<view class="filter">
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">{{$t('all')}}</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">{{$t('oneMonth')}}</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">{{$t('threeMonths')}}</view>
			</view>
		</view>
		<view v-if="list.length" class="data-flow">
			<view v-for="item in list" class="data-flow-item" :key="item.id">
				<view class="space data-header">
					<view class="coin-name">{{item.coin}}</view>
					<view><image src="/static/arrow.png" class="arrow"></image></view>
					<view class="coin-name">{{item.toCoin}}</view>
				</view>
				<view class="space data-body">
					<text class="price">-{{item.num}}</text>
					<text class="price red">+{{item.toNum}}</text>
				</view>
				<view class="space data-footer">
					<text class="text">
						{{$t('fee')}}: {{item.fee}}
					</text>
					<text class="text">
						{{item.createTime | dateFormat}}
					</text>
				</view>
			</view>
		</view>
		<u-empty v-else :text="$t('noData')" mode="list"></u-empty>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				list: [],
				dateType: 0,
				i18n: {
					zh: {
						all: '全部',
						oneMonth: "壹個月",
						threeMonths: "三個月",
						title: '兌換記錄',
						time: "時間",
						noData: '暫無記錄',
						currency: "幣種",
						amount: "金額",
						fee: "手續費",
						helpText: '\ue614 了解兌換'
					},
					en: {
						all: 'All',
						oneMonth: "One Mon",
						threeMonths: "Three Mos.",
						title: 'Exchange Records',
						time: "Time",
						noData: 'No data',
						currency: "Currency",
						amount: "Amount",
						fee: "Fee",
						helpText: '\ue614 Learn'
					}
				},
			}
		},
		created() {
			this.getRecords();
			this.setNavBarTitle('title');
			// #ifdef APP-PLUS
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			currentWebview.setTitleNViewButtonStyle(0, {
				text: this.$t('helpText')
			})
			// #endif
		},
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s');
			}
		},
		methods: {
			getRecords() {
				this.$u.post('/wRecordRecharge/exchangeRecord').then(res => {
					this.list = res.data;
				})
			},
			changeDateType(type) {
				this.dateType = type;
				this.getRecords();
			},
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './learnEx'
			})
		},
	}
</script>

<style lang="scss" scoped>
	.transaction{
		.filter{
			display: flex;
			justify-content: center;
			padding: 15rpx 0;
			background-color: #fff;
			border-bottom: 2rpx solid #ededed;
		}
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
					color: #FF0707;
					border-color: #FF0707;
				}
			}
		}
		.data-flow{
			background-color: #fff;
			padding: 0 30rpx;
			.data-flow-item{
				padding: 20rpx 0;
				border-bottom: 2rpx solid #f3f3f3;
				
				.data-body{
					margin-top: 5rpx;
					margin-bottom: 5rpx;
				}
				
				.coin-name{
					font-size: 34rpx;
				}
				.space{
					display: flex;
					justify-content: space-between;
				}
				
				.price{
					font-size: 34rpx;
					font-weight: bold;
					color: #383838;
					
					&.red{
						color: #FF0707;
					}
				}
				
				.text{
					font-size: 26rpx;
					color: #A5A5A5;
				}
			}
		}
		.arrow{
			width: 236rpx;
			height: 28rpx;
			vertical-align: -10rpx;
		}
	}
</style>
