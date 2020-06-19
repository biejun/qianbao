<template>
	<view class="index">
		<view class="index-header">
			<view class="header-status-bar">
				<view class="is-fixed"></view>
			</view>  
			<view class="header-navbar">
				<view class="avatar" @click="openUserCenter">
					<image src="../../static/index/header/icon_touxiang.png" mode=""></image>
				</view>
				<view class="notice">
					关于服务器停机更新公告
					<image src="../../static/index/header/jiantou.png" class="arrow"></image>
				</view>
				<view class="notify" @click="goUrl('user/notify')"></view>
			</view>
			<view class="hedaer-assets">
				<view class="total-balance-text">
					总资产
				</view>
				<view class="total-balance">
					<view class="total-balance-number">
						279.4
					</view>
					<view class="total-balance-unit">
						USDT
					</view>
				</view>
				<view class="total-balance-translate">
					≈279.24 GCN
				</view>
				<view class="account-wrap">
					<view class="account-item">
						<view class="account-item-text">
							数字账户
						</view>
						<view class="account-item-number">
							<text>279</text>
							<text>USDT</text>
						</view>
					</view>
					<view class="account-item">
						<view class="account-item-text">
							游戏账户
						</view>
						<view class="account-item-number">
							<text>279</text>
							<text>USDT</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="header-bottom"></view>
    <view class="operate">
      <view class="op-left">
        <image src="../../static/index/content/icon_chongbi.png" mode=""></image>
        <view @click="goUrl('index/coin/recharge')" class="charge">充币</view>
      </view>
       <view class="op-right">
         <image src="../../static/index/content/icon_tibi.png" mode=""></image>
         <view @click="goUrl('index/coin/withdraw')" class="charge">提币</view>
       </view>
    </view>
		<view class="index-content">
			<view class="block-title">
				<text class="block-title__text">资产列表</text>
        <image src="../../static/index/content/icon_jiahao.png" mode=""  @click="goUrl('index/coin/add')"></image>
        <!-- <view class="">
          <u-icon name="plus" class="add-coin" @click="goUrl('index/coin/add')"></u-icon>
        </view> -->
				
			</view>
			<view class="coin-list">
				<view class="coin-cell">
					<image src="../../static/index/content/icon_usdt.png" class="coin-image"></image>
					<view class="coin-name">USDT</view>
					<view class="coin-meta">
						<view class="coin-count">312.123456</view>
						<view class="coin-amount">≈860.123456 GCN</view>
					</view>
					<view class="coin-exchange" @click="goUrl('index/coin/exchange')">
						兑换
					</view>
				</view>
				<view class="coin-cell">
					<image src="../../static/index/content/icon_BTC.png" class="coin-image"></image>
					<view class="coin-name">BTC</view>
					<view class="coin-meta">
						<view class="coin-count">312.123456</view>
						<view class="coin-amount">≈860.123456 GCN</view>
					</view>
					<view class="coin-exchange" @click="goUrl('index/coin/exchange')">
						兑换
					</view>
				</view>
				<view class="coin-cell">
					<image src="../../static/index/content/icon_eth.png" class="coin-image"></image>
					<view class="coin-name">ETC</view>
					<view class="coin-meta">
						<view class="coin-count">72.123456</view>
						<view class="coin-amount">≈860.123456 GCN</view>
					</view>
					<view class="coin-exchange" @click="goUrl('index/coin/exchange')">
						兑换
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			openUserCenter() {
				//this.showUserCenter = true;
				const userCenterPopup = uni.getSubNVueById('userCenterPopup');
				userCenterPopup.show('slide-in-left', 300, function(){
					
				});
				// 关闭 nvue 子窗体  
				//subNVue.hide('fade-out', 300)
			},
			goUrl(page) {
				uni.navigateTo({
					url: '/pages/'+ page
				})
			}
		}
	}
</script>

