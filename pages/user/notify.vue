<template>
	<view class="common-bg user-notify">
		<view class="notify-wrap">
			<u-subsection :list="list" 
				:current="curNow" 
				mode="subsection"
        active-color="#F1333D"
				@change="sectionChange"></u-subsection>
			<view v-if="data.length" class="content-wrap">
				<view class="content-box" v-for="item in data" :key="item.id">
					<view class="content-header">
						<view class="content-title">{{item.noticeTitle}}</view>
						<view class="content-time">{{item.createTime}}</view>
					</view>
					<view class="content-body">
						{{item.content}}  
					</view>
				</view>
			</view>
			<u-empty v-else text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: [
					{
						name: '消息通知'
					},
					{
						name: '系统公告'
					}
				],
				data: [],
				curNow: 0,
        type:0,
			}
		},
    onLoad(op) {
      if(op.type==2){
        this.curNow = 1
        this.getNotifyData(op.type);
      }else{
        this.getNotifyData(1)
      }

    },
		methods: {
			sectionChange(index) {
				this.curNow = index;
        let type = this.curNow + 1;
				this.getNotifyData(type);
			},
			async getNotifyData(type) {
				await this.$u.get('/notice/getNotice/'+ type).then(res => {
					this.data = res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.user-notify{
		.notify-wrap{
			padding: 30rpx;
		}
		.content-wrap{
			padding-top: 20rpx;
			
			.content-box{
				padding: 18rpx;
				border-radius: 10rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				
				.content-header{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				
				.content-title{
					font-size: 30rpx;
					font-weight: bold;
				}
				
				.content-time{
					font-size: 22rpx;
				}
				
				.content-body{
					font-size: 28rpx;
					color: #666;
				}
			}
		}
	}
</style>
