<template>
	<view class="common-bg coin-exchange" @click="onClick">
		<view class="exchange-inner">
			<view class="exchange-tips">
				{{$t('Support')}}
				{{$t('click')}} <image src="../../../static/index/duihuan-icon.png" class="exchange-icon"></image> {{$t('Switchexchangedirection')}}。<navigator class="more-btn" url="./learnEx"><u-icon name="question-circle"></u-icon> {{$t('Learn')}}</navigator>
			</view>
			<view class="exchange-box">
				<view class="exchange-box__header" :class="isReverse ? 'is-reverse' :''">
					<view class="exchange-coin is-left">
						<image :src="vuex_exchange_image" class="exchange-coin-image"></image>
						<text class="exchange-coin-name">{{coin}}</text>
					</view>
					<view class="exchange-btn" @click="translate">
						<image src="../../../static/index/duihuan-icon.png" class="exchange-icon"></image>
					</view>
					<view class="exchange-coin is-right">
						<text class="exchange-coin-dropdown" @click.stop="visible = !visible">▼</text>
						<view class="exchange-dropdown" v-show="visible">
							<view v-for="item in coinList" 
								:key="item.id"
								class="exchange-item" 
								@click.stop="selectedItem(item)">
								<image :src="item.toCoinIcon" class="exchange-item-image"></image>
								<view class="exchange-item-name">{{item.toCoin}}</view>
							</view>
						</view>
						<text class="exchange-coin-name" @click.stop="visible = !visible">{{toCoin}}</text>
						<image :src="toCoinIcon" class="exchange-coin-image"></image>
					</view>
				</view>
				<view class="exchange-box__body">
					<view class="exchange-number">
						<input type="number" class="input" v-model="exNum" :placeholder="$t('quantity')">
						<view class="item">
							<text class="item-name">{{$t('Currentlyavailable')}}:</text>
							<text class="item-value">{{currentAmount}}</text>
							<text class="item-btn-all" @click="exNum = currentAmount">{{$t('all')}}</text>
						</view>
<!-- 						<view class="item">
							<text class="item-name">手续费:</text>
							<text class="item-value">{{fee}}</text>
						</view> -->
					</view>
					<view class="exchange-spea">
						
					</view>
					<view class="exchange-number">
						<input type="number" class="input" :disabled="true" :value="needNum" :placeholder="$t('Demandquantity')">
						<view class="item">
							<text class="item-name">{{$t('exchangerate')}}:</text>
							<text v-if="!isReverse" class="item-value">1{{coin}} = {{rate}}{{toCoin}}</text>
							<text v-if="isReverse" class="item-value">1{{toCoin}} = {{rate}}{{coin}}</text>
						</view>
