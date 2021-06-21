<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.0/lib/index.js"></script>
<div id="app">
<template>
  <div>
    <div>
      <label>请选择表格需要展示的列：</label>
      <el-checkbox-group v-model="checkedTableColumns">
        <el-checkbox
          v-for="column in tableColumns"
          :key="column.prop"
          :label="column.prop"
          >{{ column.label }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <el-table :data="tableData" border>
      <el-table-column
        v-for="column in bindTableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      ></el-table-column>
    </el-table>
  </div>
</template>
</div>
  var Main = {
    data() {
      return {
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          }
        ],
        tableColumns: [
          {
            prop: "date",
            label: "日期",
            show: true,
          },
          {
            prop: "name",
            label: "姓名",
            show: true,
          },
          {
            prop: "address",
            label: "地址",
            show: true,
          },
        ],
      };
    },
    computed: {
      bindTableColumns() {
        return this.tableColumns.filter((column) => column.show);
      },
      /* 这里使用了getter和setter，这样写的好处不用自己手动监听复选框的选中事件 */
      checkedTableColumns: {
        get() {
          // 返回选中的列名
					return this.bindTableColumns.map(column => column.prop);
        },
        set(checked) {
          // 设置表格列的显示与隐藏
          this.tableColumns.forEach((column, index) => {
            // 如果选中，则设置列显示
            if(checked.includes(column.prop)) {
              column.show = true;
            } else {
              // 如果未选中，则设置列隐藏
              column.show = false;
            }
          })
        }
      }
    }
  };
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')

@import url("//unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* .el-table {
  border: 1px solid red;
} */
