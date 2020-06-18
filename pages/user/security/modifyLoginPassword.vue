<template>
	<view class="common-bg">
		<view v-if="step == '1'">
			<u-cell-group>
				<u-field v-model="password" 
					label="旧密码" 
					placeholder="请输入旧密码" 
					input-align="right" 
					:label-width="150" 
					:error-message="errorMessage1">
				</u-field>
				<u-field v-model="newPassword" 
					label="新密码" 
					placeholder="请输入新密码" 
					password 
					input-align="right" 
					:label-width="150" 
					:error-message="errorMessage2">
				</u-field>
				<u-field v-model="confirmPassword"
					label="确认新密码" 
					placeholder="与新密码保持一致" 
					password 
					input-align="right" 
					:label-width="150" 
					:error-message="errorMessage2">
				</u-field>
			</u-cell-group>
			<view class="bottom-button">
				<button type="warn" class="btn">确认修改</button>
			</view>
		</view>
		<view v-else>

		</view>
	</view>
</template>

<script>
	import md5 from "uview-ui/libs/function/md5";
	export default{
		data() {
			return {
				password: '',
				newPassword: '',
				confirmPassword: '',
				errorMessage1: '',
				errorMessage2: '',
				step: '1'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-button{
		padding: 30rpx;
		
		.btn {
			margin-top: 50rpx;
			border-radius: 50rpx;
			font-size: 32rpx;
		}
	}
	
	.modify-success{
		padding-top: 200rpx;
		
		.success-message{
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.success-image{
				width: 200rpx;
				height: 200rpx;
			}
			
			.success-text{
				color: #A5A5A5;
				font-size: 30rpx;
				padding-top: 20rpx;
			}
		}
	}
</style>
