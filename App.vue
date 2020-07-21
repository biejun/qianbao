<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
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
