<template>
  <div class="background">
    <div class="login">
      <form class="form" @submit.stop.prevent="login()">
        <div class="header">
          <img src="@/assets/logo.png" alt="App Logo" style="height:100px;" />
        </div>
        <div class="header">
          <div class="topic">Commodities Analysis</div>
          <div class="content">Please Choose your interested Commodities</div>
        </div>
        <div class="form-group">
          <label for="InputEmail">Commodities</label>
          <div>
              
            <Dropdown style="width:100%" v-model="selectedComm" :options="comm" placeholder="Select a Commodities" />
          </div>
        </div>
        <button @click="login()" style="width:100%" class="btn btn-primary button">Search</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      selectedComm: null,
      comm: [
        'Gold',
        'Cotton',
        'Oil'
      ]
    };
  },
  components: {
  },
  methods: {
    login() {
      if (this.selectedComm=='Gold'){
        this.$router.push({path: '/gold'});
      }else
      if (this.selectedComm=='Cotton'){
        this.$router.push({path: '/cotton'});
      }else
      if (this.selectedComm=='Oil'){
        this.$router.push({path: '/oil'});
      }
    },
  },

};
</script>

<style scoped>
.background {
  background: linear-gradient(0deg,
      rgba(21, 101, 216, 0.7),
      rgba(21, 101, 216, 0.7)),
    url(~@/assets/images/cuhkbg.jpg);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.login {
  display: flex;
  justify-content: center;
}

.form {
  background: white;
  padding: 40px 40px;
  border-radius: 10px;
  width: 25%;
  min-width: 350px;
}

.header {
  font-weight: bold;
  font-size: 19px;
  color: #a4a6b3;
  padding: 0px 0px 20px 0px;
}

.topic {
  font-weight: bold;
  font-size: 24px;
  color: #252733;
}

.content {
  font-weight: normal;
  font-size: 14px;
  color: #9fa2b4;
}

.form-group {
  text-align: start;
  font-weight: bold;
  font-size: 12px;
  color: #9fa2b4;
  padding: 0px 0px 30px 0px;
}

.button {
  width: 90%;
}

.signup {
  font-size: 14px;
  text-align: center;
  color: #9fa2b4;
  padding: 20px 0px;
}

.signuplink {
  font-size: 14px;
  font-weight: bold;
  color: #1565d8;
  text-decoration: none;
}
</style>