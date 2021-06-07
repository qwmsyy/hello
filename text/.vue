/*
 * alias: {
 *      '@': resolve('src'),
 *      '@config': resolve('config'),
 *      'vue$': 'vue/dist/vue.common.js'
 *  }
*/
<template>
	<div class="ms-container">
	</div>
</template>

<script>
	import {**,*} from '' // @  webpack配置
	
	export default{
		name: 'Hello',
		data() {
			return {
				msg: 'ok',
			}
		},
		computed: { // 支持缓存 不支持异步
			reverseMsg:function() {
				return this.msg.split('').reverse().join('')
			}
		},
		watch: {
			msg: {
				get: function() {
					return 'get' + this.msg
				}
				set: function() {
					return 'set' + this.msg
				}
			}
		},
		created: {
			this.init()
		},
		methods: {
			init() {
				console.log("hello world ,init ")
			},
		},
	}
</script>

<style>
	.ms-container{
		padding: 5px;
	}
</style>