
<!-- 一个自定义的弹窗 可自定义内部内容 由透明背景 点击可关闭 原生的uni-dialog只能显示提示信息或一个简单的输入框-->

<template>
	<view class="ms-dialog" v-show="isShow" @click.self="close">
		<view class="ms-container">
			<view class="f-row" style="padding: 20rpx;">
				<view class="title">{{title}}</view>
				<view class="icon-close">
					<icon type="clear" size="20" @click="close"/>
				</view>
			</view>
			<view class="ms-content">
				<slot name="head"></slot>
				<slot>备用内容</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'msDialog',
		data() {
			return {
				isShow: false,
				title: '一个标题',
			}
		},
		methods: {
			open() {
				this.isShow = true
			},
			close() {
				this.isShow = false
			}
		}
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	.ms-dialog {
		height: 100%;
		width: 100%;
		background-color:rgba(153,153,153,0.6);
		position: fixed;
		top: 0;
		right: 0;
		text-align: center;
		z-index: 999;
	}
	.ms-container{
		background-color: white;
		border-radius: 20rpx;
		margin: 20rpx;
		margin-top: 300rpx;
		min-height: 300rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 36rpx;
	}
	.f-row {
		display: flex;
		flex-direction: row;
	}
	.f-col {
		display: flex;
		flex-direction: column;
	}
	.title {
		flex: 9;
		/* font-weight: bolder; */
		vertical-align: bottom;
	}
	.icon-close {
		flex: 1;
	}
</style>
