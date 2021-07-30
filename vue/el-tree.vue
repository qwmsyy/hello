<template>
	<div id="app">
		<img src="./assets/logo.png">
		<el-tree :data="data" ref="tree" show-checkbox node-key="id" :default-checked-keys="[5]" :props="defaultProps">
		</el-tree>
		<div>
			<el-button @click="startHacking">Start</el-button>
			<el-button @click="abc">Strt</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 4',
						children: [{
							id: 9,
							label: '三级 9'
						}, {
							id: 10,
							label: '三级 10'
						}],
					}, {
						id: 20,
						label: '二uuu级 20',
						children: [{
							id: 21,
							label: '三uuu级 21'
						}, {
							id: 22,
							label: '三iiii级 22'
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 5'
					}, {
						id: 6,
						label: '二级 6'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 7'
					}, {
						id: 8,
						label: '二级 8',
						children: [{
							id: 11,
							label: '三级 11'
						}, {
							id: 12,
							label: '三级 12'
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		methods: {
			abc() {
				console.log(123)
				let arr = [21, 4, 9, 12]
				// 此方法父节点选中 子节点不会全选中
				arr.forEach(value => {
					this.$refs.tree.setChecked(value, true, false);
				})
				// 父节点选中 子节点不全选？？？
				// 此方法父节点选中 子节点会全选中
				// this.$refs.tree.setCheckedKeys(arr)
			},
			startHacking() {
				this.$notify({
					title: 'It works!',
					type: 'success',
					message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
					duration: 5000
				})
			}
		}
	}
</script>

<style>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
	}
</style>
