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
			<view>*请按顺序抄写助记词，确保备份正确无误</view>
			<view>*妥善保管助记词至隔离网络的安全地方</view>
			<view>*请勿将助记词在联网环境中分享和存储，避免恶意软件窃取</view>
		</view>
		<button type="default" class="submit-button" @click="submit">确认备份</button>
		<u-modal @confirm="confirm" @cancel="show = false" :value="show" title="请输入密文" show-cancel-button>
			<view class="enter-password">
				<u-input v-model="password" type="password" password-icon placeholder="密文"></u-input>
				<view style="color: red">{{message}}</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cards: [],
				show: false,
				password: '',
				message: ''
			}
		},
		created() {
			if(this.vuex_mnemonic.length) {
				this.cards = this.vuex_mnemonic;
			}
		},
		methods: {
			submit() {
				this.show = true;
			},
			confirm() {
				let password = this.password.trim();
				this.$u.post('mnemonic/exportAccount', {
					password
				}).then(res => {
					console.log(res)
					this.show = false
					uni.switchTab({
						url: '/'
					})
				}, err => {
					this.message = err.msg;
					console.log(err)
				})
			}
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
