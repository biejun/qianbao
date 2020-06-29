<template>
	<view class="common-bg recharge-add" @click="coinListShow = false">
		<view class="recharge-add-inner">
			<view class="dropdown-addon" :class="coinListShow ? 'is-fixed' : ''">
				<view class="dropdown-header">
					<view class="dropdown-header__left">
						{{selectedCoin ? selectedCoin.coinName : ''}}
					</view>
					<view class="dropdown-header__right" @click.stop="coinListShow = !coinListShow">
						<text>{{$t('SwitchCurrency')}}</text>
						<u-icon name="arrow-up-fill" class="icon" :class="coinListShow ? '' : 'is-down'"></u-icon>
					</view>
				</view>
				<view v-show="coinListShow" class="dropdown-content">
					<view v-for="item in coinList" 
						@click.stop="selectCoin(item)"
						:key="item.id" 
						class="dropdown-content-item">
						{{item.coinName}}
					</view>
				</view>
			</view>
			<view class="recharge-coin">
				<view class="recharge-qrcode">
					<canvas canvas-id="qrcode" :style="{width: `150px`, height: `150px`}"/>
				</view>
				<view class="recharge-address">
					{{$t('RechargeAddress')}}：{{rechargeAddress}}
				</view>
			</view>
			<view class="copy-address">
				<button type="warn" class="copy-address-button" @click="copyAddress" :disabled="rechargeAddress === null">{{$t('CopyAddress')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import qrcode from '@/common/uqrcode.js';
	 
	export default{
		data() {
			return {
				coinListShow: false,
				value: '',
				coinList: [],
				selectedCoin: null,
				rechargeAddress: null,
				i18n: {
					zh: {
						SwitchCurrency: '切换币种',
						RechargeAddress: '充值地址',
						CopyAddress: "复制地址",
						recharge: "充币"
					},
					en: {
						SwitchCurrency: 'Switch Currency',
						RechargeAddress: 'Recharge Address',
						CopyAddress: "Copy Address",
						recharge: "Recharge"
					}
				},
			}
		},
		created() {
			this.getCoinList();
			this.setNavBarTitle('recharge');
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './rechargeDetail?coinName='+this.selectedCoin.coinName
			})
		},
		methods: {
			selectCoin(item) {
				if(this.selectedCoin != item) {
					this.selectedCoin = item;
					this.getCoinAddress(item.coinName);
				}
				this.coinListShow = false;
			},
			getCoinList() {
				this.$u.api.getCoinList().then(res => {
					this.coinList = res.data.filter(v => v.allowRecharge == 1);
					if(this.coinList.length) {
						this.selectedCoin = this.coinList[0];
						this.getCoinAddress(this.coinList[0].coinName)
					}
					console.log(res)
				})
			},
			getCoinAddress(coinName) {
				this.$u.api.getCoinAddress(coinName).then(res => {
					this.rechargeAddress = res.data;
					qrcode.make({
						canvasId: 'qrcode',
						text: this.rechargeAddress,
						size: 200,
						margin: 10,
						success: res => {
							console.log(res);
						},
						complete: () => {}
					})
				}, err => {
					this.$u.toast(err.msg);
				});
			},
			copyAddress() {
				if(this.rechargeAddress) {
					uni.setClipboardData({
					    data: this.rechargeAddress,
					    success() {
							this.$u.toast('已复制！');
					    }
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.recharge-add{
		.recharge-add-inner{
			padding: 30rpx;
		}
		
		.copy-address{
			.copy-address-button{
				border-radius: 50rpx;
				font-size: 32rpx;
			}
		}
		.recharge-coin{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 120rpx 0;
			
			.recharge-qrcode{
				width: 160px;
				height: 160px;
				background-color: #fff;
			}
			.recharge-address{
				margin-top: 50rpx;
			}
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
