<template>
	<view class="container1">
		<u-cell-group>
				<u-field v-model="phone"label="手机号" :input-align="input" :label-width="lwh"  placeholder="请输入手机号" :error-message="errorMessage"></u-field>
				<u-field v-model="code" label="短信验证码" placeholder="短信验证码" :input-align="input" :label-width="lwh" :error-message="errorMessage1">
				<u-button size="mini" slot="right" type="error" @tap="getCode">{{codeText}}</u-button></u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
				<u-field v-model="oldPassword"label="新密码"  :input-align="input" :label-width="lwh"  placeholder="8-20位数字,字母组合" password :error-message="errorMessage3"></u-field>
				<u-field v-model="newPassword"label="确认新密码" :input-align="input" :label-width="lwh"  placeholder="请再次输入新密码" :error-message="errorMessage2" password></u-field>
			</u-cell-group>
			<u-button type="error" class="btn" shape="circle" @click="codeChangelist">确认修改</u-button>
      <u-toast ref="uToast" />
    </view>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				phone:'',
				code:'',
				codedata:'',
				input:"right",
				lwh:150,
				codeText:"",
				errorMessage:'',
				errorMessage1:'',
				errorMessage2:'',
        errorMessage3:'',
			}
		},
		methods: {
			   async codeChangelist() {
					 if(this.phone !=''){
						 if(this.$u.test.mobile(this.phone)==false){
						 	console.log()
						 	this.errorMessage = "该手机号不存在 "
						 	return
						 } else{
						 	this.errorMessage=" "
						 }
						 if(this.code != this.codedata){
						 	this.errorMessage1 ="短信验证码不正确 "
						 	return
						 }else{
						 	this.errorMessage1=" "
						 }
             if(this.$u.test.rangeLength(this.oldPassword, [8, 20]) !=true ||this.$u.test.enOrNum(this.oldPassword) !=true){
               this.errorMessage3 = "新密码格式不符合要求 "
               return
             }else{
               this.errorMessage3=" "
             }
						 if(this.oldPassword != this.newPassword){
						 	this.errorMessage2="两次密码不一致 "
						 	return
						 }else{
						 	this.errorMessage2=" "
						 }
					 }
					 let params = {
						 password:  md5Libs.md5(this.newPassword),
						 phone: this.phone,
						 phoneCode: this.code
					 }
			    await this.$u.api.getmodification(params).then(res => {
            uni.switchTab({
              url:`pages/login/login`
            })
			    })
			   },
			codeChange(text) {
				this.codeText = text;
			},
			async getCode() {
				if(this.phone !='' || this.phone==null || this.phone !==undefined){
					if (this.$refs.uCode.canGetCode) {
							this.$u.get('SMS/sendShortMessage/'+this.phone, {}).then(res => {
								this.codedata=res.data
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
	.btn{
		margin-top: 40rpx;
	}
</style>
