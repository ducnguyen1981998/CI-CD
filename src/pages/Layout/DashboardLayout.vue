<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User profile</p>
      </sidebar-link>
      <sidebar-link to="/accounts">
        <md-icon>content_paste</md-icon>
        <p>Accounts list</p>
      </sidebar-link>
      <sidebar-link to="/tranferList">
        <md-icon>multiple_stop</md-icon>
        <p>Tranfer List</p>
      </sidebar-link>
      <sidebar-link to="/moneyTranfer">
        <md-icon>attach_money</md-icon>
        <p>Money tranfer</p>
      </sidebar-link>
      <sidebar-link to="/debtReminder">
        <md-icon>more_time</md-icon>
        <p>Debt reminder</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/transactions">
        <md-icon>receipt_long</md-icon>
        <p>Transactions History</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>
      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  }
};
</script>
