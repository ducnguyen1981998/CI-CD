import VueRouter from "vue-router";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import AccountsList from "@/pages/AccountsList.vue";
import TranferList from "@/pages/TranferList.vue";
import MoneyTranfer from "@/pages/MoneyTranfer.vue";
import Notifications from "@/pages/Notifications.vue";
import TransactionsHistory from "@/pages/TransactionsHistory.vue";

// Màn hình nhắc nợ
import DebtReminder from "@/pages/DebtReminder/DebtReminderTable.vue";
import AddDebtReminder from "@/pages/DebtReminder/AddDebtReminder.vue";

//Authentication
import Register from "@/pages/Authentication/Register.vue";
import Login from "@/pages/Authentication/Login.vue";
import ForgetPassword from "@/pages/Authentication/ForgetPassword.vue";
import ForgetPassword1 from "@/pages/Authentication/ForgetPassword1.vue";
import ChangePassword from "@/pages/Authentication/ChangePassword.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "accounts",
        name: "Accounts List",
        component: AccountsList
      },
      {
        path: "tranferList",
        name: "Tranfer List",
        component: TranferList
      },
      {
        path: "moneyTranfer",
        name: "Money Tranfer",
        component: MoneyTranfer
      },
      {
        path: "debtReminder",
        name: "Debt Reminder",
        meta: {
          hideFooter: true
        },
        component: DebtReminder
      },
      {
        path: "add-debt-reminder",
        name: "Add Debt Reminder",
        component: AddDebtReminder
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "transactions",
        name: "Transactions History",
        component: TransactionsHistory
      }
    ]
  },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/forgetpassword", component: ForgetPassword },
  { path: "/forgetpassword1", component: ForgetPassword1 },
  { path: "/changepassword", component: ChangePassword }
];

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  //Page cho phép
  const publicPages = [
    "/login",
    "/register",
    "/forgetpassword",
    "/dashboard",
    "/notifications"
  ];
  // Page can quyen login de truy cap
  const authRequired = !publicPages.includes(to.path);

  //Kiểm tra đã login trong localStorage
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export { router };
