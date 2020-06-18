<template>
	<view class="common-bg friends-index">
		<view class="search-wrap">
			<view class="search-bar">
				<view class="search-input">
					<u-icon name="search" class="search-icon"></u-icon>
					<u-icon name="close-circle-fill" class="close-icon" @click="clearInput" v-show="searchKeyword !== ''"></u-icon>
					<input type="text" 
						v-model="searchKeyword" 
						placeholder="通过手机号/昵称查找密友"
						:adjust-position="false"
						@focus="showSearchInputClose = true"
						@blur="showSearchInputClose = false">
				</view>
				<button type="warn" class="add-friends" size="mini" v-show="!showSearchInputClose">+密友</button>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item title="xinxi" :title-style="titleStyle" center :arrow="false">
				<u-avatar :src="src" slot="icon" size="mini"></u-avatar>
			</u-cell-item>
			<u-cell-item title="xinxi" :title-style="titleStyle" center :arrow="false">
				<u-avatar :src="src" slot="icon" size="mini"></u-avatar>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				showSearchInputClose: false,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				titleStyle: {
					'margin-left': '20rpx',
					'font-size': '32rpx',
					'color': '#333'
				}
			}
		},
		onReady() {
			this.setStyle(0, true, '9');
		},
		methods: {
			clearInput() {
				this.showSearchInputClose = true;
				this.searchKeyword = '';
			},
			/**
			 * 修改导航栏buttons
			 * index[number] 修改的buttons 下标索引，最右边索引为0
			 * show[boolean] 显示还是隐藏角标
			 * text[string] 需要修改的角标的text内容
			 */
			setStyle(index, show, text) {
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				if(show){
					currentWebview.setTitleNViewButtonBadge({index:index,text:text})
				}else{
					currentWebview.removeTitleNViewButtonBadge({index:index})
				}
				
				// #endif
			}
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			// 取消红点或者角标 
			this.setStyle(e.index,false);
			uni.navigateTo({
				url: './apply'
			})
		},
	}
</script>

<style lang="scss">
	.friends-index{
		.search-wrap{
			padding: 20rpx 30rpx;
			.search-bar{
				display: flex;
				height: 80rpx;
			}
			.search-input{
				position: relative;
				flex: 1 1;
				.search-icon{
					position: absolute;
					left: 30rpx;
					top: 20rpx;
					z-index: 99;
					font-size: 40rpx;
					color: #A5A5A5;
				}
				.close-icon{
					position: absolute;
					right: 0;
					top: 0;
					bottom: 0;
					line-height: 80rpx;
					z-index: 99;
					width: 50rpx;
					font-size: 40rpx;
					color: #A5A5A5;
				}
				input{
					padding: 20rpx 80rpx;
					height: 40rpx;
					line-height: 45rpx;
					background-color: #fff;
					border-radius: 10rpx;
					color: #333333;
					font-size: 28rpx;
				}
			}
			.add-friends{
				width: 200rpx;
				margin-left: 20rpx;
				font-size: 30rpx!important;
				line-height: 80rpx;
			}
		}
		.u-cell-border{
			&::after{
				border-bottom: 2rpx solid #f3f3f3!important
			}
		}
	}
</style>
