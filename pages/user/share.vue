<template>
	<view class="share">
		<view class="share-top">
			<image src="@/static/user/share-logo.png" class="share-logo"></image>
		</view>
		<view class="shard-download">
			<view class="shard-item">
				<view class="share-button" @click="download">
					<image src="../../static/android-icon.png" class="firm"></image>
					<text class="text">Android 下載</text>
				</view>
				<view class="copy-link" @click="copyAddress">復制地址</view>
			</view>
			<view class="shard-item" @click="download">
				<view class="share-button">
					<image src="../../static/apple-icon.png" class="firm"></image>
					<text class="text">IOS 下載</text>
				</view>
				<view class="copy-link" @click="copyAddress">復制地址</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				downloadLink: '',
				filePath: '',
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
				//let self = this;
				// uni.showToast({
				// 	title: "开始下载",
				// 	icon: "none",
				// 	duration: 2000
				// });
				plus.runtime.openURL(this.downloadLink)
				// uni.downloadFile({
				//     url: this.downloadLink, //仅为示例，并非真实的资源
				//     success: (res) => {
				// 		let path = plus.io.convertLocalFileSystemURL(res.tempFilePath);
				// 		  uni.showToast({
				// 			  title: "下载成功，文件保存在"+ path,
				// 			  icon: "none"
				// 		  });
				// 		// uni.saveFile({
				// 		//   tempFilePath: res.tempFilePath,
				// 		//   success: function (d) {
				// 		// 	  uni.showToast({
				// 		// 		  title: "下载成功，文件保存在"+ d.savedFilePath,
				// 		// 		  icon: "none"
				// 		// 	  });
				// 		//   }
				// 		// });
				//     },
				// 	fail : () => {
				// 		console.log('err')
				// 	}
				// });

				// plus.downloader.createDownload(this.downloadLink, {},
				// 	function(download, status) {
				// 		console.log(download)
				// 		// plus.io.resolveLocalFileSystemURL(download.filename, function(entry) {
				// 		// 	//console.log(JSON.stringify(entry))
				// 		// 	entry.getParent(function(entry) {
				// 		// 		console.log(entry.name)
				// 		// 		plus.console.log( "Parent Name: " + entry.name );
				// 		// 		entry.getDirectory(entry.name);
				// 		// 	})

				// 		// })
				// 		let path = plus.io.convertLocalFileSystemURL(download.filename);
				// 		uni.showToast({
				// 			title: "下载成功，文件保存在：" + path,
				// 			icon: "none",
				// 			duration: 4000
				// 		});
						
				// 		self.filePath = path;
				// 	}).start()
			}
		}
	}
</script>

<style lang="scss">
	.share {
		padding: 30rpx;

		.share-top {
			text-align: center;
			margin-top: 100rpx;
		}

		.share-logo {
			width: 230rpx;
			height: 230rpx;
		}

		.shard-download {
			margin-top: 280rpx;
			display: flex;
			flex-direction: column;
			align-items: center;


			.shard-item {
				display: flex;
				align-items: center;
				margin-bottom: 100rpx;

				.copy-link {
					margin-left: 40rpx;
					color: #7878DA;
				}
			}
		}

		.share-button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			width: 320rpx;
			background: url(../../static/button-bg.png) no-repeat;
			background-size: auto 100%;

			.firm {
				width: 40rpx;
				height: 44rpx;
			}

			.text {
				margin-left: 10rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
		
		.download-success{
			text-align: center;
		}
	}
</style>
