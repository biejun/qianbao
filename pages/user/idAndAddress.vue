<template>
	<view class="common-bg id-and-address">
		<!-- <view class="tips">用于区块玩家内部转账或分享！</view> -->
		<view class="recharge-coin">
			<view class="recharge-qrcode">
				<canvas canvas-id="qrcode" :style="{width: `150px`, height: `150px`}"/>
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
						CopyAddress: "复制地址",
					},
					en: {
						Address: 'Address',
						CopyAddress: "Copy Address",
					}
				},
			}
		},
		created() {
			this.address = this.vuex_address;
			this.getAddress();
		},
		methods: {
			getAddress() {
				qrcode.make({
					canvasId: 'qrcode',
					text: this.address,
					size: 200,
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
							this.$u.toast('复制成功！');
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
				max-width: 60%;
				margin: auto;
				word-break: break-all;
				padding-top: 40rpx;
			}
		}
	}
</style>
