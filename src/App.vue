<template>
<div>
  <router-view/>

</div>
</template>

<script>
export default {
  name: 'HomeView',

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin:0;
  padding: 0;
  font-family: '微软雅黑', Arial, Avenir, Helvetica, sans-serif;
}
li{
  list-style-type: none;
}
a{
  color: black;
  text-decoration: none;
}
a:hover{
  color: grey;
  text-decoration: none;
}
.body{
  min-width: 500px;
}

</style>
