

const install = (Vue, vm) => {
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		
	};
}

export default {
	install
}