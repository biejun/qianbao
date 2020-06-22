<template>
	<view class="lecai-way-index">
		<u-tabs :list="tabs" 
			:is-scroll="false" 
			:current="current" 
			@change="change" 
			active-color="#F1343E" 
			class="tabs">
		</u-tabs>
		<view class="way-wrap">
			<view v-if="type === 1" class="way-tab">
				<view class="way-tab-item"
					:class="[tab1 === 0 ? 'is-active' : '']" 
					@click="tab1 = 0">普通玩法</view>
				<view class="way-tab-item" 
					:class="[tab1 === 1 ? 'is-active' : '']" 
					@click="tab1 = 1">拖胆玩法</view>
			</view>
			<view v-if="type === 2" class="way-tab">
				<view class="way-tab-item" 
					:class="[tab2 === 0 ? 'is-active' : '']" 
					@click="tab2 = 0">普通玩法</view>
				<view class="way-tab-item" 
					:class="[tab2 === 1 ? 'is-active' : '']"  
					@click="tab2 = 1">复式投注</view>
			</view>
			<template v-if="type === 1">
				<template v-if="tab1 === 0">
					<view class="ball-list">
						<view class="ball-item" 
							v-for="(item, index) in balls" :key="index"
							@click="renxuan(item)">
							<view class="ball" :class="rx.indexOf(item) > -1 ? 'active' : ''">
								{{item}}
							</view>
						</view>
					</view>
					<view class="select-tip">
						您当前选择了<text class="num">{{len}}</text>注，共<text class="num">{{totalGCN}}</text>个GCN
					</view>
				</template>
				<template v-if="tab1 === 1">
					<view clasa="ball-title">胆码选择</view>
					<view class="ball-list">
						<view class="ball-item" 
							v-for="(item, index) in danmas" :key="index"
							@click="danma(item)">
							<view class="ball" :class="dm.indexOf(item) > -1 ? 'active' : ''">
								{{item}}
							</view>
						</view>
					</view>
					<view clasa="ball-title">拖码选择</view>
					<view class="ball-list">
						<view class="ball-item" 
							v-for="(item, index) in tuomas" 
							@click="tuoma(item)"
							:key="index">
							<view class="ball" :class="tm.indexOf(item) > -1 ? 'active' : ''">
								{{item}}
							</view>
						</view>
					</view>
					<view class="select-tip">
						您当前选择了<text class="num">{{len}}</text>注，共<text class="num">{{totalGCN}}</text>个GCN
					</view>
				</template>
			</template>
			<template v-if="type === 2">
				<template v-if="tab2 === 0">
					<view class="ball-list">
						<view class="ball-item" 
							v-for="(item, index) in balls" :key="index"
							@click="zhixuan(item)">
							<view class="ball" :class="zx.indexOf(item) > -1 ? 'active' : ''">
								{{item}}
							</view>
						</view>
					</view>
					<view class="select-tip">
						您当前选择了<text class="num">{{len}}</text>注，共<text class="num">{{totalGCN}}</text>个GCN
					</view>
					<view class="drag-balls" v-if="zx.length > 1">
						<view class="drag-title">排序</view>
						<dragSorts :list="zx" @confirm="confirm"></dragSorts>
						<view class="drag-desc">手指拖动进行排序</view>
					</view>
				</template>
				<template v-if="tab2 === 1">
					<view class="ball-list">
						<view class="ball-item" 
							v-for="(item, index) in balls" :key="index"
							@click="fushi(item)">
							<view class="ball" :class="fs.indexOf(item) > -1 ? 'active' : ''">
								{{item}}
							</view>
						</view>
					</view>
					<view class="select-tip">
						您当前选择了<text class="num">{{len}}</text>注，共<text class="num">{{totalGCN}}</text>个GCN
					</view>
				</template>
			</template>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="20" closeable>
			<view class="touzhu-popover">
				<view class="title">
					追号/倍数选择
				</view>
				<view class="select-item">
					<view>追号期数</view>
					<view><u-number-box v-model="periods" :min="1" :max="15"></u-number-box></view>
				</view>
				<view class="select-item">
					<view>投注倍数</view>
					<view><u-number-box v-model="multiple" :min="1" :max="50"></u-number-box></view>
				</view>
				
				<view class="submit" @click="submit">提交投注</view>
			</view>
		</u-popup>
		<view class="submit is-fixed" @click="submit">提交投注</view>
	</view>
</template>

