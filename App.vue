<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
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