<!-- 						<view class="item">
							<text class="item-value">手续费将从兑出数量中扣减</text>
						</view> -->
					</view>
				</view>
			</view>
			<view class="exchange-wrap">
				<button type="default" class="exchange-wrap-button" @click="submitEx" :disabled="disabled">{{$t('Confirm')}}</button>
			</view>
		</view>
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
	import { getNowTime, accMul, accDiv, toDecimal } from '@/common/utils.js';
	export default{
		data() {
			return {
				coin: 'GCN',
				visible: false,
				toCoin: '',
				toCoinIcon: '',
				isReverse: false,
				exNum: '',
				fee: 0,
				rate: 0,
				amount: 0,
				toAmount: 0,
				coinList: [],
				isSubmit: false,
				decimal: {
					BTC: 8,
					ETH: 6,
					USDT: 2,
					GCN: 2
				},
				showStatus: false,
				status:{
					type: 1,
					msg: ''
				},
				i18n: {
					zh: {
						title: "貨幣兌換",
						Confirm: "確認兌換",
						Currentlyavailable: "當前可用",
						all: "全部",
						exchangerate: "匯率",
						Learn: "了解兌換",
						Support: "支持USDT、BTC、ETH等和GCN的兌換，免兌換手續費。",
						Switchexchangedirection:"切換兌換方向",
						click: "點擊",
						quantity: "輸入數量",
						Demandquantity: "需求數量"
					},
					en: {
						title: "Currency Exchange",
						Confirm: "Exchange",
						Currentlyavailable: "Currently available",
						all: "All",
						exchangerate: "Exchange rate",
						Learn: "Learn about exchange",
						Support: "Support the exchange of usdt, BTC, Eth and GCN, free of exchange fees.",
						Switchexchangedirection:"switch exchange direction",
						click: "Click",
						quantity: "Quantity",
						Demandquantity: "Demand quantity"
					}
				},
			}
		},
		onLoad(options) {
			this.coin = options.coinName;
			this.getAmountByCoinName(this.coin, 'amount');
			this.getCoinList(this.coin);
		},
		computed: {
			disabled() {
				return this.exNum == '' || this.isSubmit;
			},
			needNum() {
				if(!this.exNum) return 0;
				return this.isReverse ? accMul(Number(this.exNum), this.rate) : accMul(Number(this.exNum), this.rate);
			},
			currentAmount() {
				return this.isReverse ? this.toAmount : this.amount;
			}
		},
		created() {
			this.setNavBarTitle('title');
		},
		methods: {
			translate() {
				this.isReverse = !this.isReverse;
				this.exNum = '';
				let coinName = this.isReverse ? this.toCoin : this.coin;
				this.$u.get('/wRecordRecharge/getExchange/'+coinName).then(res => {
					res.data.forEach(v => {
						if(this.isReverse && v.toCoin === this.coin) {
							this.rate = toDecimal(v.rate, this.decimal[this.coin]);
						}else if(v.toCoin === this.toCoin){
							this.rate = toDecimal(v.rate, this.decimal[this.toCoin]);
						}
					})
				})
			},
			autoCloseModal() {
				setTimeout(() => {
					this.showStatus = false;
				}, 3000);
			},
			onClick() {
				this.visible = false;
			},
			selectedItem(item) {
				this.toCoin = item.toCoin;
				this.toCoinIcon = item.toCoinIcon;
				this.fee = item.fee;
				this.rate = toDecimal(item.rate, this.decimal[item.toCoin]);
				this.visible = false;
				this.getAmountByCoinName(item.toCoin);
			},
			getAmountByCoinName(coinName, field = 'toAmount') {
				this.$u.api.getAmountByCoinName(coinName).then(res => {
					if(!res.data) return;
					this[field] = res.data.amount;
				})
			},
			getCoinList(coinName) {
				this.$u.get('/wRecordRecharge/getExchange/'+coinName).then(res => {
					this.coinList = res.data;
					if(this.coinList.length && this.toCoin === '') {
						let coin = this.coinList[0];
						this.toCoin = coin.toCoin;
						this.toCoinIcon = coin.toCoinIcon;
						this.fee = coin.fee;
						this.rate = toDecimal(coin.rate,this.decimal[coin.toCoin]);
						this.getAmountByCoinName(coin.toCoin);
					}
				})
			},
			submitEx() {
				this.isSubmit = true;
				this.$u.post('/wRecordRecharge/exchangeCoin', {
					coin: this.isReverse ? this.toCoin : this.coin,
					//createTime: getNowTime(),
					exchangeAmount: this.exNum,
					fee: this.fee,
					rate: this.rate,
					toCoin: this.isReverse ? this.coin : this.toCoin,
					toExchangeAmount: this.needNum
				}).then(res => {
					// this.$u.toast(res.msg);
					this.isSubmit = false;
					this.showStatus = true;
					this.status = {
						type: 1,
						msg: res.msg
					}
					// 更新两边货币的余额
					this.getAmountByCoinName(this.toCoin);
					this.getAmountByCoinName(this.coin, 'amount');
					this.autoCloseModal();
				}, err => {
					// this.$u.toast(err.msg);
					this.isSubmit = false;
					this.showStatus = true;
					this.status = {
						type: 2,
						msg: err.msg
					}
					this.autoCloseModal();
				})
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './transaction'
			})
		},
	}
