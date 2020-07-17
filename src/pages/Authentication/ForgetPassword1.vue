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

                <!-- Lỗi khi kết nối backend -->
                <md-content v-if="message" :class="type" slot="inputs">
                  {{ message }}
                </md-content>

                <!-- Tài khoản -->
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label> Code OTP</label>
                  <md-input
                    name="otpcode"
                    v-validate="'required|numeric|min:6|max:6'"
                    v-model="codeotp"
                  ></md-input>
                </md-field>
                <p slot="inputs" class="text-danger">
                  {{ errors.first("otpcode") }}
                </p>
                <div slot="footer">
                  <!-- Đăng nhập button -->
                  <md-button class="md-primary md-success" type="submit">
                    Dashboard
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
      codeotp: "",
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
  created() {},
  methods: {
    ...mapActions("account", ["forgetpassword1"]),
    handleSubmit(e) {
      this.submitted = true;
      const { codeotp } = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
      });
      if (codeotp) {
        this.forgetpassword1(codeotp);
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
