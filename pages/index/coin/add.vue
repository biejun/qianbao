<template>
	<view class="common-bg coin-add">
		<u-cell-group>
			<u-cell-item v-for="item in list" 
				:title="item.coinName" 
				:title-style="titleStyle" 
				center 
				:arrow="false">
				<u-avatar :src="item.coinImg" slot="icon" size="mini"></u-avatar>
				<view slot="right-icon" class="actions">
					<view @click="setCoinName(item)">
						<u-switch v-model="item.switch" active-color="#fcc82b" inactive-color="#F3F3F3" @change="handleChange"></u-switch>
					</view>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				//src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				titleStyle: {
					'margin-left': '20rpx',
					'font-size': '32rpx',
					'color': '#333'
				},
				list: [],
				coinName: ''
			}
		},
		created() {
			this.getCoinList();
		},
		methods: {
			setCoinName(item) {
				this.coinName = item.coinName
			},
			getCoinList() {
				this.$u.get('/uUserAccount/getAccountCoins').then(res => {
					this.list = res.data.map(v => {
						v.switch = Boolean(v.isExist);
						return v;
					});
				})
			},
			handleChange(val) {
				if(!this.coinName) {
					setTimeout(() => {
						this.handleChange(val);
					}, 100);
					return;
				}
				this.$u.post('/uUserAccount/changeAccountCoins', {
					coinName: this.coinName,
					isExist: Number(val)
				}).then(res => {
					this.coinName = '';
				}, err => {
					this.$refs.uToast.show({
						title: err.msg,
						type: 'error',
					})
				})
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
