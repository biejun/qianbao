<template>
	<view class="user-center">
		<view class="user-info">
		</view>
		<view class="cell-wrap">
			<view class="cell-item" @click="goUrl('user/idAndAddress')">
				<view class="cell-item-label">
					<image src="@/static/user/location.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('identity')}}</text>
				</view>
				<view v-if="vuex_address" class="cell-content address">
					{{vuex_address}}
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="openBackup">
				<view class="cell-item-label">
					<image src="@/static/user/record.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('mnemonic')}}</text>
				</view>
				<view class="cell-content backup">
					{{$t('backup')}}
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="goUrl('index/account/digitalAccount?amount='+totalAmount)">
				<view class="cell-item-label">
					<image src="@/static/user/qianbao.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('walletAccount')}}</text>
				</view>
				<view class="cell-content balance">
					<view class="balance-num">{{userBalance.amount}}</view>
					<view class="balance-unit">GCN</view>
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="goUrl('index/account/gameAccount?amount='+totalGameAmount)">
				<view class="cell-item-label">
					<image src="@/static/user/youxi.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('gameAccount')}}</text>
				</view>
				<view class="cell-content balance">
					<view class="balance-num">{{userBalance.gameAmount}}</view>
					<view class="balance-unit">GCN</view>
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="goUrl('index/account/cunKuanBao?amount='+totalYBB)">
				<view class="cell-item-label">
					<image src="@/static/user/yinhangka.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('cunKuanBao')}}</text>
				</view>
				<view class="cell-content balance">
					<view class="balance-num">{{userBalance.YBB}}</view>
					<view class="balance-unit">GCN</view>
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="goUrl('user/service')">
				<view class="cell-item-label">
					<image src="@/static/user/kefu.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('service')}}</text>
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="goUrl('register/service-terms')">
				<view class="cell-item-label">
					<image src="@/static/user/term.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('terms')}}</text>
				</view>
				<view class="cell-content terms">
					{{$t('termsOfService')}}
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="updateVersion">
				<view class="cell-item-label">
					<image src="@/static/user/banben.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('version')}}</text>
				</view>
