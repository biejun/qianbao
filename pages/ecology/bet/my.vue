<template>
	<view class="my-bet" @click="dropdownShow = false">
		<view class="page-header">
			<view class="dropdown-button">
				<text class="dropdown-button__text" @click.stop="dropdownShow = !dropdownShow">
					{{dropdownText}}
				</text>
				<u-icon name="arrow-down-fill" class="dropdown-button__icon"></u-icon>
				<view class="dropdown" v-show="dropdownShow">
					<view class="dropdown-item" @click="type = 1">按订单展示</view>
					<view class="dropdown-item" @click="type = 2">按期数展示</view>
				</view>
			</view>
		</view>
		<template v-if="type === 1">
			<view v-for="d in data1" class="data-box">
				<view class="data-title">订单编号：{{d.orderNo}}</view>
				<u-cell-group v-for="item in data1.currentOrderDTOList" :key="item.currentNumber">
					<u-cell-item :title="item.currentNumber + '期'" :value="item.status" :arrow="false">
						<view slot="icon" class="sp"></view>
					</u-cell-item>
					<u-cell-item v-for="game in item.ggameOrderList" :value="game.stakeAmount" :key="game.id">
						<view slot="title" class="pn">{{game.wayDesc}}</view>
					</u-cell-item>
				</u-cell-group>
<!-- 				<view class="data-sum">
					<view>投注合计</view>
					<view>222GCN</view>
				</view> -->
			</view>
		</template>
		<template v-if="type === 2">
			<view v-for="d in data2" class="data-box">
				<view class="data-sum">
					<view>00000001期</view>
					<view>等待开奖</view>
				</view>
				<u-cell-group v-for="item in d.currentOrderDTOList">
					<u-cell-item title="订单编号: 2020323000001" :arrow="false">
						<view slot="icon" class="sp"></view>
					</u-cell-item>
					<u-cell-item value="50">
						<view slot="title" class="pn">任选2</view>
					</u-cell-item>
					<u-cell-item value="50">
						<view slot="title" class="pn">任选3</view>
					</u-cell-item>
				</u-cell-group>

			</view>
		</template>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				dropdownShow: false,
				type: 1,
				data1: [],
				data2: []
			}
		},
		created() {
			this.getData();
		},
		computed: {
			dropdownText() {
				return this.type === 1 ? '按订单展示' : '按期数展示'
			}
		},
		watch: {
			type() {
				this.getData();
			}
		},
		methods: {
			getData() {
				let url = this.type === 1 ? '/gGameOrder/getOrderDetailWithNumber' : '/gGameOrder/getOrderDetailWithOrder';
				this.$u.post(url, {
					beginTime: '',
					endTime: '',
					wayType: 0
				}).then(res => {
					if(this.type === 1) {
						this.data1 = res.data;
					}else if(this.type === 2) {
						this.data2 = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-bet{
		
		.page-header{
			background-color: #fff;
			border-bottom: 10rpx solid #f3f3f3;
			padding: 10rpx 30rpx;
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
		.data-box{
			border-bottom: 10rpx solid #f3f3f3;
			.data-title{
				padding: 12rpx 30rpx;
				font-size: 30rpx;
				color: #333;
			}
			.data-sum{
				display: flex;
				justify-content: space-between;
				padding: 12rpx 30rpx;
				font-size: 30rpx;
				color: #333;
			}
			.sp{
				width: 6rpx;
				height: 23rpx;
				background-color: $uni-color-primary;
				margin-right: 15rpx;
			}
			.pn{
				padding-left: 20rpx;
				font-size: 28rpx;
				color: #333;
			}
		}
	}
</style>
