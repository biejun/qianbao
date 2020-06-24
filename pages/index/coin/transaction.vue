<template>
	<view class="common-bg transaction">
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
				list: []
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.transaction{
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
