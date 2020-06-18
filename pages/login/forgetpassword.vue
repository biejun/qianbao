<template>
	<view class="forget">
			<u-cell-group>
					<u-field v-model="phone"label="手机号"placeholder="11位手机号" :input-align="input" :label-width="lwh" :error-message="errorMessage"></u-field>
					<u-field v-model="img" label="图形验证码" placeholder="图形验证码" :input-align="input" :label-width="lwh" :error-message="errorMessage1">
						<view class="imgtext" slot="button" @tap="imgyzm">{{imgtext}}</view>
					</u-field>
					<u-field v-model="code" label="短信验证码" placeholder="短信验证码" :label-width="lwh" :input-align="input" :error-message="errorMessage2">
						<u-button size="mini" slot="button" type="success" @tap="getCode">{{codeText}}</u-button>
					</u-field>
					<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
					<u-field v-model="password"label="新密码"placeholder="8-20位数字,字母组合" :input-align="input" :label-width="lwh" :error-message="errorMessage3" password></u-field>
					<u-field v-model="newpassword"label="确认新密码"placeholder="与新密码保持一致" :input-align="input" :label-width="lwh" :error-message="errorMessage4" password></u-field>
				</u-cell-group>
				<u-button type="success" class="btn" shape="circle" @click="codeChangelist">确认修改</u-button>
				<u-toast ref="uToast" />
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				phone: '',
				img:'',
				code: '',
				codeText: '',
				codedata:'',
				password: '',
				newpassword:'',
				input:"right",
				lwh:150,
				imgtext:"esdf",
				errorMessage:'',
				errorMessage1:'',
				errorMessage2:'',
				errorMessage3:'',
				errorMessage4:'',
			};
		},
		onLoad() {
			this.imgyzm()
		},
		methods:{
			async imgyzm(){
					let rest = await this.$u.api.getImage().then(res => {
						this.imgtext = res
						console.log(res)
					})
			},
			async codeChangelist() {
				if(this.phone !=''){
					if(this.$u.test.mobile(this.phone)==false){
						console.log()
						this.errorMessage = "该手机号不存在 "
						return
					} else{
						this.errorMessage=" "
					}
					if(this.img != this.imgtext){
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
					if(this.$u.test.rangeLength(this.password, [8, 20]) !=true ||this.$u.test.enOrNum(this.password) !=true){
						this.errorMessage3 = "新密码格式不符合要求 "
						return
					}else{
						this.errorMessage3=" "
					}
					if(this.newpassword != this.password){
						this.errorMessage4="两次密码不一致 "
						return
					}else{
						this.errorMessage3=" "
					}
					let params = {
						 password:  md5Libs.md5(this.newpassword),
						 phone: this.phone,
						 phoneCode: this.code
					}
					let rest = await this.$u.api.getPasswor(params).then(res => {
					 this.$refs.uToast.show({
					 		title: '修改成功',
					 		type: 'success',
					 	})
						this.$u.route('/pages/login/login');						
					 },error=>{
					 	this.$refs.uToast.show({
					 		title: '修改失败',
					 		type: 'error'
					 	})
					})
					
				}
				// uni.switchTab({
				// 	url:`/pages/puzzle/puzzle`
				// })
			},
	codeChange(text) {
		this.codeText = text;
	},
	chebtn(){
		this.checken=this.checken==true?false:true
	},
	async getCode() {
		if(this.phone !='' || this.phone==null || this.phone !==undefined){
			if (this.$refs.uCode.canGetCode) {
						this.$u.get('SMS/sendShortMessage/'+this.phone, {}).then(res => {
							// res为服务端返回的数据
						this.codedata=res
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

<style lang="scss">
	.forget{
		background: #f3f3f3;
		height: 100vh;
		.imgtext{
			width: 120rpx;
			height: 59rpx;
			background:rgba(243,243,243,1);
			text-align: center;
			line-height: 59rpx;
		}
		.btn{
			margin-top: 50rpx;
			width:690rpx;
			height:88rpx;
			background:rgba(37,173,135,1);
		}
	}
</style>
