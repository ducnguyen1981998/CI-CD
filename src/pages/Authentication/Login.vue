/* eslint-disable prettier/prettier */
<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 md-auto"
          >
            <form @submit.prevent="handleSubmit">
              <login-card header-color="green">
                <h4 slot="title" class="card-title">Đăng nhập</h4>
                <!-- Login Social -->
                <md-button
                  slot="buttons"
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-facebook-square"></i>
                </md-button>
                <md-button
                  slot="buttons"
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-twitter"></i>
                </md-button>
                <md-button
                  slot="buttons"
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-google-plus-g"></i>
                </md-button>
                <p slot="description" class="description">
                  Or
                </p>

                <!-- Lỗi khi kết nối backend -->
                <md-content v-if="message" :class="type" slot="inputs">
                  {{ message }}
                </md-content>

                <!-- Tài khoản -->
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label>Email...</label>
                  <md-input
                    name="username"
                    v-validate="'required'"
                    v-model="username"
                  ></md-input>
                </md-field>
                <p
                  v-show="submitted && !username"
                  slot="inputs"
                  class="text-danger"
                >
                  {{ errors.first("username") }}
                </p>

                <!-- Mật khẩu -->
                <md-field
                  class="md-form-group"
                  slot="inputs"
                  :md-toggle-password="false"
                >
                  <md-icon>lock_outline</md-icon>
                  <label>Password...</label>
                  <md-input
                    name="password"
                    v-validate="'required'"
                    v-model="password"
                    type="password"
                  ></md-input>
                </md-field>
                <p
                  v-if="submitted && !password"
                  slot="inputs"
                  class="text-danger"
                >
                  {{ errors.first("password") }}
                </p>
                <div slot="footer">
                  <!-- Đăng nhập button -->
                  <md-button
                    :disabled="status.loggingIn"
                    class="md-primary md-success"
                    type="submit"
                  >
                    Đăng nhập
                  </md-button>

                  <!-- Đăng kí btt -->
                  <md-button to="/register" class="md-primary md-success">
                    Đăng kí
                  </md-button>
                </div>
                <div slot="footer">
                  <md-progress-spinner
                    v-show="status.loggedIn"
                    md-mode="indeterminate"
                    :md-diameter="30"
                    :md-stroke="5"
                  ></md-progress-spinner>
                </div>
                <!-- <div class="md-primary md-success" slot="footer">
                  <vue-recaptcha
                    ref="recaptcha"
                    size="invisible"
                    sitekey="6LeC__8UAAAAAHWpsWN1N1zJ_XXD7el-eYowGz8n"
                  >
                  </vue-recaptcha>
                </div> -->

                <!-- Quên mật khẩu Btt -->
                <md-button
                  to="forgetpassword"
                  slot="forget"
                  class="md-simple md-transparent"
                >
                  <p class="forget">Quên mật khẩu?</p>
                </md-button>
              </login-card>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script
  src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"
  async
  defer
></script>
<script>
import { LoginCard } from "@/components";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      hasMessages: true
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/apple-icon.png")
    }
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapState("alert", ["type", "message"]),
    headerStyle() {
      return {
        backgroundImage: `linear-gradient(360deg,#e9fbcf 10%,#1d7d8e 360%)`
      };
    }
  },
  created() {
    this.clear();
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions("alert", ["clear"]),
    ...mapActions("account", ["login", "logout"]),
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
      });
      if (username && password) {
        this.login({ username, password });
      }
      // this.submitted = false;
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

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.forget {
  color: "#f00";
}

.md-content {
  display: flex;
  justify-content: center;
  text-align: center;
  border: 10px;
  margin-bottom: 20px;
}
</style>
