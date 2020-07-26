<template>
	<view class="share">
		<view class="share-top">
			<image src="@/static/user/share-logo.png" class="share-logo"></image>
		</view>
		<view class="shard-download">
			<view class="shard-item">
				<view class="share-button" @click="download">
					<image src="../../static/android-icon.png" class="firm"></image>
					<text class="text">Android 下载</text>
				</view>
				<view class="copy-link" @click="copyAddress">复制地址</view>
			</view>
			<view class="shard-item">
				<view class="share-button">
					<image src="../../static/apple-icon.png" class="firm"></image>
					<text class="text">IOS 下载</text>
				</view>
				<view class="copy-link" @click="copyAddress">复制地址</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return {
				downloadLink: '',
				i18n: {
					zh: {
						copySuccess: "复制成功"
					},
					en: {
						copySuccess: "Copied!"
					}
				}
			}
		},
		created() {
			this.getDownloadLink();
		},
		methods: {
			getDownloadLink() {
				this.$u.api.getUserInvite(1).then(res => {
					this.downloadLink = res.data;
				})
			},
			copyAddress() {
				uni.setClipboardData({
					data: this.downloadLink,
					success() {
						this.$u.toast(this.$t('copySuccess'));
					}
				});
			},
			download() {
				uni.downloadFile({
				    url: this.downloadLink, //仅为示例，并非真实的资源
				    success: (res) => {
				        if (res.code === 200) {
				            
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.share{
		padding: 30rpx;
		
		.share-top{
			text-align: center;
			margin-top: 100rpx;
		}
		.share-logo{
			
			width: 180rpx;
			height: 180rpx;
		}
		.shard-download{
			margin-top: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			
			.shard-item{
				display: flex;
				align-items: center;
				margin-bottom: 50rpx;
				
				.copy-link{
					margin-left: 40rpx;
					color: #7878DA;
				}
			}
		}
		
		.share-button{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			width: 320rpx;
			background: url(../../static/button-bg.png) no-repeat;
			background-size: auto 100%;
			
			.firm{
				width: 40rpx;
				height: 44rpx;
			}
			.text{
				margin-left: 10rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>
