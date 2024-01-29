<template>
  <div>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      environmentInfo:{},
    }
  },
  methods: {
    async timeout(flag){
      if(flag)
        return 'hahaha'
      else
        throw 'hello world';
    },
    doubleAfter2seconds(num){
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve(2*num)
        },2000);
      })
    },
    async testResult(){
      let res = await this.doubleAfter2seconds(30);
      console.log(res)
    },

    async getInfo() {
      let url = this.$store.state.url;
      url = url + "environment";

      await this.$axios
        .get(url)
        .then((res) => {
          // console.log(res.data)
          this.environmentInfo = res.data.data[0];
          console.log(this.environmentInfo)
        })
        .catch((err) => {
          console.error(err);
        });

    },
    async test(){
      await this.getInfo();
      console.log('hello')
    }
  },
  mounted() {
    // this.timeout();
    // console.log(this.timeout(true))
    // console.log(this.timeout(false))
    // this.timeout(false).catch(err=>{
    //   console.log(err)
    // })
    // this.timeout(true).then(res=>{
    //   console.log(res)
    // })

    // console.log("虽然在后面，但我先执行！")
    // this.testResult();
    // this.getInfo();
    // console.log("nihao")
    this.test();

  },

}
</script>

<style>

</style>