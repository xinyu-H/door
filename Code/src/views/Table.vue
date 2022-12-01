<template>
    <div class="Table">
        <el-button type="primary" @click="exportTable()">导出</el-button>
        <el-table :data="tableData" :border="'border'" id="selectTable" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { Toast } from 'vant';
import toExcel from '@/utils/excel'
export default {
    name: 'Table',
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    computed: {
        
    },
    methods: {
        exportTable() {
            toExcel.getExcel('#selectTable','test')
        }
    },
    async mounted () {
        
    }
}

</script>

<style lang="scss">
    .Table {
        width: 100%;
        height: 100%;
        padding: .1rem;
    }
</style>