<template>
	<view class="common-bg friend-apply">
		<u-cell-group>
			<u-cell-item title="xinxi" :title-style="titleStyle" center :arrow="false" label="2020-12-22">
				<u-avatar :src="src" slot="icon" size="mini"></u-avatar>
				<view slot="right-icon" class="actions">
					<view class="btn reject">拒绝</view>
					<view class="btn approve">同意添加</view>
				</view>
			</u-cell-item>
			<u-cell-item title="xinxi" :title-style="titleStyle" center :arrow="false" label="2020-12-22">
				<u-avatar :src="src" slot="icon" size="mini"></u-avatar>
				<view slot="right-icon" class="actions">
					<view class="btn">已添加</view>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				titleStyle: {
					'margin-left': '20rpx',
					'font-size': '32rpx',
					'color': '#333'
				}
			}
		}
	}
</script>

<style lang="scss">
	.friend-apply{
		.actions{
			display: flex;
			
			.btn{
				padding: 3rpx 14rpx;
				font-size: 26rpx;
				border: 2rpx solid #A5A5A5;
				background-color: #A5A5A5;
				color: #fff;
				border-radius: 10rpx;
				text-align: center;
				min-width: 110rpx;
				
				&.reject{
					background-color: #fff;
					color: #A5A5A5;
				}
				
				&.approve{
					border-color: #F1333D;
					background-color: #F1333D;
					margin-left: 15rpx;
				}
			}
		}
		
		.u-cell-border{
			&::after{
				border-bottom: 2rpx solid #f3f3f3!important
			}
		}
	}
</style>
