<template>
	<view class="game-page">
		<view class="game-loadImg">
			<image src="/static/game-logo.png" class="game-logo"></image>
		</view>
		<view class="game-process-wrap">
			<view class="game-process-bar">
				<view class="game-process" :style="{width: process+'%'}"></view>
			</view>
			<view class="game-text">{{$t('Loading')}} {{process}}%</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				process: 0,
				i18n:{
					zh: {
						Loading: '正在载入',
					},
					en: {
						Loading: 'Loading'
					}
				}
			}
		},
		onReady() {
			if(this.process === 0) {
				this.loadProcess();
			}
		},
		onShow() {
			if(this.process === 100) {
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/ecology/lecai/index'
					})
				}, 450)
			}
		},
		methods: {
			loadProcess() {
				if(!this._timer) {
					this._timer = setInterval(() => {
						if(this.process === 100) {
							clearInterval(this._timer);
							this._timer = null;
							uni.navigateTo({
								url: '/pages/ecology/lecai/index'
							})
							return;
						}
						this.process++;
					}, 20);
				}

			}
		},
		beforeDestroy() {
			if(this._timer) {
				clearInterval(this._timer);
				this._timer = null;
			}
		}
	}
</script>

<style lang="scss">
	.game-page{
		position: relative;
		height: 100%;
		
		.game-loadImg{
			position: absolute;
			top: 20%;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			height: 200rpx;
			justify-content: center;
			
			.game-logo{
				width: 190rpx;
				height: 190rpx;
			}
		}
		
		.game-process-wrap{
			position: absolute;
			bottom: 140rpx;
			left: 15%;
			right: 15%;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.game-process-bar{
				width: 100%;
				height: 26rpx;
				border: 2rpx solid $uni-color-primary;
				border-radius: 26rpx;
				
				.game-process{
					height: 100%;
					border-radius: 20rpx;
					background-color: $uni-color-primary;
					border-radius: 26rpx;
				}
			}
			
			.game-text{
				color: #333333;
				margin-top: 20rpx;
			}
		}
		
	}
</style>
