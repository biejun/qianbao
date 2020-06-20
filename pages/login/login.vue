<template>
	<view class="login">
		<view class="loginlist ">
			<view class="login-top">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="login-center">
				<u-cell-group :border="false">
					<u-field v-model="mobile" label-width="0" placeholder="手机号码" :error-message="errorMessage" :list="mobile"></u-field>
					<u-field v-model="code" label-width="0" placeholder="登录密码" :error-message="errorMessage1" password>
						<view slot="right" @click="forget" style="color:#1296DB">忘记密码？</view>
					</u-field>
				</u-cell-group>
				<view class="btns">
					<u-button type="error" @click="codeChange" shape="circle">登录</u-button>
				</view>
				<view style="text-align: right;" @click="register">新用户快速注册</view>
			</view>
			<view class="login-bottom">
				<view @click="register">
					<image src="../../static/icon_duanxin.png" mode=""></image>
					<view>短信登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				errorMessage: '',
				errorMessage1: '',
			};
		},
		methods: {
			async codeChange() {
				if (this.$u.test.mobile(this.mobile) == false) {
					this.errorMessage = "该手机号不存在 "
				} else {
					if(this.code === '') {
						this.errorMessage1 = "请输入密码"
						return;
					}
					let params = {
						password: md5Libs.md5(this.code),
						phone: this.mobile,
					}
					let rest = await this.$u.api.getLog(params).then(res => {
						this.$u.vuex('vuex_token', res.data.token);
						this.$u.vuex('vuex_hasLogin', true);
						this.$u.vuex('vue_phone', this.mobile);
						this.getGet()
						uni.switchTab({
						  url:`/pages/index/index`
						})
					}, err => {
						this.$u.toast(err.msg);
					})
					this.errorMessage = " "
				}
				// this.$u.route('/pages/puzzle/puzzle');
			},
			forget() {
				this.$u.route('/pages/login/forgetpassword');
			},
			async getGet() {
				let rest = await this.$u.api.getUser().then(res => {
					this.$u.vuex('vuex_from.userName', res.data.nickName);
					this.$u.vuex('vuex_img', res.data.avatar);
				})
			},
			register() {
				uni.navigateTo({
					url: `/pages/login/loginzc`
				})
			},
		}
	}
</script>

<style lang="scss">
	.login-center .u-field-inner {
		display: inline-block !important;
	}

	.login {
		text-align: center;

		.loginlist {
			.login-top {
				padding: 100rpx;

				image {
					width: 220rpx;
					height: 220rpx;
				}
			}

			.login-center {
				padding: 0rpx 100rpx 100rpx;

				.btns {
					border-top: 2rpx solid #f3f3f3;
					padding: 60rpx 0 20rpx 0;
				}
			}

			.login-bottom {
				display: flex;
				justify-content: center;

				image {
					width: 90rpx;
					height: 90rpx;
					padding: 10rpx 60rpx;
				}
			}
		}
	}
</style>
