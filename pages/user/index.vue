<template>
	<view class="user-center">
		<view class="user-info">
			<!-- <view class="user-name">{{vuex_from.userName|| $t('nickName')}}</view> -->
		</view>
		<view class="cell-wrap">
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/location.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('identity')}}</text>
				</view>
				<view class="backup">
					备份
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/record.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('mnemonic')}}</text>
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/qianbao.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('walletAccount')}}</text>
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/youxi.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('gameAccount')}}</text>
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/yinhangka.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('cunKuanBao')}}</text>
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/kefu.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('service')}}</text>
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/term.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('terms')}}</text>
				</view>
			</view>
			<view class="cell-item" @click="goUrl('security')">
				<view>
					<image src="@/static/user/banben.png" class="cell-icon"></image>
					<text class="cell-text">{{$t('version')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
						version: "版本"
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
						version: "Version"
					}
				},
			}
		},
		onLoad() {
			this.checkLogin();
		},
		methods: {
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/user/'+ page
				})
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
		}
	}
</script>

<style lang="scss" scoped>
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
	
	.backup{
		color: #4A9BFF;
	}
</style>
