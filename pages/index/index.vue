<template>
	<view class="index" @click="bodyClick">
		<view class="index-header">
			<view class="header-status-bar">
				<view class="is-fixed"></view>
			</view>
			<view class="header-navbar">
				<view class="notify" @click="goUrl('user/notify')"></view>
				<view class="notice">
					<u-notice-bar mode="vertical" :list="listitem" type='none' :volume-icon="false" :more-icon="true" color="#fff"
					 padding="12rpx 18rpx" @getMore="getMore">
					</u-notice-bar>
				</view>
				<view class="i18n" @click.stop="dropdownShow = true"></view>
				<view class="dropdown" v-show="dropdownShow">
					<view class="dropdown-item" @click="setLanguage('zh')">简体中文</view>
					<view class="dropdown-item" @click="setLanguage('en')">English</view>
				</view>
				<view class="qr-icon" @click="scanCode"></view>
			</view>
			<view class="hedaer-assets">
				<view class="account-wrap">
					<view class="account-item" @click="goUrl('index/account/digitalAccount?amount='+totalDigitalAmount)">
						<view class="account-item-text">
							<image src="../../static/index/content/icon_qianbao.png" class="small-icon"></image>
							{{$t('digitalAccount')}}
							<view class="total-balance-text">
								{{$t('totalAssets')}}
							</view>
						</view>
						<view class="account-item-number">
							
							<text>{{totalDigitalAmount}}</text>
							<text class="account-item-unit">USDT</text>
						</view>
					</view>
					<view class="account-item" @click="goUrl('index/account/gameAccount?amount='+totalGameAmount)">
						<view class="account-item-text">
							<image src="../../static/index/content/icon_layer.png" class="small-icon"></image>
							{{$t('gameAccount')}}
						</view>
						<view class="account-item-number">
							<text>{{totalGameAmount}}</text>
							<text class="account-item-unit">GCN</text>
						</view>
					</view>
				</view>
				<view class="account-wrap total-balance">
					<view class="account-item" @click="goUrl('index/account/digitalAccount?amount='+totalDigitalAmount)">
						<view class="account-item-text">
							<image src="../../static/index/content/icon_card.png" class="small-icon"></image>
							{{$t('cunKuanBao')}}
							<view class="total-balance-text">
								1.86%年化
							</view>
						</view>
						<view class="account-item-number">
							<text>{{totalDigitalAmount}}</text>
							<text class="account-item-unit">GCN</text>
						</view>
					</view>
					<view class="account-item account-returns">
						<view class="return-item">
							<view class="return-item-name">日收益</view>
							<view class="return-item-value">+1.00 GCN</view>
						</view>
						<view class="return-item">
							<view class="return-item-name">累计收益</view>
							<view class="return-item-value">+1.00 GCN</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="header-bottom"></view>
		<view class="operate">
			<view class="op-left">
				<image src="../../static/index/content/coin.png" mode=""></image>
				<view @click="goUrl('index/coin/recharge')" class="charge">{{$t('recharge')}}</view>
			</view>
			<view class="op-right">
				<image src="../../static/index/content/coin.png" mode=""></image>
				<view @click="goUrl('index/coin/withdraw')" class="charge">{{$t('withdrawal')}}</view>
			</view>
		</view>
		<view class="index-content">
			<view class="block-title">
				<text class="block-title__text">{{$t('assetList')}}</text>
				<image src="../../static/index/content/icon_jiahao.png" mode="" @click="goUrl('index/coin/add')"></image>
				<!-- <view class="">
          <u-icon name="plus" class="add-coin" @click="goUrl('index/coin/add')"></u-icon>
        </view> -->

			</view>
			<view class="coin-list">
				<view class="coin-cell" v-for="item in list" :key="item.id">
					<image :src="item.coinIcon" class="coin-image"></image>
					<view class="coin-name">{{item.coinName}}</view>
					<view class="coin-meta">
						<view class="coin-count">{{item.amount}}</view>
						<view class="coin-amount">≈{{item.cnyAmount}} GCN</view>
					</view>
					<view class="coin-exchange" @click="exchange(item)">
						{{$t('exchange')}}
					</view>
				</view>
				<!-- 				<view class="coin-cell">
					<image src="../../static/index/content/icon_BTC.png" class="coin-image"></image>
					<view class="coin-name">BTC</view>
					<view class="coin-meta">
						<view class="coin-count">312.123456</view>
						<view class="coin-amount">≈860.123456 GCN</view>
					</view>
					<view class="coin-exchange" @click="goUrl('index/coin/exchange')">
						兑换
					</view>
				</view>
				<view class="coin-cell">
					<image src="../../static/index/content/icon_eth.png" class="coin-image"></image>
					<view class="coin-name">ETC</view>
					<view class="coin-meta">
						<view class="coin-count">72.123456</view>
						<view class="coin-amount">≈860.123456 GCN</view>
					</view>
					<view class="coin-exchange" @click="goUrl('index/coin/exchange')">
						兑换
					</view>
				</view> -->
			</view>
		</view>
