<template>
	<view class="setting-page">
		<view class="cell-item">
			<view class="item-left">
				<image src="/static/lang.png" class="lang-icon"></image>
				<text class="item-title">{{$t('language')}}</text>
			</view>
			<view>
				<view class="switch-lang">
					<view class="lang-text" @click="setLanguage('en')">英文</view>
					<view class="lang-text" @click="setLanguage('zh')">中文</view>
					<view class="lang-active" :class="[vuex_lang == 'zh'? 'right' : 'left']">
						<text class="text">{{vuex_lang == 'zh' ? '中文' : '英文'}}</text>
					</view>
				</view>
			</view>
		</view>
		<button type="default" class="logout-button" @click="submitLogout">{{$t('logout')}}</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				i18n: {
					zh: {
						language: "語言切換",
						setting: "設置",
						logout: "退出登錄"
					},
					en: {
						language: "Language",
						setting: "Setting",
						logout: "Log out"
					}
				}
			}
		},
		watch: {
			vuex_lang() {
				this.setNavBarTitle('setting');
			}
		},
		created() {
			this.setNavBarTitle('setting');
		},
		methods: {
			submitLogout() {
				this.$u.vuex('vuex_hasLogin', false);
				this.$u.vuex('vuex_mnemonic', [])
				this.$u.vuex('vuex_privateKey', '')
				this.$u.vuex('vuex_token', '')
				this.$u.vuex('vuex_address', '')
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	.setting-page{
		
		.cell-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 30rpx;
			border-top: 2rpx solid #E5E5E5;
			
			.item-left{
				display: flex;
				align-items: center;
			}
			.lang-icon{
				width: 45rpx;
				height: 45rpx;
			}
			.item-title{
				margin-left: 15rpx;
				font-size: 30rpx;
			}
		}
		
		.switch-lang{
			position: relative;
			width: 180rpx;
			height: 60rpx;
			border-radius: 60rpx;
			background-color: #FFC000;
			display: flex;
			align-items: center;
			
			.lang-text{
				color: #fff;
				width: 50%;
				text-align: center;
				font-size: 26rpx;
			}
			
			.lang-active{
				position: absolute;
				top: 2rpx;
				width: 50%;
				
				bottom: 2rpx;
				display: flex;
				align-items: center;
				border-radius: 60rpx;
				background-color: #fff;
				justify-content: center;
				.text{
					color: #FFC000;
				}
				
				&.right{
					right: 2rpx;
				}
				&.left{
					left: 2rpx;
				}
			}
		}
		
		.logout-button{
			border-radius: 20rpx;
			font-size: 32rpx;
			background-color: #FFC000;
			color: #fff;
			margin: 40rpx;
			margin-top: 130rpx;
			line-height: 2.777;
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
