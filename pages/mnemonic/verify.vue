<template>
	<view class="common-bg zhuji-verify">
		<view class="zhuji-tip">
			请按顺序填写您备份的助记词
		</view>
		<view class="zhuji-cardWall">
			<view v-for="(item, index) in cards" class="zhuji-card">
				<view class="card-inner" 
				  :class="{ hasError: eqWord(item.value, index) }">
					<view class="card-no">{{index+1}}</view>
					<view class="card-input">
						<u-input v-model="item.value" placeholder="" input-align="center" :clearable="false"/>
					</view>
				</view>
			</view>
		</view>
		<view class="verify-wrap">
			<view v-show="status === 1" class="verify-result">
				<image src="../../static/success.png" class="status-image"></image>
				<view class="status-text">助记词顺序正确!</view>
			</view>
			<view v-show="status === 2" class="verify-result">
				<image src="../../static/error.png" class="status-image"></image>
				<view class="status-text">助记词顺序错误，请重新输入!</view>
			</view>
		</view>
<!-- 		<u-modal v-model="show" title="请输入密文" :show-confirm-button="false">
			<view class="enter-password">
				<u-input v-model="password" type="password" password-icon placeholder="密文"></u-input>
				<view style="color: red">{{message}}</view>
			</view>
		</u-modal> -->
		<button type="default" class="submit-button" @click="submit">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cards: new Array(12).fill('').map(v => {
					return {
						value : ''
					};
				}),
				status: 0,
				redirectUrl: '/pages/index/index'
			}
		},
		onLoad(options) {
			this.redirectUrl = options.redirect || '/pages/index/index';
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
				let word = this.vuex_mnemonic[index];
				let isUndef = typeof word === 'undefined';
				if(isUndef) return false;
				let wordLen = word.length, valLen = val.trim().length;
				return valLen >= wordLen && word !== val;
			},
			submit() {
				let storeMnemonicStr = this.vuex_mnemonic.join(' ');
				let inputMnemonicStr = this.cards.map(v => v.value.trim() ).join(' ');
				if(storeMnemonicStr === inputMnemonicStr) {
					this.$u.vuex('vuex_hasLogin', true);
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