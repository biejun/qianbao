<template>
	<view class="lecai-select">
		<view class="select-wrap">
			<view class="select-title">
				玩法多样，奖金滚滚来！
			</view>
			<view class="select-introduce" @click="goWay">
				<text>玩法介绍</text>
				<u-icon name="question-circle"></u-icon>
			</view>
		</view>
		<view class="wan">
			<view class="title">任选玩法</view>
			<view class="wan-list">
				<view class="wan-item" @click="goIndex">
					<view class="text">任选2</view>
					<view class="text">最易中</view>
				</view>
				<view class="wan-item">
					<view class="text">任选3</view>
					<view class="text">最多人玩</view>
				</view>
				<view class="wan-item">
					<view class="text">任选4</view>
					<view class="text">难度适中</view>
				</view>
				<view class="wan-item">
					<view class="text">任选5</view>
					<view class="text">返奖高</view>
				</view>
				<view class="wan-item">
					<view class="text">任选6</view>
					<view class="text">高额奖金</view>
				</view>
			</view>
			<view class="title">直选玩法</view>
			<view class="wan-list">
				<view class="wan-item">
					<view class="text">前1</view>
					<view class="text">新手最爱</view>
				</view>
				<view class="wan-item">
					<view class="text">直选6</view>
					<view class="text">包揽奖池</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods: {
			goWay() {
				uni.navigateTo({
					url: '../bet/way'
				})
			},
			goIndex() {
				uni.navigateTo({
					url: '../bet/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.lecai-select{
		padding: 30rpx;
		
		.select-wrap{
			display: flex;
			justify-content: space-between;
			height: 60rpx;
			line-height: 60rpx;
			
			.select-title{
				font-size: 36rpx;
				color: #333;
				font-weight: bold;
			}
			.select-introduce{
				font-size: 28rpx;
				color: #343434;
			}
		}
		
		.wan{
			
			.title{
				font-size: 28rpx;
				color: #343434;
				padding: 15rpx 0;
			}
			
			.wan-list{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-left: -30rpx;
				margin-right: -30rpx;
				
				.wan-item{
					flex: 1 0 40%;
					margin: 0 30rpx 20rpx 30rpx;
					background-color: #F1343E;
					height: 180rpx;
					border-radius: 26rpx;
					padding: 30rpx 40rpx;
					
					.text{
						color: #fff;
						font-size: 34rpx;
					}
				}
			}
		}
	}
</style>
