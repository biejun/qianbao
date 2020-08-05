<template>
	<view class="open-history">
		<view v-for="info in data" :key="info.id">
			<view @click="openID = info.id" class="period-header">
				<view class="no">{{$t('Period').replace('{0}', ymd(info.openTime))}}</view>
				<view v-show="openID !== info.id" class="icon"><u-icon name="arrow-right"></u-icon></view>
			</view>
			<view v-show="openID === info.id" class="kai-jiang border-bottom-10">
				<view class="title">{{$t('PrizeNumber')}}</view>
				<view v-if="info.openRewardNo" class="numbers">
					<div class="item" v-for="(item, index) in info.openRewardNo.split(',')" :key="index">
						<view class="num">
							{{item}}
						</view>
					</div>
				</view>
				<view v-else class="numbers">
					<div class="item" v-for="(item, index) in new Array(6).fill('')" :key="index">
						<view class="num">
							{{item}}
						</view>
					</div>
				</view>
				<view class="kai-jiang-ma">
					<view class="kai-jiang-pd30">
						<view class="kai-row">
							<view class="kai-item-name">{{$t('WinningHash')}}：</view>
							<view class="kai-item-value">{{info.openRewardHash || '-'}}</view>
						</view>
						<view class="kai-row">
							<view class="kai-item-name">{{$t('BlockHeight')}}：</view>
							<view class="kai-item-value">{{info.blockNumber || '-'}}</view>
							<view v-if="info.blockNumber" @click="copy" class="copy-text">{{$t('Copy')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		dateFormat
	} from '@/common/utils.js';
	export default{
		data() {
			return {
				data: [],
				openID: '',
				i18n: {
					zh: {
						PrizeNumber: '开奖号码',
						Period: "{0} 期",
						WinningHash: "开奖哈希",
						BlockHeight: "区块高度",
						PrizeDetails: "开奖详细",
						Jackpot: "奖池",
						SalesVolume: "本期销售额",
						Billion: "亿",
						Copy: "复制",
						Awards: "奖项",
						WinningRules: "中奖条件",
						NumberWinners: "中奖注数",
						SingleBetAmount: "单注金额",
						Lottery: "{0} 开奖",
						NextPeriod: "下期",
						MyBet: "我的投注",
						Bet: "我要投注",
						closed: "已结束",
						End: "截止",
						hashLecai: "哈希乐彩",
						rules: "规则玩法",
						History: "开奖历史",
						stopSubmit: "当期已停止投注！",
						nextIssue: "请投注下期",
						Bet2: "投注",
						cancel: "取消",
						WaitingPrize: "等待开奖",
						Countdown: "开奖倒计时：",
						Copied: "已复制!",
						title: "开奖历史"
					},
					en: {
						PrizeNumber: 'Prize Number',
						Period: "No. {0}",
						WinningHash: "Hash",
						BlockHeight: "Height",
						PrizeDetails: "Prize details",
						Jackpot: "Jackpot",
						SalesVolume: "Sales volume",
						Billion: "Billion",
						Copy: "Copy",
						Awards: "Awards",
						WinningRules: "Winning Rules",
						History: "History",
						NumberWinners: "Number of winners",
						SingleBetAmount: "Single bet amount",
						Lottery: "Opening time: {0}",
						NextPeriod: "Next",
						MyBet: "My Bet",
						Bet: "Bet",
						closed: "Closed",
						End: "End",
						hashLecai: "Hash Lotto",
						rules: "Rules of play",
						stopSubmit: "The current period has stopped betting!",
						nextIssue: "Please bet on the next issue",
						Bet2: "Bet",
						cancel: "Cancel",
						WaitingPrize: "Waiting for lucky numbers",
						Countdown: "Countdown: ",
						Copied: "Copied!",
						title: "History"
					}
				},
			}
		},
		created() {
			this.getData();
			this.setNavBarTitle('title');
		},
		methods: {
			getData() {
				this.$u.get('/gGameBase/getGameHistory').then(res => {
					console.log(res.data)
					this.data = res.data;
					if(res.data.length > 0) {
						this.openID = res.data[0].id;
					}
				});
			},
			ymd(val) {
				return val ? dateFormat(val, 'Ymd') : '-';
			},
			copy(link) {
				let self = this;
				uni.setClipboardData({
					data: link,
					success() {
						self.$u.toast(this.$t('Copied'));
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.open-history{
		padding: 20rpx 30rpx;
		
		.period-header{
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0;
			
			.no{
				font-size: 32rpx;
			}
		}
		.kai-jiang {
			padding: 30rpx 20rpx;
			border-bottom: 2rpx solid #f3f3f3;
		
			.title {
				color: #343434;
				text-align: center;
				font-size: 36rpx;
			}
		
			.numbers {
				padding: 20rpx 30rpx;
				display: flex;
		
				.item {
					flex: 1;
		
					.num {
						width: 80rpx;
						height: 80rpx;
						background: linear-gradient(0deg, #FA6B45 0%, #F49231 100%);
						border-radius: 50%;
						font-size: 60rpx;
						line-height: 80rpx;
						text-align: center;
						font-weight: bold;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		
			.kai-jiang-ma {
				margin-top: 20rpx;
				background: url(../../../static/kajiiangbeij@2x.png) bottom center no-repeat;
				background-size: cover;
				padding: 0 20rpx;
		
				.kai-jiang-pd30 {
					position: relative;
					padding: 40rpx 20rpx;
		
					.kai-row {
						display: flex;
						font-size: 30rpx;
						margin-bottom: 20rpx;
		
						.kai-item-name {
							width: 150rpx;
							min-width: 150rpx;
						}
		
						.kai-item-value {
							flex: 1;
							word-wrap: break-word;
							word-break: break-all;
						}
		
						.copy-text {
							color: $uni-color-primary;
						}
					}
				}
			}
		
			.kai-detail-row {
				display: flex;
				padding: 15rpx 0;
			}
		
			.kai-detail-cell {
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
		
				.detail-num {
					font-size: 36rpx;
					color: #F2271C;
					font-weight: bold;
				}
		
				.detail-unit {
					font-size: 24rpx;
					color: #343434;
				}
		
				.detail-cell-item {
					font-size: 24rpx;
					color: #343434;
					margin-top: 10rpx;
				}
			}
		
			.kai-detail-table-head {
				margin-top: 20rpx;
				border-top: 2rpx solid #f3f3f3;
				border-bottom: 2rpx solid #f3f3f3;
		
				.kai-detail-cell {
					color: #666;
					font-size: 24rpx;
					align-items: flex-start;
		
					&:last-child {
						min-width: 250rpx;
						align-items: center;
					}
				}
			}
		
			.kai-detail-table-body {
				padding-bottom: 110rpx;
		
				.kai-detail-cell {
					color: #343434;
					font-size: 26rpx;
					align-items: flex-start;
					font-weight: bold;
		
					&:last-child {
						min-width: 250rpx;
						align-items: center;
					}
				}
			}
		}
	}
</style>
