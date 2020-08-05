<template>
	<view class="common-bg create-success">
		<view class="item-SEFW">
			<view class="item-label-DESC2">{{$t('pri')}}</view>
			<view class="content">
				<u-icon @click="showPrivateKey = !showPrivateKey" :name="showPrivateKey ? 'eye-fill' : 'eye'" class="icon"></u-icon>
				<u-input :value="privateKey" type="textarea" :clearable="false"/>
			</view>
		</view>
		<view class="item-SEFW">
			<view class="item-label-DESC2">{{$t('ad')}}</view>
			<view class="content">
				<u-icon  @click="showAddress = !showAddress" :name="showAddress ? 'eye-fill' : 'eye'" class="icon"></u-icon>
				<u-input :value="addressKey" type="textarea" :clearable="false"/>
			</view>
		</view>
		<view class="item-right-tip">{{$t('tip1')}}</view>
		<button type="default" class="submit-button" @click="submit">{{$t('g')}}</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				showPrivateKey: false,
				showAddress: false,
				i18n: {
					zh: {
						title: "創建身份/地址成功",
						pri: "您的私鑰",
						ad: "您的身份/地址：",
						tip1: "這是您在區塊鏈上的身份，也是數字貨幣GCN的轉賬地址！",
						g: "生成私鑰助記詞"
					},
					en: {
						title: "Create identity / address successfully",
						pri: "Your private key",
						ad: "Your identity / address",
						tip1: "This is your identity on the blockchain and the transfer address of digital currency GCN!",
						g: "Generating private key mnemonics"
					}
				}
			}
		},
		created() {
			this.setNavBarTitle('title');
		},
		methods: {
			submit() {
				uni.navigateTo({
					url: '/pages/mnemonic/index'
				})
			}
		},
		computed: {
			privateKey() {
				return this.showPrivateKey ? this.vuex_privateKey : this.vuex_privateKey.replace(/\S/g,'*');
			},
			addressKey() {
				return this.showAddress ? this.vuex_address : this.vuex_address.replace(/\S/g,'*');
			}
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			if(e.index === 0) {
				uni.navigateTo({
					url: './learn-more'
				})
			}
		},
	}
</script>

<style lang="scss">
	.create-success{
		padding: 30rpx;
		
		.content{
			position: relative;
			
		}
		
		.item-SEFW{
			position: relative;
			padding: 28rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			
			.icon{
				position: absolute;
				top: 10rpx;
				right: 0;
				z-index: 9;
				font-size: 34rpx;
				color: #888;
			}
			
			.item-label-DESC2{
				margin-bottom: 10rpx;
				font-size: 28rpx;
				color: #8F8F8F;
			}
			
			/deep/ .u-input{
				padding-right: 40rpx!important;
			}
		}
		.item-right-tip{
			text-align: right;
			color: #5B5959;
			font-size: 20rpx;
		}
		.submit-button{
			margin-top: 100rpx;
			font-size: 32rpx;
			background-color: #FFC000;
			color: #fff;
			
			&:after{
				border-color: #FFC000;
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
</style>
