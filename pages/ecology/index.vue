<template>
	<view class="ecology-index">
		<view>
			<u-swiper :list="list" :border-radius="30" @click="openImageDetail"></u-swiper>
		</view>
		<view class="app-list">
			<view class="app-list-title">
				<view class="title-span"></view>
				<view class="title-text">{{$t('game')}}</view>
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
				<view class="title-text">{{$t('thirdPartyApplications')}}</view>
			</view>
			<view class="app-list-wrap">
				<view class="app-item" @click="navito('token.im/')">
					<image src="https://s2.bqiapp.com/image/20181123/e6c37980_b777_430f_b86e_c893ccfd4803.png" class="app-item-img"></image>
					<text class="app-item-text">imToken</text>
				</view>
				<view class="app-item" @click="navito('www.huobi.me/zh-cn/')">
					<image src="https://s2.bqiapp.com/logo/2/huobipro.png" class="app-item-img"></image>
					<text class="app-item-text">火币全球站</text>
				</view>
				<view class="app-item" @click="navito('www.huobi.me/zh-cn/')">
					<image src="https://s2.bqiapp.com/images/site/coindesk_com.png" class="app-item-img"></image>
					<text class="app-item-text">Coindesk</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					image: '../../static/index/banner.png'
				}],
				i18n: {
					zh: {
						game: '游戏',
						thirdPartyApplications: "第三方应用"
					},
					en: {
						game: 'Game',
						thirdPartyApplications: "Third Party Applications"
					}
				},
			}
		},
		methods: {
			navito(e) {
				plus.runtime.openURL('https://' + e);
				// window.location.href = 'https://' + e

			},
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
	.app-item-img {
		border-radius: 50% !important;
	}

	.ecology-index {
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

		.app-list {
			padding: 30rpx 0;
			border-bottom: 2rpx solid #F3F3F3;

			.app-list-title {
				display: flex;
				align-items: center;

				.title-span {
					width: 6rpx;
					height: 28rpx;
					background: linear-gradient(0deg, rgba(241, 51, 63, 1) 0%, rgba(240, 90, 80, 1) 100%);
					margin-right: 20rpx;
				}

				.title-text {
					font-size: 34rpx;
					color: #333;
				}
			}

			.app-list-wrap {
				display: flex;
				justify-content: space-between;

				.app-item {
					text-align: center;
					flex-basis: 150rpx;
					margin-top: 20rpx;

					&-img {
						width: 145rpx;
						height: 145rpx;
					}

					&-text {
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
