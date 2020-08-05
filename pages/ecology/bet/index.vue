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
			<view v-if="type === 1" class="way-tab renxuan">
				<view class="way-tab-item"
					:class="[tab1 === 0 ? 'is-active' : '']" 
					@click="tab1 = 0">{{$t('Commonplay')}}</view>
				<view class="way-tab-item"
					:class="[tab1 === 1 ? 'is-active' : '']"  
					@click="tab1 = 1">{{$t('MultipleBets')}}</view>
				<view class="way-tab-item" 
					:class="[tab1 === 2 ? 'is-active' : '']" 
					@click="tab1 = 2">{{$t('Daretoplay')}}</view>
			</view>
			<view v-if="type === 2" class="way-tab">
				<view class="way-tab-item" 
					:class="[tab2 === 0 ? 'is-active' : '']" 
					@click="tab2 = 0">{{$t('Commonplay')}}</view>
				<view class="way-tab-item" 
					:class="[tab2 === 1 ? 'is-active' : '']"  
					@click="tab2 = 1" v-show="current != 6">{{$t('MultipleBets')}}</view>
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
						{{$t('Currentlyselected')}}<text class="num">{{len}}</text>{{$t('Bet')}}，{{$t('Total')}}<text class="num">{{totalGCN}}</text>GCN
					</view>
				</template>
				<template v-if="tab1 === 1">
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
						{{$t('Currentlyselected')}}<text class="num">{{len}}</text>{{$t('Bet')}}，{{$t('Total')}}<text class="num">{{totalGCN}}</text>GCN
					</view>
				</template>
				<template v-if="tab1 === 2">
					<view clasa="ball-title">{{$t('Important')}}</view>
					<view class="ball-list">
						<view class="ball-item" 
							v-for="(item, index) in danmas" :key="index"
							@click="danma(item)">
							<view class="ball" :class="dm.indexOf(item) > -1 ? 'active' : ''">
								{{item}}
							</view>
						</view>
					</view>
					<view clasa="ball-title">{{$t('Secondary')}}</view>
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
						{{$t('Currentlyselected')}}<text class="num">{{len}}</text>{{$t('Bet')}}，{{$t('Total')}}<text class="num">{{totalGCN}}</text>GCN
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
						{{$t('Currentlyselected')}}<text class="num">{{len}}</text>{{$t('Bet')}}，{{$t('Total')}}<text class="num">{{totalGCN}}</text>GCN
					</view>
					<view class="drag-balls" v-if="zx.length > 0 && current === 6">
						<view class="drag-title">{{$t('Sort')}}</view>
						<dragSorts :list="zx" @confirm="confirm" :removeItem="zhixuan"></dragSorts>
						<view class="drag-desc">{{$t('SortTip')}}</view>
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
						{{$t('Currentlyselected')}}<text class="num">{{len}}</text>{{$t('Bet')}}，{{$t('Total')}}<text class="num">{{totalGCN}}</text>GCN
					</view>
				</template>
			</template>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="20" closeable>
			<view class="touzhu-popover">
				<view class="title">
					{{$t('title')}}
				</view>
				<view class="select-item">
					<view>{{$t('Append')}}</view>
					<view><u-number-box v-model="periods" :min="1" :max="15"></u-number-box></view>
				</view>
				<view class="select-item">
					<view>{{$t('Multiple')}}</view>
					<view><u-number-box v-model="multiple" :min="1" :max="50"></u-number-box></view>
				</view>
				
				<view class="confirm-submit" @click="submit">{{$t('Submit')}}</view>
			</view>
		</u-popup>
		<view class="button-group">
			<view class="random-btn" @click="random">{{$t('Random')}}</view>
			<view class="submit-btn" @click="submit">{{$t('Submit')}}</view>
		</view>
	</view>
</template>

