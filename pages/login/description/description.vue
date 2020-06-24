<template>
	<u-index-list :scrollTop="scrollTop" :index-list="indexList">
		<view v-for="(item, index) in list" :key="index">
			<u-index-anchor :index="item.letter" />
			<view class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index">
        <text>{{item1.en}}</text>
        <text>{{item1.cn}}</text>
        <text>{{item1.code}}</text>
			</view>
		</view>
	</u-index-list>
</template>

<script>
	import indexList from "@/common/country.js";
	const letterArr = indexList.list.map(val => {
		return val.letter;   
	})
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: letterArr,
				list: indexList.list
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 0rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
    justify-content: space-around;
	}
  // text{
  //   : 30rpx;
  // }
</style>
