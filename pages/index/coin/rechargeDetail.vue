<template>
	<view class="recharge-detail" @click="dropdownShow1 = false">
		<view class="page-header">
			<view class="select-group">
				<view class="dropdown-button">
					<view class="dropdown-button__text" @click.stop="dropdownShow1 = !dropdownShow1">
						{{coinName}}
					</view>
					<u-icon @click.native.stop="dropdownShow1 = !dropdownShow1" name="arrow-down-fill" class="dropdown-button__icon"></u-icon>
					<view class="dropdown" v-show="dropdownShow1">
						<view class="dropdown-item" v-for="item in coinList" @click="changeCoin(item)" :key="item.id">
							{{item.coinName}}
						</view>
					</view>
				</view>
			</view>
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">{{$t('all')}}</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">{{$t('oneMonth')}}</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">{{$t('threeMonths')}}</view>
			</view>
		</view>
		<view v-if="data.length" class="record-list">
			<u-table border-color="#fff">
				<u-tr>
					<u-th>{{$t('time')}}</u-th>
					<u-th>{{$t('currency')}}</u-th>
					<u-th>{{$t('amount')}}</u-th>
					<u-th width="4%"></u-th>
				</u-tr>
				<u-tr v-for="item in data" :key="item.id" @click.native="openDetail(item)">
					<u-td>{{item.createTime | dateFormatYMD}}</u-td>
					<u-td>{{item.coinName}}</u-td>
					<u-td><text class="is-add">+{{item.amount}}</text></u-td>
					<u-td  width="4%"><u-icon name="arrow-right"></u-icon></u-td>
				</u-tr>
			</u-table>
<!-- 			<view v-for="item in data" :key="item.id" @click="openDetail(item)" class="record-item">
				<view class="record-row">
					<view class="record-coinName">{{item.coinName}}</view>
					<view class="record-amount">
						{{item.withdrawAmount}}
					</view>
				</view>
				<view class="record-row">
					<view class="record-time">{{item.createTime}}</view>
					<view class="record-status">{{item.status | statusText}}</view>
				</view>
			</view> -->
		</view>
		<u-empty v-else :text="$t('noData')" mode="history"></u-empty>
		
		<u-modal v-model="showDetail" confirm-text="关闭" :title="detail ? detail.coinName : ''">
			<view v-if="detail" class="detail-view">
				<u-row gutter="16" justify="space-between" class="mb-10">
					<u-col span="6" class="itemName">
						{{$t('rechargeAmount')}}
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.amount || '-'}}
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
		</u-modal>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				coinName: '',
				data: [],
				detail: null,
				showDetail: false,
				dateType: 0,
				coinList: [],
				dropdownShow1: false,
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
		onLoad(options) {
			this.coinName = options.coinName || '';
		},
		filters: {
			dateFormatYMD(val) {
				return typeof val === 'number' ? dateFormat(val, 'Y-m-d') : '';
			},
			dateFormat(val) {
				return typeof val === 'number' ? dateFormat(val, 'Y-m-d H:i:s') : '';
			}
		},
		created() {
			this.getCoinList();
			this.getData();
			this.setNavBarTitle('title');
		},
		methods: {
			openDetail(item) {
				uni.navigateTo({
					url: './rechargeSingleDetail?detail='+JSON.stringify(item)
				})
			},
			changeCoin(item) {
				this.coinName = item.coinName
				this.getData();
			},
			changeDateType(type) {
				this.dateType = type;
				this.getData();
			},
			getCoinList() {
				this.$u.api.getCoinList().then(res => {
					this.coinList = res.data.filter(v => v.allowRecharge == 1);
					if(this.coinList.length && this.coinName == '') {
						this.coinName = this.coinList[0].coinName;
						this.getData();
					}
				})
			},
			getData() {
				if(!this.coinName) return;
				let url = '/wRecordRecharge/getCoinRecord/';
				this.$u.get(url + this.coinName+'/'+this.dateType).then(res => {
					this.data = res.data;
				},err => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.recharge-detail{
		height: 100%;
		.page-header{
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-bottom: 10rpx solid #f3f3f3;
			padding: 10rpx 30rpx;
			align-items: center;
		}
		.select-group{
			display: flex;
			
			.dropdown-button + .dropdown-button{
				margin-left: 30rpx;
			}
		}
		.dropdown-button{
			position: relative;
			display: flex;
			align-items: center;
			&__text{
				color: #333;
				font-size: 26rpx;
				max-width: 100rpx;
				height: 30rpx;
				line-height: 30rpx;
				overflow: hidden;
			}
			&__icon{
				font-size: 18rpx;
				vertical-align: 5rpx;
				margin-left: 10rpx;
			}
		}
		.dropdown{
			position: absolute;
			top: 100%;
			left: 0;
			background-color: #fff;
			width: 200rpx;
			z-index: 99;
			border: 2rpx solid rgba(165,165,165,1);
			padding: 10rpx;
			box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.08);
			border-radius: 3rpx;
			
			.dropdown-item{
				font-size: 28rpx;
				padding: 10rpx;
			}
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
		
		.record-list{
			padding: 12rpx 30rpx;
		}
		
		.record-item{
			border-bottom: 2rpx solid #f3f3f3;
			&:last-child{
				border-bottom: none;
			}
			
			.record-row{
				display: flex;
				justify-content: space-between;
				padding: 8rpx 0;
				align-items: center;
				.record-coinName{
					font-size: 30rpx;
					color: #333;
				}
				.record-amount{
					font-size: 28rpx;
					font-weight: bold;
				}
				.record-time{
					font-size: 26rpx;
					color: #999;
				}
			}
		}
		
		.detail-view{
			padding: 20rpx;
			
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
		}
		
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
		.is-add{
			color: #FF0707!important;
		}
	}
</style>
