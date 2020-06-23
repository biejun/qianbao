<template>
	<view class="common-bg withdraw-add">
		<view class="withdraw-add-inner">
			<view class="dropdown-addon" :class="coinListShow ? 'is-fixed' : ''">
				<view class="dropdown-header">
					<view class="dropdown-header__left">
						{{currentCoin}}
					</view>
					<view class="dropdown-header__right" @click="coinListShow = !coinListShow">
						<text>切换币种</text>
						<u-icon name="arrow-up-fill" class="icon" :class="coinListShow ? '' : 'is-down'"></u-icon>
					</view>
				</view>
				<view v-show="coinListShow" class="dropdown-content">
					<view v-for="item in coinList" 
						class="dropdown-content-item" 
						@click="selectCoin(item)"
						:key="item.id">
						{{item.coinName}}
					</view>
				</view>
			</view>
			<view class="current-assets">
				<view class="total-balance">
					<view class="total-balance-number">
						{{totalAsset}}
					</view>
					<view class="total-balance-unit">
						{{currentCoin}}
					</view>
				</view>
<!-- 				<view class="total-balance-translate">
					≈{{totalGCN}} GCN
				</view> -->
				<view class="account-wrap">
					<view class="account-item">
						<view class="account-item-text">
							当前可用
						</view>
						<view class="account-item-number">
							<text>{{totalAmount}}</text>
							<text>{{currentCoin}}</text>
						</view>
					</view>
					<view class="account-item">
						<view class="account-item-text">
							当前冻结
						</view>
						<view class="account-item-number">
							<text>{{totalFreezeAmount}}</text>
							<text>{{currentCoin}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="dropdown-addon" :class="coinMethodShow ? 'is-fixed' : ''">
				<view class="dropdown-header">
					<view class="dropdown-header__left">
						{{type === 1? '对内提币' : '对外提币'}}
					</view>
					<view class="dropdown-header__right" @click="coinMethodShow = !coinMethodShow">
						<text>切换方式</text>
						<u-icon name="arrow-up-fill" class="icon" :class="coinMethodShow ? '' : 'is-down'"></u-icon>
					</view>
				</view>
				<view v-show="coinMethodShow" class="dropdown-content">
					<view class="dropdown-content-item" @click="selectMethod(1)">
						对内提币
					</view>
					<view class="dropdown-content-item" @click="selectMethod(2)">
						对外提币
					</view>
				</view>
			</view>
			<u-cell-group v-if="type === 1" class="withdraw-form-wrap" :border="false">
				<u-cell-item 
					title="国家/地区"
					value="+86 中国">
				</u-cell-item>
				<u-field
					v-model="form.phone"
					label="手机号码"
					placeholder="请输入手机号码"
				>
<!-- 					<view slot="right">
						dsfsdf
					</view> -->
				</u-field>
				<u-field
					v-model="form.num"
					label="提币数量"
					placeholder="请输入提币数量"
				>
				</u-field>
				<view class="withdraw-tips">最多可提取{{totalAmount}}</view>
				<u-field
					:value="inFee"
					label="手续费"
					:disabled="true"
				>
				</u-field>
				<view class="withdraw-tips">手续费将从兑出数量中扣减</view>
			</u-cell-group>
			
			<u-cell-group v-if="type === 2" class="withdraw-form-wrap" :border="false">
				<u-field
					v-model="form.address"
					label="地址"
					placeholder="请输入转账地址"
				>
				</u-field>
				<u-field
					v-model="form.num"
					label="提币数量"
					placeholder="请输入提币数量"
				>
				</u-field>
				<view class="withdraw-tips">最多可提取{{totalAmount}}</view>
				<u-field
					:value="outFee"
					label="手续费"
					:disabled="true"
				>
				</u-field>
				<view class="withdraw-tips">手续费将从兑出数量中扣减</view>
			</u-cell-group>
			<view class="withdraw-wrap">
				<button type="warn" class="withdraw-wrap-button" @click="submit" :disabled="disabled">提交转账申请</button>
			</view>
		</view>
		<u-mask :show="coinListShow" z-index="100"></u-mask>
		<u-mask :show="coinMethodShow" z-index="100"></u-mask>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				coinListShow: false,
				coinMethodShow: false,
				currentCoin: '',
				coinList: [],
				totalAmount: 0,
				totalAsset: 0,
				totalGCN: 0,
				totalFreezeAmount: 0,
				type: 1,
				form: {
					address: '',
					num: '',
					phone: ''
				},
				inFee: 0,
				outFee: 0
			}
		},
		created() {
			this.getCoinList();
		},
		computed: {
			disabled() {
				return this.form.num === '';
			}
		},
		methods: {
			selectCoin(item) {
				this.currentCoin = item.coinName;
				this.coinListShow = false;
				this.coinList.forEach(v => {
					if(v.coinName === this.currentCoin) {
						this.totalAmount = v.amount || 0;
						this.totalFreezeAmount = v.frozenAmount || 0;
						this.totalAsset = this.totalAmount + this.totalFreezeAmount;
						this.totalGCN = v.cnyAmount || 0;
						this.inFee = v.inFee || 0;
						this.outFee = v.outFee || 0;
					}
				});
			},
			selectMethod(type) {
				this.type = type;
				this.coinMethodShow = false;
			},
			submit() {
				if(this.type === 1) {
					this.$u.post('/wRecordTransferIn/withDrawIn', {
						amount: this.form.num,
						phone: this.form.phone,
						phoneArea: '+86',
						coinName: this.currentCoin,
						fee: this.inFee,
						toAddress: this.form.address
					}).then(res => {
						this.$u.toast(res.msg);
					},err => {
						this.$u.toast(err.msg);
					})
				}else if(this.type === 2) {
					this.$u.post('/wRecordTransferOut/withDrawOut', {
						amount: this.form.num,
						coinName: this.currentCoin,
						fee: this.outFee,
						toAddress: this.form.address
					}).then(res => {
						this.$u.toast(res.msg);
					}, err => {
						this.$u.toast(err.msg);
					})
				}
			},
			getCoinList() {
				this.$u.post('/wRecordTransferOut/withDrawCoins').then(res => {
					this.coinList = res.data;
					if(this.coinList.length) {
						this.currentCoin = this.coinList[0].coinName;
						this.coinList.forEach(v => {
							if(v.coinName === this.currentCoin) {
								this.totalAmount = v.amount || 0;
								this.totalFreezeAmount = v.frozenAmount || 0;
								this.totalAsset = this.totalAmount + this.totalFreezeAmount;
								this.totalGCN = v.cnyAmount || 0;
								this.inFee = v.inFee || 0;
								this.outFee = v.outFee || 0;
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.withdraw-add{
		overflow: auto;
		
		.withdraw-wrap{
			padding: 50rpx;
			
			.withdraw-wrap-button{
				border-radius: 50rpx;
				font-size: 32rpx;
			}
		}
		
		.withdraw-add-inner{
			padding: 30rpx;
		}
		
		.current-assets{
			background-color: #fff;
			border-radius: 10rpx;
			padding: 26rpx 30rpx;
			margin-bottom: 30rpx;
			
			.total-balance{
				display: flex;
				align-items: baseline;
				&-number{
					font-size: 52rpx;
					color: #333333;
					margin-right: 20rpx;
					font-weight: bold;
				}
				&-unit{
					color: #666666;
					font-size: 30rpx;
					font-weight:500;
				}
			}
			.total-balance-translate{
				font-size: 30rpx;
				color: #A5A5A5;
				padding-top: 10rpx;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #F3F3F3;
			}
			.account-wrap{
				display: flex;
				justify-content: space-between;
				padding-top: 20rpx;
				
				.account-item{
					position: relative;
					flex: 1;
					&-text{
						color: #A5A5A5;
						font-size: 28rpx;
					}
					&-number{
						color: #333333;
						font-size: 30rpx;
						padding-top: 10rpx;
						text{
							margin-right: 10rpx;
							font-weight: bold;
						}
					}
					
					&:last-child{
						padding-left: 30rpx;
						&:before{
							position: absolute;
							content: "";
							left: -2rpx;
							top: 10rpx;
							bottom: 10rpx;
							width: 2rpx;
							background-color: #F3F3F3;
						}
					}
				}
			}
		}
		
		.withdraw-form-wrap{
			padding: 10rpx 0;
			background-color: #fff;
			border-radius: 10rpx;
			
			.u-field-border:after{
				border-bottom: 2rpx solid #f3f3f3!important;
			}
		}

		.withdraw-tips{
			margin-top: -5rpx;
			border-top: 2rpx solid #F3F3F3;
			padding: 15rpx 0;
			margin-left: 165rpx;
			font-size: 24rpx;
			color: #666;
		}
	}
	
	// 带笼罩层的下拉
	.dropdown-addon{
		margin-bottom: 30rpx;
		
		.dropdown-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 26rpx 30rpx;
			
			&__left{
				font-size: 32rpx;
				font-weight: bold;
			}
			
			&__right{
				font-size: 28rpx;
				color: #A5A5A5;
				> *{
					vertical-align: middle;
				}
				.icon{
					margin-left: 15rpx;
					font-size: 20rpx;
					
					&.is-down{
						transform: rotate(-180deg);
					}
				}
			}
		}
		&.is-fixed{
			position: relative;
			z-index: 1000;
			
			.dropdown-header{
				border-radius: 10rpx 10rpx 0 0;
			}
		}
		.dropdown-content{
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background-color: #fff;
			border-radius: 0 0 10rpx 10rpx;
			padding: 0 30rpx;
			
			.dropdown-content-item{
				padding: 20rpx 0;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
</style>
