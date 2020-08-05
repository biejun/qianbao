<template>
	<view class="withdraw-records"  @click="dropdownShow = false,dropdownShow1 = false">
		<view class="page-header">
			<view class="select-group">
				<view class="dropdown-button" v-if="coinName">
					<view class="dropdown-button__text" @click.stop="dropdownShow1 = !dropdownShow1, dropdownShow = false">
						{{coinName}}
					</view>
					<u-icon @click.native.stop="dropdownShow1 = !dropdownShow1, dropdownShow = false" name="arrow-down-fill" class="dropdown-button__icon"></u-icon>
					<view class="dropdown" v-show="dropdownShow1">
						<view class="dropdown-item" v-for="item in coinList" @click="changeCoin(item)" :key="item.id">
							{{item.coinName}}
						</view>
					</view>
				</view>
				<view class="dropdown-button">
					<view class="dropdown-button__text" 
					  @click.stop="dropdownShow = !dropdownShow, dropdownShow1 = false">
						{{dropdownText}}
					</view>
					<u-icon @click.native.stop="dropdownShow = !dropdownShow, dropdownShow1 = false" name="arrow-down-fill" class="dropdown-button__icon"></u-icon>
					<view class="dropdown type-dropdown" v-show="dropdownShow">
						<view class="dropdown-item" @click="type = 1">{{$t('Internal')}}</view>
						<view class="dropdown-item" @click="type = 2">{{$t('External')}}</view>
					</view>
				</view>
			</view>
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">{{$t('all')}}</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">{{$t('oneMonth')}}</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">{{$t('threeMonths')}}</view>
			</view>
		</view>
		<view v-if="type === 1" class="record-list">
			<u-table v-if="data1.length" border-color="#fff">
				<u-tr>
					<u-th width="210rpx">{{$t('time')}}</u-th>
					<u-th>{{$t('currency')}}</u-th>
					<u-th>{{$t('toAddress')}}</u-th>
					<u-th>{{$t('num')}}</u-th>
					<u-th width="4%"></u-th>
				</u-tr>
				<u-tr v-for="(item, index) in data1" :key="item.id" 
				 @click.native="openDetail(item)" >
					<u-td width="210rpx">{{item.createTime | dateFormatYMD}}</u-td>
					<u-td>{{item.coinName}}</u-td>
					<u-td class="text-ellipsis">{{item.toUserAddress}}</u-td>
					<u-td class="withdrawal-amount" :class="item.changeType == 1?'is-add':''">
					 -{{item.amount}}
					</u-td>
					<u-td width="4%"><u-icon name="arrow-right"></u-icon></u-td>
				</u-tr>
			</u-table>
		</view>
		<view v-if="type === 2" class="record-list">
			<u-table v-if="data2.length" border-color="#fff">
				<u-tr>
					<u-th width="210rpx">{{$t('time')}}</u-th>
					<u-th>{{$t('currency')}}</u-th>
					<u-th>{{$t('toAddress')}}</u-th>
					<u-th>{{$t('num')}}</u-th>
					<u-th width="4%"></u-th>
				</u-tr>
				<u-tr v-for="(item, index) in data2" :key="item.id" 
				 @click.native="openDetail(item)" >
					<u-td width="210rpx">{{item.createTime | dateFormatYMD}}</u-td>
					<u-td>{{item.coinName}}</u-td>
					<u-td class="text-ellipsis">{{item.toAddress}}</u-td>
					<u-td>
					 -{{item.amount}}
					</u-td>
					<u-td width="4%"><u-icon name="arrow-right"></u-icon></u-td>
				</u-tr>
			</u-table>
<!-- 			<view v-for="item in data2" :key="item.id" @click="openDetail(item)" class="record-item">
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
		<u-empty v-if="noContent" :text="$t('noData')" mode="history"></u-empty>
