<template>
  <div class="content">
    <div class="main">
      <form>
        <fieldset class="form">
          <legend>用户{{title}}</legend>
          <el-button-group style="margin: 15px 0px;">
            <router-link to="/enter/login">
              <el-button type="primary" @click="title='登录'">登录</el-button>
            </router-link>
            <router-link to="/enter/register">
              <el-button type="primary" @click="title='注册'">注册</el-button>
            </router-link>
          </el-button-group>
          <router-view />
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: '登录'
      }
    }
  }
</script>
<style scoped>
  .content {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(160deg, #00ffd5 20%, #008cff 80%);
  }

  a {
    text-decoration: none;
  }

  .form {
    width: 400px;
    padding: 0px 30px 30px;
    display: flex;
    flex-flow: row wrap;
    background-color: #BEFFFFFF;
    box-shadow: 0px 0px 6px;
    border-radius: 5px;
  }

  .form>legend {
    font: bold 25px/30px Georgia, serif;
    text-shadow: 0px 0px 3px;
  }

  button {
    flex: auto;
  }
</style>
