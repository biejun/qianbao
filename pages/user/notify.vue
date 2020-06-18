<template>
	<view class="common-bg user-notify">
		<view class="notify-wrap">
			<u-subsection :list="list" 
				:current="curNow" 
				mode="subsection"
				@change="sectionChange"></u-subsection>
			<view v-show="curNow === 0" class="content-wrap">
				<view class="content-box">
					<view class="content-header">
						<view class="content-title">恭喜您，中奖了！</view>
						<view class="content-time">2020-10-22</view>
					</view>
					<view class="content-body">
						您的投注订单：10001523115，已中    
					</view>
				</view>
			</view>
			<view v-show="curNow === 1" class="content-wrap">
				<view class="content-box">
					<view class="content-header">
						<view class="content-title">系统升级通知</view>
						<view class="content-time">2020-10-22</view>
					</view>
					<view class="content-body">
						sdfdsfdsfsdf   
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: [
					{
						name: '消息通知'
					},
					{
						name: '系统公告'
					}
				],
				curNow: 0
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style lang="scss">
	.user-notify{
		.notify-wrap{
			padding: 30rpx;
		}
		.content-wrap{
			padding-top: 20rpx;
			
			.content-box{
				padding: 18rpx;
				border-radius: 10rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				
				.content-header{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				
				.content-title{
					font-size: 30rpx;
					font-weight: bold;
				}
				
				.content-time{
					font-size: 22rpx;
				}
				
				.content-body{
					font-size: 28rpx;
					color: #666;
				}
			}
		}
	}
</style>
