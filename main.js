import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
const AV = require('leancloud-storage');
const {
	Query,
	User
} = AV;
AV.init({
	appId: "zvCyWUCFP5gn8L8DeuMUph6x-gzGzoHsz",
	appKey: "x4JFC5cdvO71mtJhyBGC2dkc",
	serverURL: "http://flowerapi.mistletoe.top"
});
