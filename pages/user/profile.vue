<template>
	<view class="common-bg profile">
		<u-cell-group>
			<u-cell-item title="头像" :arrow="false" @click="img" center>
				<u-avatar :src="vuex_img" size="mini"></u-avatar>
			</u-cell-item>
			<u-cell-item title="昵称" :arrow="false"><input type="text" :value="vuex_from.userName" style="font-size: 14px;" @blur="onKeyInput"/></u-cell-item>
			<u-cell-item title="性别" :arrow="false">
				<picker @change="onSexConfirm" :value="index" :range="array">
					<view class="uni-input" style="font-size: 14px;">{{vuex_from.sex}}</view>
				</picker>
			</u-cell-item>
		</u-cell-group>
		<view class="setting-bottom">
			<button type="warn" @click="goSetting" class="btn">退出登录</button>
		</view>
		<u-modal v-model="show1" :content="content" :mask-close-able="true" :show-title="false" :show-cancel-button="true"
		 @confirm="confirm(1)"></u-modal>
		 <u-modal v-model="show2" :content="contentlst" :mask-close-able="true" :show-title="false" :show-cancel-button="true"
		  @confirm="confirm(2)"></u-modal>
		  <u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// form: {
				// 	userName: ''
				// },
				show1: false,
				show2: false,
				content: '确定退出登录吗',
				contentlst: '还未登录，去登陆吗？',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
				},
				array: ['男', '女'],
				index: 0,
			}
		},
		async onLoad() {
			if (this.vuex_hasLogin == true) {
				await this.$u.api.getUser().then(res => {
					let bdfrom = {
						userName: res.data.nickName || '',
						sex: res.data.gender || '女',
					}
					// this.$u.vuex('vuex_img', res.avatar);
					this.$u.vuex('vuex_from', bdfrom);
				})
			}
		},
		methods: {
			async getupdate(img, sex, userName) {
				if (this.vuex_hasLogin == true) {
					let params = {
						logo: img || '',
						gender: sex || '',
						nickName: userName || '',
					}
					await this.$u.api.getupdateUrl(params).then(res => {
						let bdfrom = {
							userName: res.data.nickName || '',
							sex: res.data.gender || '女',
							avatar: res.data.logo
						}
						this.$u.vuex('vuex_img', res.data.logo);
						this.$u.vuex('vuex_from', bdfrom);
					})
				} else if (this.vuex_hasLogin == false) {
					this.show2 = true
					this.$refs.uToast.show({
						title: '还未登录',
						type: 'success',
					})
				}
			},

			img() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let url = res.tempFiles[0].path
						this.getupdate(url)
						this.$u.vuex('vuex_img', url);
					}.bind(this),
				});
			},
			onKeyInput(e) {
				let userName = e.detail.value
				this.getupdate('', '', userName)
				// this.$u.vuex('vuex_from.userName', userName);
			},
			onSexConfirm(e) {
				let sex = e.target.value
				this.getupdate('', this.array[sex], '')
				// this.$u.vuex('vuex_from.sex', this.array[sex] );
			},
			// onInput(e) {
			// 	let birthday = e.year+"."+e.month+"."+e.day
			// 	this.$u.vuex('vuex_from.birthday', birthday);
			// 	// this.profile.birthday = value
			// 	// HttpCache.put('birthday',value)
			// 	this.show = false;
			// },
			goSetting() {
				this.show1 = true;
				this.$u.vuex('vuex_img', '');
				this.$u.vuex('vuex_from', '');
			},
			async confirm(index) {
				if (index === 1) {
						this.$u.vuex('vuex_hasLogin', false)
						this.$u.vuex('vuex_token', '');
						this.$u.vuex('vue_phone', '')
						let bdfrom = {
							userName: '立即登录',
							sex: '女',
							avatar: ''
						}
						this.$u.vuex('vuex_from', bdfrom);
						uni.navigateTo({
							url: '/pages/login/login'
						})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			router(i) {
				if (i == 1) {
					this.$u.route('/pages/user/setting/security');
				} else {
					this.$u.route('/pages/user/setting/aboutus');
				}
			},
		}
	}
</script>

<style lang="scss">
	.profile {

		.avatar {
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			background-color: #ddd;
		}

		.setting-bottom {
			padding: 40rpx 30rpx;
			
			.btn {
				margin-top: 50rpx;
				border-radius: 50rpx;
				font-size: 32rpx;
			}
		}
	}
</style>
