<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    
      {{NewList}}
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'HelloWorld',
  data () {
    return {
      NewList:'',
      cid: 2 ,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
      this.AxiosData()
      this.exam()
      this.NewsDetails()
  },
  methods:{
    // getData: function(){
    //     // let AxiosUrl =  +'2019/test/news2.asp?cid=2';
    //     let AxiosUrl = 'http://www.cottm.cn/2019/test/news2.asp?cid=2';
    //     console.log(AxiosUrl)
    //     console.log( process.env.API_HOST)
    //    let params = {
    //      }
    //     const res=  this.http.get( AxiosUrl ,params)
    //      if (res) {
    //     console.log(res)
    //   }
    //     console.log(res)

    // }
    AxiosData(){
      // this.AxiosUrl = process.env.API_HOST +'2019/test/news2.asp?cid='+this.cid
      // // this.AxiosUrl = '2019/test/news2.asp?cid='+this.cid
     
      //   axios({

      //     method: 'get',
      //     // baseURL : '/api',
      //     url: this.AxiosUrl
          
      //   }).then(
      //     (res)=>{
           
      //       // this.NewsData=JSON.parse(this.New)
      //     } 
      //   )
     //   let params={};

    
     // console.log( process.env.API_HOST)
    },
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
