<template>
	<view class="tc-confirm">
		<view class="tc-header">{{name}}</view>
		<view class="tc-wrap">
			<view class="tc-title">{{$t('BettingDetails')}}</view>
			<view class="tc-item" v-for="item in form" :key="item.currentNumber">
				<view class="tc-period">{{$t('Period').replace('{0}', ymd(item.openTime))}}</view>
				<view class="tc-list" v-for="(row, index) in item.stakeDetailList" :key="index">
					<view class="stakeNo">
						{{row.stakeNo}}
					</view>
					<view>
						<u-number-box v-model="row.stakeNumber" :min="1" :max="50"></u-number-box>
					</view>
				</view>
			</view>
			<view class="tc-title">
				{{$t('Paymenttokens')}}
			</view>
			<view class="tc-total">
				<view>
					{{$t('Total')}} <text>{{totalNum.multiple}}</text>{{$t('Bet')}}
				</view>
				<view>
					{{totalNum.amount}} GCN
				</view>
			</view>
		</view>
		<view class="tc-submit" @click="submit" :disabled="isLoading">{{$t('ConfirmPayment')}}</view>
	</view>
</template>

<script>
	import { combination, toGroup } from '@/common/utils.js';
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				name: '',
				form: [],
				wayType: '',
				gameId: '',
				isLoading: false,
				i18n: {
					zh: {
						BettingDetails: "投註詳細",
						Paymenttokens: "支付代幣數",
						Total: "共",
						Bet: "註",
						ConfirmPayment: "確認支付",
						Period: "{0} 期",
						Orderprocessing: "正在處理訂單...",
						Loading: "加載中...",
						betConfirm: "投註確認"
					},
					en: {
						BettingDetails: "Betting details",
						Paymenttokens: "Payment tokens",
						Total: "Total",
						Bet: "Bet",
						ConfirmPayment: "Confirm Payment",
						Period: "No. {0}",
						Orderprocessing: "Order processing...",
						Loading: "Loading...",
						betConfirm: "Bet confirmation"
					}
				},
			}
		},
		onLoad(options) {
			this.name = options.name;
			this.wayType = Number(options.wayType);
			uni.showLoading({
			    title: this.$t('Loading')
			});
			let gameId = this.vuex_game_id;
			let periods = Number(options.periods);
			let multiple = Number(options.multiple);
			let arr  = [], tp = this.vuex_bet_period + (periods - 1);
			let openTime;
			for(let i = this.vuex_bet_period; i <= tp; i++) {
				if(!openTime) {
					openTime = new Date(this.vuex_bet_opentime);
				}else{
					openTime = new Date(openTime.setDate(openTime.getDate() + 1));
				}
				let o = {
					currentNumber: i,
					openTime: openTime.getTime(),
					stakeDetailList: []
				}
				if(options.type === '1') {
					if(options.t === '0') {
						o.stakeDetailList.push({
							stakeNo: options.rx,
							stakeNumber: multiple
						});
					}else if(options.t === '1'){
						let fs = options.fs;
						let limit = options.wayType;
						let res = combination(fs.split(','), limit);
						o.stakeDetailList = res.map(v => ({
							stakeNo: v,
							stakeNumber: multiple
						}));
					}else if(options.t === '2'){
						let limit = options.wayType;
						let tm = options.tm.split(','), dm = options.dm.split(',');
						let res = toGroup(dm, tm, limit - dm.length);
						//console.log(limit - dm.length)
						o.stakeDetailList = res.map(v => ({
							stakeNo: v,
							stakeNumber: multiple
						}));
					}
				}
				if(options.type === '2') {
					if(options.t === '0') {
						o.stakeDetailList.push({
							stakeNo: options.zx,
							stakeNumber: multiple
						});
					}else if(options.t === '1'){
						let fs = options.fs;
						let limit = options.wayType === 7 ? 6 : 1;
						let res = combination(fs.split(','), limit);
						o.stakeDetailList = res.map(v => ({
							stakeNo: v,
							stakeNumber: multiple
						}));
					}
				}

				arr.push(o);
			}
			this.gameId = gameId;
			this.form = arr;
			setTimeout(function () {
			    uni.hideLoading();
			}, 800);
		},
		created() {
			this.setNavBarTitle('betConfirm');
		},
		computed: {
			totalNum() {
				let multiple = 0;
				this.form.forEach(v => {
					v.stakeDetailList.forEach(d => {
						multiple += d.stakeNumber;
					});
				});
				return {
					multiple,
					amount: multiple * 2
				}
			}
		},
		methods: {
			ymd(val) {
				return dateFormat(val, 'Ymd');
			},
			submit() {
				uni.showLoading({
				    title: this.$t('Orderprocessing')
				});
				this.isLoading = true;
				this.$u.post('/gGameOrder/addGame', {
					gameDetailList: this.form,
					gameId: this.gameId,
					totalNumber: this.totalNum.multiple,
					totalAmount: this.totalNum.amount,
					wayDesc: this.name,
					wayType: this.wayType,
					currentNumber: this.vuex_game_id !== '' ? this.vuex_bet_period : this.vuex_bet_period - 1
				}).then(res => {
					uni.hideLoading();
					this.isLoading = false;
					uni.navigateTo({
						url: './success?back=3'
					})
				}, err => {
					uni.hideLoading();
					this.isLoading = false;
					this.$u.toast(err.msg);
				})
			}
		}
	}
</script>

<style lang="scss">
	.tc-confirm{
		height: 100%;
		overflow: auto;
		background-color: #f3f3f3;
		.tc-header{
			background-color: #fff;
			padding: 20rpx 30rpx;
			font-size: 30rpx;
			color: #333;
		}
		.tc-title{
			padding: 20rpx 30rpx;
			font-size: 30rpx;
			color: #333;
		}
		.stakeNo{
			font-weight: 700;
		}
		.tc-item{
			padding: 0 30rpx;
			background-color: #fff;
			.tc-period{
				padding: 20rpx 0;
				font-size: 30rpx;
				color: #333;
			}
			.tc-list{
				display: flex;
				justify-content: space-between;
				border-top: 2rpx solid #f3f3f3;
				padding: 20rpx 0;
				font-size: 30rpx;
				align-items: center;
			}
		}
		.tc-wrap{
			padding-bottom: 80rpx;
			
		}
		.tc-total{
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			padding: 20rpx 30rpx;
			font-size: 30rpx;
			color: #333;
		}
		.tc-submit{
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			background-color: #fcc82b;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
