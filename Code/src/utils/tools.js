/**
 * 通用js方法封装处理
 * 
 */

const baseURL = process.env.VUE_APP_BASE_API

export default {
    // 日期格式化
    parseTime :function(time, pattern) {
        if (arguments.length === 0 || !time) {
            return null
        }
        const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                time = parseInt(time)
            } else if (typeof time === 'string') {
                time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm),'');
            }
            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000
            }
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    },


    // 添加日期范围
    addDateRange: function(params, dateRange, propName) {
        let search = params;
        search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {};
        dateRange = Array.isArray(dateRange) ? dateRange : [];
        if (typeof (propName) === 'undefined') {
            search.params['beginTime'] = dateRange[0];
            search.params['endTime'] = dateRange[1];
        } else {
            search.params['begin' + propName] = dateRange[0];
            search.params['end' + propName] = dateRange[1];
        }
        return search;
    },

    // 通用下载方法
    download: function(fileName) {
        window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
    },

    // 字符串格式化(%s )
    sprintf: function(str) {
        let args = arguments, flag = true, i = 1;
        str = str.replace(/%s/g, function () {
            let arg = args[i++];
            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    },

    // 转换字符串，undefined,null等转化为""
    praseStrEmpty: function(str) {
        if (!str || str == "undefined" || str == "null") {
            return "";
        }
        return str;
    },

    /**
     * 构造树型结构数据
     * @param {*} data 数据源
     * @param {*} id id字段 默认 'id'
     * @param {*} parentId 父节点字段 默认 'parentId'
     * @param {*} children 孩子节点字段 默认 'children'
     */
    handleTree: function(data, id, parentId, children) {
        let config = {
            id: id || 'id',
            parentId: parentId || 'parentId',
            childrenList: children || 'children'
        };

        let childrenListMap = {};
        let nodeIds = {};
        let tree = [];

        for (let d of data) {
            let parentId = d[config.parentId];
            if (childrenListMap[parentId] == null) {
                childrenListMap[parentId] = [];
            }
            nodeIds[d[config.id]] = d;
            childrenListMap[parentId].push(d);
        }

        for (let d of data) {
            let parentId = d[config.parentId];
            if (nodeIds[parentId] == null) {
                tree.push(d);
            }
        }

        for (let t of tree) {
            adaptToChildrenList(t);
        }

        function adaptToChildrenList(o) {
            if (childrenListMap[o[config.id]] !== null) {
                o[config.childrenList] = childrenListMap[o[config.id]];
            }
            if (o[config.childrenList]) {
                for (let c of o[config.childrenList]) {
                    adaptToChildrenList(c);
                }
            }
        }
        return tree;
    },

    /**
    * 参数处理
    * @param {*} params  参数
    */
    tansParams: function(params) {
        let result = ''
        for (const propName of Object.keys(params)) {
            const value = params[propName];
            let part = encodeURIComponent(propName) + "=";
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                            let params = propName + '[' + key + ']';
                            let subPart = encodeURIComponent(params) + "=";
                            result += subPart + encodeURIComponent(value[key]) + "&";
                        }
                    }
                } else {
                    result += part + encodeURIComponent(value) + "&";
                }
            }
        }
        return result
    },

    // 压缩图片
    image2Base64: function(img, size = 0.7) {
        var canvas = document.createElement('canvas')
        var scale = 1
        if (img.width > 1280 || img.height > 1280) {
            if (img.width > img.height) {
                scale = 1280 / img.width
            } else {
                scale = 1280 / img.height
            }
        }
        if (scale != 1) {
            //按最大高度等比缩放
            img.width *= scale
            img.height *= scale
        }
        canvas.width = img.width
        canvas.height = img.width * (img.height / img.width)
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        let dataURL = canvas.toDataURL('image/jpeg', size)

        if (dataURL.length / 1024 > 10000) {
            //如果输出大于1m 就递归直到输出小于1M才行
            return this.image2Base64(img, (size / 2).toFixed(1) * 1)
        } else {
            // console.log(dataURL);
            return dataURL
        }
    }
}
 
 