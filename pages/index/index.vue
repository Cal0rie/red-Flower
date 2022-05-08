<template>
	<view class="content">
		<image class="logo" src="/static/flower.gif"></image>
		<view class="text-area">
			<text class="title">你现在有</text>
			<text class="title">{{title}}</text>
			<text class="title">朵小红花</text>
		</view>
		<view class='btns'>
			<u-button @click='add' style='margin-top: 20rpx;' class='btn' shape='circle' type='primary'>加一朵！</u-button>
			<view style='margin-top: 20rpx;'>
			
			<u-button @click='remove' class='btn' shape='circle' type='warning'>扣一朵！</u-button>
			</view>
		</view>
	</view>
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
			}
		},
		onLoad() {
			const query = new AV.Query('flower');
			query.get('6277341f4fb5b8572d170463').then((todo) => {
				this.title=todo.attributes.count
			})
		},
		methods: {
			add() {
				const todo = AV.Object.createWithoutData('flower', '6277341f4fb5b8572d170463');
				todo.set('count', this.title+1);
				todo.save().then((todo)=>{
					//this.title--
				});
				this.title++
			},
			remove() {
				const todo = AV.Object.createWithoutData('flower', '6277341f4fb5b8572d170463');
				todo.set('count', this.title-1);
				todo.save().then((todo)=>{
					//this.title--
				});
				this.title--
			}
		}
	}
</script>

<style scoped>
	.btn {
		padding:0 0; 
		margin: 20rpx 0rpx 0rpx 0rpx;
		margin-top: 20rpx;
	}

	.btns {
		
		margin-top: 50px;
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
