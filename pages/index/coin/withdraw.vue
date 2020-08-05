<template>
	<view class="common-bg withdraw-add">
		<view class="withdraw-add-inner">
			<view class="current-assets">
				<view class="account-wrap">
					<view class="total-balance">
						<view class="total-balance-number">
							{{totalAsset}}
						</view>
						<view class="total-balance-unit">
							{{currentCoin}}
						</view>
<!-- 						<view class="total-balance-translate">
							≈{{totalGCN}} GCN
						</view> -->
					</view>
					<view class="account-item">
						<view class="account-item-text">
							{{$t('CurrentlyAvailable')}}
						</view>
						<view class="account-item-number">
							<text>{{totalAmount}}</text>
							<text>{{currentCoin}}</text>
						</view>
					</view>
<!-- 					<view class="account-item">
						<view class="account-item-text">
							{{$t('CurrentFreeze')}}
						</view>
						<view class="account-item-number">
							<text>{{totalFreezeAmount}}</text>
							<text>{{currentCoin}}</text>
						</view>
					</view> -->
				</view>
			</view>
			<view class="dropdown-addon" :class="coinMethodShow ? 'is-fixed' : ''">
				<view class="dropdown-header">
					<view class="dropdown-header__left">
						{{$t('SwitchingMode')}}
					</view>
					<view class="dropdown-header__right" 
						@click="coinMethodShow = !coinMethodShow">
						<text>{{type === 1? $t('Internal') : $t('External')}}</text>
						<u-icon name="arrow-up-fill" class="icon" :class="coinMethodShow ? '' : 'is-down'"></u-icon>
					</view>
				</view>
				<view v-show="coinMethodShow" class="dropdown-content">
					<view class="dropdown-content-item" 
					 @click="selectMethod(1)"
					 :class="type === 1 ? 'current' : ''">
						{{$t('Internal')}}
					</view>
					<view class="dropdown-content-item" @click="selectMethod(2)"
						:class="type === 2 ? 'current' : ''">
						{{$t('External')}}
					</view>
				</view>
			</view>
			<view class="dropdown-addon" :class="coinListShow ? 'is-fixed' : ''">
				<view class="dropdown-header">
					<view class="dropdown-header__left">
						{{$t('SwitchCurrency')}}
					</view>
					<view class="dropdown-header__right" @click="coinListShow = !coinListShow">
						<text>{{currentCoin}}</text>
						<u-icon name="arrow-up-fill" class="icon" :class="coinListShow ? '' : 'is-down'"></u-icon>
					</view>
				</view>
				<view v-show="coinListShow" class="dropdown-content">
					<view v-for="item in coinList" 
						class="dropdown-content-item" 
						@click="selectCoin(item)"
						:class="item.coinName === currentCoin ? 'current' : ''"
						:key="item.id">
						{{item.coinName}}
					</view>
				</view>
			</view>
			<view v-if="type === 2 && currentCoin === 'GCN'" class="warn-tips">{{$t('WarnGCN')}}</view>
			
			<u-cell-group class="withdraw-form-wrap" :border="false">
				<u-field
					v-model="form.address"
					:label="$t('address')"
					:placeholder="$t('addressPleaseNum')"
				>
				</u-field>
				<u-field
					:border-bottom="false"
					v-model="form.num"
					:label="$t('withdrawalNumber')"
					:placeholder="$t('withdrawalNumberPleaseNum')"
				>
				</u-field>
				<view class="withdraw-tips">{{$t('MaximumExtractable')}}{{totalAmount}} <text class="item-btn-all" @click="form.num = totalAmount">{{$t('all')}}</text></view>
				<u-field
					:value="outFee"
					:label="$t('Fee')"
					:border-bottom="false"
					border-top
					class="disable-field"
					:disabled="true"
				>
				</u-field>
				<view class="withdraw-tips">{{$t('feeTip')}}</view>
			</u-cell-group>
			<view class="withdraw-wrap">
				<button type="default" class="withdraw-wrap-button" @click="submit" :disabled="disabled">{{$t('Submit')}}</button>
			</view>
		</view>
		<u-mask :show="coinListShow" z-index="100" @click="coinListShow = false"></u-mask>
		<u-mask :show="coinMethodShow" z-index="100" @click="coinMethodShow = false"></u-mask>
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
		<u-modal :value="showPassword" @confirm="confirmPassword" @cancel="showPassword = false" :show-cancel-button="true" :title="$t('plsPassword')"  :cancel-text="$t('cancel')" :confirm-text="$t('confirm')" cancel-color="#6D6D6D" confirm-color="#F1353F" :confirm-style="style" :cancel-style="cancelStyle" :title-style="style" :content-style="contentStyle">
			<view class="enter-password">
				<view class="enter-inner">
					<image src="/static/password.png" class="lock"></image>
					<u-input v-model="form.password" type="password" class="enter-input" password-icon :placeholder="$t('password')"></u-input>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				style: {backgroundColor: '#f3f3f3'},
				contentStyle: {
					borderBottom: "2rpx solid #DCDCDC",
					backgroundColor: '#f3f3f3'
				},
				cancelStyle: {
					borderRight: "2rpx solid #DCDCDC",
					backgroundColor: '#f3f3f3'
				},
				coinListShow: false,
				coinMethodShow: false,
				showPassword: false,
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
					password: ''
				},
				inFee: 0,
				outFee: 0,
				isSubmit: false,
				showStatus: false,
				status:{
					type: 1,
					msg: ''
				},
				i18n: {
					zh: {
						SwitchCurrency: '幣種',
						withdrawal: "提幣",
						CurrentlyAvailable: "當前可用",
						SwitchingMode: "貨幣流向",
						Internal: "區塊玩家內互轉 ",
						External: "交易所/外部錢包",
						CurrentFreeze: "當前凍結",
						CountryRegion: "国家/地区",
						Phone: "手机号码",
						withdrawalNumber: "提幣數量",
						Fee: "礦工費",
						address: "地址",
						phonePleaseHolder: "请输入手机号码",
						withdrawalNumberPleaseNum: "請輸入提幣數量",
						addressPleaseNum: "請輸入轉賬地址",
						feeTip: "礦工費將從兌出數量中扣減",
						MaximumExtractable: "最多可提取",
						Submit: "確定",
						WarnGCN: "提示：GCN不支持交易所，勿把GCN提幣至交易所！",
						plsPassword: "請輸入密文",
						password: "密文",
						cancel: "取消",
						confirm: "確定",
						all: "全部",
						helpText: "\ue614 了解提幣"
					},
					en: {
						SwitchCurrency: 'Switch Currency',
						withdrawal: "Withdrawal",
						CurrentlyAvailable: "Currently Available",
						SwitchingMode: "Switching Mode",
						Internal: "Block player inter turn",
						External: "Exchange / External Wallet",
						CurrentFreeze: "Current Freeze",
						CountryRegion: "Country Region",
						Phone: "Phone",
						all: "All",
						withdrawalNumber: "Number",
						Fee: "Fee",
						address: "Address",
						phonePleaseHolder: "Please enter your mobile number",
						withdrawalNumberPleaseNum: "Please enter withdrawal number",
						addressPleaseNum: "Please enter the transfer address",
						feeTip: "Service charge will be deducted from the quantity",
						MaximumExtractable: "Maximum extractable",
						Submit: "Submit",
						WarnGCN: "Warning：GCN does not support external exchange！",
						plsPassword: "Please input a ciphertext",
						password: "Ciphertext",
						cancel: "Cancel",
						confirm: "Confirm",
						helpText: "\ue614 Learn about"
					}
				},
			}
		},
		onLoad(options) {
			if(options.address) {
				this.form.address = options.address;
			}
		},
		created() {
			this.getCoinList();
			this.setNavBarTitle('withdrawal');
			// #ifdef APP-PLUS
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			currentWebview.setTitleNViewButtonStyle(1, {
				text: this.$t('helpText')
			})
			// #endif
		},
		computed: {
			disabled() {
				return this.form.num === '' || this.isSubmit || this.form.address === '';
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0) {
				uni.navigateTo({
					url: './withdrawDetail?coinName='+this.currentCoin
				})
			}
			if(e.index == 1) {
				uni.navigateTo({
					url: './learnWithdraw'
				})
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
			confirmPassword() {
				let password = this.form.password.trim();
				if(password === '') return;
				this.showPassword = false;
				this.submit();
			},
			autoCloseModal() {
				setTimeout(() => {
					this.showStatus = false;
				}, 3000);
			},
			submit() {
				let amount = Number(this.form.num);
				if(!amount) {
					this.$u.toast("请输入提币数量");
					return;
				}
				if(amount > this.totalAmount) {
					this.$u.toast("提币数量不能超过"+this.totalAmount);
					return;
				}
				if(!this.form.password) {
					this.showPassword = true;
					return;
				}
				this.isSubmit = true;
				if(this.type === 1) {
					this.$u.post('/wRecordTransferIn/withDrawIn', {
						amount: amount,
						password: this.form.password,
						toAddress: this.form.address,
						coinName: this.currentCoin,
						fee: this.inFee,
					}).then(res => {
						this.form.password = '';
						this.isSubmit = false;
						this.showStatus = true;
						this.status = {
							type: 1,
							msg: '提币成功'
						}
						this.autoCloseModal();
					},err => {
						this.form.password = '';
						this.isSubmit = false;
						this.showStatus = true;
						this.status = {
							type: 2,
							msg: err.msg
						}
						this.autoCloseModal();
					})
				}else if(this.type === 2) {
					this.$u.post('/wRecordTransferOut/withDrawOut', {
						amount: amount,
						password: this.form.password,
						coinName: this.currentCoin,
						fee: this.outFee,
						toAddress: this.form.address
					}).then(res => {
						this.form.password = '';
						this.isSubmit = false;
						this.showStatus = true;
						this.status = {
							type: 1,
							msg: '提币成功'
						}
						this.autoCloseModal();
					}, err => {
						this.form.password = '';
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
	
	.item-btn-all{
		font-size: 28rpx;
		color: #0F9BE9;
		margin-left: 10rpx;
		text-decoration: underline;
	}
	
	.withdraw-add{
		overflow: auto;
		
		.withdraw-wrap{
			padding: 50rpx;
			
			.withdraw-wrap-button{
				border-radius: 50rpx;
				font-size: 32rpx;
				background-color: #FFC000;
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
				flex: 1;
				align-items: baseline;
				flex-wrap: wrap;
				overflow: hidden;
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
			}
			.account-wrap{
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				
				.account-item{
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 260rpx;
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
			padding: 30rpx 0;
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
	
	.warn-tips{
		margin-top: -6px;
		margin-bottom: 30rpx;
		color: #F1333D;
		font-size: 22rpx;
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
				font-size: 28rpx;
				color: #A5A5A5;
			}
			
			&__right{
				font-size: 32rpx;
				font-weight: bold;
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
				background-color: #f3f3f3;
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
				&.current{
					color: $uni-color-primary;
				}
			}
		}
	}
	
	.enter-password{
		padding: 40rpx;
		.enter-inner{
			position: relative;
			border-bottom: 2rpx solid #DCDCDC;
			.lock{
				position: absolute;
				top: 0;
				left: 0;
				width: 55rpx;
				height: 60rpx;
			}
		}
		.enter-input{
			padding: 10rpx;
			margin-left: 100rpx;
		}
		.message-tip{
			font-size: 22rpx;
			padding: 10rpx;
			color: $uni-color-error;
		}
	}
	
	/deep/ .disable-field{
		color: #A5A5A5;
	}
</style>
