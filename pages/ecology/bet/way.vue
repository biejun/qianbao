<template>
	<view class="lecai-way">
		<view class="way-item">
			<view v-for="item in list" :key="item.id">
				<view class="way-title">
					{{item.wayName}}
				</view>
				<view class="way-desc">
					{{item.wayDesc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getWay();
		},
		methods: {
			getWay() {
				this.$u.get('/gGameOrder/getWay').then(res => {
					//console.log(res);
					this.list = res.data;
				})
			},
		}
	}
</script>

<style lang="scss">
	.lecai-way{
		.way-item{
			background-color: #fff;
			padding: 20rpx 30rpx;
			
			.way-title{
				font-size: 34rpx;
				color: #343434;
				font-weight: bold;
				padding: 20rpx 0;
			}
			.way-desc{
				font-size: 30rpx;
				color: #343434;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #F3F3F3;
			}
		}
	}
</style>
