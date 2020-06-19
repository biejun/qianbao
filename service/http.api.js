

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
	vm.$u.api = {
		getsetPassword, getInfo, getUser, getLog, getImage, getPasswor,getmodification, getsetDeal, getpassword
	};
}

export default {
	install
}