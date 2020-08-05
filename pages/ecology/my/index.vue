<template>
	<view class="lecai-my-index">
		<view class="my-assets">
			<view class="assets-title">{{$t('gameAccount')}}{{$t('QuantityAvailable')}}</view>
			<view class="asset-amount">
				{{totalGameAmount}}
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
	
		<div class="transfer-child-title hei">{{$t('Chooseanaccount')}}</div>
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
		<div class="transfer-child-title hei">{{$t('Quantity')}}</div>
		<div class="transfer-num-wrap">
			<input type="number" class="transfer-num" v-model="exchangeNum" :placeholder="$t('Exchangequantity')">
		</div>
		<div class="transfer-child-title">{{$t('Currentlyavailable')}} <span class="transfer-balance">{{sunCount}}</span>
			<text class="all-in" @click="allIn">{{$t('All')}}</text></div>
		<u-button class="submitBtn" :disabled="disabled" @click="exchange">{{$t('Transfer')}}</u-button>
		<u-toast ref="uToast" />
		<u-modal v-model="showStatus" title="" :show-confirm-button="false" mask-close-able>
			<view class="modal-result">
				<view v-show="status.type === 1" class="verify-result">
					<image src="/static/success.png" class="status-image"></image>
					<view class="status-text">{{status.msg}}</view>
				</view>
				<view v-show="status.type === 2" class="verify-result">
					<image src="/static/error.png" class="status-image"></image>
					<view class="status-text">{{status.msg}}</view>
				</view>
			</view>
		</u-modal>
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
				isSubmit: false,
				showStatus: false,
				status:{
					type: 1,
					msg: ''
				},
				i18n: {
					zh: {
						title: '轉入/轉出',
						QuantityAvailable: "可用數量",
						QuantityToBeSettled: "待結算數量",
						TransferInto: "轉入",
						TransferOut: "轉出",
						SelectCurrency: "選擇幣種",
						Chooseanaccount: "選擇賬戶",
						Quantity:"填寫數量",
						From: "從",
						To: "到",
						digitalAccount: '錢包賬戶',
						gameAccount: "遊戲賬戶",
						Currentlyavailable: "當前可用",
						All: "全部",
						Transfer:"確認",
						Exchangequantity: "輸入數量",
						trOut: "轉出成功",
						trIn: "轉入成功"
					},
					en: {
						title: "Transfer In/Out",
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
			this.getAmountByCoinName();
			this.setNavBarTitle('title');
		},
		computed: {
			sunCount() {
				return this.isReverse ? this.totalGameAmount : this.totalAmount
			},
			disabled() {
				return this.exchangeNum == '' || this.isSubmit;
			},
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
			autoCloseModal() {
				setTimeout(() => {
					this.showStatus = false;
				}, 3000);
			},
			exchange() {
				this.isSubmit = true;
				this.$u.post('/uUserAccount/exchangeAmount', {
					coinName: 'GCN',
					exchangeAmount: this.exchangeNum,
					exchangeType: this.isReverse ? 2 : 1
				}).then(res => {
					// this.$refs.uToast.show({
					// 	title: this.isReverse ? this.$t('trOut') : this.$t('trIn'),
					// 	type: 'success',
					// })
					this.getAmountByCoinName();
					this.exchangeNum = '';
					this.isSubmit = false;
					this.showStatus = true;
					this.status = {
						type: 1,
						msg: this.isReverse ? this.$t('trOut') : this.$t('trIn')
					}
					this.autoCloseModal();
				}, err => {
					// this.$refs.uToast.show({
					// 	title: err.msg,
					// 	type: 'error',
					// })
					this.isSubmit = false;
					this.showStatus = true;
					this.status = {
						type: 2,
						msg: err.msg
					}
					this.autoCloseModal();
				})
			},
			getAmountByCoinName() {
				this.$u.api.getAmountByCoinName('GCN').then(res => {
					if(!res.data) return;
					this.totalAmount = res.data.amount;
					this.totalGameAmount = res.data.gameAmount;
				})
			},
			// getCoinList() {
			// 	this.$u.api.getUserAmount().then(res => {
			// 		if(res.data.length) {
			// 			let totalGameAmount = 0;
			// 			let totalFreezeAmount = 0;
			// 			let totalAmount = 0;
			// 			res.data.forEach(v => {
			// 				if(v.coinName === 'GCN') {
			// 					totalGameAmount = v.gameAmount || 0;
			// 					totalFreezeAmount = v.frozenAmount || 0;
			// 					totalAmount = v.amount || 0;
			// 				}
			// 			});
			// 			this.totalAmount = totalAmount;
			// 			this.totalGameAmount = totalGameAmount;
			// 			this.totalFreezeAmount = totalFreezeAmount;
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.lecai-my-index{
		padding: 30rpx;
		overflow: auto;
		.my-assets{
			padding: 20rpx 0 100rpx 0;
			
			.assets-title{
				text-align: center;
				font-size: 30rpx;
				color: #343434;
				margin-bottom: 30rpx;
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
			color: #0F9BE9;
			text-decoration: underline;
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
			color: #A5A5A5;
			
			&.hei{
				color: #333;
			}
		}
		
		.transfer-num-wrap{
			position: relative;
			height: 80rpx;
			border-bottom: 2rpx solid #f3f3f3;
			border-radius: 4rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			.transfer-num{
				flex: 1;
				font-size: 30rpx;
				
				/deep/ .input-placeholder{
					color: #A5A5A5;
				}
			}
		}
		
		.transfer-balance{
			margin-left: 15rpx;
			color: #333333;
			margin-right: 15rpx;
			font-weight: bold;
		}
		
		.submitBtn{
			margin-top:100upx;
			font-size: 32rpx;
			border-radius: 50rpx;
			background-color: #FFC000;
			color: #fff;
			
			&:after{
				border-color: $uni-color-primary;
			}
			&[disabled]{
				background-color: #F7DA79;
				border-color: #F7DA79;
				color: #fff;
				&:after{
					border-color: #F7DA79;
				}
			}
		}
		/deep/ .u-btn--warning{
			border-color: #EAA310;
			background-color: #EAA310;
			color: #fff;
		}
		/deep/ .u-btn--warning--plain{
			color: #333333!important;
			border-color:  #BFBFBF!important;
		}
	}
	
	.modal-result{
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
</style>
