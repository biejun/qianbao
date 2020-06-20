<template>
	<view class="lecai-kaijiang">
		<u-navbar :is-back="false" title="" :custom-back="goUserCenter">
			<view class="header-navbar">
				<view class="navbar-icon" @click="goUserCenter">
					<u-icon name="account" size="40"></u-icon>
				</view>
				<view class="navbar-title">哈希乐彩</view>
				<view></view>
			</view>
		</u-navbar>
		<view class="header-item border-bottom-10">
			<view class="header-num">
				0000001期  2020-05-04 22:00开奖
			</view>
			<view class="header-notify">
				<image src="../../../static/icon_xiaoxi.png" class="notify-icon"></image>
			</view>
		</view>
		<view class="kai-jiang border-bottom-10">
			<view class="title">开奖号码</view>
			<view class="numbers">
				<div class="item">
					<view class="num">
						9
					</view>
				</div>
				<div class="item">
					<view class="num">
						7
					</view>
				</div>
				<div class="item">
					<view class="num">
						a
					</view>
				</div>
				<div class="item">
					<view class="num">
						c
					</view>
				</div>
				<div class="item">
					<view class="num">
						c
					</view>
				</div>
				<div class="item">
					<view class="num">
						9
					</view>
				</div>
			</view>
			<view class="kai-jiang-ma">
				<view class="kai-jiang-pd30">
					<view class="kai-row">
						<view class="kai-item-name">开奖哈希：</view>
						<view class="kai-item-value">492d65d279d6c3a53520c435da4ceaa2e956e52976a2c</view>
					</view>
					<view class="kai-row">
						<view class="kai-item-name">区块高度：</view>
						<view class="kai-item-value">628099</view>
						<view @click="copy" class="copy-text">复制</view>
					</view>
				</view>
			</view>
		</view>
		<view class="kai-jiang">
			<view class="title">开奖详细</view>
			<view class="kai-detail-row">
				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">3.15</text>
						<text class="detail-unit">亿</text>
					</view>
					<view class="detail-cell-item">
						本期奖池
					</view>
				</view>
				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">3.15</text>
						<text class="detail-unit">亿</text>
					</view>
					<view class="detail-cell-item">
						本期浮动奖金
					</view>
				</view>
				<view class="kai-detail-cell">
					<view>
						<text class="detail-num">3.15</text>
						<text class="detail-unit">亿</text>
					</view>
					<view class="detail-cell-item">
						本期销售额
					</view>
				</view>
			</view>
			<view class="kai-detail-table-head">
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						奖项
					</view>
					<view class="kai-detail-cell">
						中奖条件
					</view>
					<view class="kai-detail-cell">
						中奖注数
					</view>
					<view class="kai-detail-cell">
						单注金额(GCN)
					</view>
				</view>
			</view>
			<view class="kai-detail-table-body">
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="kai-detail-row">
					<view class="kai-detail-cell">
						特等奖 
					</view>
					<view class="kai-detail-cell">
						直选6
					</view>
					<view class="kai-detail-cell">
						0
					</view>
					<view class="kai-detail-cell">
						6,000,000
					</view>
				</view>
				<view class="next">
					<text>下期：0000002期</text>
					<text>2020-05-05 22:00开奖</text>
				</view>
			</view>
		</view>
		<view class="footer-item">
			<view class="wode-touzhu" @click="goMy">
				我的投注
			</view>
			<view class="woyao-touzhu" @click="goSelect">
				我要投注
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				value: '2222'
			}
		},
		methods: {
			goUserCenter() {
				uni.navigateTo({
					url: '/pages/ecology/my/index'
				})
			},
			copy() {
				uni.setClipboardData({
				    data: this.value,
				    success() {
				        console.log('success');
				    }
				});
			},
			goSelect() {
				uni.navigateTo({
					url: '../bet/select'
				})
			},
			goMy() {
				uni.navigateTo({
					url: '../bet/my'
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.lecai-kaijiang{
		.header-navbar{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			flex: 1;
			
			.navbar-title{
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.border-bottom-10{
			border-bottom: 10rpx solid #f3f3f3;
		}
		.header-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15rpx 30rpx;
		}
		.header-num{
			color: #343434;
			font-size: 28rpx;
		}
		.header-notify{
			.notify-icon{
				width: 36rpx;
				height: 36rpx;
			}
		}
		
		.kai-jiang{
			padding: 30rpx;
			
			.title{
				color: #343434;
				text-align: center;
				font-size: 36rpx;
			}
			.numbers{
				padding: 20rpx 30rpx;
				display: flex;
				
				.item{
					flex: 1;
					
					.num{
						width:80rpx;
						height:80rpx;
						background:rgba(241,38,28,1);
						border-radius:50%;
						font-size:60rpx;
						line-height: 80rpx;
						text-align: center;
						font-weight:bold;
						color:rgba(255,255,255,1);
					}
				}
			}
			.kai-jiang-ma{
				margin-top: 20rpx;
				background: url(../../../static/kajiiangbeij@2x.png) top center no-repeat;
				background-size: cover;
				padding: 30rpx;
				height: 250rpx;
				.kai-jiang-pd30{
					padding: 15rpx 20rpx;
					.kai-row{
						display: flex;
						font-size: 30rpx;
						margin-bottom: 20rpx;
						
						.kai-item-name{
							width: 150rpx;
							min-width: 150rpx;
						}
						.kai-item-value{
							flex: 1;
							word-wrap: break-word;
							word-break: break-all;
						}
						.copy-text{
							color: $uni-color-primary;
						}
					}
				}
			}
			
			.kai-detail-row{
				display: flex;
				padding: 15rpx 0;
			}
			.kai-detail-cell{
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
				
				.detail-num{
					font-size: 36rpx;
					color: #F2271C;
					font-weight: bold;
				}
				.detail-unit{
					font-size: 24rpx;
					color: #343434;
				}
				.detail-cell-item{
					font-size: 24rpx;
					color: #343434;
					margin-top: 10rpx;
				}
			}
			
			.kai-detail-table-head{
				margin-top: 20rpx;
				border-top: 2rpx solid #f3f3f3;
				border-bottom: 2rpx solid #f3f3f3;
				
				.kai-detail-cell{
					color: #666;
					font-size: 24rpx;
					align-items: flex-start;
					
					&:last-child{
						min-width: 250rpx;
						align-items: center;
					}
				}
			}
			
			.kai-detail-table-body{
				padding-bottom: 110rpx;
				
				.kai-detail-cell{
					color: #343434;
					font-size: 26rpx;
					align-items: flex-start;
					font-weight: bold;
					&:last-child{
						min-width: 250rpx;
						align-items: center;
					}
				}
				
				.next{
					border-top: 1px solid #f3f3f3;
					padding: 20rpx 0;
					height:26rpx;
					font-size:28rpx;
					font-weight:500;
					color:rgba(52,52,52,1);
					
					text{
						margin-right: 10rpx;
					}
				}
			}
		}
		.footer-item{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			height: 98rpx;
			.wode-touzhu{
				width: 250rpx;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				background-color: #F3F3F3;
				color: #343434;
				font-size: 32rpx;
			}
			.woyao-touzhu{
				flex: 1;
				background-color: #F1343E;
				color: #fff;
				font-size: 32rpx;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
			}
		}
	}
</style>
