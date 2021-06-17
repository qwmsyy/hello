<template>
	<div>
		<div class="goods-spec">
			<span>商品规格</span>
			<el-link type="primary" @click="addPrivateSpec" class="goods-spec-add">添加规格</el-link>
		</div>
		<div class="goods-container" v-for="(attr, index) in privateGoodsItem" :key="index">
			<div class="goods-content">
				<div class="goods-content-box">
					<div class="goods-content-left">
						<el-form label-width="80px" style="width:400px">
							<el-form-item label="规格名">
								<el-input v-model="attr.privateSpecName" placeholder="请输入规格名"></el-input>
							</el-form-item>
							<el-form-item label="规格值">
								<el-tag v-for="tag in attr.dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag, attr)">
									{{ tag }}
								</el-tag>
								<el-input
									class="input-new-tag"
									v-if="attr.inputVisible"
									v-model="attr.inputValue"
									:ref="`saveTagInput${index}`"
									size="small"
									@keyup.enter.native="handleInputConfirm(attr.inputValue, attr)"
									@blur="handleInputConfirm(attr.inputValue, attr)"
								>
								</el-input>
								<el-button v-else class="button-new-tag" size="small" @click="showInput(attr, index)">+ 添加</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="goods-content-right">
						<el-link type="danger" @click="delPrivateSpec(index)">删除规格</el-link>
					</div>
				</div>
			</div>
		</div>
		<p style="margin:24px 0 10px 0">价格 / 库存</p>
		<el-button @click='getda'>btn</el-button>
		<el-table ref="multipleTable" :data="tableColumnList.tableBodyList" stripe tooltip-effect="dark" style="width: 100%;margin-top:1%;">
			<el-table-column :label="item.propName" :property="item.prop" v-for="item in tableColumnList.tableHeaderList" :key="item.prop" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row[scope.column.property] }}</span>
				</template>
			</el-table-column>
			<el-table-column label="价格（元）">
				<template slot-scope="scope">
					<el-input v-model.number="scope.row.price"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="库存">
				<template slot-scope="scope">
					<el-input v-model.number="scope.row.stock"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="库存预警">
				<template slot-scope="scope">
					<el-input v-model.number="scope.row.low_stock"></el-input>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				tableColumnList: {
					tableHeaderList: [],
					tableBodyList: [],
					// inventory: ''
				},
				privateGoodsItem: [
					{
						privateSpecName: '', //规格名
						dynamicTags: [], //规格值数组
						inputVisible: false,
						inputValue: ''
					},
				]
			}
		},
		computed: {
			// 计算规格
			calculateAttribute() {// 初始化
				let obj = {}
				this.privateGoodsItem.forEach((item) => {
					// 判断有没有输入规格名
					if (item.privateSpecName) {
						//规格名:规格值     //'颜色':'尺寸'
						obj[item.privateSpecName] = item.dynamicTags
					}
				})
				return obj
			}
		},
		watch: {
			// 监听规格数据
			calculateAttribute(newVal) {
				let cloneNewVal = JSON.parse(JSON.stringify(newVal))
				let attrName = [] //规格名数组
				let attrValue = [] //规格值数组
				for (let key in cloneNewVal) {
					attrName.push(key)
					attrValue.push(cloneNewVal[key])
				}
				// 表格内容数据（笛卡尔积算法）
				let finalArr = this.cartesianProductOf(...attrValue)
				let tableObj = {
					tableBodyList: [],
					tableHeaderList: [],
				}
				// 表格内容
				tableObj.tableBodyList = finalArr.map((item) => {
					let obj = {
						price: 0,
		                stock: 0,
		                low_stock: 0
					}
					for (let i = 0; i < item.length; i++) {
						obj[attrName[i]] = item[i]
					}
					return obj
				})
				this.tableColumnList.tableBodyList = tableObj.tableBodyList //表格内容数据
				// 表头
				let skuTableArr = Object.keys(newVal)
		        tableObj.tableHeaderList = skuTableArr.map((item) => {
					return {
						prop: item,
		                propName: item
					}
				})
				this.tableColumnList.tableHeaderList = tableObj.tableHeaderList // 表头
			}
		},
		methods: {
			getda(){
				console.log(this.privateGoodsItem)
			},
			// 添加规格
			addPrivateSpec(index) {
				this.privateGoodsItem.push({
					privateSpecName: '',
					dynamicTags: [],
					inputVisible: false,
					inputValue: ''
				})
			},
			delPrivateSpec(index) {
				this.privateGoodsItem.splice(index, 1)
			},
			handleInputConfirm(val, attr) {
				if (val) {
					attr.dynamicTags.push(val)
				}
				attr.inputVisible = false
				attr.inputValue = ''
			},
			handleClose(tag, item) {
				item.dynamicTags.splice(item.dynamicTags.indexOf(tag), 1)
			},
			showInput(attr, index) {
				attr.inputVisible = true
				this.$nextTick((_) => {
					this.$refs[`saveTagInput${index}`][0].$refs.input.focus()
				})
			},
			// 笛卡尔积算法
			/*
				arr.reduce(function(prev,cur,index,arr){
					...
				}, init);
				ES6:
				arr.reduce((prev,cur,index,arr)=>{
					...
				}, init);
				arr 表示原数组
				prev 上次调用时的返回值 或初始化值init
				cur 当前正在处理的数组元素
				index 当前正在处理的数组元素的索引 若提供init值，为0，否则为1
				init 初始值
				常用的参数只有两个：prev 和 cur
				https://www.cnblogs.com/amujoe/p/11376940.html
			*/
			cartesianProductOf(...args) {
				return args.reduce(
					(total, current) => {
						let ret = []
						total.forEach((a) => {
							current.forEach((b) => {
								ret.push(a.concat([b]))
							})
						})
						return ret
					},
					[[]]
				)
			}
		}
	}
</script>

<style>
	.goods-spec {
		display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
	}
	.goods-spec .goods-spec-add {
		margin-right: 15px;
	}

      .goods-container .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .goods-container .input-new-tag {
        width: 90px;
        margin-right: 10px;
        vertical-align: bottom;
      }
      .goods-container .el-tag {
        margin-right: 10px;
      }
      .goods-container .goods-content {
        margin-bottom: 10px;
        padding: 14px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        background-color: #fcfcfc;
      }
      .goods-content .goods-content-box {
        display: flex;
        align-items: center;
      }
      .goods-content-box .goods-content-left {
        flex: 1;
      }
</style>
