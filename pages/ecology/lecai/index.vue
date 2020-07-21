<template>
	<view class="lecai-kaijiang">
<!-- 		<u-navbar :is-back="false" title="" :custom-back="goUserCenter">
			<view class="header-navbar">
				<view class="navbar-icon" @click="goUserCenter">
					<u-icon name="account" size="40"></u-icon>
				</view>
				<view class="navbar-title">哈希乐彩</view>
				<view></view>
			</view>
		</u-navbar> -->
		<view class="header-item border-bottom-10">
			<view class="header-num">
				{{$t('Period').replace('{0}', info.currentNumber)}} {{$t('Lottery').replace('{0}', dateFormat(info.openTime))}}
			</view>
			<view class="header-notify" @click="goUrl('user/notify')">
				<image src="../../../static/icon_xiaoxi.png" class="notify-icon"></image>
			</view>
		</view>
		<view class="kai-jiang border-bottom-10">
			<view class="title">{{$t('PrizeNumber')}}</view>
			<view class="numbers">
				<div class="item" v-for="(item, index) in info.openRewardNo.split(',')" :key="index">
					<view class="num">
						{{item}}
					</view>
				</div>
			</view>
			<view class="kai-jiang-ma">
				<view class="kai-jiang-pd30">
					<view class="kai-row">
						<view class="kai-item-name">{{$t('WinningHash')}}：</view>
						<view class="kai-item-value">{{info.openRewardHash}}</view>
					</view>
					<view class="kai-row">
						<view class="kai-item-name">{{$t('BlockHeight')}}：</view>
						<view class="kai-item-value">{{info.blockNumber}}</view>
						<view @click="copy" class="copy-text">{{$t('Copy')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="kai-jiang">
			<view class="title">{{$t('PrizeDetails')}}</view>
			<view class="kai-detail-row">
				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">{{info.currentRewardPool}}</text>
						<text class="detail-unit">{{$t('Billion')}}</text>
					</view>
					<view class="detail-cell-item">
						{{$t('Jackpot')}}
					</view>
				</view>
<!-- 				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">{{info.currentFloatReward}}</text>
						<text class="detail-unit">亿</text>
					</view>
					<view class="detail-cell-item">
						本期浮动奖金
					</view>
				</view> -->
				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">{{info.currentSellNumber}}</text>
						<text class="detail-unit">{{$t('Billion')}}</text>
					</view>
					<view class="detail-cell-item">
						{{$t('SalesVolume')}}
					</view>
				</view>
			</view>
			<view class="next">
				<text>{{$t('NextPeriod')}}：{{$t('Period').replace('{0}', info.currentNumber ? info.currentNumber+1 : '-')}}</text>
				<text>{{$t('Lottery').replace('{0}', dateFormat(nextOpenTime))}}</text>
			</view>
			<view class="kai-detail-table-head">
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						{{$t('Awards')}}
					</view>
					<view class="kai-detail-cell">
						{{$t('WinningRules')}}
					</view>
					<view class="kai-detail-cell">
						{{$t('WinningRules')}}
					</view>
					<view class="kai-detail-cell">
						{{$t('SingleBetAmount')}}(GCN)
					</view>
				</view>
			</view>
			<view class="kai-detail-table-body">
				<view v-for="item in detail" class="kai-detail-row" :key="item.id">
					<view class="kai-detail-cell">
						{{item.gameLevelDesc}}
					</view>
					<view class="kai-detail-cell">
						{{item.rewardLevelDesc}}
					</view>
					<view class="kai-detail-cell">
						{{item.rewardCount}}
					</view>
					<view class="kai-detail-cell">
						{{item.amount}}
					</view>
				</view>
			</view>
		</view>
		<view class="footer-item">
			<view class="wode-touzhu" @click="goMy">
				{{$t('MyBet')}}
			</view>
			<view class="woyao-touzhu" @click="goSelect">
				{{$t('Bet')}}
				({{remainTime > 0 ? $t('closed') : endTime + $t('End')}})
			</view>
		</view>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				info: {
					openRewardHash: '', // 开奖哈希
					openRewardNo: '', // 开奖号码
					openTime: '', // 开奖时间
					currentSellNumber: '',
					currentRewardPool: '',
					currentNumber: '',
					currentFloatReward: '',
					createTime: '',
					blockNumber: '',
					beginTime: '',
					endTime: ''
				},
				detail: [],
				i18n: {
					zh: {
						PrizeNumber: '开奖号码',
						Period: "{0} 期",
						WinningHash:"开奖哈希",
						BlockHeight: "区块高度",
						PrizeDetails: "开奖详细",
						Jackpot: "本期奖池",
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
						End: "截止"
					},
					en: {
						PrizeNumber: 'Prize Number',
						Period: "No. {0}",
						WinningHash:"Winning Hash",
						BlockHeight: "Block Height",
						PrizeDetails: "Prize details",
						Jackpot: "Jackpot",
						SalesVolume: "Sales volume",
						Billion: "Billion",
						Copy: "Copy",
						Awards: "Awards",
						WinningRules: "Winning Rules",
						NumberWinners: "Number of winners",
						SingleBetAmount: "Single bet amount",
						Lottery: "Opening time: {0}",
						NextPeriod: "Next",
						MyBet: "My Bet",
						Bet: "Bet",
						closed: "Closed",
						End: "End"
					}
				},
			}
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			// 取消红点或者角标 
			if(e.index === 0) {
				this.goUserCenter();
			}
		},
		created() {
			this.getGameBaseInfo();
			this.getGameDetail();
		},
		computed: {
			remainTime() {
				let nowTime = new Date().getTime();
				if(!this.info.endTime) return 0;
				return nowTime - this.info.endTime
			},
			endTime() {
				return dateFormat(this.info.endTime, 'H:i:s');
			},
			nextOpenTime() {
				let date = new Date(this.info.openTime);
				date.setDate(date.getDate() + 1);
				return date;
			}
		},
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s');
			}
		},
		methods: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s')
			},
			getGameBaseInfo() {
				this.$u.get('/gGameBase/getGameBase').then(res => {
					if(res.data) {
						this.info = res.data;
						this.$u.vuex('vuex_hasLogin', true);
						this.$u.vuex('vuex_game_id', this.info.id);
						this.$u.vuex('vuex_bet_period', this.info.currentNumber);
					}
				})
			},
			getGameDetail() {
				this.$u.get('/gGameBase/getGameDetail').then(res => {
					this.detail = res.data;
				});
			},
			goUserCenter() {
				uni.navigateTo({
					url: '/pages/ecology/my/index'
				})
			},
			copy() {
				uni.setClipboardData({
				    data: this.info.blockNumber,
				    success() {
				        console.log('success');
				    }
				});
			},
			goSelect() {
				if(this.remainTime < 0) {
					uni.navigateTo({
						url: '../bet/select'
					})
				}
			},
			goMy() {
				uni.navigateTo({
					url: '../bet/my'
				})
			},
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/'+ page
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.lecai-kaijiang{
		.header-navbar{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			flex: 1;
			
			.navbar-title{
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.border-bottom-10{
			border-bottom: 10rpx solid #f3f3f3;
		}
		.header-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15rpx 30rpx;
		}
		.header-num{
			color: #343434;
			font-size: 28rpx;
		}
		.header-notify{
			.notify-icon{
				width: 36rpx;
				height: 36rpx;
			}
		}
		
		.kai-jiang{
			padding: 30rpx;
			
			.title{
				color: #343434;
				text-align: center;
				font-size: 36rpx;
			}
			.numbers{
				padding: 20rpx 30rpx;
				display: flex;
				
				.item{
					flex: 1;
					
					.num{
						width:80rpx;
						height:80rpx;
						background: linear-gradient(0deg, #FA6B45 0%, #F49231 100%);
						border-radius:50%;
						font-size:60rpx;
						line-height: 80rpx;
						text-align: center;
						font-weight:bold;
						color:rgba(255,255,255,1);
					}
				}
			}
			.kai-jiang-ma{
				margin-top: 20rpx;
				background: url(../../../static/kajiiangbeij@2x.png) top center no-repeat;
				background-size: cover;
				padding: 30rpx;
				height: 250rpx;
				.kai-jiang-pd30{
					padding: 15rpx 20rpx;
					.kai-row{
						display: flex;
						font-size: 30rpx;
						margin-bottom: 20rpx;
						
						.kai-item-name{
							width: 150rpx;
							min-width: 150rpx;
						}
						.kai-item-value{
							flex: 1;
							word-wrap: break-word;
							word-break: break-all;
						}
						.copy-text{
							color: $uni-color-primary;
						}
					}
				}
			}
			
			.kai-detail-row{
				display: flex;
				padding: 15rpx 0;
			}
			.kai-detail-cell{
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
				
				.detail-num{
					font-size: 36rpx;
					color: #F2271C;
					font-weight: bold;
				}
				.detail-unit{
					font-size: 24rpx;
					color: #343434;
				}
				.detail-cell-item{
					font-size: 24rpx;
					color: #343434;
					margin-top: 10rpx;
				}
			}
			
			.kai-detail-table-head{
				margin-top: 20rpx;
				border-top: 2rpx solid #f3f3f3;
				border-bottom: 2rpx solid #f3f3f3;
				
				.kai-detail-cell{
					color: #666;
					font-size: 24rpx;
					align-items: flex-start;
					
					&:last-child{
						min-width: 250rpx;
						align-items: center;
					}
				}
			}
			
			.kai-detail-table-body{
				padding-bottom: 110rpx;
				
				.kai-detail-cell{
					color: #343434;
					font-size: 26rpx;
					align-items: flex-start;
					font-weight: bold;
					&:last-child{
						min-width: 250rpx;
						align-items: center;
					}
				}
				
				.next{
					border-top: 1px solid #f3f3f3;
					padding: 20rpx 0;
					height:26rpx;
					font-size:28rpx;
					font-weight:500;
					color:rgba(52,52,52,1);
					
					text{
						margin-right: 10rpx;
					}
				}
			}
		}
		.footer-item{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			height: 98rpx;
			.wode-touzhu{
				width: 250rpx;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				background-color: #F3F3F3;
				color: #343434;
				font-size: 32rpx;
			}
			.woyao-touzhu{
				flex: 1;
				background-color: #FFC000;
				color: #fff;
				font-size: 32rpx;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
			}
		}
	}
</style>