<style lang="scss">
	.index{
		&-header{
			background:linear-gradient(177deg,rgba(241,51,61,1) 0%,rgba(240,90,80,1) 100%);
			height: 350rpx;
			border-radius: 0 0 50% 50%/0 0 30% 30%;
			padding: 0 30rpx;
			
			.header-status-bar{
				height: var(--status-bar-height);
				.is-fixed{
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					height: var(--status-bar-height);
					background-color: #F1333D;
					z-index: 999;
				}
			}
			
			.header-navbar{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				
				.avatar{
					width: 50rpx;
					height: 50rpx;
					
					image{
						width: 50rpx;
						height: 50rpx;
					}
				}
				
				.notice{
					position: relative;
					height: 55rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
					flex: 1;
					border: 2rpx solid #fff;
					padding: 0 20rpx;
					color: #fff;
					font-size: 26rpx;
					border-radius: 26rpx;
					line-height: 55rpx;
					
					.arrow{
						position: absolute;
						right: 20rpx;
						top: 12rpx;
						width: 15rpx;
						height: 24rpx;
					}
				}
				
				.notify{
					width: 45rpx;
					height: 45rpx;
					background-image: url(../../static/index/header/icon_xiaoxi.png);
					background-size: cover;
				}
			}
			
			.hedaer-assets{
				margin-top: 10rpx;
				background-color: #fff;
				border-radius: 28rpx;
				height: 370rpx;
				box-shadow:0px 0px 18px 0px rgba(0, 0, 0, 0.11);
				padding: 30rpx;
				
				.total-balance-text{
					font-size: 34rpx;
					color: #666666;
					font-weight:500;
				}
				
				.total-balance{
					display: flex;
					margin-top: 10rpx;
					align-items: baseline;
					&-number{
						font-size: 52rpx;
						color: #333333;
						margin-right: 20rpx;
						font-weight: bold;
					}
					&-unit{
						color: #666666;
						font-size: 30rpx;
						font-weight:500;
					}
				}
				.total-balance-translate{
					font-size: 30rpx;
					color: #A5A5A5;
					padding-top: 10rpx;
					padding-bottom: 20rpx;
					border-bottom: 2rpx solid #F3F3F3;
				}
				.account-wrap{
					display: flex;
					justify-content: space-between;
					padding-top: 20rpx;
					
					.account-item{
						position: relative;
						flex: 1;
						&-text{
							color: #A5A5A5;
							font-size: 28rpx;
						}
						&-number{
							color: #333333;
							font-size: 30rpx;
							padding-top: 10rpx;
							text{
								margin-right: 10rpx;
								font-weight: bold;
							}
						}
						
						&:last-child{
							padding-left: 30rpx;
							&:before{
								position: absolute;
								content: "";
								left: -2rpx;
								top: 10rpx;
								bottom: 10rpx;
								width: 2rpx;
								background-color: #F3F3F3;
							}
						}
					}
				}
			}
		}
		
		.header-bottom{
			height: 140rpx;
			// border-bottom: 10rpx solid #fff;
		}
		
		&-content{
			padding: 30rpx;
			
			.block-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				&__text{
					font-size: 34rpx;
					color: #333;
					font-weight: bold;
				}
				image{
				  width: 44rpx;
          height: 44rpx;
				}
				.add-coin{
					width: 50rpx;
					color: $uni-color-primary;
					font-size: 28rpx;
					font-weight: bold;
					text-align: center;
				}
			}
			
			.coin-list{
				padding: 20rpx 0;
				
				.coin-cell{
					border-bottom: 2rpx solid #F3F3F3;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 0;
					
					&:last-child{
						border-bottom: none;
					}
					
					.coin-image{
						width: 80rpx;
						height: 80rpx;
					}
					.coin-name{
						font-size: 30rpx;
						font-weight: bold;
						margin-left: 20rpx;
					}
					.coin-meta{
						flex: 1 0 50%;
						text-align: right;
						padding-right: 60rpx;
						
						.coin-count{
							margin-top: 35rpx;
							font-size: 32rpx;
							font-weight: bold;
						}
						.coin-amount{
							font-size: 26rpx;
							color: #A5A5A5;
						}
					}
					.coin-exchange{
						border:1px solid #F1333D;
            border-right: none;
						width: 100rpx;
						height: 48rpx;
						line-height: 48rpx;
						padding-left: 20rpx;
						color: #F1333D;
						margin-right: -30rpx;
						border-radius:24rpx 0px 0px 24rpx;
						font-size: 28rpx;
					}
				}
			}
		}
		.operate{
      width:700rpx;
      height:98rpx;
      background:rgba(241,51,61,1);
      border-radius:49rpx;
      margin: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
      image{
        width: 58rpx;
        height: 58rpx;
      }
      .charge{
        font-size: 32rpx;
        padding-left: 20rpx;
      }
      .op-left{
        width: 251rpx;
        display: flex;
        align-items: center;
        border-right: 1px solid #fff;
      }
      .op-right{
        display: flex;
        align-items: center;
      }

		}
		// .recharge-btn{
		// 	color: #fff!important;
		// 	font-size: 34rpx!important;
		// 	flex: 0 0 45%;
		// }
		// .exchange-btn{
		// 	flex: 0 0 45%;
		// 	font-size: 34rpx!important;
		// }
	}
</style>