<!-- 		<u-popup v-model="show" mode="left" border-radius="14" length="50%">
			<popup></popup>
		</u-popup> -->
	</view>
</template>

<script>
	import popup from './subNVue/popup.nvue';
	import {
		accAdd
	} from '@/common/utils.js';
	export default {
		components: {
			popup
		},
		data() {
			return {
				listitem: ['服务器暂停服务', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
				show: false,
				list: [],
				totalAmount: 0,
				totalUSDT: 0,
				totalGameAmount: 0,
				totalDigitalAmount: 0,
				dropdownShow: false,
				i18n: {
					zh: {
						totalAssets: '总资产',
						digitalAccount: '数字账户',
						gameAccount: "游戏账户",
						recharge: "充币",
						withdrawal: "提币",
						assetList: "资产列表",
						exchange: "兑换",
						tabbar: {
							wallet: "钱包",
							ecology: "生态",
							my: "我的"
						},
						cunKuanBao: '存款宝'
					},
					en: {
						totalAssets: 'Total Assets',
						digitalAccount: "Digital Account",
						gameAccount: "Game Account",
						recharge: "Recharge",
						withdrawal: "Withdrawal",
						assetList: "Asset List",
						exchange: "Exchange",
						tabbar: {
							wallet: "Wallet",
							ecology: "Ecology",
							my: "My"
						},
						cunKuanBao: 'Cun Kuan Bao'
					}
				},
			}
		},
		onLoad() {
			// this.checkLogin();
			// this.getNotifyData();
		},
		watch: {
			vuex_lang() {
				this.initTab();
			}
		},
		created() {
			this.initTab();
		},
		onShow() {
			//this.getUserAmount();
		},
		methods: {
			scanCode() {
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});	
			},
			initTab() {
				this.setTabbarText(0, 'tabbar.wallet');
				this.setTabbarText(1, 'tabbar.ecology');
				this.setTabbarText(2, 'tabbar.my');
			},
			// 公告
			getNotifyData() {
				this.$u.get('/notice/getNotice/' + 2).then(res => {
					this.listitem = res.data;
				})
				this.$u.get('/gGameBase/getOrderReward').then(res => {
					this.listitem = res.data.map(v => v.userPhone + '中奖'+v.stakeAmount);
				})
			},
			getMore() {
				uni.navigateTo({
					url: '/pages/user/notify?type=2'
				})
			},
			
			bodyClick() {
				this.dropdownShow = false;
			},
			checkLogin() {
				if (!this.vuex_hasLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return false;
				}
				return true;
			},
			openUserCenter() {

				if (this.checkLogin()) {
					uni.switchTab({
						url: '/pages/user/index'
					});
				}
			},
			getUserAmount() {
				this.$u.api.getUserAmount().then(res => {
					this.list = res.data;
					let totalAmount = 0;
					let totalGameAmount = 0;
					let totalDigitalAmount = 0;
					let totalUSDT = 0;
					res.data.forEach(v => {
						let usdtAmount = v.usdtAmount || 0;
						let gameAmount = v.gameAmount || 0;
						let usdtGameAmount = v.usdtGameAmount || 0;
						let cnyAmount = v.cnyAmount || 0;
						totalAmount = accAdd(totalAmount, cnyAmount); // 持有总USDT 相当于 GCN 的总资产
						totalGameAmount = accAdd(totalGameAmount, gameAmount); // GCN 资产
						totalDigitalAmount = accAdd(totalDigitalAmount, usdtAmount); // USDT 总资产
						totalUSDT = accAdd(totalUSDT, accAdd(usdtAmount, usdtGameAmount));
					});
					this.totalAmount = totalAmount;
					this.totalGameAmount = totalGameAmount;
					this.totalDigitalAmount = totalDigitalAmount;
					this.totalUSDT = totalUSDT;
				}, res => {
					if (res.code === 401) {
						this.$u.vuex('vuex_hasLogin', false);
					}
				})
			},
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/' + page
				})
			},
			exchange(item) {
				this.$u.vuex('vuex_exchange_image', item.coinIcon);
				this.goUrl('index/coin/exchange?coinName=' + item.coinName + '&amount=' + item.amount)
			}
		}
	}
