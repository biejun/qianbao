<template>
	<view class="common-bg zhuji-verify">
		<view class="zhuji-tip">
			请按顺序填写您备份的助记词
		</view>
		<view class="zhuji-cardWall">
			<view v-for="(item, index) in cards" class="zhuji-card">
				<view class="card-inner">
					<view class="card-no">{{index+1}}</view>
					<view class="card-input">
						<u-input v-model="item.value" placeholder=""/>
					</view>
				</view>
			</view>
		</view>
		<view class="verify-result">
			<image src="../../static/success.png" class="status-image"></image>
			<view class="status-text">助记词顺序正确!</view>
		</view>
<!-- 		<view class="verify-result">
			<image src="../../static/error.png" class="status-image"></image>
			<view class="status-text">助记词顺序错误，请重新输入!</view>
		</view> -->
		<u-modal @confirm="confirm" @cancel="show = false" :value="show" title="请输入密文" show-cancel-button>
			<view class="enter-password">
				<u-input v-model="password" type="password" password-icon placeholder="密文"></u-input>
				<view style="color: red">{{message}}</view>
			</view>
		</u-modal>
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
				show: false,
				password: '',
				message: ''
			}
		},
		created() {
		},
		methods: {
			submit() {
				this.show = true;
			},
			confirm() {
				let password = this.password.trim();
				if(password === '') return;
				this.$u.post('/mnemonic/loginAccount', {
					password,
					mnemonic: this.cards.map(v => v.value).join(' ')
				}).then(res => {
					uni.switchTab({
						url: '/'
					})
				})
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
						color: #555454;
					}
				}
			}
		}
		.submit-button{
			margin-top: 100rpx;
			font-size: 32rpx;
			background-color: #FFC000;
			color: #fff;
		}
		.verify-result{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 120rpx;
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