<template>
	<view class="common-bg learn-page">
		<view class="learn-detail">
			<rich-text :nodes="strings"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				strings: `
				  <p>充币是把数字货币充入到区块链玩家中。如果您是新用户，还没有GCN币，只能把USDT、BTC、ETH币充入到区块链玩家中。如果您是老用户，在区块玩家系统外部的钱包中已拥有GCN资产，将支持外部钱包GCN币充入到区块链玩家钱包中。充币的方法就是把数字货币从交易所/外部钱包提币到区块玩家相应的钱包地址中。</p>
				  <h2>如何拥有USDT、BTC、ETH币和对应的钱包</h2>
				  <p>我是区块链小白，没有数字货币和钱包？</p>
				  <p>区块链小白用以下方法拥有数字货币和对应的钱包。</p>
				  <p>从数字货币交易所取得数字货币：下载数字货币交易所APP并注册为数字货币交易所身份,从数字货币交易所购买数字货币后，数字货币交易所会为您创建交易所身份下的钱包，存放已经购买的数字货币。如购买100USDT,数字货币交易所为您创建USDT钱包，钱包资产为100USDT，并生成一个USDT钱包地址。如购买10BTC，数字货币交易所为您创建BTC钱包，钱包资产为10BTC，并为您生成一个BTC钱包地址，建议购买一些行情波动不大，比较稳定的数字货币如USDT。注意购买不同的数字货币生成不同的钱包地址，转账时注意甄别这些钱包地址。</p>
				  <p>主要数字货币官方网站</p>
				  <p>瑞士 www.zb.com <br/>美国 www.Kraken.com<br/> 香港 www.bitfinex.com<br/> 英国 www.hibtc.com <br/>中国 www.huobi.me</p>
				 <p>我是区块链大咖，已有数字货币和钱包</p>
				 <p>把数字货币充入到区块玩家相应的数字货币钱包地址中，建议使用行情比较稳定的USDT。</p>
				`,
			}
		}
	}
</script>

<style lang="scss">
	.learn-page{
		overflow: auto;
	}
	.learn-detail{
		padding: 40rpx 30rpx;
		
		
		/deep/ p{
			margin-bottom: 20px;
		}
	}
</style>
