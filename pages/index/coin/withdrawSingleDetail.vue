<template>
	<view class="common-bg">
		<view v-if="detail && type === 1" class="detail-view">
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('id')}}
				</view>
				<view class="itemValue">
					{{detail.id || '-'}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('flow')}}
				</view>
				<view class="itemValue">
					{{flow}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('formAddress')}}
				</view>
				<view class="itemValue">
					{{detail.formUserAddress || '-'}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('toAddress')}}
				</view>
				<view class="itemValue">
					{{detail.toUserAddress || '-'}}
				</view>
			</view>
			<view class="detail-item mt-10 mb-10">
				<view class="itemName">
					{{$t('currency')}}
				</view>
				<view class="itemValue">
					{{detail.coinName}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('num')}}
				</view>
				<view class="itemValue">
					-{{detail.amount}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('createTime')}}
				</view>
				<view class="itemValue">
					{{detail.createTime | dateFormat}}
				</view>
			</view>
			<view class="note">{{$t('zhuyi')}}</view>
		</view>
		<view v-if="detail && type === 2" class="detail-view">
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('id')}}
				</view>
				<view class="itemValue">
					{{detail.id || '-'}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('flow')}}
				</view>
				<view class="itemValue">
					{{flow}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('formAddress')}}
				</view>
				<view class="itemValue">
					{{detail.fromAddress || '-'}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('toAddress')}}
				</view>
				<view class="itemValue">
					{{detail.toAddress || '-'}}
				</view>
			</view>
			<view class="detail-item mt-10 mb-10">
				<view class="itemName">
					{{$t('currency')}}
				</view>
				<view class="itemValue">
					{{detail.coinName}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('num')}}
				</view>
				<view class="itemValue">
					{{detail.amount}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('fee')}}
				</view>
				<view class="itemValue">
					{{detail.chainFee}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('withdrawAmount')}}
				</view>
				<view class="itemValue">
					<view class="bold">{{detail.withdrawAmount}}</view>
				</view>
			</view>
			<view class="detail-item mt-10 mb-10">
				<view class="itemName">
					{{$t('status')}}
				</view>
				<view class="itemValue">
					{{statusText(detail.status)}}
				</view>
			</view>
			<view class="detail-item mb-10">
				<view class="itemName">
					{{$t('createTime')}}
				</view>
				<view class="itemValue">
					{{detail.createTime | dateFormat}}
				</view>
			</view>
			<view class="detail-item">
				<view class="itemName">
					{{$t('finishTime')}}
				</view>
				<view class="itemValue">
					{{detail.finishTime | dateFormat}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				detail: null,
				type: 1,
				flow: '',
				i18n: {
					zh: {
						title: '提幣記錄',
						Internal: "區塊玩家內互轉",
						External: "交易所/外部錢包",
						formAddress: "轉出地址",
						toAddress: "接收地址",
						num: "數量",
						fee: "礦工費",
						status: "狀態",
						time: "時間",
						createTime: "提交時間",
						finishTime: "完成時間",
						id: "交易序号",
						flow: "货币流向",
						withdrawAmount: "实际到账",
						all: '全部',
						oneMonth: "壹個月",
						threeMonths: "三個月",
						currency: "幣種",
						noData: '暫無記錄',
						zhuyi: "註：區塊玩家內部互轉無礦工費！",
						status1: "待審核",
						status2: "轉賬中",
						status3: "确认中",
						status4: "转账成功",
						status5: "审批拒绝",
						status6: "转账失败",
						status7: "發送交易中",
						status8: "打包中",
					},
					en: {
						title: 'Withdrawal Records',
						Internal: "Internal",
						External: "Exchange / External Wallet",
						formAddress: "Form Address",
						toAddress: "To Address",
						num: "Quantity",
						fee: "Fee",
						status: "Status",
						time: "Time",
						createTime: "Create Time",
						finishTime: "Finish Time",
						id: "ID",
						flow:"Direction",
						withdrawAmount: "Withdraw Amount",
						all: 'All',
						oneMonth: "One Mon",
						threeMonths: "Three Mos.",
						currency: "Currency",
						noData: 'No data',
						zhuyi: "Note: there is no miner's fee for internal transfer of players in the block!",
						status1: "Check pending",
						status2: "Transfer accounts",
						status3: "Confirming",
						status4: "Transfer successful",
						status5: "Approval rejection",
						status6: "Transfer failure",
						status7: "Sending transaction",
						status8: "Packing",
					}
				},
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
		methods: {
			statusText(val) {
				// 0待审核 1转账中 2确认中 3转账成功 4审批拒绝 5转账失败 6发送交易中 7打包中
				switch(val) {
					case 0:
						return this.$t('status1');
					case 1:
						return this.$t('status2');
					case 2:
						return this.$t('status3');
					case 3:
						return this.$t('status4');
					case 4:
						return this.$t('status5');
					case 5:
						return this.$t('status6');
					case 6:
						return this.$t('status7');
					case 7:
						return this.$t('status8');
				}
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail);
			this.type = Number(options.type);
			this.flow = options.flow;
		}
	}
</script>

<style lang="scss" scoped>
	.detail-view{
		
		.mt-10{
			margin-top: 10rpx;
		}
		
		.mb-10{
			border-bottom: 2rpx solid #F3F3F3;
		}
		
		.detail-item{
			display: flex;
			justify-content: space-between;
			padding: 15rpx 20rpx;
			background-color: #fff;
		}
		
		.itemName{
			color: #666;
			font-size: 30rpx;
			min-width: 130rpx;
		}
		.itemValue{
			color: #333;
			font-size: 30rpx;
			text-align: right;
			word-break: break-word;
		}
		.note{
			font-size: 22rpx;
			color: #666;
			text-align: right;
			margin-top: 10rpx;
		}
		
		.bold{
			font-weight: bold;
		}
	}
</style>
