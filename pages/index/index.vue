<template>
	<u-list>

		<view class="content">
			<u-list-item>
				<image class="logo" src="/static/flower.gif"></image>
				<view class="text-area">
					<text class="title">你现在有</text>
					<text class="title">{{title}}</text>
					<text class="title">朵小红花</text>

				</view>
			</u-list-item>
			<view style='margin-top: 50rpx;'>
				<u-text type="success" :show='show' :text="text1+(wishCount)+text2">{{text1}}{{wishCount}}{{text2}}
				</u-text>
				<u-text type="success" :show='ifWish' text="叮叮,你有愿望待处理">
				</u-text>
			</view>
			<view class='btns'>
				<u-button @click='add' style='margin-top: 20rpx;' class='btn' shape='circle' type='primary'>加一朵！
				</u-button>
				<view style='margin-top: 20rpx;'>

					<u-button @click='remove' class='btn' shape='circle' type='warning'>扣一朵！</u-button>
				</view>
				<view style='margin-top: 20rpx;'>
					<u-button :disabled="open" style='margin-top: 20rpx;' @click='wish' class='btn' shape='circle'
						type='success'>进入愿望屋！</u-button>		<!-- 测试时把“open”临时修改为"false" -->
				</view>
			</view>
		</view>
		<u-loading-page :loading='load'></u-loading-page>
	</u-list>
</template>

<script>
	// #ifdef MP-WEIXIN
	const AV = require('@/libs/av-core-min.js');
	const adapters = require('@/libs/leancloud-adapters-weapp.js');

	AV.setAdapters(adapters);
	AV.init({
		appId: "zvCyWUCFP5gn8L8DeuMUph6x-gzGzoHsz",
		appKey: "x4JFC5cdvO71mtJhyBGC2dkc",
		serverURL: "https://flowerapi.mistletoe.top"
	});
	// #endif
	// #ifndef MP-WEIXIN
	const AV = require('leancloud-storage');
	const {
		Query,
		User
	} = AV;
	// #endif
	export default {
		data() {
			return {
				title: '',
				open: true,
				text1: "你已经集齐了五朵小红花，许下你的第",
				text2: "个愿望吧！！",
				wishCount: '',
				show: false,
				ifWish: true,
				load: true
			}
		},
		watch: {
			title(val) {
				if (val >= 5) {
					this.open = false
					this.show = true
				} 
				else if(this.ifWish==true)
				{
					this.open= false
				}
				else {
					this.open = true
					this.show = false
				}
			}
		},
		beforeMount() {
			const query = new AV.Query('flower');
			query.get('6277341f4fb5b8572d170463').then((todo) => {
				this.title = todo.attributes.count
			})

			const wish = new AV.Query('wish');
			wish.find().then((wishes) => {
				this.wishCount = wishes.length;
			});
			const q1 = new AV.Query('wish');
			q1.equalTo('condition', '未处理');
			q1.find().then((res) => {
				console.log(res)
				if(res.length){
					this.ifWish=true
				}
				else
				{
					this.ifWish=false
				}
				if (this.title >= 5) {
					this.open = false
					this.show = true
				} 
				else if(this.ifWish==true)
				{
					this.open = false
				}
				else {
					this.open = true
					this.show = false
				}
				this.load=false
			});
		},
		methods: {
			add() {
				const todo = AV.Object.createWithoutData('flower', '6277341f4fb5b8572d170463');
				todo.set('count', this.title + 1);
				todo.save().then((todo) => {
					//this.title--
				});
				this.title++
				
				//写一条记录
				AV.Cloud.run("writeLog", {
					operate: "add"
				}).then(
				  function (data) {
				    // 处理结果
				  },
				  function (err) {
				    // 处理报错
				  }
				);
			},
			remove() {
				const todo = AV.Object.createWithoutData('flower', '6277341f4fb5b8572d170463');
				todo.set('count', this.title - 1);
				todo.save().then((todo) => {
					//this.title--
				});
				this.title--
				
				//写一条记录
				AV.Cloud.run("writeLog", {
					operate: "remove"
				})
			},
			wish() {
				uni.redirectTo({
					url: '/pages/wish/wish'
				})
			}
		}
	}
</script>

<style>
	.btn {
		padding: 0 0;
		margin: 20rpx 0rpx 0rpx 0rpx;
		margin-top: 20rpx;
	}

	.btns {

		margin-top: 20px;
		width: 50%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 300rpx;
		width: 300rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 45rpx;
		color: #8f8f94;
	}
</style>