<script>
	import dragSorts from '@/common/HM-dragSorts/HM-dragSorts.vue';
	import { combination, toGroup, getRandomArray } from '@/common/utils.js';
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
				len: 0,
				i18n: {
					zh: {
						Commonplay: "普通玩法",
						Daretoplay: "膽拖玩法",
						Important: "膽碼選擇",
						Secondary: "拖碼選擇",
						MultipleBets: "復式投註",
						Currentlyselected: "您當前選擇了",
						Bet: "註",
						Total: "總共",
						Sort: "排序",
						SortTip: "手指拖動進行排序",
						Multiple: "投註倍數",
						Append: "追號期數",
						title: "追號/倍數選擇",
						Submit: "提交投註",
						Random: '機選',
						mostNum: '最多只能選擇{0}個號碼',
						pleaseSelect: "請選擇號碼",
						helpText: '\ue614 規則玩法',
						betting: "我要投注"
					},
					en: {
						Commonplay: "Common play",
						Daretoplay: "Dare to play",
						Important: "Important",
						Secondary: "Secondary",
						MultipleBets: "Multiple Bets",
						Currentlyselected: "Currently selected",
						Bet: "Bet",
						Total: "Total",
						Sort: "Sort",
						SortTip: "Drag with fingers to sort",
						Multiple: "Multiple",
						Append: "Append",
						title: "Add number / multiple selection",
						Submit: "Submit",
						Random: 'Random',
						mostNum: 'You can only select {0} numbers at most',
						pleaseSelect: "Please select a number",
						helpText: '\ue614 Rules play',
						betting: "Betting"
					}
				},
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
		created() {
			this.setNavBarTitle('betting');
			// #ifdef APP-PLUS
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			currentWebview.setTitleNViewButtonStyle(0, {
				text: this.$t('helpText')
			})
			// #endif	
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
						this.$u.toast(this.$t('mostNum').replace('{0}', maxNum));
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
						this.$u.toast(this.$t('mostNum').replace('{0}', maxNum));
						return;
					}
					this.zx.push(num);
				}
				this.len = maxNum === this.zx.length ? 1 : 0;
			},
			fushi(num) {
				let maxNum = 12;
				let wayType = this.list[this.current].wayType;
				// 如果复式投注来自任选(type = 1 就是任选页面) size 为 wayType 的值
				let size = this.type === 1 ? wayType : wayType === 7 ? 6 : 1;
				let i = this.fs.indexOf(num);
				if(i > -1) {
					this.fs.splice(i, 1);
				}else{
					if(this.fs.length >= maxNum) {
						this.$u.toast(this.$t('mostNum').replace('{0}', maxNum));
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
				let maxNum = 12;
				let size = this.list[this.current].wayType;
				let i = this.tm.indexOf(num);
				let dmLen = this.dm.length;
				if(i > -1) {
					this.tm.splice(i, 1);
				}else{
					if((this.tm.length + dmLen) >= maxNum) {
						this.$u.toast(this.$t('mostNum').replace('{0}', maxNum));
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
						this.$u.toast(this.$t('mostNum').replace('{0}', maxNum));
						return;
					}
					this.dm.push(num);
				}
			},
			confirm() {
				
			},
			// 机选 随机给
			random() {
				let current = this.current;
				let balls = makeBalls();
				this.change(current);
				if(this.type === 1) {
					if(this.tab1 === 0) {
						let limit = this.list[current].wayType;
						let ma = getRandomArray(balls, limit);
						for(let i = 0; i < ma.length; i++) {
							this.renxuan(ma[i]);
						}
					}else if(this.tab1 === 1) {
						let limit = this.list[current].wayType;
						let ma = getRandomArray(balls, limit);
						for(let i = 0; i < ma.length; i++) {
							this.fushi(ma[i]);
						}
					}else if(this.tab1 === 2) {
						let limit = this.list[current].wayType;
						let randDm = Math.ceil(Math.random()*(limit-1));
						let dm = getRandomArray(balls, randDm);
						for(let i = 0; i < dm.length; i++) {
							this.danma(dm[i]);
						}
						let tm = getRandomArray(balls, limit - randDm);
						for(let i = 0; i < tm.length; i++) {
							this.tuoma(tm[i]);
						}
					}
				}else if(this.type === 2) {
					let limit = this.list[current].wayType === 7 ? 6 : 1;
					if(this.tab2 === 0) {
						let ma = getRandomArray(balls, limit);
						for(let i = 0; i < ma.length; i++) {
							this.zhixuan(ma[i]);
						}
					}else if(this.tab2 === 1) {
						let ma = getRandomArray(balls, limit);
						for(let i = 0; i < ma.length; i++) {
							this.fushi(ma[i]);
						}
					}
				}
			},
			submit() {
				if(this.len === 0) {
					this.$u.toast(this.$t('pleaseSelect'));
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
							this.$u.toast(this.$t('pleaseSelect'));
							return;
						}
						uni.navigateTo({
							url: url+'&rx='+rx.join(',')+'&type=1&t=0'
						})
					}else if(this.tab1 === 1) {
						let fs = this.fs;
						if(!fs.length) {
							// 没有选好
							this.$u.toast(this.$t('pleaseSelect'));
							return;
						}
						uni.navigateTo({
							url: url+'&fs='+fs.join(',')+'&type=1&t=1'
						})
					}else if(this.tab1 === 2) {
						let tm = this.tm, dm = this.dm;
						if(!tm.length || !dm.length) {
							// 没有选好
							this.$u.toast(this.$t('pleaseSelect'));
							return;
						}
						uni.navigateTo({
							url: url+'&dm='+dm.join(',')+'&tm='+tm.join(',')+'&type=1&t=2'
						})
					}
				}else if(this.type === 2) {
					if(this.tab2 === 0) {
						let zx = this.zx;
						if(!zx.length) {
							// 没有选好
							this.$u.toast(this.$t('pleaseSelect'));
							return;
						}
						uni.navigateTo({
							url: url+'&zx='+zx.join(',')+'&type=2&t=0'
						})
					}else if(this.tab2 === 1) {
						let fs = this.fs;
						if(!fs.length) {
							// 没有选好
							this.$u.toast(this.$t('pleaseSelect'));
							return;
						}
						uni.navigateTo({
							url: url+'&fs='+fs.join(',')+'&type=2&t=1'
						})
					}					
				}
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
				
				&.renxuan{
					width: 500rpx;
				}
				
				.way-tab-item{
					background-color: #f3f3f3;
					flex: 1;
					text-align: center;
					line-height: 60rpx;
					font-size: 30rpx;
					color: #A5A5A5;
					
					&.is-active {
						background-color: $uni-color-primary;
						color: #fff;
					}
				}
			}
			
			.ball-list{
				display: flex;
				flex-wrap: wrap;
				margin-top: 15rpx;
				margin-bottom: 15rpx;
				margin-left: -10rpx;
				margin-right: -10rpx;
				.ball-item{
					flex:1 0 12.5%;
					min-width: 12.5%;
					padding: 14rpx 10rpx;
					.ball{
						border: 1rpx solid #333;
						width: 70rpx;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						border-radius:50%;
						font-size: 32rpx;
						&.active{
							border-color: $uni-color-primary;
							background-color: $uni-color-primary;
							color: #fff;
						}
					}
				}
			}
		}
		
		.button-group{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			
			.random-btn{
				width: 240rpx;
				background-color: #E9B306;
				color: #fff;
				font-size: 32rpx;
			}
			
			.submit-btn{
				flex: 1;
				color: #fff;
				font-size: 32rpx;
				background-color: #FFC000;
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
	
	.confirm-submit{
		color: #fff;
		font-size: 32rpx;
		background-color: $uni-color-primary;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 4rpx;
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
