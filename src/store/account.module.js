import { userService } from "../services";
import { router } from "../routes/routes";

//console.log(localStorage.getItem("user"));
const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  // Đăng nhập
  login({ dispatch, commit }, { username, password }) {
    commit("loginRequest", { username });

    userService.login(username, password).then(
      user => {
        console.log("loginSuccess");
        commit("loginSuccess", user);
        // console.log("Redirect");
        router.push("dashboard");
      },
      error => {
        // console.log("err:", error.msg);
        commit("loginFailure", error);
        dispatch("alert/error", error.message, { root: true });
      }
    );
  },

  // Đăng xuất
  logout({ commit }) {
    userService.logout();
    commit("logout");
    router.push("login");
  },
  // Đăng kí tài khoản
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    userService.register(user).then(
      user => {
        commit("registerSuccess", user);
        router.push("/login");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      error => {
        commit("registerFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },

  // Quên mật khẩu
  // B1: Kiểm tra Username và Email
  forgetpassword({ dispatch, commit }, { email, username }) {
    commit("forgetPasswordRequest", { email });

    userService.forgetPassword({ email, username }).then(
      user => {
        console.log("forgetPasswordSuccess");
        commit("forgetPasswordSuccess", user);
        dispatch("alert/success", user.reply, { root: true });
        router.push("forgetpassword1");
      },
      error => {
        console.log("forgetPasswordFailure");
        console.log("err:", error.message);
        commit("forgetPasswordFailure", error);
        dispatch("alert/error", error.message, { root: true });
      }
    );
  },

  // Quên mật khẩu
  // B2: Xác thực OTP trả về qua mail
  forgetpassword1({ dispatch, commit }, codeotp) {
    commit("forgetPasswordRequest", codeotp);

    userService.forgetPassword1(codeotp).then(
      user => {
        console.log("forgetPasswordSuccess");
        commit("forgetPasswordSuccess", user);
        dispatch("alert/success", user.reply, { root: true });
        router.push("changepassword");
      },
      error => {
        console.log("forgetPasswordFailure");
        console.log("err:", error.message);
        commit("forgetPasswordFailure", error);
        dispatch("alert/error", error.message, { root: true });
      }
    );
  },

  // Đổi mật khẩu
  // Nhập mật khẩu mới và kiểm tra lưu vào CSDL
  changePassword({ dispatch, commit }, password) {
    commit("changePasswordRequest", password);

    userService.changePassword(password).then(
      user => {
        console.log("changePasswordSuccess");
        commit("changePasswordSuccess", user);
        dispatch("alert/success", user.reply, { root: true });
        router.push("dashboard");
      },
      error => {
        console.log("changePasswordFailure");
        console.log("err:", error.message);
        commit("changePasswordFailure", error);
        dispatch("alert/error", error.message, { root: true });
      }
    );
  }
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state, user) {
    state.status = { registering: true };
  },
  registerSuccess(state, user) {
    state.status = {};
  },
  registerFailure(state, error) {
    state.status = {};
  },
  forgetPasswordRequest(state, user) {
    state.status = { forgeting: true };
  },
  forgetPasswordSuccess(state, user) {
    state.status = {};
  },
  forgetPasswordFailure(state, error) {
    state.status = {};
  },
  changePasswordRequest(state, user) {
    state.status = { changing: true };
  },
  changePasswordSuccess(state, user) {
    state.status = {};
  },
  changePasswordFailure(state, error) {
    state.status = {};
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
