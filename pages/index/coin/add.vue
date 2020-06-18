<template>
	<view class="common-bg coin-add">
		<u-cell-group>
			<u-cell-item title="USDT" :title-style="titleStyle" center :arrow="false">
				<u-avatar :src="src" slot="icon" size="mini"></u-avatar>
				<view slot="right-icon" class="actions">
					<u-switch v-model="checked1" active-color="#F1333D" inactive-color="#F3F3F3"></u-switch>
				</view>
			</u-cell-item>
			<u-cell-item title="BTC" :title-style="titleStyle" center :arrow="false">
				<u-avatar :src="src" slot="icon" size="mini"></u-avatar>
				<view slot="right-icon" class="actions">
					<u-switch v-model="checked2" active-color="#F1333D" inactive-color="#F3F3F3"></u-switch>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				titleStyle: {
					'margin-left': '20rpx',
					'font-size': '32rpx',
					'color': '#333'
				},
				checked1: false,
				checked2: true
			}
		}
	}
</script>

<style lang="scss">
	.coin-add{
		.actions{
			margin-top: 15rpx;
		}
		.u-cell-border{
			&::after{
				border-bottom: 2rpx solid #f3f3f3!important
			}
		}
	}
</style>
