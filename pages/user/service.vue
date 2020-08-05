<template>
<!-- 	<view class="common-bg service">
		<view class="reply-wrap">
			<view class="message-input-bar">
				<input type="input" v-model="value" class="msg-input">
			</view>
		</view>
	</view> -->
	<view class="gongdan">
<!-- 		<u-form :model="form" ref="uForm" label-position="top" class="form">
			<u-form-item label="标题" prop="title"><u-input v-model="form.title" placeholder="请输入标题"/></u-form-item>
			<u-form-item label="联系方式" prop="userContract"><u-input v-model="form.userContract" placeholder="手机号/邮箱"/></u-form-item>
			<u-form-item label="内容">
				<u-input v-model="form.content" type="textarea"  placeholder="描述你的需求" />
			</u-form-item>
		</u-form>
		<view class="button">
			<u-button size="default" :disabled="isSubmit" @click="submit" :custom-style="customStyle" hover-class="none">提交</u-button>
		</view>
		<u-modal v-model="show" :content="content" cancel-color="#6D6D6D" confirm-color="#F1353F" confirm-text="好的"></u-modal> -->
		<view class="pls-read"><navigator url="/pages/register/service-terms">{{$t('pls')}}</navigator></view>
	</view>
</template>

<script>
	export default {
		// data() {
		// 	return {
		// 		value: ''
		// 	};
		// },
		data() {
			return {
				isSubmit: false,
				form: {
					title: '',
					userContract: '',
					content: ''
				},
				rules: {
					title: [
						{
							required: true, 
							message: '请输入标题', 
							trigger: 'blur',
						}
					],
					userContract: [
						{
							required: true,
							message: '请填写联系方式', 
							trigger: 'blur'
						}
					]
				},
				customStyle: {
					backgroundColor: '#fcc82b',
					color: "#fff",
					borderColor: "#fcc82b"
				},
				show: false,
				content: '提交成功，等待客服回复',
				i18n: {
					zh: {
						pls: '請閱讀服務條款',
						service: "客服",
					},
					en: {
						pls: 'Please read the terms of service',
						service: "Service",
					}
				}
			};
		},
		methods:{
			submit() {
				if(this.isSubmit) return;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.isSubmit = true;
						this.$u.post('/message/contract', this.form).then(res => {
							this.show = true;
							this.isSubmit = false;
						})
					}
				});

			}
		},
		created() {
			this.setNavBarTitle('service');
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			//this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	.pls-read{
		font-size: 32rpx;
		text-align: center;
		text-decoration: underline;
		color: #4FB5EF;
	}
	.gongdan{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		// .form{
		// 	background-color: #fff;
		// 	padding: 0 30rpx;
		// }
		// .button{
		// 	padding: 30rpx;
		// 	margin-top: 30rpx;
		// }
	}
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
 