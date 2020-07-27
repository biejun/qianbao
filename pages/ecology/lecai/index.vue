<template>
	<view class="lecai-kaijiang">
		<u-navbar title="" :custom-back="goHome">
			<view class="header-navbar">
				<view></view>
				<view class="navbar-title">{{$t('hashLecai')}}</view>
				<view @click="goUserCenter">
					<image src="../../../static/1212.png" class="navbar-icon"></image>
				</view>
			</view>
		</u-navbar>
		<view class="header-item border-bottom-10">
			<view class="header-num">
				{{$t('Period').replace('{0}', ymd(info.openTime))}} <!-- {{$t('Lottery').replace('{0}', dateFormat(info.openTime))}} -->
			</view>
			<view class="header-notify">
				<navigator class="message-btn" url="/pages/ecology/bet/way"><u-icon name="question-circle"></u-icon> {{$t('rules')}}</navigator>
				<image src="../../../static/icon_xiaoxi.png" class="notify-icon" @click="goUrl('user/notify')"></image>
			</view>
		</view>
		<view class="kai-jiang border-bottom-10">
			<view v-if="info.openRewardNo" class="title">{{$t('PrizeNumber')}}</view>
			<view v-else class="title">{{$t('WaitingPrize')}}</view>
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
		<view class="next">
			<text class="mr-10">{{$t('NextPeriod')}}：{{$t('Period').replace('{0}', info.currentNumber ? ymd(nextOpenTime) : '-')}}</text>
			<text>{{$t('Lottery').replace('{0}', dateFormat(nextOpenTime))}}</text>
		</view>
		<view class="kai-jiang">
			<view class="title">{{$t('PrizeDetails')}}</view>
			<view class="kai-detail-row">
				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">{{info.currentRewardPool}}</text>
						<text class="detail-unit">GCN</text>
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
						<text class="detail-unit">GCN</text>
					</view>
					<view class="detail-cell-item">
						{{$t('SalesVolume')}}
					</view>
				</view>
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
						{{$t('NumberWinners')}}
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
		<u-modal title="" :show-confirm-button="false" v-model="showNext">
			<view class="msg-wrap">
				<view class="msg-text">{{$t('stopSubmit')}}</view>
				<view class="msg-text">{{$t('nextIssue')}}</view>
				<view class="footer-button">
					<view class="btn cancel-btn" @click="showNext = false">{{$t('cancel')}}</view>
					<view class="btn submit-btn" @click="goNextSelect">{{$t('Bet2')}}</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	import UIcon from 'uview-ui/components/u-icon/u-icon'
	export default{
		components: {UIcon},
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
					endTime: '',
				},
				detail: [],
				showNext: false,
				i18n: {
					zh: {
						PrizeNumber: '开奖号码',
						Period: "{0} 期",
						WinningHash:"开奖哈希",
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
						stopSubmit: "当期已停止投注！",
						nextIssue: "请投注下期",
						Bet2: "投注",
						cancel: "取消",
						WaitingPrize: "等待开奖"
					},
					en: {
						PrizeNumber: 'Prize Number',
						Period: "No. {0}",
						WinningHash:"Hash",
						BlockHeight: "Height",
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
						End: "End",
						hashLecai: "Hash Lotto",
						rules: "Rules of play",
						stopSubmit: "The current period has stopped betting!",
						nextIssue: "Please bet on the next issue",
						Bet2: "Bet",
						cancel: "Cancel",
						WaitingPrize: "Waiting for lucky numbers"
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
		onLoad() {
			this.getGameBaseInfo();
			this.getGameDetail();
		},
		onPullDownRefresh() {
			this.getGameBaseInfo();
			this.getGameDetail();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1500);
		},
		onBackPress() {
			uni.switchTab({
				url: '/pages/index/index'
			});
			return true;
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
			ymd(val) {
				return dateFormat(val, 'Ymd');
			},
			no(val) {
				if(!val) return '';
				return val < 10 ? '0'+ val : val; 
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
			goNextSelect() {
				this.$u.vuex('vuex_game_id', '');
				this.$u.vuex('vuex_bet_period', this.info.currentNumber+1);
				uni.navigateTo({
					url: '../bet/select'
				})
			},
			goSelect() {
				if(this.remainTime < 0) {
					uni.navigateTo({
						url: '../bet/select'
					})
				}else{
					this.showNext = true;
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
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.lecai-kaijiang{
		.mr-10{
			margin-right: 10rpx;
		}
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
			.navbar-icon{
				width: 40rpx;
				height: 40rpx;
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
		
		.next{
			height:80rpx;
			line-height: 80rpx;
			font-size:28rpx;
			color:rgba(52,52,52,1);
			border-bottom: 10rpx solid #f3f3f3;
			text-align: center;
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
		
		.message-btn{
			margin-right: 15rpx;
			color: #F1333D;
			display: inline-block;
		}
		
		.msg-wrap{
			padding: 30rpx 30rpx 60rpx 30rpx;
			
			.msg-text{
				font-size: 32rpx;
				margin-bottom: 20rpx;
				color: #333;
				text-align: center;
			}
			
			.footer-button{
				display: flex;
				justify-content: center;
				padding-top: 40rpx;
				
				.btn{
					height: 60rpx;
					line-height: 60rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
					color: #fff;
					width: 160rpx;
					font-size: 30rpx;
					text-align: center;
				}
				
				.cancel-btn{
					background-color: #DEDBDC;
				}
				.submit-btn{
					background-color: $uni-color-primary;
				}
			}
		}
	}
</style>
