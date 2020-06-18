<template>
	<view class="common-bg">
		<u-cell-group>
			<u-cell-item title="手机号码" value="139***3222" @click="goUrl('modifyPhone?step=1')"></u-cell-item>
			<u-cell-item title="登录密码" @click="goUrl('modifyLoginPassword')"></u-cell-item>
			<u-cell-item title="支付密码" @click="goUrl('modifyPayPassword')"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
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
