<template>
	<view class="common-bg">
		<u-cell-group>
			<u-cell-item :title="$t('PhoneNumber')" :value="vue_phone" @click="goUrl('modifyPhone?step=1')"></u-cell-item>
			<u-cell-item :title="$t('LoginPassword')" @click="goUrl('modifyLoginPassword')"></u-cell-item>
			<u-cell-item :title="$t('PaymentPassword')" @click="goUrl('modifyPayPassword')"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				i18n: {
					zh: {
						PhoneNumber: "手机号码",
						LoginPassword: "登录密码",
						PaymentPassword: "支付密码"
					},
					en: {
						PhoneNumber: "Phone Number",
						LoginPassword: "Login Password",
						PaymentPassword: "Payment Password"
					}
				},
			}
		},
		methods: {
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/user/security/'+ page
				})
			}
		}
	}
</script>

<style>
</style>
