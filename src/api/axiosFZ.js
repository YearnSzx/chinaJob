// 封装网址便于调用
import axios from 'axios'
//http://api.jkzn365.com/vip/api/ext/wxconfig
// import {getCookie,setCookie} from '@/utils/cookie'
// http://api.jkzn365.com/guide/
export let url = 'http://admin.hichinajob.com/front'
export let instance = axios.create({    //instance是自己创建的方法
    baseURL: url,
    // headers: {'Token':getCookie('token'),'flags':'wx'},
    // withCredentials: true, // 允许携带cookie
    timeout: 15000 // 请求超时时间
});
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)


// // http://yapi.shunzaa.cn/mock/193/
// export let sendyzm = axios.create({    //sendyzm是自己创建的方法
//     baseURL: 'http://yapi.shunzaa.cn/mock/193',
//     // headers: {'Token':getCookie('token'),'flags':'wx'},
//     // withCredentials: true, // 允许携带cookie
//     timeout: 15000 // 请求超时时间
// });
// sendyzm.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

// 封装网址便于调用
export let instance2 = axios.create({    //instance是自己创建的方法
    baseURL: 'http://admin.hichinajob.com',
    // headers: {'Token':getCookie('token'),'flags':'wx'},
    // withCredentials: true, // 允许携带cookie
    timeout: 15000 // 请求超时时间
});
instance2.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)