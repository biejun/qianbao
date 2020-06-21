<template>
	<view class="HM-drag-sort" >
		<view class="list" :class="[listSwitch?'show':'hide']">
			<block v-for="(row,index) in dragListA" :key="index">
				<view class="rowA" :id="'rowA'+index">
					<view class="num">{{row}}</view>
					<!-- #ifndef MP-WEIXIN -->
						<view class="drag" :data-index="index" data-type="A" :data-isdelay="isdelay" :data-rownum="dragListA.length"
						 @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove" @touchend.stop.prevent="drag.touchend">
						</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<view class="drag" :data-index="index" data-type="A" :data-isdelay="isdelay" :data-rownum="dragListA.length"
						 @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend">
						</view>
					<!-- #endif -->
				</view>
			</block>
		</view>
		<!-- #ifndef H5 -->
		<!-- 非H5端，直接切换list，避免看到排序渲染的过程(闪动) 原谅我找不到更好的方法了 ╮(╯▽╰)╭ -->
		<view class="list" :class="[listSwitch?'hide':'show']">
			<block v-for="(row,index) in dragListB" :key="index">
				<view class="rowB" :id="'rowB'+index">
					<view class="num">{{row}}</view>
					<!-- #ifndef MP-WEIXIN -->
						<view class="drag" :data-index="index" data-type="B" :data-isdelay="isdelay" :data-rownum="dragListB.length"
						 @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove" @touchend.stop.prevent="drag.touchend">
						</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<view class="drag" :data-index="index" data-type="B" :data-isdelay="isdelay" :data-rownum="dragListB.length"
						 @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend">
						</view>
					<!-- #endif -->
				</view>
			</block>
		</view>
		<!-- #endif -->
	</view>
</template>
<script src="./drag.wxs" module="drag" lang="wxs"></script>
<script>
	export default {
		name: 'HM-dragSort',
		data() {
			return {
				dragListA:[],
				dragListB:[],
				listSwitch: true,
				isdelay: false
			}
		},
		props: {
			list: {
				value: Array,
				default: []
			}
		},
		watch: {
			list: {
				handler(val) {
					this.initList(); //数据变化重新初始化list
				},
				immediate: true
			}
		},
		mounted() {
			// #ifndef H5
			this.isdelay = true;
			// #endif
		},
		methods: {
			initList(){
				if(this.dragListA.length>0){
					//一个延迟，防止闪动
					setTimeout(()=>{
						this.dragListA = this.list;
						this.dragListB = this.list;
					},50)
				}else{
					this.dragListA = this.list;
					this.dragListB = this.list;
				}
			},
			//兼容微信小程序震动
			vibrate(){
				uni.vibrateShort()
			},
			sort(e) {
				let tmpList = JSON.parse(JSON.stringify(this.dragListA));
				tmpList.splice(e.offset, 0, tmpList.splice(e.index, 1)[0]);
				// #ifdef H5
				this.dragListA = [];
				this.dragListA = tmpList;
				// #endif
				// #ifndef H5
					if(this.listSwitch){
						this.dragListB = [];
						this.dragListB = tmpList;
						// #ifdef MP-WEIXIN
						setTimeout(()=>{
						// #endif
						// #ifndef MP-WEIXIN
						this.$nextTick(()=>{
						// #endif
							this.listSwitch = !this.listSwitch;
							this.$nextTick(()=>{
								this.dragListA = [];
								this.dragListA = tmpList;
							})
						// #ifdef MP-WEIXIN
						},50)
						// #endif
						// #ifndef MP-WEIXIN
						})
						// #endif
					}else{
						this.dragListA = [];
						this.dragListA = tmpList;
						// #ifdef MP-WEIXIN
						setTimeout(()=>{
						// #endif
						// #ifndef MP-WEIXIN
						this.$nextTick(()=>{
						// #endif
							this.listSwitch = !this.listSwitch;
							this.$nextTick(()=>{
								this.dragListB = [];
								this.dragListB = tmpList;
							})
						// #ifdef MP-WEIXIN
						},50)
						// #endif
						// #ifndef MP-WEIXIN
						})
						// #endif
					}
				// #endif
				this.$emit('confirm', {list:tmpList});
			}
		}
	}
</script>

<style lang="scss">
	.HM-drag-sort {
		touch-action: none;
		display: flex;
		//flex-direction: column;

		.list {
			display: flex;

			&.show {
				display: flex;
			}

			&.hide {
				display: none;
			}

			.rowA,
			.rowB {
				position: relative;
				display: flex;
				width: 40px;
				height: 40px;
				border: 1px solid #333;
				border-radius: 50%;
				margin-left: 10rpx;
				margin-right: 10rpx;
				
				.num{
					width: 100%;
					text-align: center;
					line-height: 40px;
				}
				
				.drag{
					position: absolute;
					top: 5px;
					left: 0;
					right: 0;
					bottom: 0;
				}

				&.ani {
					transition: all 0.2s;
					-webkit-transition: all 0.2s;
				}

				&.move {
					box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
					background-color: rgba(255, 255, 255, .8);
				}
				
			}
		}

	}
</style>
