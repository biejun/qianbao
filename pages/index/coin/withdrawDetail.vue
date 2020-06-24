<template>
	<view class="withdraw-records"  @click="dropdownShow = false">
		<view class="page-header">
			<view class="dropdown-button">
				<text class="dropdown-button__text" @click.stop="dropdownShow = !dropdownShow">
					{{dropdownText}}
				</text>
				<u-icon name="arrow-down-fill" class="dropdown-button__icon"></u-icon>
				<view class="dropdown" v-show="dropdownShow">
					<view class="dropdown-item" @click="type = 1">对内提币</view>
					<view class="dropdown-item" @click="type = 2">对外提币</view>
				</view>
			</view>
		</view>
		<view v-if="type === 1" class="record-list">
			<view v-for="item in data1" :key="item.id" @click="openDetail(item)" class="record-item">
				<view class="record-row">
					<view class="record-coinName">{{item.coinName}}</view>
					<view class="record-amount">
						{{item.withdrawAmount}}
					</view>
				</view>
				<view class="record-row">
					<view class="record-time">{{item.createTime}}</view>
				</view>
			</view>
			<u-empty v-if="data1.length === 0" text="暂无记录" mode="history"></u-empty>
		</view>
		<view v-if="type === 2" class="record-list">
			<view v-for="item in data2" :key="item.id" @click="openDetail(item)" class="record-item">
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
			<u-empty v-if="data2.length === 0" text="暂无记录" mode="history"></u-empty>
		</view>
		<u-modal v-model="showDetail" confirm-text="关闭" :title="detail ? detail.coinName : ''">
			<view v-if="detail && type === 1" class="detail-view">
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						提币手机号
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.toUserPhone || '-'}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						数量
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.amount}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						手续费
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.fee}}
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
			<view v-if="detail && type === 2" class="detail-view">
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						地址
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.fromAddress || '-'}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						数量
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.amount}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						手续费
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.fee}}
					</u-col>
				</u-row>
				<u-row gutter="16" justify="space-between">
					<u-col span="6" class="itemName">
						状态
					</u-col>
					<u-col span="6" class="itemValue">
						{{detail.status | statusText}}
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
				type: 1,
				coinName: '',
				dropdownShow: false,
				showDetail: false,
				data1: [],
				data2: [],
				detail: null,
			}
		},
		onLoad(options) {
			this.coinName = options.coinName;
		},
		created() {
			this.getData();
		},
		computed: {
			dropdownText() {
				return this.type === 1 ? '对内提币' : '对外提币'
			}
		},
		filters: {
			statusText(val) {
				// 0待审核 1转账中 2确认中 3转账成功 4审批拒绝 5转账失败 6发送交易中 7打包中
				switch(val) {
					case 0:
						return '待审核';
					case 1:
						return '转账中';
					case 2:
						return '确认中';
					case 3:
						return '转账成功';
					case 4:
						return '审批拒绝';
					case 5:
						return '转账失败';
					case 6:
						return '发送交易中';
					case 7:
						return '打包中';
				}
			}
		},
		watch: {
			type() {
				this.getData();
			}
		},
		methods: {
			openDetail(item) {
				this.showDetail = true;
				this.detail = item;
			},
			getData() {
				let url = this.type === 1 ? '/wRecordTransferIn/getTransferIn/' : '/wRecordTransferOut/getTransferOut/';
				this.$u.get(url + this.coinName).then(res => {
					if(this.type === 1) {
						this.data1 = res.data;
					}else if(this.type === 2) {
						this.data2 = res.data;
						//this.data2 = res.data;
					}
				},err => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.withdraw-records{
		.page-header{
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-bottom: 10rpx solid #f3f3f3;
			padding: 10rpx 30rpx;
			align-items: center;
		}
		.dropdown-button{
			position: relative;
			&__text{
				color: #333;
				font-size: 28rpx;
			}
			&__icon{
				font-size: 18rpx;
				vertical-align: 5rpx;
				margin-left: 10rpx;
			}
		}
		.dropdown{
			position: absolute;
			top: 100%;
			background-color: #fff;
			width: 200rpx;
			z-index: 99;
			border: 2rpx solid rgba(165,165,165,1);
			padding: 10rpx;
			box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.08);
			border-radius: 3rpx;
			
			.dropdown-item{
				font-size: 28rpx;
				padding: 10rpx;
			}
		}
		
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