<!-- 		<u-modal v-model="showDetail" confirm-text="关闭" :title="detail ? detail.coinName : '交易明细'" cancel-color="#6D6D6D">
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
						{{dropdownText}}
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
						{{$t('createTime')}}
					</view>
					<view class="itemValue">
						{{detail.createTime | dateFormat}}
					</view>
				</view>
				<view class="note">注：区块玩家内部互转无矿工费！</view>
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
						{{dropdownText}}
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
				<view class="detail-item mb-10">
					<view class="itemName">
						{{$t('status')}}
					</view>
					<view class="itemValue">
						{{detail.status | statusText}}
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
		</u-modal> -->
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				type: 1,
				coinName: '',
				dropdownShow: false,
				dropdownShow1: false,
				showDetail: false,
				data1: [],
				data2: [],
				detail: null,
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
						id: "交易序號",
						flow: "貨幣流向",
						withdrawAmount: "實際到賬",
						all: '全部',
						oneMonth: "壹個月",
						threeMonths: "三個月",
						currency: "幣種",
						noData: '暫無記錄'
					},
					en: {
						title: 'Withdrawal Records',
						Internal: "Block player inter turn",
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
						noData: 'No data'
					}
				},
				coinList: [],
				dateType: 0,
				noContent: false
			}
		},
		onLoad(options) {
			this.coinName = options.coinName || '';
		},
		created() {
			this.getCoinList();
			this.getData();
			this.setNavBarTitle('title');
		},
		computed: {
			dropdownText() {
				return this.type === 1 ? this.$t('Internal') : this.$t('External')
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
		watch: {
			type() {
				this.getData();
			}
		},
		methods: {
			// statusText(val) {
			// 	// 0待审核 1转账中 2确认中 3转账成功 4审批拒绝 5转账失败 6发送交易中 7打包中
				
			// 	switch(val) {
			// 		case 0:
			// 			return '待审核';
			// 		case 1:
			// 			return '转账中';
			// 		case 2:
			// 			return '确认中';
			// 		case 3:
			// 			return '转账成功';
			// 		case 4:
			// 			return '审批拒绝';
			// 		case 5:
			// 			return '转账失败';
			// 		case 6:
			// 			return '发送交易中';
			// 		case 7:
			// 			return '打包中';
			// 	}
			// },
			changeCoin(item) {
				this.coinName = item.coinName;
				this.getData();
			},
			getCoinList() {
				this.$u.post('/wRecordTransferOut/withDrawCoins').then(res => {
					this.coinList = res.data;
					if(res.data.length && this.coinName == '') {
						this.coinName = res.data[0].coinName;
						this.getData();
					}
				})
			},
			changeDateType(type) {
				this.dateType = type;
			},
			openDetail(item) {
				// this.showDetail = true;
				// this.detail = item;
				let type = this.type;
				uni.navigateTo({
					url: './withdrawSingleDetail?detail='+JSON.stringify(item)+'&type='+type+'&flow='+this.dropdownText
				})
			},
			getData() {
				
				if(!this.coinName) return;
				let url = this.type === 1 ? '/wRecordTransferIn/getTransferIn/' : '/wRecordTransferOut/getTransferOut/';
				this.noContent = false;
				this.$u.get(url + this.coinName+'/'+this.dateType).then(res => {
					if(this.type === 1) {
						this.data1 = res.data;
						this.noContent = !this.data1.length;
					}else if(this.type === 2) {
						this.data2 = res.data;
						this.noContent = !this.data2.length;
						//this.data2 = res.data;
					}
				},err => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.withdraw-records{
		height: 100%;
		
		.text-ellipsis {
		  white-space: nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
		}
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
			
			&.type-dropdown{
				width: 300rpx;
			}
			
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
					color: #FF0707;;
					border-color: #FF0707;;
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
		
		.mb-10{
			margin-bottom: 20rpx;
			border-bottom: 2rpx solid #f3f3f3;
			padding-bottom: 10rpx;
		}
		
		.detail-view{
			padding: 20rpx;
			
			.detail-item{
				display: flex;
				justify-content: space-between;
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
	}
</style>
