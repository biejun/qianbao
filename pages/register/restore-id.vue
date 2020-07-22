<template>
	<view class="common-bg restore-page">
		<view class="create-id">
			<view class="create-DFEBV">您将会拥有区块链身份和身份下的多链钱包， 比如BTC、ETH、USDT、GCN…</view>
			<view class="create-YUS2">
				<view class="input-D3GZ">密文</view>
				<view class="input-DDEW">
					<u-input v-model="password" type="password" password-icon/>
				</view>
			</view>
			<view class="create-tips">密文尽量简短，易记，如：〞区块玩家〞，密文关系到货币转账安全，请妥善保存和记忆!</view>
		</view>
		<view class="zhuji">
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
<!-- 			<view class="verify-result">
				<image src="../../static/success.png" class="status-image"></image>
				<view class="status-text">助记词顺序正确!</view>
			</view>
			<view class="verify-result">
				<image src="../../static/error.png" class="status-image"></image>
				<view class="status-text">助记词顺序错误，请重新输入!</view>
			</view> -->
			<button type="default" class="submit-button" @click="submit">确认</button>
		</view>
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
				password: ''
			}
		},
		methods: {
			submit() {
				let password = this.password.trim();
				if(password === '') return;
				this.$u.post('/mnemonic/importAccount', {
					password,
					mnemonic: this.cards.map(v => v.value).join(' ')
				}).then(res => {
					uni.switchTab({
						url: '/'
					})
				}, err => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.restore-page{
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
				margin-top: 60rpx;
				font-size: 32rpx;
				background-color: #FFC000;
				color: #fff;
			}
		}
	}
</style>
