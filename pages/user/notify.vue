<template>
	<view class="common-bg user-notify">
<!-- 		<view class="notify-wrap">
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
		</view> -->
		<view class="notify-wrap" :class="[data.length ? '' :'no-data' ]">
			<view v-if="data.length" class="content-wrap">
				<view class="content-box" v-for="item in data" :key="item.id">
					<view class="content-header">
						<view class="content-title">{{item.noticeTitle}}</view>
						<view class="content-time">{{item.createTime | dateFormat}}</view>
					</view>
					<view class="content-body">
						{{item.content}}  
					</view>
				</view>
			</view>
			<u-empty v-else :text="$t('noData')" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	import { dateFormat } from '@/common/utils.js';
	export default{
		filters: {
			dateFormat(val) {
				return dateFormat(val, 'Y-m-d H:i:s');
			}
		},
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
				i18n: {
					zh: {
						noData: "暫無消息",
						notify: "消息通知"
					},
					en: {
						noData: "No Data",
						notify: "Notify"
					}
				},
        type:0,
			}
		},
		created() {
			this.setNavBarTitle('notify');
		},
    onLoad(op) {
      // if(op.type==2){
      //   this.curNow = 1
      //   this.getNotifyData(op.type);
      // }else{
      //   this.getNotifyData(1)
      // }
	  
	  this.getNotifyData();
    },
		methods: {
			sectionChange(index) {
				this.curNow = index;
        let type = this.curNow + 1;
				this.getNotifyData(type);
			},
			async getNotifyData(type) {
				await this.$u.get('/notice/getNotice/').then(res => {
					this.data = res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.user-notify{
		overflow: auto;
		.notify-wrap{
			padding: 30rpx;
			
			&.no-data{
				/deep/ .u-empty{
					min-height: 500rpx;
				}
			}
		}
		.content-wrap{
			padding-top: 20rpx;
			
			.content-box{
				padding: 18rpx;
				margin-bottom: 20rpx;
				border-bottom: 2rpx solid #e6e6e6;
				
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
					padding: 10rpx 0;
				}
			}
		}
	}
</style>
