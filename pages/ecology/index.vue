<template>
	<view class="ecology-index">
		<view>
			<u-swiper :list="list" :border-radius="30" @click="openImageDetail"></u-swiper>
		</view>
		<view class="app-list">
			<view class="app-list-title">
				<view class="title-span"></view>
				<view class="title-text">游戏</view>
			</view>
			<view class="app-list-wrap">
				<view class="app-item" @click="goUrl('lecai')">
					<image src="../../static/icon_haxi.png" class="app-item-img"></image>
					<text class="app-item-text">哈希乐彩</text>
				</view>
			</view>
		</view>
		<view class="app-list">
			<view class="app-list-title">
				<view class="title-span"></view>
				<view class="title-text">第三方应用</view>
			</view>
			<view class="app-list-wrap">
				<view class="app-item">
					<image src="../../static/icon_haxi.png" class="app-item-img"></image>
					<text class="app-item-text">哈希乐彩</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: [
					{
						image: 'https://ossspu.oss-cn-hongkong.aliyuncs.com/shop/2ba1e87f-f04e-40b5-8d99-63e035a9d752.jpg'
					}
				]
			}
		},
		methods: {
			openImageDetail() {
				
			},
			goUrl(page) {
				uni.navigateTo({
					url: 'lecai/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.ecology-index{
		padding: 30rpx;
		.banner {
			padding: 20rpx 0;
		
			.swiper-item {
				border-radius: 30rpx;
		
				image {
					width: 690rpx;
					height: 350rpx;
					border-radius: 30rpx;
				}
			}
		}
		.app-list{
			padding: 30rpx 0;
			border-bottom: 2rpx solid #F3F3F3;
			
			.app-list-title{
				display: flex;
				align-items: center;
				.title-span{
					width: 6rpx;
					height: 28rpx;
					background:linear-gradient(0deg,rgba(241,51,63,1) 0%,rgba(240,90,80,1) 100%);
					margin-right: 20rpx;
				}
				.title-text{
					font-size: 34rpx;
					color: #333;
				}
			}
			
			.app-list-wrap{
				display: flex;
				
				.app-item{
					text-align: center;
					flex-basis: 150rpx;
					margin-top: 20rpx;
					
					&-img{
						width: 145rpx;
						height: 145rpx;
					}
					
					&-text{
						font-size: 30rpx;
						color: #333;
						font-weight: 500;
						margin-top: 20rpx;
					}
				}
			}
		}
	}

</style>
