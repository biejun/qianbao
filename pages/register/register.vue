<style lang="scss">
	.swiper{
		height: 380rpx;
		margin-top: 80rpx;
		
		.swiper-item{
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		
		.swiper-image{
			width: 320rpx;
			height: 260rpx;
			margin-bottom: 10rpx;
		}
		.swiper-text{
			font-size: 36rpx;
			color: #636363;
		}
				
		/deep/ .uni-swiper-dot-active{
			background-color: #D3B05E;
			width: 35rpx;
			border-radius: 16rpx;
		}
	}
	.register-entry{
		padding: 30rpx;
		
		.entry-wrap{
			margin-top: 120rpx;
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
</style>

<template>
	<view class="register-entry">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in intro">
				<view class="swiper-item">
					<image :src="item.image" class="swiper-image"></image>
					<view class="swiper-text">{{item.title}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="entry-wrap">
			<view class="entry-item" @click="goUrl('new-register/create-id')">
				<view class="item-title">
					创建身份/地址
				</view>
				<view class="item-meta">
					<view>第一次创建区块链身份</view>
					<image src="../../static/register/youjiantou.png" class="right-arrow"></image>
				</view>
			</view>
			<view class="entry-item">
				<view class="item-title">
					恢复身份/地址
				</view>
				<view class="item-meta">
					<view>已拥有区块链身份</view>
					<image src="../../static/register/youjiantou.png" class="right-arrow"></image>
				</view>
			</view>
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
						title: '区块链资金池'
					},
					{
						image: '../../static/register/tu2.png',
						title: '公开 公平 公正'
					},
					{
						image: '../../static/register/tu3.png',
						title: '交易便捷 秒存 秒取'
					},
				],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500
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
