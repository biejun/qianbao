<template>
	<view class="register">
  <!--  <image src="../../static/log/zhucebj.png" mode=""></image> -->
    <image src="../../static/logo/zhucebj.png" mode=""></image>
    <view class="login-center">
     	<u-cell-group>
     		<u-field v-model="phone" placeholder="请输入注册手机号" :error-message="errorMessage"></u-field>
     		<u-field v-model="code" placeholder="请输入短信验证码" :error-message="errorMessage1">
          <u-button size="mini" slot="right" type="error" @click="getCode">{{codeText}}</u-button>
        </u-field>
        <u-field v-model="oldPassword" placeholder="请输入登录密码" :error-message="errorMessage3" password ></u-field>
        <u-field v-model="newPassword" placeholder="请再次输入登录密码" :error-message="errorMessage2" password></u-field>
        <u-field v-model="invitation" placeholder="请输入邀请码" :error-message="errorMessage4" ></u-field>
     		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
     	</u-cell-group>
      <u-button type="error" @tap="codeChangelist" class="btns" shape="circle">注册</u-button>
    </view>
    <u-toast ref="uToast" />
	</view>
</template>

<script>
  import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				phone : '',
        code: '',
        oldPassword: '',
        newPassword: '',
        codeText: '',
        invitation:'',
        errorMessage:'',
        errorMessage1:'',
        errorMessage2:'',
        errorMessage3:'',
        errorMessage4:''
			};
		},
    methods:{
      codeChange(text) {
      	this.codeText = text;
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
        if(this.code != this.codedata){
          this.errorMessage1 ="短信验证码不正确 "
          return
        }else{
          this.errorMessage1=" "
        }
        if(this.$u.test.rangeLength(this.oldPassword, [8, 20]) !=true ||this.$u.test.enOrNum(this.oldPassword) !=true){
           this.errorMessage3 = "密码格式不符合要求 "
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
        if(this.invitation == ''){
          this.errorMessage4="邀请码不能为空"
        }
       }
       let params = {
         "confirmPassword": md5Libs.md5(this.newPassword),
         	"inviteCode": this.invitation,
         	"password": md5Libs.md5(this.newPassword),
         	"phone": this.phone,
         	"phoneCode": this.code
       }
      await this.$u.api.getregister(params).then(res => {
        uni.navigateTo({
           url:`/pages/login/versions`
        })
        consent.log(rest)
      }, err =>{
          this.$refs.uToast.show({
             title:err.data.msg,
             type: 'error',
          });
      })
     },
    async getCode() {
      if(this.phone !='' || this.phone==null || this.phone !==undefined){
        if (this.$refs.uCode.canGetCode) {
            this.$u.get('SMS/sendShortMessage/'+this.phone, {}).then(res => {
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
    },
	}
</script>

<style lang="scss" scoped>
  .register{
    image{
      height: 520rpx;
      width: 100%;
    }
    .login-center{
      padding: 50rpx;
    }
  }
</style>
