<template>
	<view class="tc-confirm">
		<view class="tc-header">{{name}}</view>
		<view class="tc-wrap">
			<view class="tc-title">投注详细</view>
			<view class="tc-item" v-for="item in form" :key="item.currentNumber">
				<view class="tc-period">{{item.currentNumber}} 期</view>
				<view class="tc-list" v-for="(row, index) in item.stakeDetailList" :key="index">
					<view>
						{{row.stakeNo}}
					</view>
					<view>
						<u-number-box v-model="row.stakeNumber" :min="1" :max="50"></u-number-box>
					</view>
				</view>
			</view>
			<view class="tc-title">
				支付代币数
			</view>
			<view class="tc-total">
				<view>
					共 <text>{{totalNum.multiple}}</text>注
				</view>
				<view>
					{{totalNum.amount}} GCN
				</view>
			</view>
		</view>
		<button class="tc-submit" @click="submit" :disabled="isLoading">确认支付</button>
	</view>
</template>

<script>
	import { combination, toGroup } from '@/common/utils.js';
	export default{
		data() {
			return {
				name: '',
				form: [],
				wayType: '',
				gameId: '',
				isLoading: false
			}
		},
		onLoad(options) {
			this.name = options.name;
			this.wayType = Number(options.wayType);
			let gameId = this.vuex_game_id;
			let periods = Number(options.periods);
			let multiple = Number(options.multiple);
			let arr  = [], tp = this.vuex_bet_period + (periods -1);
			for(let i = periods; i <= tp; i++) {
				let o = {
					currentNumber: i,
					stakeDetailList: []
				}
				if(options.type === '1') {
					if(options.t === '0') {
						o.stakeDetailList.push({
							stakeNo: options.rx,
							stakeNumber: multiple
						});
					}else if(options.t === '1'){
						let tm = options.tm, dm = options.dm;
						let res = toGroup(tm.split(','), dm.split(','));
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
			submit() {
				uni.showLoading({
				    title: '正在处理订单'
				});
				this.isLoading = true;
				this.$u.post('/gGameOrder/addGame', {
					gameDetailList: this.form,
					gameId: this.gameId,
					totalNumber: this.totalNum.multiple,
					totalAmount: this.totalNum.amount,
					wayDesc: this.name,
					wayType: this.wayType
				}).then(res => {
					uni.hideLoading();
					this.isLoading = true;
					uni.navigateTo({
						url: './success'
					})
				}, err => {
					this.isLoading = true;
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
			background-color: #F1343E;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