<!-- 				<view class="cell-content version">
					最新版本 2.1
				</view> -->
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
			<view class="cell-item" @click="goUrl('user/share')">
				<view class="cell-item-label">
					<image src="../../static/user/fenxiang.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('share')}}</text>
				</view>
				<u-icon name="arrow-right" color="#7A777A"></u-icon>
			</view>
		</view>
		<u-modal :value="showBackup" @confirm="confirmPassword" @cancel="showBackup = false" :show-cancel-button="true" title="请输入密文">
			<view class="enter-backup-password">
				<u-input v-model="password" type="password" class="enter-input" password-icon placeholder="密文"></u-input>
				<view class="message-tip">{{message}}</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		accAdd
	} from '@/common/utils.js';
	export default {
		data() {
			return {
				i18n: {
					zh: {
						identity: '身份/地址',
						mnemonic: "助记词",
						walletAccount: "钱包账户",
						gameAccount: "游戏账户",
						cunKuanBao: "存款宝",
						service: "客服",
						terms: "条款",
						termsOfService: "服务条款",
						version: "版本",
						share: "分享",
						backup: "备份",
					},
					en: {
						identity: 'Identity',
						mnemonic: "Mnemonic",
						walletAccount: "Wallet account",
						gameAccount: "Game account",
						cunKuanBao: "Cun Kuan Bao",
						service: "Service",
						terms: "Terms",
						termsOfService: "Terms of service",
						version: "Version",
						share: "Share",
						backup: "Backup"
					}
				},
				showBackup: false,
				password: '',
				message: '',
				userBalance: {
					amount: 0,
					gameAmount: 0,
					YBB: 0
				},
				totalAmount: 0,
				totalGameAmount: 0,
				totalYBB: 0,
			}
		},
		onLoad() {
			this.checkLogin();
		},
		onShow() {
			this.getAmountByCoinName();
			this.getUserAmount();
		},
		methods: {
			updateVersion() {
				console.log(plus.os.name)
				let isIOS = plus.os.name === 'iOS', version = plus.runtime.version;
				
				this.$u.api.getVersion(isIOS ? 2 : 1, version).then(res => {
					let data = res.data;
					if(data && data.status) {
						let openUrl = res.data.url;
						uni.showModal({
						    title: '更新提示',
						    content: res.data.content ? res.data.content : '是否选择更新',
						    success: (showResult) => {
						        if (showResult.confirm) {
						            plus.runtime.openURL(openUrl);
						        }
						    }
						})
					}else{
						this.$u.toast('已经是最新版本！');
					}
				})
			},
			openBackup() {
				this.showBackup = true;
				this.password = '';
				this.message = '';
			},
			getAmountByCoinName() {
				this.$u.api.getAmountByCoinName('GCN').then(res => {
					if(!res.data) return;
					this.userBalance.amount = res.data.amount;
					this.userBalance.gameAmount = res.data.gameAmount;
					this.userBalance.YBB = res.data.yubiBaoAmount;
				})
			},
			getUserAmount() {
				this.$u.api.getUserAmount().then(res => {
					this.list = res.data;
					let totalAmount = 0;
					let totalGameAmount = 0;
					//let totalUSDT = 0;
					let totalYBB = 0;
					res.data.forEach(v => {
						//let usdtAmount = v.usdtAmount || 0;
						let gameAmount = v.gameAmount || 0;
						let cnyAmount = v.cnyAmount || 0;
						let yubiBaoAmount = v.yubiBaoAmount || 0;
						
						totalAmount = accAdd(totalAmount, cnyAmount).toFixed(2); // 持有总USDT 相当于 GCN 的总资产
						totalGameAmount = accAdd(totalGameAmount, gameAmount); // GCN 资产
						//totalDigitalAmount = accAdd(totalDigitalAmount, usdtAmount).toFixed(2); // USDT 总资产
						totalYBB = accAdd(totalYBB, yubiBaoAmount);
					});
					this.totalAmount = totalAmount;
					this.totalGameAmount = totalGameAmount;
					this.totalYBB = totalYBB;
				}, res => {
					if (res.code === 401) {
						this.$u.vuex('vuex_hasLogin', false);
					}
				})
			},
			confirmPassword() {
				let password = this.password.trim();
				if(password === '') return;
				this.$u.post('/mnemonic/exportAccount', {
					password: this.password
				}).then(res => {
					this.showBackup = false;
					uni.navigateTo({
						url: '/pages/mnemonic/index?redirect='+decodeURIComponent('/pages/user/index')
					})
				},err => {
					this.message = err.msg;
				})
			},
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/'+ page
				})
			},
			checkLogin() {
				if (!this.vuex_hasLogin) {
					uni.navigateTo({
						url: '/pages/register/register'
					})
					return false;
				}
				return true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.enter-backup-password{
		padding: 40rpx;
		.enter-input{
			padding: 10px;
			border-bottom: 1px solid #f3f3f3;
		}
		.message-tip{
			font-size: 22rpx;
			padding: 10rpx;
			color: $uni-color-error;
		}
	}
	.user-center{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	.user-info{
		height: 250rpx;
		background-image: url(../../static/user-bg.png);
		background-size: cover;
		margin-bottom: 50rpx;
	}
	.user-name{
		margin-left: 15rpx;
		font-size: 30rpx;
		color: #333;
	}
	.cell-wrap{
		margin-top: 20rpx;
		background-color: #fff;
	}
	.cell-item{
		display: flex;
		flex-direction: row;
		height: 80rpx;
		align-items: center;
		padding: 0 30rpx;
		border-bottom: 2rpx solid #f3f3f3;
		justify-content: space-between;
	}
	.cell-item-label{
		flex-shrink: 0;
	}
	.cell-icon{
		width: 28rpx;
		height: 28rpx;
		vertical-align: middle;
	}
	.cell-text{
		font-size: 28rpx;
		margin-left: 20rpx;
		color: #333;
	}
	
	.cell-content{
		text-align: right;
		flex: 1;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	
	.backup{
		color: #4A9BFF;
	}
	.terms{
		color: #F2424A;
	}
	.version{
		color: #F2424A;
		font-size: 24rpx;
	}
	.address{
		color: #4A9BFF;
		word-break: break-word;
		text-align: left;
	}
	.balance{
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		color: #232323;
		.balance-num{
			font-size: 36rpx;
			font-weight: bold;
			margin-right: 10rpx;
		}
		.balance-unit{
			font-size: 24rpx;
		}
	}
</style>
