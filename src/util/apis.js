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

