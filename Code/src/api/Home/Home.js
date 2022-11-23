import http from '../request'
import baseUrl from '../base'

export default {
    getData1(params) {
        return http.get('https://autumnfish.cn/api/joke/list', {params})
    },
    getData2(data) {
        return http.post('https://autumnfish.cn/api/user/reg', data)
    }
}