<template>
	<view class="learn-ex">
		<view class="inner">
			<u-parse :html="content"></u-parse>
		</view>
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
			this.$u.api.getTextContext(3).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.textTitle
				})
				this.content = res.data.content;
			})
		}
	}
</script>

<style lang="scss">
	.learn-ex{
		height: 100%;
		background-color: #F2F3FE;
		
		.inner{
			padding: 30rpx;
			
			/deep/ p{
				word-wrap: break-word;
				word-break: break-all;
			}
			
			/deep/ .text{
				position: relative;
				font-size: 29rpx;
				color: #585858;
				padding: 10rpx 0 10rpx 40rpx;
				
				&::before{
					position: absolute;
					left: 0;
					top: 50%;
					content: "";
					width: 20rpx;
					height: 20rpx;
					margin-top: -10rpx;
					background: #F6B37F;
					border-radius: 50%;
				}
			}
		}
	}
</style>
