<template>
	<view class="common-bg">
		<u-cell-group>
			<u-cell-item title="清除缓存" :value="value" @click="cachelist"></u-cell-item>
			<u-cell-item title="检测最新版本" @click="versions"></u-cell-item>
			<u-cell-item title="关于我们"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
    data() {
      return {
        value:0,
      }
    },
		methods: {
      
      // 更新版本
      versions(){
        console.log(55555)
        // 获取版本信息
        plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
        // this.versionsba =  
        console.log(wgtinfo.version);//应用版本号
        this.checkUpdate(wgtinfo.version)
        })
      // this.checkUpdate('1.0.0')
      },
      
      // 下载方法
      checkUpdate(wgtinfo){
        let a = 1+'/'+wgtinfo
        console.log(a)
        this.$u.get('/appVersion/getNewVersion/'+a, {}).then(res => {
          if(res.status==1){
              plus.runtime.openURL(res.url);  
            }
        });  
      },
      // 清理内存
      cache() {
       let a= Math.round((Math.random()*50)+1);
       this.value = a+"MB"
      },
      
      cachelist(){
        let that = this
        // that.show3 = true
        setTimeout(function () {
          that.value=0+'MB'
          // that.show3 = false  
        }, 1000);
      },
   
		}
	}
</script>

<style>
</style>
