<template>
	<view class="my-bet" @click="dropdownShow = false">
		<view class="page-header">
			<view class="dropdown-button">
				<text class="dropdown-button__text" @click.stop="dropdownShow = !dropdownShow">
					{{dropdownText}}
				</text>
				<u-icon name="arrow-down-fill" class="dropdown-button__icon"></u-icon>
				<view class="dropdown" v-show="dropdownShow">
					<view class="dropdown-item" @click="type = 1">{{$t('ByOrder')}}</view>
					<view class="dropdown-item" @click="type = 2">{{$t('ByNumber')}}</view>
				</view>
			</view>
			<view @click="showFilterAndLoadWays">
				<image src="../../../static/filter.png" class="filter"></image>
			</view>
		</view>
		<template v-if="type === 1">
			<view v-for="d in data1" class="data-box">
				<view class="data-title">{{$t('OrderNo')}}：{{d.orderNo}}</view>
				<u-cell-group v-for="item in d.currentOrderDTOList" :key="item.currentNumber">
					<u-cell-item :title="$t('Period').replace('{0}', ymd(item.openTime))" :value="statusText(item.status)" :arrow="false">
						<view slot="icon" class="sp"></view>
					</u-cell-item>
					<u-cell-item v-for="game in item.orders" @click="openDetail(game)" :value="$t('Bet').replace('{0}', game.stakeNumber)" :key="game.id">
						<view slot="title" class="pn">{{game.wayDesc}}</view>
					</u-cell-item>
				</u-cell-group>
				<view class="data-sum">
					<view>{{$t('Total')}}</view>
					<view>{{d.stakeAmount}} GCN</view>
				</view>
			</view>
		</template>
		<template v-if="type === 2">
			<view v-for="d in data2" class="data-box">
				<view class="data-sum">
					<view>{{$t('Period').replace('{0}', ymd(d.openTime))}}</view>
					<view>{{statusText(d.status)}}</view>
				</view>
				<u-cell-group v-for="item in d.orderNoTwoDTOList">
					<u-cell-item :title="$t('OrderNo')+': '+item.orderNo" :arrow="false">
						<view slot="icon" class="sp"></view>
					</u-cell-item>
					<u-cell-item v-for="game in item.orders" @click="openDetail(game)" :value="$t('Bet').replace('{0}', game.stakeNumber)" :key="game.id">
						<view slot="title" class="pn">{{game.wayDesc}}</view>
					</u-cell-item>
					<u-cell-item :title="$t('Total')" :value="item.stakeAmount+'GCN'" :arrow="false">
					</u-cell-item>
				</u-cell-group>
			</view>
		</template>
		<u-empty v-if="noContent" text="暂无记录" mode="history"></u-empty>
		<u-popup v-model="showFilter" mode="right">
			<view class="filter-wrap">
				<view class="filter-header">
					<view class="filter-title">
						{{$t('Filter')}}
					</view>
					<view class="filter-title" @click="clearFilter">
						{{$t('Clear')}}
					</view>
				</view>
				<view class="filter-title">
					{{$t('Play')}}
				</view>
				<view class="filter-tags">
					<u-tag v-for="item in ways" @click="wayType = item.wayType" class="gutter" :key="item.wayType" :text="item.wayName"
					 shape="circle" :type="item.wayType === wayType ? 'error' : 'info'" mode="plain" />
				</view>
				<view class="filter-title">
					{{$t('Date')}}
				</view>
				<view>
					<u-icon @click="showCalendar = true" name="calendar" size="40"></u-icon>
				</view>
				<view>
					{{beginTime}} {{endTime}}
				</view>
				<view class="filter-search">
					<button type="default" class="filter-btn" size="mini" @click="submitFilter">{{$t('Submit')}}</button>
				</view>
			</view>
		</u-popup>
		<u-calendar v-model="showCalendar" mode="range" @change="changeDate"></u-calendar>
		<u-modal v-model="showDetail" :confirm-text="$t('Close')" :title="$t('Detail')">
			<view v-if="detail" class="detail-view">
				<view class="detail-title">
					{{$t('Period').replace('{0}', detail.number)}}
					{{detail.wayDesc}}
				</view>
				<u-table class="detail-table">
					<u-tr>
						<u-th>{{$t('BettingCode')}}</u-th>
						<u-th>{{$t('NumberOfBets')}}</u-th>
						<u-th>{{$t('WinningSituation')}}</u-th>
					</u-tr>
					<u-tr v-for="item in detail.details">
						<u-td>{{item.stakeNo}}</u-td>
						<u-td>{{$t('Bet').replace('{0}', item.stakeNumber)}}</u-td>
						<u-td>{{statusText(item.status)}}</u-td>
					</u-tr>
				</u-table>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default {
		data() {
			return {
				dropdownShow: false,
				type: 1,
				data1: [],
				data2: [],
				showFilter: false,
				showCalendar: false,
				ways: [],
				wayType: 0,
				beginTime: '',
				endTime: '',
				showDetail: false,
				detail: null,
				i18n: {
					zh: {
						Period: "{0} 期",
						ByOrder: "按订单展示",
						ByNumber: "按分期展示",
						OrderNo: "订单编号",
						Total: "投注合计",
						Detail: "投注详细",
						Close: "关闭",
						BettingCode: "投注码",
						NumberOfBets:" 投注数",
						WinningSituation: "投注情况",
						Bet: "{0} 注",
						NotWinning: "未中奖",
						Win: "已中奖",
						Waiting: "待开奖",
						Settled: "已结算",
						Filter: "筛选",
						Clear: "重置",
						Play: "玩法",
						Date: "时间筛选",
						Submit: "确定"
					},
					en: {
						Period: "No. {0}",
						ByOrder: "By order",
						ByNumber: "By number",
						OrderNo: "Order No",
						Total: "Total",
						Detail: "Detail",
						Close: "Close",
						BettingCode: "Betting code",
						NumberOfBets:" Number of bets",
						WinningSituation: "Winning situation",
						Bet: "{0} bet",
						NotWinning: "Not Winning",
						Win: "Win",
						Waiting: "Waiting",
						Settled: "Settled",
						Filter: "Filter",
						Clear: "Clear",
						Play: "Play",
						Date: "Date Filter",
						Submit: "Search"
					}
				},
				noContent: false
			}
		},
		created() {
			this.getData();
		},
		computed: {
			dropdownText() {
				return this.type === 1 ? this.$t('ByOrder') : this.$t('ByNumber')
			},
		},
		watch: {
			type() {
				this.getData();
			}
		},
		methods: {
			ymd(val) {
				return dateFormat(val, 'Ymd');
			},
			no(val) {
				if(!val) return '';
				return val < 10 ? '0'+ val : val; 
			},
			statusText(val) {
				// 0 待开奖 1已中奖 2未中奖 3已结算
				switch (val) {
					case 0:
						return this.$t('Waiting');
					case 1:
						return this.$t('Win');
					case 2:
						return this.$t('NotWinning');
					case 3:
						return this.$t('Settled');
				}
			},
			openDetail(item) {
				this.showDetail = true;
				this.detail = item;
			},
			changeDate(e) {
				this.beginTime = e.startDate;
				this.endTime = e.endDate;
			},
			clearFilter() {
				this.beginTime = '';
				this.endTime = '';
				this.wayType = 0;
			},
			showFilterAndLoadWays() {
				if (this.ways.length === 0) {
					this.$u.get('/gGameOrder/getWay').then(res => {
						this.ways = res.data;
					})
				}
				this.showFilter = true;
			},
			submitFilter() {
				this.getData();
				this.showFilter = false;
			},
			getData() {
				let url = this.type === 1 ? '/gGameOrder/getOrderDetailWithOrder' : '/gGameOrder/getOrderDetailWithNumber';
				this.noContent = false;
				this.$u.post(url, {
					beginTime: this.beginTime,
					endTime: this.endTime,
					wayType: this.wayType
				}).then(res => {
					if (this.type === 1) {
						this.data1 = res.data.map(v => {
							let stakeAmount = 0;
							v.currentOrderDTOList.forEach(c => {
								let obj = {};
								c.ggameOrderList.forEach((d, i) => {
									stakeAmount += d.stakeAmount;
									if(!obj[d.wayType]){
									   obj[d.wayType] = {
										   number: d.currentNumber,
										   wayDesc: d.wayDesc,
										   details: [d],
										   stakeNumber: d.stakeNumber
									   }
									}else{
										obj[d.wayType].stakeNumber = obj[d.wayType].stakeNumber + d.stakeNumber;
										obj[d.wayType].details.push(d);
									}
								});
								c.orders = Object.values(obj);
							})
							v.stakeAmount = stakeAmount;
							return v;
						});
						
						this.noContent = !this.data1.length;

						console.log(this.data1)
					} else if (this.type === 2) {
						this.data2 = res.data.map(v => {
							v.orderNoTwoDTOList.forEach(c => {
								let obj = {}, stakeAmount = 0;
								c.ggameOrderList.forEach((d, i) => {
									stakeAmount += d.stakeAmount;
									if(!obj[d.wayType]){
									   obj[d.wayType] = {
										   number: d.currentNumber,
										   wayDesc: d.wayDesc,
										   details: [d],
										   stakeNumber: d.stakeNumber
									   }
									}else{
										obj[d.wayType].stakeNumber = obj[d.wayType].stakeNumber + d.stakeNumber;
										obj[d.wayType].details.push(d);
									}
								});
								c.orders = Object.values(obj);
								c.stakeAmount = stakeAmount;
							})
							return v;
						});
						this.noContent = !this.data2.length;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-bet {
		height: 100%;

		.page-header {
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-bottom: 10rpx solid #f3f3f3;
			padding: 10rpx 30rpx;
			align-items: center;

			.filter {
				width: 32rpx;
				height: 32rpx;
			}
		}

		.dropdown-button {
			position: relative;

			&__text {
				color: #333;
				font-size: 28rpx;
			}

			&__icon {
				font-size: 18rpx;
				vertical-align: 5rpx;
				margin-left: 10rpx;
			}
		}

		.dropdown {
			position: absolute;
			top: 100%;
			background-color: #fff;
			width: 200rpx;
			z-index: 99;
			border: 2rpx solid rgba(165, 165, 165, 1);
			padding: 10rpx;
			box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.08);
			border-radius: 3rpx;

			.dropdown-item {
				font-size: 28rpx;
				padding: 10rpx;
			}
		}

		.data-box {
			border-bottom: 10rpx solid #f3f3f3;

			.data-title {
				padding: 12rpx 30rpx;
				font-size: 30rpx;
				color: #333;
			}

			.data-sum {
				display: flex;
				justify-content: space-between;
				padding: 12rpx 30rpx;
				font-size: 30rpx;
				color: #333;
			}

			.sp {
				width: 6rpx;
				height: 23rpx;
				background-color: $uni-color-primary;
				margin-right: 15rpx;
			}

			.pn {
				padding-left: 20rpx;
				font-size: 28rpx;
				color: #333;
			}
		}

		.filter-wrap {
			padding: 20rpx;
			width: 380rpx;

			.filter-header {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #f3f3f3;
				padding: 15rpx 0;
				margin-bottom: 30rpx;
			}

			.filter-title {
				color: #333;
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}

			.gutter {
				margin-right: 15rpx;
				margin-bottom: 15rpx;
			}

			.filter-tags {
				padding: 20rpx 0;
				border-bottom: 1px solid #f3f3f3;
				margin-bottom: 30rpx;
			}

			.filter-search {
				padding: 20rpx 0;
				display: flex;
				justify-content: center;
				
				.filter-btn{
					background-color: $uni-color-primary;
					color: #fff;
					width: 200rpx;
				}
			}
		}
		
		.detail-view{
			padding: 20rpx 0;
			.detail-title{
				font-size: 32rpx;
				color: #333;
				padding-bottom: 15rpx;
				text-align: center;
			}
			.detail-table{
				height: 400rpx;
				overflow: auto;
			}
		}
	}
</style>
