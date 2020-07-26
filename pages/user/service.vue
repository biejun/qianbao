<template>
	<view class="common-bg service">
		<view class="reply-wrap">
			<view class="message-input-bar">
				<input type="input" v-model="value" class="msg-input">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			};
		},
		methods:{

		}
	}
</script>

<style lang="scss">
	.service{
		position: relative;
		text-align: center;
		height: 100%;
		
		.reply-wrap{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 110rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			background-color: #EFEFEF;
			
			.message-input-bar{
				//padding-right: 20rpx;
				flex: 1;
			}
			
			.msg-input{
				text-align: left;
				height: 80rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				padding: 0 30rpx;
			}
			// .msg-button{
				
			// }
		}
	}
</style>
 