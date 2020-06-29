<template>
	<view class="user-center">
		<view class="user-info" @click="goUrl('profile')">
      <u-avatar :src="vuex_img" size="mini"></u-avatar>
			<view class="user-name">{{vuex_from.userName|| $t('nickName')}}</view>
		</view>
		<view class="cell-wrap">
			<view class="cell-item" @click="goUrl('security')">
				<image src="@/static/index/userCenter/icon_anqian.png" class="cell-icon"></image>
				<text class="cell-text">{{$t('security')}}</text>
			</view>
			<view class="cell-item" @click="goUrl('service')">
				<image src="@/static/index/userCenter/icon_kefu.png" class="cell-icon"></image>
				<text class="cell-text">{{$t('service')}}</text>
			</view>
			<view class="cell-item" @click="goUrl('setting')">
				<image src="@/static/index/userCenter/icon_shezhi.png" class="cell-icon"></image>
				<text class="cell-text">{{$t('setting')}}</text>
			</view>
<!--      <view class="cell-item" @click="goUrl('setting')">
      	<image src="@/static/index/userCenter/icon_anqian.png" class="cell-icon"></image>
      	<text class="cell-text">分享</text>
      </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				i18n: {
					zh: {
						nickName: '昵称',
						security: "安全",
						service: "客服",
						setting: "设置",
					},
					en: {
						nickName: 'Nick Name',
						security: "Security",
						service: "Service",
						setting: "Setting"
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
		background-color: #f3f3f3;
	}
	.user-info{
    display: flex;
    align-items: center;
	background-color: #fff;
	padding: 30rpx;
	}
	.user-name{
		margin-left: 15rpx;
		font-size: 30rpx;
		color: #333;
	}
	.cell-wrap{
		border-top-color: #F3F3F3;
		border-top-width: 2rpx;
		border-top-style: solid;
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
	}
	.cell-icon{
		width: 44rpx;
		height: 44rpx;
    vertical-align: middle;
	}
	.cell-text{
		font-size: 28rpx;
		margin-left: 20rpx;
		color: #333;
	}
</style>
