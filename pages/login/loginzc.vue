<template>
	<view class="login">
		<view class="loginlist ">
			<view class="login-top">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="login-center">
				<u-cell-group :border="false">
					<u-field label-width="0" 
          v-model="mobile" placeholder="手机号码"
          right-icon="arrow-down-fill"
          >
          <view slot="right"  @tap="description">+86中国</view>
          </u-field>
					<u-field label-width="0" v-model="code" placeholder="短信验证码">
					<u-button size="mini" slot="right" type="error" @tap="getCode">{{codeText}}</u-button></u-field>
					<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
				</u-cell-group>
				<view class="btns">
					<u-button type="error" 
						@click="circledl" 
						shape="circle"
						:disabled="!checken"
						>
						登录
					</u-button>
					<view class="agree-wrap">
						<u-checkbox-group class="agree-checkbox" :wrap="true" :size="24">
							<u-checkbox 
								v-model="checken" 
								name="agree"
							>
							首次登录，填写手机号将为您创建新账号，代表您同意<text style="color: #1296DB;">《xxx用户组测协议》</text>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14" length="30%">
			<view class="pop">
				<u-cell-group>
					<u-field v-model="mobile1" placeholder="请填写登录密码" password></u-field>
					<u-field v-model="code2" placeholder="再次输入登陆密码":error-message="errorMessage" password ></u-field>
				</u-cell-group>
				<u-button type="error" @tap="getCodepop" class="btns" shape="circle">确认</u-button>
			</view>
			</u-popup>
		<u-toast ref="uToast"/>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText: '',
				checken:true,
				show: false,
				mobile1:'',
				code2:'',
				errorMessage:''
			};
		},
		methods: {
      // 区号
      description(){
        uni.navigateTo({
          url:`/pages/login/description/description`
        })
      },
			async circledl(){
				if(this.checken == true){
					let a ={"phone": this.mobile,"phoneCode": this.code}
					await this.$u.api.getInfo(a).then(res => {
            console.log(res.data.token)
						this.$u.vuex('vuex_token', res.data.token);
						this.$u.vuex('vuex_hasLogin', true);
						this.$u.vuex('vue_phone', this.mobile);
						this.getGet()
						if(res.data.user.isSetPassword==1){
							uni.switchTab({
								url:`/pages/index/index`
							})
						} else{
							this.show=true
						}
					
						},err => {
						this.$refs.uToast.show({
							title:err.msg,
							type: 'error',
						});
						console.log(err.msg);
					})
				} else{
					this.$refs.uToast.show({
						title:'请勾选用户协议',
						type: 'warning',
					});
				}
			},
			codeChange(text) {
				this.codeText = text;
			},
			async getCodepop(){
				if(this.mobile1 == this.code2){
					this.errorMessage=''
					let prams = {
						password:  md5Libs.md5(this.code2),
					}
					let rest = await this.$u.api.getsetPassword(prams).then(res => {
            this.$u.vuex('vuex_token', res.data.token);
            setTimeout(() => {
            	uni.switchTab({
            		url:`/pages/index/index`
            	})
            }, 1000);
					})
				}else{
					this.errorMessage='两次输入密码不一致'
				}
			},
			 async getGet() {
				let rest = await this.$u.api.getUser().then(res => {
					this.$u.vuex('vuex_from.userName', res.data.nickName);
					// this.$u.vuex('vuex_img', res.avatar);
				})
			},
			async getCode() {
				console.log('xxx')
				if(this.mobile !='' || this.mobile==null || this.mobile !==undefined){
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
							this.$u.get('SMS/sendShortMessage/'+this.mobile, {}).then(res => {
										// res为服务端返回的数据
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
	.pop{
		padding: 60rpx;
		.btns{
			
		}
	}
	.login {
		text-align: center;

		.loginlist {
			.login-top {
				padding: 100rpx;
				image {
					width: 220rpx;
					height: 220rpx;
				}
			}

			.login-center {
				padding: 60rpx 80rpx 100rpx 80rpx;
				.btns{
					border-top: 2rpx solid #f3f3f3;
					padding: 60rpx 0 20rpx 0;
				}
				.agree-wrap{
					padding-top: 30rpx;
					
					.agree-checkbox{
						.u-checkbox{
							align-items: flex-start;
							
							/deep/ .u-checkbox__icon-wrap{
								margin-top: 15rpx;
							}
						}
						
					}
				}
			}
		}
	}
</style>
