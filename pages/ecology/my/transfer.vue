<template>
	<div class="transfer-page">
		<div class="transfer-child-title">{{$t('SelectCurrency')}}</div>
		<view class="current-coin">
			<image src="../../../static/index/content/icon_gcn.png" mode="" class="coin-icon"></image>
			<view class="coin-name">GCN</view>
		</view>
		<div class="transfer-child-title">{{$t('Chooseanaccount')}}</div>
		<div class="transfer-wrap">
			<div class="transfer-item">
				<span class="transfer-name">{{$t('From')}}</span>
				<span>{{isReverse ? $t('gameAccount') : $t('digitalAccount')}}</span>
			</div>
			<div class="transfer-item">
				<span class="transfer-name">{{$t('To')}}</span>
				<span>{{isReverse ? $t('digitalAccount') : $t('gameAccount')}}</span>
			</div>
		</div>
		<div class="transfer-child-title">{{$t('Quantity')}}</div>
		<div class="transfer-num-wrap">
			<input type="text" class="transfer-num" v-model="exchangeNum" :placeholder="$t('Exchangequantity')">
		</div>
		<div class="transfer-child-title">{{$t('Currentlyavailable')}} <span class="transfer-balance">{{sunCount}}</span>
			<text class="all-in" @click="allIn">{{$t('All')}}</text></div>
		<u-button type="error" class="submitBtn" @click="exchange">{{$t('Transfer')}}</u-button>
		<u-toast ref="uToast" />
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				isReverse: false,
				exchangeNum: 0,
				sunCount: 0,
				i18n: {
					zh: {
						SelectCurrency: "选择币种",
						Chooseanaccount: "选择账户",
						Quantity:"数量",
						From: "从",
						To: "到",
						digitalAccount: '数字账户',
						gameAccount: "游戏账户",
						Currentlyavailable: "当前可用",
						All: "全部",
						Transfer:"划转",
						Exchangequantity: "兑换数量",
						trOut: "转出成功",
						trIn: "转入成功"
					},
					en: {
						SelectCurrency: "Select currency",
						Chooseanaccount: "Choose an account",
						Quantity:"Quantity",
						From: "From",
						To: "To",
						digitalAccount: "Digital Account",
						gameAccount: "Game Account",
						Currentlyavailable: "Currently available",
						All: "All",
						Transfer: "Transfer",
						Exchangequantity: "Exchange quantity",
						trOut: "Transfer out successfully",
						trIn: "Transfer to success"
					}
				},
			}
		},
		onLoad(options) {
			this.isReverse = Boolean(options.isReverse);
			this.sunCount = options.amount;
		},
		methods: {
			allIn() {
				this.exchangeNum = this.sunCount;
			},
			exchange() {
				this.$u.post('/uUserAccount/exchangeAmount', {
					coinName: 'GCN',
					exchangeAmount: this.exchangeNum,
					exchangeType: this.isReverse ? 2 : 1
				}).then(res => {
					this.$refs.uToast.show({
						title: this.isReverse ? this.$t('trOut') : this.$t('trIn'),
						type: 'success',
					})
				}, err => {
					this.$refs.uToast.show({
						title: err.msg,
						type: 'error',
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.transfer-page{
		padding: 30px;
		
		.all-in{
			color: blue;
		}
		
		.current-coin{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #f3f3f3;
			
			.coin-icon{
				width: 80rpx;
				height: 80rpx;
			}
			.coin-name{
				margin-left: 30rpx;
				font-size: 30rpx;
			}
		}
		
		.transfer-wrap{
			position: relative;
			border: 2rpx solid #f3f3f3;
			border-radius: 4rpx;
			margin-bottom: 40rpx;
			margin-top: 20rpx;
			
			&::after{
				position: absolute;
				content: "";
				top: 80rpx;
				height: 2rpx;
				left: 60rpx;
				right: 10rpx;
				background-color: #f3f3f3;
			}
			
			.transfer-item{
				position: relative;
				padding: 0 30rpx 0 80rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #555;
				
				&:first-child{
					&::before{
						position: absolute;
						content: "";
						left: 30rpx;
						top: 30rpx;
						width: 20rpx;
						height: 20rpx;
						background-color: #A5A5A5;
						border-radius: 50%;
					}
				}
				
				&:last-child{
					&::before{
						position: absolute;
						content: "";
						left: 30rpx;
						top: 30rpx;
						width: 20rpx;
						height: 20rpx;
						background-color: $uni-color-error;
						border-radius: 50%;
					}
				}
				
				.transfer-name{
					margin-right: 30rpx;
					color: $uni-text-color-grey;
				}
			}
		}
		.transfer-child-title{
			font-size: 26rpx;
			margin-top: 15rpx;
			color: #333;
		}
		
		.transfer-num-wrap{
			position: relative;
			height: 80rpx;
			border: 2rpx solid #f3f3f3;
			border-radius: 4rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			.transfer-num{
				flex: 1;
				color: #333;
				padding: 0 30rpx;
				font-size: 30rpx;
			}
		}
		
		.transfer-balance{
			margin-left: 15rpx;
			color: $uni-text-color-grey;
			margin-right: 15rpx;
		}
		
		.submitBtn{
			margin-top:100upx;
		}
	}
</style>
