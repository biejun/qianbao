<template>
	<view class="common-bg zhuji-verify">
		<view class="zhuji-tip">
			{{$t('tip3')}}
		</view>
		<view class="zhuji-cardWall">
			<view v-for="(item, index) in cards" class="zhuji-card">
				<view class="card-inner" 
				  :class="{ hasError: eqWord(item.value, index) || item.hasError }">
					<view class="card-no">{{index+1}}</view>
					<view class="card-input">
						<u-input v-model="item.value" @click="item.hasError = false" placeholder="" input-align="center" :clearable="false"/>
					</view>
				</view>
			</view>
		</view>
		<view class="verify-wrap">
			<view v-show="status === 1" class="verify-result">
				<image src="../../static/success.png" class="status-image"></image>
				<view class="status-text">{{$t('tip4')}}</view>
			</view>
			<view v-show="status === 2" class="verify-result">
				<image src="../../static/error.png" class="status-image"></image>
				<view class="status-text">{{$t('tip5')}}</view>
			</view>
		</view>
<!-- 		<u-modal v-model="show" title="请输入密文" :show-confirm-button="false">
			<view class="enter-password">
				<u-input v-model="password" type="password" password-icon placeholder="密文"></u-input>
				<view style="color: red">{{message}}</view>
			</view>
		</u-modal> -->
		<button type="default" class="submit-button" @click="submit">
			{{$t('ok')}}
		</button>
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
				status: 0,
				redirectUrl: '/pages/index/index',
				i18n: {
					zh: {
						title: "驗證您備份的助記詞",
						tip3: "請按順序填寫您備份的助記詞",
						ok:"確認備份",
						tip4: "助記詞正確!",
						tip5: "助記詞錯誤，請重新輸入",
						helpText: "\ue614 身份/地址"
					},
					en: {
						title: "Verify your backup mnemonics",
						tip3: "Please fill in the mnemonics of your backup in order",
						ok:"Confirm backup",
						tip4: "The mnemonics are correct!",
						tip5:"Mnemonic error, please re-enter",
						helpText: "\ue614 Identity/Address"
					}
				}
			}
		},
		onLoad(options) {
			this.redirectUrl = options.redirect || '/pages/index/index';
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
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			if(e.index === 0) {
				uni.navigateTo({
					url: '/pages/register/learn-more'
				})
			}
		},
		methods: {
			eqWord(val, index) {
				val = val.trim();
				let word = this.vuex_mnemonic[index];
				let isUndef = typeof word === 'undefined';
				if(isUndef) return false;
				let wordLen = word.length, valLen = val.length;
				return valLen >= wordLen && word.toLowerCase() != val.toLowerCase();
			},
			// 比对两个数组
			equals(arr1, arr2) {
			  if (!arr2) return false;
			  if (arr1.length != arr2.length) return false;
			  let status = true;
			  for (let i = 0, l = arr1.length; i < l; i++) {
				if (arr1[i] != arr2[i]) {
					this.cards[i].hasError = true;
					status = false;
				}
			  }
			  return status;
			},
			submit() {
				let storeMnemonic = this.vuex_mnemonic;
				let inputMnemonic = this.cards.map(v => v.value.trim());
				if(this.equals(storeMnemonic, inputMnemonic)) {
					try{
						this.$u.vuex('vuex_hasLogin', true);
					}catch(e) {
						
					}
					this.status = 1;
					setTimeout(() => {
						uni.switchTab({
							url: this.redirectUrl
						})
					}, 400)
				}else{
					this.status = 2;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zhuji-verify{
		padding: 30rpx;
		
		.enter-password{
			padding: 30rpx;
		}
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
					.card-input{
						margin-top: 20rpx;
						font-size: 26rpx;
						font-weight: bold;
						text-align: center;
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
			margin-top: 50rpx;
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
		.verify-wrap{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 280rpx;
		}
		.verify-result{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.status-image{
				width: 140rpx;
				height: 158rpx;
			}
			.status-text{
				margin-top: 15rpx;
				color: #F1333D;
				font-size: 30rpx;
			}
		}
	}
</style>