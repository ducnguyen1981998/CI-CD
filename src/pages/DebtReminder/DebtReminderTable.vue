<template>
  <div class="content">
    <md-progress-spinner
      v-if="status.getDebtRemindering"
      md-mode="indeterminate"
      :md-diameter="30"
      :md-stroke="10"
    >
    </md-progress-spinner>
    <div class="md-layout" v-else>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <md-card-header-text>
              <div class="md-title">Giao dịch nhắc nợ</div>
            </md-card-header-text>
            <!-- <h4 class="title">Giao dịch nhắc nợ</h4> -->
            <md-button
              class="md-icon-button md-raised md-accent"
              md-direction="bottom-end"
              href="#/add-debt-reminder"
            >
              <md-icon>add</md-icon>
            </md-button>
          </md-card-header>
          <md-card-content>
            <debt-reminder-table
              :debtReminder="debtReminderTable"
            ></debt-reminder-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { DebtReminderTable } from "@/components";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    DebtReminderTable
  },
  created() {
    this.$store.dispatch("getDebtReminder");
    //console.log("Created");
  },
  computed: {
    ...mapState(["debtReminderTable", "status"]),
    ...mapState("alert", ["type", "message"])
  },
  methods: {
    // removeItem = item => {
    //   console.log("Parent: ", item);
    // };
  }
};
</script>
