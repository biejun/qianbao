<template>
	<view class="common-bg create-id">
		<view class="create-DFEBV">{{$t('tip1')}}</view>
		<view class="create-YUS2">
			<view class="input-D3GZ">{{$t('ciphertext')}}</view>
			<view class="input-DDEW">
				<u-input v-model="password" placeholder="" type="password" password-icon/>
			</view>
		</view>
		<view class="create-tips">{{$t('tip2')}}</view>
		<button type="default" class="submit-button" :disabled="isSubmit" @click="submit">
			{{isSubmit ? $t('Creating') : $t('create')}}</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				password: '',
				isSubmit: false,
				i18n: {
					zh: {
						title: "創建身份/地址",
						tip1: "您將會擁有區塊鏈身份和身份下的多鏈錢包， 比如BTC、ETH、USDT、GCN…",
						ciphertext: "密文",
						tip2: "密文盡量簡短，易記，如：“區塊玩家”，密文關系到貨幣轉賬安全，請妥善保存和記憶!",
						tip3: "請按順序填寫您備份的助記詞",
						ok:"確認",
						tip4: "創建身份完成",
						tip5: "助記詞錯誤，請重新輸入",
						create: "創建",
						Creating:"創建中..",
						helpText: "\ue614 身份/地址"
					},
					en: {
						title: "Create",
						tip1: "You will have the blockchain identity and Multi Chain Wallet under the identity, such as BTC, ETH, usdt, GCN",
						ciphertext: "Ciphertext",
						tip2: "Ciphertext should be as short as possible and easy to remember, such as: \"block player\". Ciphertext is related to the security of money transfer, please keep and remember it properly!",
						tip3: "Please fill in the mnemonics of your backup in order",
						ok:"Confirm",
						tip4: "Restore identity complete",
						tip5:"Mnemonic error, please re-enter",
						create: "Create",
						Creating:"Creating",
						helpText: "\ue614 Identity/Address"
					}
				}
			}
		},
		created() {
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
		methods: {
			submit() {
				let password = this.password.trim();
				if(password === '') return;
				if(this.isSubmit) {
					return;
				}else{
					this.isSubmit = true;
				}
				this.$u.post('/mnemonic/createAccount', {
					password: this.password
				}).then(res => {
					this.$u.vuex('vuex_mnemonic', res.data.mnemonic.split(' '))
					this.$u.vuex('vuex_privateKey', res.data.privateKey)
					this.$u.vuex('vuex_token', res.data.token)
					this.$u.vuex('vuex_address', res.data.address)
					console.log(res)
					uni.navigateTo({
						url: '/pages/register/create-success'
					})
					this.isSubmit = false;
				},err => {
					this.isSubmit = false;
				})

			}
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			if(e.index === 0) {
				uni.navigateTo({
					url: './learn-more'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.create-id{
		padding: 30rpx;
	}
	.create-tips{
		font-size: 24rpx;
		color: #5A5A5A;
	}
	.create-DFEBV{
		font-size: 34rpx;
		padding: 30rpx 0;
	}
	.create-YUS2{
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		
		.input-D3GZ{
			margin-right: 10rpx;
			color: #333;
			font-size: 34rpx;
		}
		
		.input-DDEW{
			flex: 1 1 500rpx;
			background-color: #fff;
			padding: 8rpx 30rpx;
		}
	}
	.submit-button{
		position: absolute;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
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
</style>
