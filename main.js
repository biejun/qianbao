import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from '@/common/store/index';
import vuexStore from "@/common/store/$u.mixin.js";
import httpInterceptor from '@/service/http.interceptor.js';
import httpApi from '@/service/http.api.js';

Vue.config.productionTip = false;

Vue.use(uView);
Vue.mixin(vuexStore);
Vue.mixin({
	methods: {
		setLanguage(lang) {
			this.$u.vuex('vuex_lang', lang);
		},
		setTabbarText(index, property) {
			uni.setTabBarItem({
				index,
				text: this.$t(property)
			});
		},
		setNavBarTitle(property) {
			uni.setNavigationBarTitle({
				title: this.$t(property)
			})
		},
		$t(property, defaultValue) {
			let obj = this.i18n[this.vuex_lang];
			console.log(this.vuex_lang)
			defaultValue = defaultValue || property;
			if (!obj) { return defaultValue}
			if(property.indexOf('.') > 0) {
			  let segments = property.split('.');
			  for (let i = 0; i < segments.length; i++) {
			    if (!obj) { return }
			    obj = obj[segments[i]];
			  }
			  return obj ? obj : defaultValue;
			}else{
			  return typeof obj[property] !== 'undefined' ? obj[property] : defaultValue;
			}
		}
	}
})

App.mpType = 'app';

const app = new Vue({
	store,
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
Vue.use(httpInterceptor, app)
// http接口API抽离，免于写url或者一些固定的参数
Vue.use(httpApi, app)

app.$mount();
