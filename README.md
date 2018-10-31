# my-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


axios 二次封装

1. 跨域问题
	
config --> index.js  
		将 proxyTable : {}

		修改为 
```javascript
proxyTable: {
	        '/api': {
	            target: 'http://www.cottm.cn/',
	            changeOrigin: true,
	            pathRewrite: {
	                '^/api': 'http://www.cottm.cn/'
	            }
	        }
	    },
```

config --> dev.env.js

```javascript
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"/api"' // 配置代理路径的符号，增加的内容
})
```

	config --> prod.env.js

```javascript
module.exports = {
  NODE_ENV: '"production"',
  API_HOST: '"http://www.cottm.cn/"' // 生产环境地址，增加的内容
}
```

2. 二次封装

 a. util/fecth

```javascript

import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.API_HOST ; //填写域名
// axios.defaults.baseURL = 'http://www.cottm.cn/' ; //填写域名

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
            console.log('错误请求')
          break;
        case 401:
            console.log('未授权，请重新登录')
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
   
      console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}


```	

b. util/Url.js

```javascript

//配置路径
	
export const News = "2019/test/news2.asp";
export const NewsDetails = "2019/test/news_details_2.asp";

```

c.util/aips.js

```javascript

import { post ,fetch , patch ,put } from '@/util/fetch'
import { News ,NewsDetails } from '@/util/Url'

/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put

*/
export const apis = {
    exam: function(paramObj){
        return fetch(News,paramObj);
    },
    NewsDetails: function(paramObj){
        return fetch(NewsDetails,paramObj);
    }
};


```
d. main.js

```javascript

import  {apis}  from '@/util/apis'

Vue.prototype.$apis= apis;

```
e.需请求页面

```javascript
 mounted(){
      this.exam()
      this.NewsDetails()
  },
  methods:{

     exam(){
      let paramObj = {
        cid: 1
      }
      this.$apis.exam(paramObj).then(data => {
        console.log(data)
      })
    },
    NewsDetails(){
       let paramObj = {
        id: 1555
        }
        this.$apis.NewsDetails(paramObj).then(res=> {
          console.log(res)
        })
    }

  }

```
