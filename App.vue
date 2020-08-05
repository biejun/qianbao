<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			let isIOS = plus.os.name === 'iOS', version = plus.runtime.version;
			
			this.$u.api.getVersion(isIOS ? 2 : 1, version).then(res => {
				let data = res.data;
				if(data && data.status) {
					let openUrl = res.data.url;
					let content = '';
					if(res.data.content) {
						if(res.data.content.indexOf(',') > -1) {
							content = res.data.content.split(',').map(v => v.trim()).join('\n')
						}else{
							content = res.data.content;
						}
					}else{
						content = '有新版本，是否选择更新';
					}
					uni.showModal({
					    title: '更新提示',
					    content: content,
					    success: (showResult) => {
					        if (showResult.confirm) {
					            plus.runtime.openURL(openUrl);
					        }
					    }
					})
				}
			})
			// #endif
		},
		onShow: function() {
			if(this.vuex_hasLogin) {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		watch: {
			vuex_statusCode(nCode, oCode) {
				if(nCode !== oCode && nCode !== '') {
					let mnemonic = this.vuex_mnemonic;
					if(nCode === 401 && mnemonic.length) {
						this.$u.post('/mnemonic/loginAccount', {
							mnemonic: mnemonic.join(' '),
							password: ""
						}).then(res => {
							//this.$u.vuex('vuex_privateKey', res.data.privateKey)
							this.$u.vuex('vuex_token', res.data.token)
							this.$u.vuex('vuex_hasLogin', true);
							this.$store.commit('SET_STATUS_CODE', '');
						});
					}
				}
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	
	/* #ifndef APP-PLUS-NVUE */
	@import "uview-ui/index.scss";
	
	page{
		height: 100%;
	}
	/* #endif*/
	
	.common-bg{
		height: 100%;
		background-color: $uni-bg-color-grey;
	}
</style>
