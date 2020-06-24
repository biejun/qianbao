

const install = (Vue, vm) => {
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  let getsetPassword= (params = {}) => vm.$u.post('/uUser/setPassword',params); // 设置登录密码1
  let getInfo= (params = {}) => vm.$u.post('/uUser/login',params); // 短信登录接口1
  let getUser = (params = {}) => vm.$u.get('/uUser/getUser',params); // 获取个人信息1
  let getLog = (params = {}) => vm.$u.post('/uUser/loginByPass',params); // 手机密码登录1
  let getImage = (params = {}) => vm.$u.get('/code/kaptcha',params); // 图形验证码1
  let getPasswor = (params = {}) => vm.$u.post('/uUser/resetPassword',params); // 重置密码1
  let getmodification= (params = {}) => vm.$u.post('/uUser/updatePhone' ,params); // 修改手机号1
  let getsetDeal= (params = {}) => vm.$u.post('/uUser/setTxPassword',params); // 设置交易密码
  let getpassword= (params = {}) => vm.$u.post('/uUser/setPassword',params); // 修改密码1
  let getupdateUrl= (params = {}) => vm.$u.post('/uUser/updateUser',params); // 修改个人信息
  let getLogout = (params = {}) => vm.$u.get('/uUser/logout',{}); // 退出登录
  let getregister = (params) => vm.$u.post('/uUser/register',params); // 邀请注册
  let getuserInvite = (coinName) => vm.$u.get('/uUser/userInvite/'+coinName); // 二维码邀请
  let getCoinList = (params = {}) => vm.$u.get('/wRecordRecharge/getCoinList',params); // 获取币列表
  let getCoinAddress = (coinName) => vm.$u.get('/wRecordRecharge/getCoinAddress/'+coinName); // 获取充币地址
  let getUserAmount = () => vm.$u.get('/uUserAccount/userAmount'); // 获取用户资金列表
  let getAccountDetail = (accountType, type) => vm.$u.get(`/uUserAccount/getAccountDetail/${accountType}/${type}`);
	vm.$u.api = {
		getsetPassword, getInfo, getUser, getLog, getImage, getPasswor,getmodification, getsetDeal, getpassword,
		getCoinList, getupdateUrl, getLogout, getregister,
		getCoinAddress, getuserInvite,
		getUserAmount,
		getAccountDetail
	};
}

export default {
	install
}