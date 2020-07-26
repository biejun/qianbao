<template>
	<view class="lecai-my-index">
		<view class="my-assets">
			<view class="assets-title">{{isReverse ? $t('gameAccount') : $t('digitalAccount')}}{{$t('QuantityAvailable')}}</view>
			<view class="asset-amount">
				{{isReverse ? totalGameAmount: totalAmount}}
				<text class="asset-unit">GCN</text>
			</view>
<!-- 			<view class="asset-result">
				{{$t('QuantityToBeSettled')}}: {{totalFreezeAmount}} GCN
			</view> -->
		</view>
		<view class="buttons">
			<u-button type="warning" :plain="isReverse" @click="isReverse=false">{{$t('TransferInto')}}</u-button>
			<u-button type="warning" :plain="!isReverse" @click="isReverse = true">{{$t('TransferOut')}}</u-button>
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
		<u-button class="submitBtn" @click="exchange">{{$t('Transfer')}}</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				totalAmount: 0,
				totalGameAmount: 0,
				totalFreezeAmount: 0,
				isReverse: false,
				exchangeNum: '',
				i18n: {
					zh: {
						QuantityAvailable: "可用数量",
						QuantityToBeSettled: "待结算数量",
						TransferInto: "转入",
						TransferOut: "转出",
						SelectCurrency: "选择币种",
						Chooseanaccount: "选择账户",
						Quantity:"数量",
						From: "从",
						To: "到",
						digitalAccount: '钱包账户',
						gameAccount: "游戏账户",
						Currentlyavailable: "当前可用",
						All: "全部",
						Transfer:"划转",
						Exchangequantity: "兑换数量",
						trOut: "转出成功",
						trIn: "转入成功"
					},
					en: {
						QuantityAvailable: "Quantity Available",
						QuantityToBeSettled: "Quantity to be settled",
						TransferInto: "Transfer in",
						TransferOut: "Transfer out",
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
		created() {
			this.getCoinList();
		},
		computed: {
			sunCount() {
				return this.isReverse ? this.totalGameAmount : this.totalAmount
			}
		},
		watch: {
			isReverse() {
				this.exchangeNum = ''
			}
		},
		methods: {
			goUrl(page) {
				uni.navigateTo({
					url: page
				})
			},
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
					if(this.isReverse) {
						this.totalGameAmount -= Number(this.exchangeNum)
					}else{
						this.totalAmount-= Number(this.exchangeNum)
					}
					this.exchangeNum = '';
				}, err => {
					this.$refs.uToast.show({
						title: err.msg,
						type: 'error',
					})
				})
			},
			getCoinList() {
				this.$u.api.getUserAmount().then(res => {
					if(res.data.length) {
						let totalGameAmount = 0;
						let totalFreezeAmount = 0;
						let totalAmount = 0;
						res.data.forEach(v => {
							if(v.coinName === 'GCN') {
								totalGameAmount = v.gameAmount || 0;
								totalFreezeAmount = v.frozenAmount || 0;
								totalAmount = v.amount || 0;
							}
						});
						this.totalAmount = totalAmount;
						this.totalGameAmount = totalGameAmount;
						this.totalFreezeAmount = totalFreezeAmount;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.lecai-my-index{
		padding: 30rpx;
		overflow: auto;
		.my-assets{
			padding: 100rpx 0;
			
			.assets-title{
				text-align: center;
				font-size: 30rpx;
				color: #343434;
			}
			.asset-amount{
				text-align: center;
				font-size: 52rpx;
				color: #343434;
				
				.asset-unit{
					font-size: 24rpx;
					margin-left: 15rpx;
				}
			}
			.asset-result{
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #A5A5A5;
				text-align: center;
			}
		}
		.buttons{
			display: flex;
			margin-bottom: 80rpx;
			
			.u-btn{
				width: 44%;
			}
			.u-btn.u-btn--warning--plain{
				background-color: #fff!important;
			}
		}
		
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
			font-size: 32rpx;
			background-color: #FFC000;
			color: #fff;
		}
		/deep/ .u-btn--warning{
			border-color: #FFC000;
			background-color: #FFC000;
			color: #fff;
		}
		/deep/ .u-btn--warning--plain{
			color: #FFC000!important;
			border-color:  #FFC000!important;
		}
	}
</style>
