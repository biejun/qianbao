<style lang="scss">
	.swiper{
		height: 480rpx;
		margin-top: 60rpx;
		
		.swiper-item{
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		
		.swiper-image{
			width: 440rpx;
			height: 360rpx;
			margin-bottom: 10rpx;
		}
		.swiper-text{
			font-size: 36rpx;
			color: #636363;
		}
		
		
		/deep/ .uni-swiper-dot{
			background-color: #E7D181;
			margin-right: 40rpx;
			transition: all .3s;
		}
				
		/deep/ .uni-swiper-dot-active{
			background-color: #D1AF5E;
			width: 35rpx;
			border-radius: 16rpx;
		}

		
	}
	.register-entry{
		padding: 30rpx;
		
		.entry-wrap{
			margin-top: 90rpx;
			padding: 30rpx;
		}
		
		.entry-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border: 1px solid #f3f3f3;
			padding: 30rpx;
			margin-bottom: 50rpx;
			
			.item-title{
				font-size: 36rpx;
			}
			.item-meta{
				color: #A5A5A5;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				
				.right-arrow{
					width: 20rpx;
					height: 32rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.welcome{
		position: absolute;
		top: 260rpx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		
		.welcome-logo{
			width: 190rpx;
			height: 180rpx;
		}
	}
</style>

<template>
	<view class="register-entry">
		<swiper v-if="!vuex_hasLogin" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in intro">
				<view class="swiper-item">
					<image :src="item.image" class="swiper-image"></image>
					<view class="swiper-text">{{item.title}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="!vuex_hasLogin" class="entry-wrap">
			<view class="entry-item" @click="goUrl('register/create-id')">
				<view class="item-title">
					{{$t('CreateAddress')}}
				</view>
				<view class="item-meta">
					<view>{{$t('FirstCreate')}}</view>
					<image src="../../static/register/youjiantou.png" class="right-arrow"></image>
				</view>
			</view>
			<view class="entry-item" @click="goUrl('register/restore-id')">
				<view class="item-title">
					{{$t('RestoreAddress')}}
				</view>
				<view class="item-meta">
					<view>{{$t('AlreadyAddress')}}</view>
					<image src="../../static/register/youjiantou.png" class="right-arrow"></image>
				</view>
			</view>
		</view>
		<view v-if="vuex_hasLogin" class="welcome">
			<image src="/static/logo.png" class="welcome-logo"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intro: [
					{
						image: '../../static/register/tu1.png',
						title: '區塊鏈資金池'
					},
					{
						image: '../../static/register/tu2.png',
						title: '公開 公平 公正'
					},
					{
						image: '../../static/register/tu3.png',
						title: '交易便捷 秒存 秒取'
					},
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				i18n: {
					zh: {
						CreateAddress: "創建身份/地址",
						FirstCreate: "第壹次創建區塊鏈身份",
						RestoreAddress: "恢復身份/地址",
						AlreadyAddress: "已擁有區塊鏈身份"
					},
					en: {
						CreateAddress: 'Create identity/address',
						FirstCreate: "Create blockchain identity for the first time",
						RestoreAddress: "Restore identity/address",
						AlreadyAddress: "Already own blockchain identity"
					}
				},
			}
		},
		methods: {
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/' + page
				})
			},
		}
	}
</script>

<style>

</style>
