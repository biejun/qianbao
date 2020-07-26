<template>
	<view class="lecai-select">
<!-- 		<view class="select-wrap">
			<view class="select-title">
				{{$t('AD')}}
			</view>
			<view class="select-introduce" @click="goWayDesc">
				<text>{{$t('Introduction')}}</text>
				<u-icon name="question-circle"></u-icon>
			</view>
		</view> -->
		<view class="wan">
			<view class="title">{{$t('Optionalplay')}}</view>
			<view class="wan-list">
				<view class="wan-item" v-for="item in group1" 
					:class="['rx'+item.wayType]"
					@click="goWay(1,item)">
<!-- 					<view class="text">{{item.wayName}}</view>
					<view class="text">{{item.wayDesc}}</view> -->
				</view>
			</view>
			<view class="title">{{$t('Directselection')}}</view>
			<view class="wan-list">
				<view class="wan-item" v-for="item in group2" :key="item.id" 
					:class="['zx'+item.wayType]"
					@click="goWay(2,item)">
<!-- 					<view class="text">{{item.wayName}}</view>
					<view class="text">{{item.wayDesc}}</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				group1: [],
				group2: [],
				i18n: {
					zh: {
						Introduction: "玩法介绍",
						Optionalplay: "任选玩法",
						Directselection: "直选玩法",
						AD: "玩法多样，奖金滚滚来！"
					},
					en: {
						Introduction: "Introduction",
						Optionalplay: "Optional play",
						Directselection: "Direct selection",
						AD: "Play a variety of ways, bonus roll!"
					}
				},
			}
		},
		created() {
			this.getWay();
		},
		methods: {
			getWay() {
				this.$u.get('/gGameOrder/getWay').then(res => {
					//console.log(res);
					let arr1 = [], arr2 = [];
					res.data.forEach(v => {
						if(v.wayType === 1 || v.wayType === 7) {
							arr2.push(v);
						}else{
							arr1.push(v);
						}
					})
					this.group1 = arr1;
					this.group2 = arr2;
				})
			},
			goWayDesc() {
				uni.navigateTo({
					url: '../bet/way'
				})
			},
			goWay(type, item) {
				uni.navigateTo({
					url: '../bet/index?type='+type+'&wayType='+item.wayType
				})
			}
		},
		onNavigationBarButtonTap(e) {
			// e.index 拿到当前点击顶部按钮的索引
			if(e.index === 0) {
				uni.navigateTo({
					url: './way'
				})
			}
		},
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
				font-size: 34rpx;
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
					max-width: 315rpx;
					margin: 0 30rpx 20rpx 30rpx;
					background-color: #fcc82b;
					height: 180rpx;
					border-radius: 26rpx;
					padding: 30rpx 40rpx;
					background-size: cover;
					
					&.rx2{
						background-image: url(../../../static/wanfa/renxuan2.png);
					}
					&.rx3{
						background-image: url(../../../static/wanfa/renxuan3.png);
					}
					&.rx4{
						background-image: url(../../../static/wanfa/renxuan4.png);
					}
					&.rx5{
						background-image: url(../../../static/wanfa/renxuan5.png);
					}
					&.rx6{
						background-image: url(../../../static/wanfa/renxuan6.png);
					}
					&.zx1{
						background-image: url(../../../static/wanfa/zhixuan1.png);
					}
					&.zx7{
						background-image: url(../../../static/wanfa/zhixuan6.png);
					}
					
					
					.text{
						color: #fff;
						font-size: 34rpx;
					}
				}
			}
		}
	}
</style>
