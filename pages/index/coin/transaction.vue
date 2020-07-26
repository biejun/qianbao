<template>
	<view class="common-bg transaction">
		<view class="filter">
			<view class="date-tags">
				<view class="date-tag" @click="changeDateType(0)" :class="dateType === 0 ? 'is-active' : ''">全部</view>
				<view class="date-tag" @click="changeDateType(1)" :class="dateType === 1 ? 'is-active' : ''">一个月</view>
				<view class="date-tag" @click="changeDateType(2)" :class="dateType === 2 ? 'is-active' : ''">三个月</view>
			</view>
		</view>
		<view v-if="list.length" class="data-flow">
			<view v-for="item in list" class="data-flow-item" :key="item.id">
				<view class="space data-header">
					<view class="coin-name">{{item.coin}}</view>
					<view><u-icon name="arrow-rightward"></u-icon></view>
					<view class="coin-name">{{item.toCoin}}</view>
				</view>
				<view class="space data-body">
					<text class="price">{{item.num}}</text>
					<text class="price red">{{item.toNum}}</text>
				</view>
				<view class="space data-footer">
					<text class="text">
						手续费: {{item.fee}}
					</text>
					<text class="text">
						{{item.createTime | dateFormat}}
					</text>
				</view>
			</view>
		</view>
		<u-empty v-else text="暂无数据" mode="list"></u-empty>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		data() {
			return {
				list: [],
				dateType: 0,
			}
		},
		created() {
			this.getRecords();
		},
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s');
			}
		},
		methods: {
			getRecords() {
				this.$u.post('/wRecordRecharge/exchangeRecord').then(res => {
					this.list = res.data;
				})
			},
			changeDateType(type) {
				this.dateType = type;
				this.getRecords();
			},
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './learnEx'
			})
		},
	}
</script>

<style lang="scss" scoped>
	.transaction{
		.filter{
			display: flex;
			justify-content: center;
			padding: 15rpx 0;
			background-color: #fff;
			border-bottom: 2rpx solid #ededed;
		}
		.date-tags{
			display: flex;
			
			.date-tag{
				height: 40rpx;
				padding: 0 20rpx;
				border: 2rpx solid #A5A5A5;
				border-radius: 20rpx;
				font-size: 22rpx;
				margin-left: 16rpx;
				line-height: 38rpx;
				&.is-active{
					color: $uni-color-primary;
					border-color: $uni-color-primary;
				}
			}
		}
		.data-flow{
			background-color: #fff;
			padding: 0 30rpx;
			.data-flow-item{
				padding: 20rpx 0;
				border-bottom: 2rpx solid #f3f3f3;
				
				.data-body{
					margin-top: 5rpx;
					margin-bottom: 5rpx;
				}
				
				.coin-name{
					font-size: 34rpx;
				}
				.space{
					display: flex;
					justify-content: space-between;
				}
				
				.price{
					font-size: 34rpx;
					font-weight: bold;
					color: #666666;
					
					&.red{
						color: $uni-color-primary;
					}
				}
				
				.text{
					font-size: 26rpx;
					color: #A5A5A5;
				}
			}
		}
	}
</style>
