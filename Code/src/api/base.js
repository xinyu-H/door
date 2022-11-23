const BASE = {
    dev:''
};

if (process.env.NODE_ENV !== 'production') {
    BASE.dev = 'http://10.16.0.13:20095/app'// 大鹏
} else if (process.env.NODE_ENV == 'production') {
    BASE.dev = './app'
}



export default BASE;