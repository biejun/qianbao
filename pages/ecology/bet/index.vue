<template>
	<view class="lecai-way-index">
		<u-tabs :list="list" 
			:is-scroll="false" 
			:current="current" 
			@change="change" 
			active-color="#F1343E" 
			class="tabs">
		</u-tabs>
		<view class="way-wrap">
			<view class="way-tab">
				<view class="way-tab-item is-active">普通玩法</view>
				<view class="way-tab-item">拖胆玩法</view>
			</view>
			<view class="ball-list">
				<view class="ball-item" v-for="(item, index) in balls" :key="index">
					<view class="ball">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 200rpx;">
			<dragSorts :list="list1" @confirm="confirm"></dragSorts>
		</view>
		<view class="submit">提交投注</view>
	</view>
</template>

<script>
	import dragSorts from '@/common/HM-dragSorts/HM-dragSorts.vue'
	export default {
		components: { dragSorts },
		data() {
			return {
				list: [{
					name: '任选2'
				}, {
					name: '任选3'
				}, {
					name: '任选4'
				}, {
					name: '任选5'
				}, {
					name: '任选6'
				}, {
					name: '前1'
				}, {
					name: '直选6'
				}],
				current: 0,
				balls: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a','b','c','d','e','f'],
				list1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		methods: {
			change(index) {
				this.current = index;
			},
			confirm() {
				
			}
		}
	}
</script>

<style lang="scss">
	.lecai-way-index{
		
		.tabs{
			border-bottom: 2rpx solid #F3F3F3;
			height: 76rpx;
		}
		.way-wrap{
			padding: 40rpx 30rpx;
			
			.way-tab{
				width: 360rpx;
				margin: 20rpx auto;
				height: 60rpx;
				display: flex;
				border-radius: 40rpx;
				overflow: hidden;
				
				.way-tab-item{
					background-color: #f3f3f3;
					flex: 1;
					text-align: center;
					line-height: 60rpx;
					font-size: 30rpx;
					color: #A5A5A5;
					
					&.is-active {
						background-color: #F1343E;
						color: #fff;
					}
				}
			}
			
			.ball-list{
				display: flex;
				flex-wrap: wrap;
				.ball-item{
					flex:1 0 12.5%;
					min-width: 12.5%;
					padding: 10rpx;
					.ball{
						border: 1rpx solid #333;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius:50%;
					}
				}
			}
		}
		
		.submit{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			background-color: #F1343E;
		}
	}
</style>
