<template>
	<view class="learn-page">
		<view class="learn-detail">
			<u-parse :html="content" :selectable="true"></u-parse>
<!-- 			<text class="p">充币是把数字货币充入到区块链玩家中。如果您是新用户，还没有GCN币，只能把USDT、BTC、ETH币充入到区块链玩家中。如果您是老用户，在区块玩家系统外部的钱包中已拥有GCN资产，将支持外部钱包GCN币充入到区块链玩家钱包中。充币的方法就是把数字货币从交易所/外部钱包提币到区块玩家相应的钱包地址中。</text>
			<text class="h2" selectable>如何拥有USDT、BTC、ETH币和对应的钱包</text>
			 <text class="p title" selectable>我是区块链小白，没有数字货币和钱包？</text>
			 <text class="p" selectable>区块链小白用以下方法拥有数字货币和对应的钱包。</text>
			 <text class="p" selectable>从数字货币交易所取得数字货币：下载数字货币交易所APP并注册为数字货币交易所身份,从数字货币交易所购买数字货币后，数字货币交易所会为您创建交易所身份下的钱包，存放已经购买的数字货币。如购买100USDT,数字货币交易所为您创建USDT钱包，钱包资产为100USDT，并生成一个USDT钱包地址。如购买10BTC，数字货币交易所为您创建BTC钱包，钱包资产为10BTC，并为您生成一个BTC钱包地址，建议购买一些行情波动不大，比较稳定的数字货币如USDT。注意购买不同的数字货币生成不同的钱包地址，转账时注意甄别这些钱包地址。</text>
			 <text class="p title">主要数字货币官方网站</text>
			 <text class="p li" selectable>瑞士\n www.zb.com </text><text class="p li" selectable>美国\n www.Kraken.com</text> <text class="p li" selectable>香港\n www.bitfinex.com</text> <text class="p li" selectable>英国\n www.hibtc.com </text><text class="p li" selectable>中国\n www.huobi.me</text>
			<text class="p">我是区块链大咖，已有数字货币和钱包</text>
			<text class="p">把数字货币充入到区块玩家相应的数字货币钱包地址中，建议使用行情比较稳定的USDT。</text> -->
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				content: ""
			}
		},
		created() {
			this.$u.api.getTextContext(1).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.textTitle
				})
				this.content = res.data.content;
			})
		}
	}
</script>

<style lang="scss">
	.learn-page{
		height: 100%;
		background-color: #F2F3FE;
		overflow: auto;
	}
	.learn-detail{
		padding: 40rpx 30rpx;
		
		/deep/ .h2{
			font-size: 30rpx;
			display: block;
			margin-bottom: 10px;
			font-weight: bold;
		}
		/deep/ .p{
			display: block;
			margin-bottom: 10px;
			word-wrap: break-word;
			word-break: break-all;
			
			&.li{
				margin-bottom: 5px;
			}
			
			&.title{
				&::before{
					content: "";
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #F6B37F;
					display: inline-block;
					margin-right: 4px;
				}
			}
		}
	}
</style>
