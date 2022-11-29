<template>
    <div class="indexDB">
        <div class="content">
            <van-field v-model="info.name" label="姓名：" label-width=".5rem" placeholder="请输入姓名"/>
            <van-field v-model="info.age" label="年龄："  label-width=".5rem" placeholder="请输入年龄"/>
            <van-radio-group v-model="info.sex" class="radio" direction="horizontal" icon-size="16px">
                <div class="radioLabel">性别：</div>
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
            </van-radio-group>
            <van-checkbox-group v-model="info.checkboxList" class="radio" direction="horizontal" icon-size="16px">
                <div class="radioLabel">爱好：</div>
                <van-checkbox v-for="(item, index) in checkboxDataList" :key="index" :name="item.name" shape="square">{{ item.value }}</van-checkbox>
            </van-checkbox-group>

            <van-button type="info" class="confirmbtn" @click="addData()" v-if="!isUpdateDate" :disabled="disabled">添加数据</van-button>
            <van-button type="info" class="confirmbtn" @click="addData()" v-else :disabled="disabled">修改数据</van-button>
        </div>

        <div class="listBox">
            <li v-for="(item, index) in dataList" :key="index">
                <div class="listBox-left">
                    <div class="listBox-left-top">
                        姓名: {{ item.name }}，性别: {{ item.sex }}，年龄: {{ item.age }}
                    </div>
                    <div class="listBox-left-bottom">
                        爱好: {{ item.hobby }}
                    </div>
                </div>
                <div class="listBox-right">
                    <van-button type="info" class="btn" @click="updateData(item)">修改</van-button>
                    <van-button type="danger" class="btn" @click="delData(item)">删除</van-button>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
// npm install --save indexdbwrapper
import IndexDBWrapper from 'indexdbwrapper'
export default {
    name: 'indexDB',
    data() {
        return {
            db: null,
            dbObject: null,
            dbName: 'dbName',
            storeName: 'storeName',
            version: 1,
            info: {
                id: Date.now(),
                name: '',
                age: '',
                sex: '1',
                checkboxList: [],
                hobby: []
            },
            dataList: [],
            checkboxDataList: [{
                name: '1',
                value: '唱'
            },{
                name: '2',
                value: '跳'
            },{
                name: '3',
                value: 'rap'
            },{
                name: '4',
                value: '篮球'
            }],
            isUpdateDate: false,
        }
    },
    computed: {
        disabled () {
            if(this.info.name.trim() && this.info.age.trim() && this.info.checkboxList.length) {
                return false
            }
            return true
        }
    },
    methods: {
        // 添加数据
        async addData () {
            let arr = []
            this.info.sex = this.info.sex == '1' ? '男' : '女'
            this.checkboxDataList.forEach(v => {
                this.info.checkboxList.forEach(v1 => {
                    if(v.name == v1) arr.push(v.value)
                })
            })
            this.info.hobby = arr.join(',')
            if(this.isUpdateDate) {
                let res = await this.db.put(this.storeName, this.info)
                if(typeof res == 'number') {
                    Toast('修改成功')
                    this.infoClear()
                    this.isUpdateDate = false
                    await this.getAllData()
                }
            } else {
                let res = await this.db.add(this.storeName, this.info)
                if(typeof res == 'number') {
                    Toast('添加成功')
                    this.infoClear()
                    await this.getAllData()
                }
            }
            
        },
        // 查询数据
        async getAllData() {
            this.dataList = await this.db.getAll(this.storeName)
        },
        // 删除数据
        async delData(item) {
            let res = await this.db.delete(this.storeName, item.id)
            this.getAllData()
        },
        // 修改数据
        async updateData(item) {
            let res = await this.db.get(this.storeName, item.id)
            if(res) {
                res.sex = res.sex == '男' ? '1' : '2'
                this.info = res
            }
            this.isUpdateDate = true
        },
        infoClear () {
            this.info.id = Date.now()
            this.info.name = ''
            this.info.age = ''
            this.info.sex = '1'
            this.info.checkboxList = []
        }
    },
    async mounted () {
        let _this = this
        this.db = new IndexDBWrapper(this.dbName, this.version, {
            onupgradeneeded(event) {
                _this.dbObject = event.target.result // 数据库对象
                let objectStore;
                if (!_this.dbObject.objectStoreNames.contains(_this.storeName)) {
                    objectStore = _this.dbObject.createObjectStore(_this.storeName, { keyPath: 'id' }) // 创建表
                    // objectStore.createIndex('createTime', 'createTime', { unique: false }) // 创建索引 可以让你搜索任意字段
                }
            }
        })
        await this.db.open()
        await this.getAllData()
    }
}

</script>

<style lang="scss">
    .indexDB {
        width: 100%;
        height: 100%;
        padding: .1rem;
    }
    .content {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(150, 150, 150, 0.6);
        border-radius: .06rem;
        font-size: .14rem;
        .radio {
            padding: 10px 16px;
            .radioLabel {
                width: .5rem;
                text-align: center;
                font-size: .14rem;
                margin-right: .2rem;
            }
        }
        .confirmbtn {
            width: 80%;
            border-radius: .06rem;
            box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
            margin: .1rem 0;
        }
    }
    .listBox {
        width: 100%;
        height: calc(100% - 2.4rem);
        overflow: auto;
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(150, 150, 150, 0.6);
        border-radius: .06rem;
        margin-top: .1rem;
        padding: .08rem;
        li {
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            border: 1px solid #ccc;
            border-radius: .06rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: .08rem;
            padding: 0 .05rem;
            .listBox-left {
                font-size: .14rem;
                .listBox-left-top {
                    // width: ;
                    height: 50%;
                    line-height: .25rem;
                }
                .listBox-left-bottom {
                    // width: ;
                    height: 50%;
                    line-height: .25rem;
                    text-align: left;
                }
            }
            .listBox-right {
                height: 100%;
                .btn {
                    width: .46rem;
                    height: 60%;
                    padding: 0;
                    line-height: 0;
                    font-size: .14rem;
                    border-radius: .04rem;
                }
            }
        }
    }
</style>