</script>

<style lang="scss">
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
	.coin-exchange{
		.exchange-inner{
			padding: 30rpx;
			.exchange-tips{
				margin-bottom: 20rpx;
				.exchange-icon{
					width: 20rpx;
					height: 20rpx;
				}
				.more-btn{
					margin-left: 15rpx;
					color: #F1333D;
					display: inline-block;
				}
			}
			.exchange-box{
				background-color: #fff;
				padding: 0 30rpx;
				border-radius: 26rpx;
				
				.exchange-coin{
					position: relative;
					display: flex;
					flex: 1;
					align-items: center;
					
					.exchange-coin-image{
						width: 80rpx;
						height: 80rpx;
					}
					.exchange-coin-name{
						font-size: 30rpx;
						color: #333333;
						margin-left: 20rpx;
						margin-right: 20rpx;
						font-weight: bold;
					}
					
					.exchange-coin-dropdown{
						font-size: 20rpx;
					}
					
					.exchange-dropdown{
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						border-radius: 20rpx;
						background-color: #fff;
						z-index: 999;
						border: 2rpx solid #ededed;
						box-shadow: 2rpx 2rpx 5rpx rgba(0,0,0,.15);
						padding: 20rpx 30rpx;
						
						.exchange-item{
							display: flex;
							height: 70rpx;
							align-items: center;
							margin-bottom: 20rpx;
							
							&:last-child{
								margin-bottom: 0;
							}
							
							.exchange-item-image{
								width: 70rpx;
								height: 70rpx;
							}
							.exchange-item-name{
								margin-left: 20rpx;
								font-size: 30rpx;
								color: #333;
								font-weight: bold;
							}
						}
					}
				}
				
				.exchange-btn{
					width: 60rpx;
					margin-top: 10rpx;
					text-align: center;
					order: 2;
					
					.exchange-icon{
						width: 44rpx;
						height: 44rpx;
					}
				}
				
				.exchange-box__header{
					display: flex;
					align-items: center;
					height: 150rpx;
					
					.exchange-coin{
						&.is-left{
							order: 1;
							justify-content: flex-start;
						}
						&.is-right{
							order: 3;
							justify-content: flex-end;
						}
					}
					
					&.is-reverse{
						
						.exchange-coin{
							&.is-left{
								order: 3;
								flex-direction: row-reverse;
								justify-content: flex-start;
							}
							&.is-right{
								order: 1;
								flex-direction: row-reverse;
								justify-content: flex-end;
							}
						}

					}
				}
				
				.exchange-box__body{
					display: flex;
					justify-content: space-between;
					padding-bottom: 20rpx;
				}
				
				.exchange-number{
					flex: 1;
					padding-bottom: 10rpx;
					
					.input{
						padding: 20rpx 0;
						color: #333;
						font-size: 34rpx;
						border-bottom: 3rpx solid #f3f3f3;
					}
					
					.item{
						padding-top: 8rpx;
						.item-name{
							color: #A5A5A5;
							font-size: 24rpx;
						}
						.item-value{
							color: #333333;
							font-size: 24rpx;
							margin-left: 10rpx;
						}
						.item-btn-all{
							font-size: 24rpx;
							color: #0F9BE9;
							margin-left: 10rpx;
						}
					}
					
					&:last-child{
						.input{
							text-align: right;
						}
						.item{
							text-align: right;
						}
					}
				}
				
				.exchange-spea{
					width: 50rpx;
				}

			}
			.exchange-wrap{
				padding: 80rpx 50rpx;
				
				.exchange-wrap-button{
					border-radius: 50rpx;
					font-size: 32rpx;
					background-color: $uni-color-primary;
					color: #fff;
					&:after{
						border-color: $uni-color-primary;
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
	}
</style>
