<template>
	<view class="common-bg create-id">
		<view class="create-DFEBV">您将会拥有区块链身份和身份下的多链钱包， 比如BTC、ETH、USDT、GCN…</view>
		<view class="create-YUS2">
			<view class="input-D3GZ">密文</view>
			<view class="input-DDEW">
				<u-input v-model="password" type="password" password-icon/>
			</view>
		</view>
		<view class="create-tips">密文尽量简短，易记，如：〞区块玩家〞，密文关系到货币转账安全，请妥善保存和记忆!</view>
		<button type="default" class="submit-button" @click="submit">创建</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				password: ''
			}
		},
		methods: {
			submit() {
				let password = this.password.trim();
				if(password === '') return;
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
				})

			}
		}
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
	}
</style>
