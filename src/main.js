// =========================================================
// * Vue Material Dashboard - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import veeValidate from "vee-validate";
import App from "./App";
import firebase from "firebase";

// router setup
import { router } from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

import store from "./store";

// // configure router
// const router = new VueRouter({
//   routes, // short for routes: routes
//   linkExactActiveClass: "nav-item active"
// });

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBonGH2RrrESFY5acs9jhJOELzV7-AMG08",
  authDomain: "cicd-banking.firebaseapp.com",
  databaseURL: "https://cicd-banking.firebaseio.com",
  projectId: "cicd-banking",
  storageBucket: "cicd-banking.appspot.com",
  messagingSenderId: "356134557348",
  appId: "1:356134557348:web:5660035e646f441fbcb831",
  measurementId: "G-3QVFVM9S37"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(veeValidate);

/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
