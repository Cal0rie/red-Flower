<template>
	<uni-list>
		<view class="content">
			<view class="text-area">
				<text class="title">许个愿望吧！！</text>
				<text class="title">你现在有{{title}}朵小红花</text>
			</view>
			<view>
				<button @click='open' class='btn' shape='circle' type='primary'>许个愿</button>
			</view>
			
			<view class='cards' v-for="(item, index) in wishes" :key='id'>
				<uni-swipe-action>
				<uni-swipe-action-item class='card' style="width: 600rpx" :right-options="options1" @click="choose($event, index)">
						<uni-card :title="'第'+item.wishID+'个愿望'">
							<text>{{item.content}}</text>
							<view style='margin-top: 20rpx;'>{{item.condition}}</view>
						</uni-card>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			

		</view>
		<u-popup :round="10" :show="show" @close="close" @open="open" mode='center'>
			<view class='popup'>
				<view class='title'>
					<text style='margin-top:70rpx; margin-bottom: -50rpx;' class='title'>许下你的愿望：</text>
				</view>
				<view class='text-input'>
					<u-textarea style='width=80%' class='text-input' v-model="newWish" placeholder="请输入内容"></u-textarea>
				</view>
				<view>
					<u-button @click='add' style='margin-bottom: 20rpx;' class='btn' shape='circle' type='primary'>确定
					</u-button>
				</view>
			</view>
		</u-popup>
	</uni-list>

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
	// #ifdef APP-PLUS
	const dom = weex.requireModule('dom');
	// #endif

	export default {
		data() {
			return {
				title: '',
				wishCount: '',
				wishes: [],
				show: false,
				newWish: '',
				options1: [{
						text: "满足",
						style: {
							backgroundColor: '#2979ff',
						}
					},
					{
						text: "驳回",
						style: {
							backgroundColor: '#fa3534',
						}
					}
				]
			}
		},
		beforeCreate() {
			const query = new AV.Query('flower');
			query.get('6277341f4fb5b8572d170463').then((todo) => {
				this.title = todo.attributes.count
			})

			const wish = new AV.Query('wish');
			wish.find().then((wishes) => {
				this.wishes = wishes;
				console.log(this.wishes)
				console.log(this.wishes[0].attributes.wishID)
				this.wishCount = wishes.length;
			});
		},
		methods: {
			choose(e,index) {
				console.log(e)
				console.log(index)
				if(e.index==0){		//满足操作
					const todo = AV.Object.createWithoutData('wish', this.wishes[index].id);
					todo.set('condition', '满足');
					todo.save().then((res)=>{
						this.wishes[index].attributes.condition="满足"
					});
				}
				else if(e.index==1){		//驳回操作
					const todo = AV.Object.createWithoutData('wish', this.wishes[index].id);
					todo.set('condition', '驳回');
					todo.save().then((res)=>{
						this.wishes[index].attributes.condition="驳回"
					});
				}
			},
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			add() {
				const Todo = AV.Object.extend('wish');
				const todo = new Todo();
				todo.set('content', this.newWish);
		
				// 将对象保存到云端
				todo.save().then((todo) => {
		
					const flower = AV.Object.createWithoutData('flower', '6277341f4fb5b8572d170463');
					flower.set('count', this.title - 5);
					flower.save()
					this.title = this.title - 5
		
					console.log(`保存成功。objectId：${todo.id}`);
					
					this.wishes.push({content: this.newWish,wishID: this.wishes.length})
					
					this.close()
				}, (error) => {
					// 异常处理
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.cards{
		width: 700rpx;
	}
	.text-input {
		width: 430rpx;
		height: 30%;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: center;
	}

	.popup {
		height: 300px;
		width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btn {
		width: 250rpx;
		margin-bottom: 10px;
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
		margin-top: 30px;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
	}

	.title {
		position: relative;
		font-size: 45rpx;
		color: #8f8f94;
	}
</style>
