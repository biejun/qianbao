<template>
	<view class="common-bg learn-id">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				content: ""
			}
		},
		created() {
			this.$u.api.getTextContext(5).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.textTitle
				})
				this.content = res.data.content;
			})
		}
	}
</script>

<style lang="scss">
	.learn-id{
		padding: 30rpx;
		overflow: auto;
		
		/deep/ .h3{
			font-size: 32rpx;
			color: #353535;
			margin: 20rpx 0;
			font-weight: bold;
		}
		
		/deep/ .content{
			color: #5F5F5F;
			font-size: 24rpx;
			text-indent: 40rpx;
			word-wrap: break-word;			word-break: break-all;
		}
	}
</style>
