<template>
	<view class="content">
		<image class="logo" src="/static/flower.gif"></image>
		<view class="text-area">
			<text class="title">你现在有</text>
			<text class="title">{{title}}</text>
			<text class="title">朵小红花</text>
		</view>
		<view class='btns'>
			<u-button @click='add' class='btn' shape='circle' type='primary'>加一朵！</u-button>
			<u-button @click='remove' class='btn' shape='circle' type='warning'>扣一朵！</u-button>
		</view>
	</view>
</template>

<script>
	const AV = require('leancloud-storage');
	const {
		Query,
		User
	} = AV;
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

<style>
	.btn {
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
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
