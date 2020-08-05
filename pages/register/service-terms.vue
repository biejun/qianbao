<template>
	<view class="service-terms">
		<u-parse :html="strings"></u-parse>
		<u-radio-group v-model="value" size="24rpx">
			<u-radio shape="circle" active-color="#FFC000">我已阅读并同意条款和说明！</u-radio>
		</u-radio-group>
		<u-button class="submit" :disabled="vuex_agreeTerm" @click="submit">{{vuex_agreeTerm ? '您已同意本条款' : '确定'}}</u-button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				value: '',
				strings: ''
			}
		},
		created() {
			this.$u.api.getTextContext(4).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.textTitle
				})
				this.strings = res.data.content;
			})
		},
		methods: {
			submit() {
				this.$u.vuex('vuex_agreeTerm', true);
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.service-terms{
		padding: 30rpx;
		
		/deep/ .u-radio__label{
			color: #a5a5a5;
			font-size: 24rpx;
		}
		/deep/ p{
			margin-bottom: 15rpx;
			margin-top: 15rpx;
			word-wrap: break-word;			word-break: break-all;
		}
		/deep/ ul{
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
		
		.submit{
			background-color: $uni-color-primary;
			color: #fff;
			border-color: $uni-color-primary;
			&[disabled]{
				background-color: #F7DA79;
				border-color: #F7DA79;
			}
		}
	}
</style>
