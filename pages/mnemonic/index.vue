<template>
	<view class="common-bg zhuji">
		<view class="zhuji-cardWall">
			<view v-for="(item, index) in cards" class="zhuji-card">
				<view class="card-inner">
					<view class="card-no">{{index+1}}</view>
					<view class="card-word">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="zhuji-tishi">
			<view>*{{$t('tip1')}}</view>
			<view>*{{$t('tip2')}}</view>
			<view>*{{$t('tip3')}}</view>
		</view>
		<button type="default" class="submit-button" @click="submit">{{$t('backups')}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cards: [],
				redirectUrl: '/pages/index/index',
				i18n: {
					zh: {
						tip1: "請按順序抄寫助記詞，確保備份正確無誤",
						tip2: "妥善保管助記詞至隔離網絡的安全地方",
						tip3: "請勿將助記詞在聯網環境中分享和存儲，避免惡意軟件竊取",
						backups: "備份",
						title: "私鑰的助記詞",
						helpText: "\ue614 身份/地址"
					},
					en: {
						tip1: "Please copy the mnemonics in order to ensure that the backup is correct",
						tip2: "Keep the mnemonics in a safe place on the isolated network",
						tip3: "Please do not share and store mnemonics in the network environment to avoid malicious software stealing",
						backups: "Backup",
						title: "Mnemonics",
						helpText: "\ue614 Identity/Address"
					}
				}
			}
		},
		onLoad(options) {
			this.redirectUrl = options.redirect || '/pages/index/index';
		},
		created() {
			if(this.vuex_mnemonic.length) {
				this.cards = this.vuex_mnemonic;
			}
			this.setNavBarTitle('title');
			// #ifdef APP-PLUS
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			currentWebview.setTitleNViewButtonStyle(0, {
				text: this.$t('helpText')
			})
			// #endif
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			if(e.index === 0) {
				uni.navigateTo({
					url: '/pages/register/learn-more'
				})
			}
		},
		methods: {
			submit() {
				let redirectUrl = this.redirectUrl;
				uni.navigateTo({
					url: './verify'+(redirectUrl ? '?redirect=' +decodeURIComponent(redirectUrl) : '')
				})
			},
			// confirm() {
			// 	let password = this.password.trim();
			// 	this.$u.post('mnemonic/exportAccount', {
			// 		password
			// 	}).then(res => {
			// 		console.log(res)
			// 		this.show = false
			// 		uni.switchTab({
			// 			url: '/'
			// 		})
			// 	}, err => {
			// 		this.message = err.msg;
			// 		console.log(err)
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.zhuji{
		padding: 30rpx;
		.zhuji-tip{
			font-size: 28rpx;
			color: #555454;
			padding: 10rpx 0;
			text-align: center;
		}
		.zhuji-cardWall{
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			
			.zhuji-card{
				padding: 4rpx;
				flex: 1 0 33.333%;
				
				.card-inner{
					position: relative;
					background-color: #EBEAFF;
					padding: 25rpx;
					height: 120rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.card-no{
						position: absolute;
						left: 20rpx;
						top: 15rpx;
						color: #212BFC;
						font-size: 22rpx;
					}
					.card-word{
						font-size: 26rpx;
						font-weight: bold;
						color: #555454;
					}
				}
			}
		}
		.submit-button{
			font-size: 32rpx;
			background-color: #FFC000;
			color: #fff;
			
			&:after{
				border-color: #FFC000;
			}
			
			&[disabled]{
				background-color: #F7DA79;
				border-color: #F7DA79;
				&:after{
					border-color: #F7DA79;
				}
			}
		}
		.zhuji-tishi{
			margin-top: 100rpx;
			padding: 30rpx 10rpx;
			color: #5B5959;
			font-size: 20rpx;
		}
		.enter-password{
			padding: 30rpx;
		}
	}
</style>
