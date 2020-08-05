<template>
	<view class="common-bg id-and-address">
		<!-- <view class="tips">用于区块玩家内部转账或分享！</view> -->
		<view class="recharge-coin">
			<view class="recharge-qrcode">
				<canvas canvas-id="qrcode" :style="{width: `160px`, height: `160px`}"/>
			</view>
			<view class="recharge-address">
				{{$t('Address')}}：
				<view>{{address}}</view>
			</view>
		</view>
		<view class="copy-address">
			<button type="default" class="copy-address-button" @click="copyAddress" :disabled="address === null">{{$t('CopyAddress')}}</button>
		</view>
	</view>
</template>

<script>
	import qrcode from '@/common/uqrcode.js';
	export default{
		data() {
			return {
				address: null,
				i18n: {
					zh: {
						Address: '身份/地址',
						CopyAddress: "復制地址",
						copySuccess: "復制成功!"
					},
					en: {
						Address: 'Address',
						CopyAddress: "Copy Address",
						copySuccess: "Copied!"
					}
				},
			}
		},
		created() {
			this.address = this.vuex_address;
			this.getAddress();
			this.setNavBarTitle('Address');
		},
		methods: {
			getAddress() {
				qrcode.make({
					canvasId: 'qrcode',
					text: this.address,
					size: 160,
					margin: 10,
					success: res => {
						console.log(res);
					},
					complete: () => {}
				})
			},
			copyAddress() {
				if(this.address) {
					uni.setClipboardData({
					    data: this.address,
					    success() {
							this.$u.toast(this.$t('copySuccess'));
					    }
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.id-and-address{
		padding: 30rpx;
		background-color: #F2F3FE;
		.tips{
			padding-top: 100rpx;
			font-size: 26rpx;
			color: #333;
			text-align: center;
		}
		
		.copy-address{
			.copy-address-button{
				border-radius: 50rpx;
				font-size: 32rpx;
				background-color: #FFC000;
				color: #fff;
				
				&:after{
					border-color: $uni-color-primary;
				}
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
				margin: auto;
				width: 90%;
				padding-top: 70rpx;
				word-wrap: break-word;
				word-break: break-all;
				text-align: center;
			}
		}
	}
</style>
