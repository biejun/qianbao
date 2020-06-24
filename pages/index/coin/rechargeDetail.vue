<template>
	<view class="recharge-detail">
		<view v-if="data.length" class="record-list">
			<view v-for="item in data" :key="item.id" @click="openDetail(item)" class="record-item">
				<view class="record-row">
					<view class="record-coinName">{{item.coinName}}</view>
					<view class="record-amount">
						{{item.withdrawAmount}}
					</view>
				</view>
				<view class="record-row">
					<view class="record-time">{{item.createTime}}</view>
					<view class="record-status">{{item.status | statusText}}</view>
				</view>
			</view>
		</view>
		<u-empty v-else text="暂无记录" mode="history"></u-empty>
		
		<u-modal v-model="showDetail" confirm-text="关闭" :title="detail ? detail.coinName : ''">
			<view v-if="detail" class="detail-view">
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						充值地址
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.toAddress || '-'}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						交易HASH
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.txId || '-'}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						充值金额
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.amount}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						区块高度
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.block}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						时间
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.createTime}}
					</u-col>
				</u-row>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				coinName: '',
				data: [],
				detail: null,
				showDetail: false,
			}
		},
		onLoad(options) {
			this.coinName = options.coinName;
		},
		created() {
			this.getData();
		},
		methods: {
			openDetail(item) {
				this.showDetail = true;
				this.detail = item;
			},
			getData() {
				let url = '/wRecordRecharge/getCoinRecord/';
				this.$u.get(url + this.coinName).then(res => {
					this.data = res.data;
				},err => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.recharge-detail{
		.record-list{
			padding: 12rpx 30rpx;
		}
		
		.record-item{
			border-bottom: 2rpx solid #f3f3f3;
			&:last-child{
				border-bottom: none;
			}
			
			.record-row{
				display: flex;
				justify-content: space-between;
				padding: 8rpx 0;
				align-items: center;
				.record-coinName{
					font-size: 30rpx;
					color: #333;
				}
				.record-amount{
					font-size: 28rpx;
					font-weight: bold;
				}
				.record-time{
					font-size: 26rpx;
					color: #999;
				}
			}
		}
		
		.detail-view{
			padding: 20rpx;
			.itemName{
				color: #666;
				font-size: 30rpx;
			}
			.itemValue{
				color: #333;
				font-size: 30rpx;
				text-align: right;
			}
		}
	}
</style>
