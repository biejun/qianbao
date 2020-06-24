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
			<view @click="showFilterAndLoadWays">
				<image src="../../../static/filter.png" class="filter"></image>
			</view>
		</view>
		<template v-if="type === 1">
			<view v-for="d in data1" class="data-box">
				<view class="data-title">订单编号：{{d.orderNo}}</view>
				<u-cell-group v-for="item in d.currentOrderDTOList" :key="item.currentNumber">
					<u-cell-item :title="item.currentNumber + '期'" :value="item.status | statusText" :arrow="false">
						<view slot="icon" class="sp"></view>
					</u-cell-item>
					<u-cell-item v-for="game in item.ggameOrderList" :value="game.stakeNumber+'注'" :key="game.id">
						<view slot="title" class="pn">{{game.wayDesc}}</view>
					</u-cell-item>
				</u-cell-group>
				<view class="data-sum">
					<view>投注合计</view>
					<view>{{d.stakeAmount}} GCN</view>
				</view>
			</view>
		</template>
		<template v-if="type === 2">
			<view v-for="d in data2" class="data-box">
				<view class="data-sum">
					<view>{{d.currentNumber}}期</view>
					<view>{{d.status | statusText}}</view>
				</view>
				<u-cell-group v-for="item in d.orderNoTwoDTOList">
					<u-cell-item :title="'订单编号: '+item.orderNo" :arrow="false">
						<view slot="icon" class="sp"></view>
					</u-cell-item>
					<u-cell-item v-for="game in item.ggameOrderList" :value="game.stakeNumber+'注'" :key="game.id">
						<view slot="title" class="pn">{{game.wayDesc}}</view>
					</u-cell-item>
				</u-cell-group>

			</view>
		</template>
		<u-popup v-model="showFilter" mode="right">
			<view class="filter-wrap">
				<view class="filter-header">
					<view class="filter-title">
						筛选
					</view>
					<view class="filter-title" @click="clearFilter">
						清空条件
					</view>
				</view>
				<view class="filter-title">
					玩法
				</view>
				<view class="filter-tags">
					<u-tag v-for="item in ways" @click="wayType = item.wayType" class="gutter" :key="item.wayType" :text="item.wayName" shape="circle" :type="item.wayType === wayType ? 'error' : 'info'" mode="plain"/>
				</view>
				<view class="filter-title">
					时间筛选
				</view>
				<view>
					<u-icon @click="showCalendar = true" name="calendar" size="40"></u-icon>
				</view>
				<view>
					{{beginTime}}  {{endTime}}
				</view>
				<view class="filter-search">
					<button type="warn" size="mini" @click="submitFilter">确定</button>	
				</view>
			</view>
		</u-popup>
		<u-calendar v-model="showCalendar" mode="range" @change="changeDate"></u-calendar>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				dropdownShow: false,
				type: 1,
				data1: [],
				data2: [],
				showFilter: false,
				showCalendar: false,
				ways: [],
				wayType: 0,
				beginTime: '',
				endTime: '',
			}
		},
		created() {
			this.getData();
		},
		computed: {
			dropdownText() {
				return this.type === 1 ? '按订单展示' : '按期数展示'
			},
		},
		watch: {
			type() {
				this.getData();
			}
		},
		filters: {
			statusText(val) {
				// 0 待开奖 1已中奖 2未中奖 3已结算
				switch(val) {
					case 0:
						return '待开奖';
					case 1:
						return '已中奖';
					case 2:
						return '未中奖';
					case 3:
						return '已结算';
				}
			}
		},
		methods: {
			changeDate(e) {
				this.beginTime = e.startDate;
				this.endTime = e.endDate;
			},
			clearFilter() {
				this.beginTime = '';
				this.endTime = '';
				this.wayType = 0;
			},
			showFilterAndLoadWays() {
				if(this.ways.length === 0) {
					this.$u.get('/gGameOrder/getWay').then(res => {
						this.ways = res.data;
					})
				}
				this.showFilter = true;
			},
			submitFilter() {
				this.getData();
				this.showFilter = false;
			},
			getData() {
				let url = this.type === 1 ? '/gGameOrder/getOrderDetailWithOrder' : '/gGameOrder/getOrderDetailWithNumber';
				this.$u.post(url, {
					beginTime: this.beginTime,
					endTime: this.endTime,
					wayType: this.wayType
				}).then(res => {
					if(this.type === 1) {
						this.data1 = res.data.map(v => {
							let stakeAmount = 0;
              let obj={
                wayType:{
                  name:'直1',
                  data:[],
                  num:24
                }
              }
              let objitem={}
							v.currentOrderDTOList.forEach(c => {
								c.ggameOrderList.forEach((d,i) => {
									stakeAmount += d.stakeAmount;
                  let alist = d.wayType
                  obj.num =  (objitem[alist] + 1) || 1
                  // if( d.wayType = d.wayType){
                  //   obj.wayType.data.push(d) 
                  //   // console.log(d)
                  // }
                  
                  // if(!obj[v.wayType]){
                  //    obj[v.wayType] = []
                  //    obj[v.wayType].push(c)  // push ggameOrderList 
                  // }
								})
							})
                console.log(objitem)
							v.stakeAmount = stakeAmount;
              v.newArr = Object.values(obj);
							return v;
						});
          
             console.log(this.data1)
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
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-bottom: 10rpx solid #f3f3f3;
			padding: 10rpx 30rpx;
			align-items: center;

			.filter{
				width: 32rpx;
				height: 32rpx;
			}
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
		
		.filter-wrap{
			padding: 20rpx;
			width: 380rpx;
			.filter-header{
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #f3f3f3;
				padding: 15rpx 0;
				margin-bottom: 30rpx;
			}
			.filter-title{
				color: #333;
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}
			.gutter{
				margin-right: 15rpx;
				margin-bottom: 15rpx;
			}
			.filter-tags{
				padding: 20rpx 0;
				border-bottom: 1px solid #f3f3f3;
				margin-bottom: 30rpx;
			}
			.filter-search{
				padding: 20rpx 0;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
