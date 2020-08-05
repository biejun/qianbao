<template>
	<view class="common-bg restore-page">
		<view class="create-id">
			<view class="create-DFEBV">{{$t('tip1')}}</view>
			<view class="create-YUS2">
				<view class="input-D3GZ">{{$t('ciphertext')}}</view>
				<view class="input-DDEW">
					<u-input v-model="password" placeholder="" type="password"></u-input>
				</view>
			</view>
			<view class="create-tips">{{$t('tip2')}}</view>
		</view>
		<view class="zhuji">
			<view class="zhuji-tip">
				{{$t('tip3')}}
			</view>
			<view class="zhuji-cardWall">
				<view v-for="(item, index) in cards" class="zhuji-card">
					<view class="card-inner" :class="{ hasError: item.hasError }">
						<view class="card-no">{{index+1}}</view>
						<view class="card-input">
							<u-input v-model="item.value" :cursor-spacing="index < 3 ? 300 : index < 7 ? 200 : 120" placeholder="" input-align="center" :clearable="false"  @focus="item.hasError = false"/>
						</view>
					</view>
				</view>
			</view>
			<button type="default" class="submit-button" :disabled="password===''" @click="submit">{{$t('ok')}}</button>
			<u-modal v-model="show" title="" :show-confirm-button="false" mask-close-able>
				<view class="restore-res">
					<view v-show="statusMsg.type === 1" class="verify-result">
						<image src="../../static/success.png" class="status-image"></image>
						<view class="status-text">{{$t('tip4')}}</view>
					</view>
					<view v-show="statusMsg.type === 2" class="verify-result">
						<image src="../../static/error.png" class="status-image"></image>
						<view class="status-text">{{statusMsg.msg}}</view>
					</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cards: new Array(12).fill('').map(v => {
					return {
						value : '',
						hasError: false
					};
				}),
				password: '',
				show: false,
				statusMsg: {
					type: 0,
					msg: ''
				},
				i18n: {
					zh: {
						title: "恢復身份/地址",
						tip1: "您將會擁有區塊鏈身份和身份下的多鏈錢包， 比如BTC、ETH、USDT、GCN…",
						ciphertext: "密文",
						tip2: "密文盡量簡短，易記，如：“區塊玩家”，密文關系到貨幣轉賬安全，請妥善保存和記憶!",
						tip3: "請按順序填寫您備份的助記詞",
						ok:"確認",
						tip4: "恢復身份完成",
						tip5: "助記詞錯誤，請重新輸入"
					},
					en: {
						title: "Restore identity / address",
						tip1: "You will have the blockchain identity and Multi Chain Wallet under the identity, such as BTC, ETH, usdt, GCN",
						ciphertext: "Ciphertext",
						tip2: "Ciphertext should be as short as possible and easy to remember, such as: \"block player\". Ciphertext is related to the security of money transfer, please keep and remember it properly!",
						tip3: "Please fill in the mnemonics of your backup in order",
						ok:"Confirm",
						tip4: "Restore identity complete",
						tip5:"Mnemonic error, please re-enter"
					}
				}
			}
		},
		created() {
			this.setNavBarTitle('title');
		},
		methods: {
			handleInput(item) {
				if(item.hasError) {
					item.hasError = false;
				}
			},
			submit() {
				let password = this.password.trim();
				if(password === '') return;
				let status = true;
				this.cards.forEach((v, i) => {
					let val = v.value.trim();
					if(val === '') {
						this.cards[i].hasError = true;
						status = false;
					}
				})
				if(!status) return;
				this.$u.post('/mnemonic/importAccount', {
					password,
					mnemonic: this.cards.map(v => v.value.trim()).join(' ')
				}).then(res => {
					this.$u.vuex('vuex_mnemonic', res.data.mnemonic.split(' '))
					this.$u.vuex('vuex_privateKey', res.data.privateKey)
					this.$u.vuex('vuex_token', res.data.token)
					this.$u.vuex('vuex_address', res.data.address)
					this.$u.vuex('vuex_hasLogin', true);
					this.show = true;
					this.statusMsg = {
						type: 1,
						msg: 'err.msg'
					},
					setTimeout(() => {
						this.show = false;
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 800)
				}, err => {
					this.show = true
					this.statusMsg = {
						type: 2,
						msg: err.msg
					},
					this.password = '';
					setTimeout(() => {
						this.show = false;
					}, 2000);
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

<style lang="scss">
	.restore-page{
		.restore-res{
			padding-bottom: 50rpx;
			.verify-result{
				display: flex;
				flex-direction: column;
				align-items: center;
				.status-image{
					width: 140rpx;
					height: 158rpx;
				}
				.status-text{
					margin-top: 15rpx;
					color: #333;
					font-size: 30rpx;
				}
			}
		}
		.create-id{
			padding: 20rpx 30rpx;
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
		}
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
						height: 120rpx;
						
						.card-no{
							position: absolute;
							left: 20rpx;
							top: 15rpx;
							color: #212BFC;
							font-size: 22rpx;
						}
						.card-input{
							font-size: 26rpx;
							font-weight: bold;
							text-align: center;
							padding: 0 12rpx;
							
							/deep/ .u-input__input{
								padding-top: 15px;
							}
						}
						
						&.hasError{
							background-color: #f9e6e6;
							
							.card-input{
								/deep/ .u-input__input{
									color: #cb6a6a;
								}
							}
						}
					}
				}
			}
			.submit-button{
				margin-top: 60rpx;
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
		}
	}
</style>
