<template>
	<view class="login">
		<view class="loginlist ">
			<view class="login-top">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="login-center">
				<u-cell-group>
					<u-field v-model="mobile" placeholder="手机号码" :error-message="errorMessage" :list="mobile"></u-field>
					<u-field v-model="code" placeholder="登录密码" :error-message="errorMessage1" password>
						<view slot="right" @click="forget" style="color:#1296DB">忘记密码？</view>
					</u-field>
				</u-cell-group>
				<view class="btns">
					<u-button type="error" @click="codeChange" shape="circle">登录</u-button>
				</view>
				<view style="text-align: right;">新用户快速注册</view>
			</view>
			<view class="login-bottom">
				<view @click="note(1)">
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
					let params = {
						password: md5Libs.md5(this.code),
						phone: this.mobile,
						phoneCode: this.code
					}
					let rest = await this.$u.api.getLog(params).then(res => {
						this.$u.vuex('vuex_token', res.token);
						this.$u.vuex('vuex_hasLogin', true);
						this.$u.vuex('vue_phone', this.mobile);
						this.getGet()
						uni.switchTab({
							url: `/pages/puzzle/puzzle`
						})
					}, error => {
						this.$u.toast(error.data.msg);
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
					this.$u.vuex('vuex_from.userName', res.nickName);
					this.$u.vuex('vuex_img', res.avatar);
				})
			},
			note(key) {
				if (key == 1) {
					uni.navigateTo({
						url: `/pages/login/loginzc`
					})
				} else {

				}
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