<script>
	import dragSorts from '@/common/HM-dragSorts/HM-dragSorts.vue';
	import { combination, toGroup } from '@/common/utils.js';
	const makeBalls = () => [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a','b','c','d','e','f'];
	export default {
		components: { dragSorts },
		data() {
			return {
				tabs: [],
				list: [],
				type: 1,
				current: 0,
				wayType: 0,
				balls: makeBalls(),
				danmas: makeBalls(),
				tuomas: makeBalls(),
				list1: [0, 1, 2, 3, 4, 5, 6],
				tab1: 0,
				tab2: 0,
				rx: [],
				tm: [],
				dm: [],
				zx: [],
				fs: [],
				show: false,
				periods: 1,
				multiple: 1,
				len: 0
			}
		},
		computed: {
			totalGCN() {
				return this.len * 2
			}
		},
		onLoad(options) {
			this.type = Number(options.type);
			this.wayType = Number(options.wayType);
			this.getWay();
		},
		methods: {
			getWay() {
				this.$u.get('/gGameOrder/getWay').then(res => {
					this.tabs = res.data.map( (v,i) => {
						if(v.wayType === this.wayType) {
							this.current = i;
						}
						return {
							name: v.wayName,
						}
					});
					this.list = res.data;
				})
			},
			change(index) {
				this.current = index;
				let v = this.list[index];
				if(v.wayType === 1 || v.wayType === 7) {
					this.type = 2;
				}else{
					this.type = 1;
				}
				this.rx = [];
				this.tm = [];
				this.dm = [];
				this.zx = [];
				this.fs = [];
				this.len = 0;
			},
			renxuan(num) {
				let maxNum = this.list[this.current].wayType;
				let i = this.rx.indexOf(num);
				if(i > -1) {
					this.rx.splice(i, 1);
				}else{
					if(this.rx.length >= maxNum) {
						this.$u.toast('最多只能选择'+maxNum+'个号码');
						return;
					}
					this.rx.push(num);
				}
				this.len = maxNum === this.rx.length ? 1 : 0;
			},
			zhixuan(num) {
				let maxNum = this.list[this.current].wayType === 7 ? 6 : 1;
				let i = this.zx.indexOf(num);
				if(i > -1) {
					this.zx.splice(i, 1);
				}else{
					if(this.zx.length >= maxNum) {
						this.$u.toast('最多只能选择'+maxNum+'个号码');
						return;
					}
					this.zx.push(num);
				}
				this.len = maxNum === this.zx.length ? 1 : 0;
			},
			fushi(num) {
				let maxNum = 13;
				let size = this.list[this.current].wayType === 7 ? 6 : 1;
				let i = this.fs.indexOf(num);
				if(i > -1) {
					this.fs.splice(i, 1);
				}else{
					if(this.fs.length >= maxNum) {
						this.$u.toast('最多只能选择'+maxNum+'个号码');
						return;
					}
					this.fs.push(num);
				}
				if(this.fs.length >= size) {
					let res = combination(this.fs, size);
					this.len = res.length;
				}else{
					this.len = 0;
				}
			},
			tuoma(num) {
				let maxNum = 13;
				let size = this.list[this.current].wayType;
				let i = this.tm.indexOf(num);
				let dmLen = this.dm.length;
				if(i > -1) {
					this.tm.splice(i, 1);
				}else{
					if((this.tm.length + dmLen) >= maxNum) {
						this.$u.toast('最多只能选择'+maxNum+'个号码');
						return;
					}
					this.tm.push(num);
				}
				if(dmLen) {
					let res = toGroup(this.dm, this.tm, size - dmLen);
					//console.log(res, size - dmLen)
					this.len = res.length;
				}else{
					this.len = 0;
				}
			},
			danma(num) {
				let maxNum = this.list[this.current].wayType - 1;
				let i = this.dm.indexOf(num);
				if(i > -1) {
					this.dm.splice(i, 1);
				}else{
					if(this.dm.length >= maxNum) {
						this.$u.toast('最多只能选择'+maxNum+'个号码');
						return;
					}
					this.dm.push(num);
				}
			},
			confirm() {
				
			},
			submit() {
				if(this.len === 0) {
					return;
				}
				if(!this.show) {
					this.show = true;
					return;
				}
				let {periods, multiple} = this;
				let way = this.list[this.current];
				let url = './payConfirm?name='+way.wayName+'&wayType='+way.wayType+'&periods='+periods+'&multiple='+multiple;
				if(this.type === 1) {
					if(this.tab1 === 0) {
						let rx = this.rx;
						if(!rx.length) {
							// 没有选好
							return;
						}
						uni.navigateTo({
							url: url+'&rx='+rx.join(',')+'&type=1&t=0'
						})
					}else if(this.tab1 === 1) {
						let tm = this.tm, dm = this.dm;
						if(!tm.length || !dm.length) {
							// 没有选好
							return;
						}
						uni.navigateTo({
							url: url+'&dm='+dm.join(',')+'&tm='+tm.join(',')+'&type=1&t=1'
						})
					}
				}else if(this.type === 2) {
					if(this.tab2 === 0) {
						let zx = this.zx;
						if(!zx.length) {
							// 没有选好
							return;
						}
						uni.navigateTo({
							url: url+'&zx='+zx.join(',')+'&type=2&t=0'
						})
					}else if(this.tab2 === 1) {
						let fs = this.fs;
						if(!fs.length) {
							// 没有选好
							return;
						}
						uni.navigateTo({
							url: url+'&fs='+fs.join(',')+'&type=2&t=1'
						})
					}					
				}
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
				margin-top: 15rpx;
				margin-bottom: 15rpx;
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
						&.active{
							border-color: #F1343E;
							background-color: #F1343E;
							color: #fff;
						}
					}
				}
			}
		}
		
		.submit{
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			background-color: #F1343E;
			&.is-fixed{
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}
		.select-tip{
			font-size: 24rpx;
			color: #999;
			.num{
				color: #333;
			}
		}
		.ball-title{
			font-size: 26rpx;
			color: #333333;
			margin-top: 5rpx;
			margin-bottom: 5rpx;
		}
		.drag-balls{
			display: flex;
			flex-direction: column;
			align-items: center;
			.drag-title{
				font-size: 30rpx;
				color: #333;
				padding: 20rpx 0;
			}
			.drag-desc{
				font-size: 26rpx;
				color: #A5A5A5;
				margin-top: 15rpx;
			}
		}
	}
	
	.touzhu-popover{
		padding: 30rpx;
		
		.title{
			text-align: center;
			font-size: 26rpx;
			color: #333;
			margin-bottom: 30rpx;
		}
		.select-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 0;
			margin-bottom: 20rpx;
		}
	}
</style>
