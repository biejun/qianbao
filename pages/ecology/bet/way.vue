<template>
	<view class="lecai-way">
		<view  v-for="item in list" :key="item.id"  class="way-item">
			<view class="way">
				<view class="way-title" @click="item.isfold = !item.isfold">
					{{item.wayName}} <u-icon :name="item.isfold ? 'arrow-down' : 'arrow-up'" class="fold"></u-icon>
				</view>
				<view class="way-desc" v-show="item.isfold">
					{{item.wayDesc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 多倍投注是指同样的号码可以进行多倍购买的投注，每张彩票最多可购买倍数为50倍。
	// 多期投注是指购买以相同的号码从当期起投注不超过连续15期的彩票。
	export default{
		data() {
			return {
				list: [],
				i18n: {
					zh: {
						title: "玩法介紹"
					},
					en: {
						title: "Introduce"
					}
				},
			}
		},
		onLoad() {
			this.getWay();
		},
		created() {
			this.setNavBarTitle('title');
		},
		methods: {
			getWay() {
				this.$u.get('/gGameOrder/getWay').then(res => {
					//console.log(res);
					this.list = res.data.map(v => {
						v.isfold = true;
						return v;
					});
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
			border-bottom: 1rpx solid #F3F3F3;
			
			.fold{
				font-size: 20rpx;
				margin-left: 15rpx;
				vertical-align: 5rpx;
			}
			
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
				
			}
		}
	}
</style>
