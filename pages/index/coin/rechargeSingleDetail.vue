<template>
	<view class="common-bg">
		<view v-if="detail" class="detail-view">
			<u-row gutter="16" justify="space-between" class="mb-10">
				<u-col span="6" class="itemName">
					{{$t('rechargeAmount')}}
				</u-col>
				<u-col span="6" class="itemValue">
					<text class="is-add">{{ '+' + detail.amount || '-'}}</text>
				</u-col>
			</u-row>
			<u-row gutter="16" justify="space-between" class="mb-10">
				<u-col span="6" class="itemName">
					{{$t('rechargeAddress')}}
				</u-col>
				<u-col span="6" class="itemValue">
					{{detail.toAddress || '-'}}
				</u-col>
			</u-row>
			<u-row gutter="16" justify="space-between" class="mb-10">
				<u-col span="6" class="itemName">
					{{$t('hash')}}
				</u-col>
				<u-col span="6" class="itemValue">
					{{detail.txId || '-'}}
				</u-col>
			</u-row>
			<u-row gutter="16" justify="space-between" class="mb-10">
				<u-col span="6" class="itemName">
					{{$t('blockHeight')}}
				</u-col>
				<u-col span="6" class="itemValue">
					{{detail.block}}
				</u-col>
			</u-row>
			<u-row gutter="16" justify="space-between">
				<u-col span="6" class="itemName">
					{{$t('time')}}
				</u-col>
				<u-col span="6" class="itemValue">
					{{detail.createTime | dateFormat}}
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				detail: null,
				i18n: {
					zh: {
						all: '全部',
						oneMonth: "壹個月",
						threeMonths: "三個月",
						title: '充幣記錄',
						rechargeAmount: '充值金額',
						rechargeAddress: '充值地址',
						hash: "交易Hash",
						blockHeight: "區塊高度",
						time: "時間",
						noData: '暫無記錄',
						currency: "幣種",
						amount: "金額"
					},
					en: {
						all: 'All',
						oneMonth: "One Mon",
						threeMonths: "Three Mos.",
						title: 'Recharge Records',
						rechargeAmount: 'Recharge Amount',
						rechargeAddress: 'Recharge Address',
						hash: "Hash",
						blockHeight: "Block Height",
						time: "Time",
						noData: 'No data',
						currency: "Currency",
						amount: "Amount"
					}
				}
			}
		},
		filters: {
			dateFormatYMD(val) {
				return typeof val === 'number' ? dateFormat(val, 'Y-m-d') : '';
			},
			dateFormat(val) {
				return typeof val === 'number' ? dateFormat(val, 'Y-m-d H:i:s') : '';
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail);
		}
	}
</script>

<style lang="scss" scoped>
	.detail-view{
		padding: 20rpx;
		background-color: #fff;
		
		.mb-10{
			margin-bottom: 20rpx;
			border-bottom: 2rpx solid #f3f3f3;
			padding-bottom: 10rpx;
		}
		
		.itemName{
			color: #666;
			font-size: 30rpx;
		}
		.itemValue{
			color: #333;
			font-size: 30rpx;
			text-align: right;
			word-break: break-word;
		}
		
		.is-add{
			color: #FF0707!important;
		}
	}
</style>
