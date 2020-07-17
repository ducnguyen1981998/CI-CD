<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 md-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Register</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="firstname"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label> Verify password...</label>
                <md-input v-model="verify_password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg">
                Register
              </md-button>
              <md-button
                to="/login"
                slot="footer"
                class="md-simple md-success md-lg"
              >
                Cancel
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "../assets/demo.css";
// import "../assets/scss/material-kit.scss";
import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      verify_password: null
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/apple-icon.png")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `linear-gradient(360deg,#e9fbcf 10%,#1d7d8e 360%)`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/material-kit.scss";
@import "../../assets/demo.css";
.md-layout-item {
  padding-right: 15px;
  padding-left: 15px;
}

.md-layout {
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
}
</style>