</script>

<style lang="scss">
	.index {
		&-header {
			background: linear-gradient(177deg, #F8C76C 0%, #FCAA7F 100%);
			height: 350rpx;
			border-radius: 0 0 50% 50%/0 0 30% 30%;
			padding: 0 30rpx;

			.header-status-bar {
				height: var(--status-bar-height);

				.is-fixed {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					height: var(--status-bar-height);
					background-color: #F8C76C;
					z-index: 999;
				}
			}

			.header-navbar {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;

				.avatar {
					width: 50rpx;
					height: 50rpx;

					.avatar-img {
						width: 50rpx !important;
						height: 50rpx !important;
					}
				}

				.notice {
					position: relative;
					height: 55rpx;
					margin-left: 15rpx;
					margin-right: 15rpx;
					flex: 1;
					border: 2rpx solid #fff;
					padding: 0 10rpx;
					color: #fff;
					font-size: 26rpx;
					border-radius: 26rpx;
					line-height: 55rpx;

					.arrow {
						position: absolute;
						right: 16rpx;
						top: 12rpx;
						width: 15rpx;
						height: 24rpx;
					}
				}

				.notify {
					width: 45rpx;
					height: 45rpx;
					background-image: url(../../static/index/header/icon_xiaoxi.png);
					background-size: cover;
				}
				
				.qr-icon{
					width: 48rpx;
					height: 48rpx;
					background-image: url(../../static/index/header/saoma.png);
					background-size: cover;
					margin-left: 5px;
				}
				
				.i18n {
					position: relative;
					width: 45rpx;
					height: 45rpx;
					background-image: url(../../static/index/header/icon_internet.png);
					background-size: cover;
				}
				
				.dropdown {
					position: absolute;
					top: 100%;
					right: 0;
					background-color: #fff;
					width: 200rpx;
					z-index: 99;
					border: 1rpx solid rgba(165, 165, 165, .2);
					padding: 10rpx 12rpx;
					box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.08);
					border-radius: 10rpx;
				
					.dropdown-item {
						font-size: 28rpx;
						padding: 10rpx;
					}
				}
			}

			.hedaer-assets {
				margin-top: 10rpx;
				background-color: #fff;
				border-radius: 28rpx;
				height: 370rpx;
				box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.11);
				padding: 30rpx;

				.account-wrap {
					display: flex;
					justify-content: space-between;
					padding: 20rpx 0;
					border-bottom: 2rpx solid #F3F3F3;

					.account-item {
						position: relative;
						flex: 1;
						
						.small-icon{
							width: 30rpx;
							height: 27rpx;
							margin-right: 10rpx;
						}

						&-text {
							color: #666666;
							font-size: 32rpx;
							margin-bottom: 10px;
							
							.total-balance-text {
								display: inline-block;
								font-size: 20rpx;
								color: #EF323C;
								margin-left: 5rpx;
							}
						}

						&-number {
							color: #333333;
							font-size: 40rpx;

							text {
								margin-right: 10rpx;
								font-weight: bold;
							}
							
							.account-item-unit{
								font-size: 28rpx;
								color: #666666;
							}
						}

						&:last-child {
							padding-left: 30rpx;

							&:before {
								position: absolute;
								content: "";
								left: -2rpx;
								top: 10rpx;
								bottom: 10rpx;
								width: 2rpx;
								background-color: #F3F3F3;
							}
						}
						
						&.account-returns{
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 22rpx;
							
							.return-item{
								text-align: center;
								
								.return-item-name{
									color: #3866FD;
								}
								.return-item-value{
									color: #333333;
								}
							}
						}
					}
				}
				
				.total-balance {
					border-bottom: none;
				
					&-number {
						font-size: 52rpx;
						color: #333333;
						margin-right: 20rpx;
						font-weight: bold;
					}
				
					&-unit {
						color: #666666;
						font-size: 30rpx;
						font-weight: 500;
					}
					
					.account-item{
						&:last-child {
						
							&:before {
								background-color: #fff;
							}
						}
					}
				}
			}
		}

		.header-bottom {
			height: 140rpx;
			// border-bottom: 10rpx solid #fff;
		}

		&-content {
			padding: 30rpx;
			margin-bottom: 30px;

			.block-title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&__text {
					font-size: 34rpx;
					color: #333;
					font-weight: bold;
				}

				image {
					width: 44rpx;
					height: 44rpx;
				}

				.add-coin {
					width: 50rpx;
					color: $uni-color-primary;
					font-size: 28rpx;
					font-weight: bold;
					text-align: center;
				}
			}

			.coin-list {
				padding: 20rpx 0;

				.coin-cell {
					border-bottom: 2rpx solid #F3F3F3;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 0;

					&:last-child {
						border-bottom: none;
					}

					.coin-image {
						width: 80rpx;
						height: 80rpx;
					}

					.coin-name {
						font-size: 30rpx;
						font-weight: bold;
						margin-left: 20rpx;
					}

					.coin-meta {
						flex: 1 0 50%;
						text-align: right;
						padding-right: 60rpx;

						.coin-count {
							margin-top: 35rpx;
							font-size: 32rpx;
							font-weight: bold;
						}

						.coin-amount {
							font-size: 26rpx;
							color: #A5A5A5;
						}
					}

					.coin-exchange {
						border: 1px solid #EEBE23;
						border-right: none;
						width: 100rpx;
						height: 48rpx;
						line-height: 48rpx;
						padding-left: 20rpx;
						color: #EEBE23;
						margin-right: -30rpx;
						border-radius: 24rpx 0px 0px 24rpx;
						font-size: 28rpx;
					}
				}
			}
		}

		.operate {
			width: 700rpx;
			height: 98rpx;
			background: #ECB416;
			border-radius: 49rpx;
			margin: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			color: #fff;

			image {
				width: 58rpx;
				height: 58rpx;
			}

			.charge {
				font-size: 32rpx;
				padding-left: 20rpx;
			}

			.op-left {
				display: flex;
				align-items: center;
				border-right: 1px solid #fff;
				justify-content: center;
				flex: 1 0 50%;
			}

			.op-right {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1 0 50%;
			}

		}

		// .recharge-btn{
		// 	color: #fff!important;
		// 	font-size: 34rpx!important;
		// 	flex: 0 0 45%;
		// }
		// .exchange-btn{
		// 	flex: 0 0 45%;
		// 	font-size: 34rpx!important;
		// }
	}
</style>
