<template>
	<view class="common-bg" :class="step === '3' ? 'whiteBg' : ''">
		<view v-if="step == '1'">
			<u-cell-group>
				<u-cell-item title="当前手机号" :value="123456" :arrow="false"></u-cell-item>
				<u-field v-model="captcha" 
					label="图形验证码" 
					placeholder="图形验证码" 
					input-align="right" 
					:label-width="150" 
					:error-message="errorMessage1">
					<view class="imgtext" slot="right" @tap="imgyzm">{{imgCode}}</view>
				</u-field>
				<u-field v-model="code" label="短信验证码" placeholder="短信验证码" password input-align="right" :label-width="150" 
				 :error-message="errorMessage2">
					<u-button size="mini" slot="right" type="success" @tap="getCode">{{codeText}}</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</u-cell-group>
			<view class="bottom-button">
				<button type="warn" class="btn" @click="step = '2'">下一步</button>
			</view>
		</view>
		<view v-if="step == '2'">
			<u-cell-group>
				<u-field v-model="newPhone" label="新手机号" input-align="right" :label-width="150" :error-message="errorMessage"></u-field>
				<u-field v-model="captcha" 
					label="图形验证码" 
					placeholder="图形验证码" 
					input-align="right" 
					:label-width="150" 
					:error-message="errorMessage1">
					<view class="imgtext" slot="right" @tap="imgyzm">{{imgCode}}</view>
				</u-field>
				<u-field v-model="code" label="短信验证码" placeholder="短信验证码" password input-align="right" :label-width="150" 
				 :error-message="errorMessage2">
					<u-button size="mini" slot="right" type="success" @tap="getCode">{{codeText}}</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</u-cell-group>
			<view class="bottom-button">
				<button type="warn" class="btn" shape="circle" @click="codeChangelist">确认修改</button>
			</view>
		</view>
		<view v-if="step == '3'">
			<view class="modify-success">
				<view class="success-message">
					<image src="../../../static/success.png" class="success-image"></image>
					<view class="success-text">修改手机号码成功</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPhone: '',
				captcha: '',
				code: '',
				codeText: '',
				// ------ 用于校验 -----
				// 短信验证码
				SMSCode:'',
				// 图形验证码
				imgCode:"",
				// ------  ---- -------
				errorMessage: '',
				errorMessage1: '',
				errorMessage2: '',
				step: '1'
			}
		},
		onLoad(options) {
			this.step = options.step;
			//this.imgyzm()
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			async imgyzm(){
				let rest = await this.$u.api.getImage().then(res => {
					this.imgCode = res
				})
			},
			async codeChangelist(){
				if(this.phone !=''){
					if(this.$u.test.mobile(this.phone)==false){
						console.log()
						this.errorMessage = "该手机号不存在 "
						return
					} else{
						this.errorMessage=" "
					}
					if(this.img != this.imgCode){
						this.errorMessage1 ="图形验证码不正确 "
						return
					} else{
						this.errorMessage1=" "
					}
					if(this.code != this.codedata){
						this.errorMessage2 ="短信验证码不正确 "
						return
					}else{
						this.errorMessage2=" "
					}
					let params = {
						phone: this.phone,
						phoneCode: this.code
					}
					let rest = await this.$u.api.getphoneUrl(params).then(res => {
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success',
						})
						uni.navigateTo({
							url:'/pages/login/login'
						})
					},error=>{
						this.$refs.uToast.show({
							title: '修改失败',
							type: 'error'
						})
					})
				}
			},

			async getCode() {
				if(this.phone !='' || this.phone==null || this.phone !==undefined){
					if (this.$refs.uCode.canGetCode) {
							this.$u.get('SMS/sendShortMessage/'+this.phone, {}).then(res => {
								this.SMSCode=res
							})
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 1000);
					} else {
						this.$u.toast('倒计时结束后再发送');
					}
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.whiteBg{
		background-color: #fff;
	}
	.imgtext {
		width: 120rpx;
		height: 59rpx;
		background: rgba(243, 243, 243, 1);
		text-align: center;
		line-height: 59rpx;
	}
	
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
