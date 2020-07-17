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
                <h4 slot="title" class="card-title">Forget Password</h4>
                <p slot="description" class="description md-body-1">
                  Don't worry. Reseting your password is easy, just tell us the
                  email address you registered.
                </p>

                <!-- Lỗi khi kết nối backend -->
                <md-content v-if="message" class="md-accent" slot="inputs">
                  {{ message }}
                </md-content>

                <!-- Username -->
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label> Username</label>
                  <md-input
                    name="username"
                    v-validate="'required'"
                    v-model="username"
                    type="text"
                  ></md-input>
                </md-field>
                <p slot="inputs" class="text-danger">
                  {{ errors.first("username") }}
                </p>
                <!-- Email -->
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label> Email</label>
                  <md-input
                    name="email"
                    v-validate="'required|email'"
                    v-model="email"
                    type="text"
                  ></md-input>
                </md-field>
                <p slot="inputs" class="text-danger">
                  {{ errors.first("email") }}
                </p>
                <div slot="footer">
                  <!-- Đăng nhập button -->
                  <md-button class="md-primary md-success" type="submit">
                    Send
                  </md-button>
                  <!-- Đăng kí btt -->
                </div>
                <div slot="footer">
                  <md-progress-spinner
                    v-show="status.forgeting"
                    md-mode="indeterminate"
                    :md-diameter="30"
                    :md-stroke="5"
                  ></md-progress-spinner>
                </div>
              </login-card>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
      email: "",
      username: "",
      submitted: false
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
  },
  methods: {
    ...mapActions("alert", ["clear"]),
    ...mapActions("account", ["forgetpassword"]),
    handleSubmit(e) {
      this.submitted = true;
      const { email, username } = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
      });
      if (email && username) {
        this.forgetpassword({ email, username });
      }
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
