<template>
	<view class="common-bg modify-pay-password">
		<view class="enter-password">
			<view class="enter-tip">输入当前交易密码</view>
			<u-message-input :dot-fill="true" :maxlength="maxlength" :value="value"></u-message-input>
		</view>
		<u-keyboard ref="uKeyboard" mode="number" @change="valChange" @backspace="backspace" :dot-enabled="false" :tooltip="false" v-model="show" :mask="false"></u-keyboard>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				value: '',
				show: true,
				maxlength: 6
			}
		},
		methods: {
			valChange(val) {
				if(this.value.length < this.maxlength) this.value += val;
				if(this.value.length === this.maxlength) console.log('finish');
			},
			backspace() {
				if(this.value.length) this.value = this.value.substr(0, this.value.length - 1);
			}
		}
	}
</script>

<style lang="scss">
	.modify-pay-password{
		.enter-password{
			padding: 100rpx 0;
			
			.enter-tip{
				text-align: center;
				font-size: 28rpx;
				margin-bottom: 16rpx;
			}
		}
	}
</style>
