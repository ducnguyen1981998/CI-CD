<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Tranfer History</h4>
          </md-card-header>
          <md-card-content>
            <tranfer-history-table
              :tranferHisTable="tranferHisTable"
            ></tranfer-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Receive History</h4>
          </md-card-header>
          <md-card-content>
            <receive-history-table
              :receiveHisTable="receiveHisTable"
            ></receive-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Loan History</h4>
          </md-card-header>
          <md-card-content>
            <loan-history-table
              :loanHisTable="loanHisTable"
            ></loan-history-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
//import { SimpleTable } from "@/components";
import {
  TranferHistoryTable,
  LoanHistoryTable,
  ReceiveHistoryTable
} from "@/components";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    TranferHistoryTable,
    LoanHistoryTable,
    ReceiveHistoryTable
    //SimpleTable
  },
  mounted() {
    this.$store.dispatch("getTranferHis");
    this.$store.dispatch("getLoanHis");
    this.$store.dispatch("getReceiveHis");
  },
  computed: {
    ...mapState(["tranferHisTable"]),
    ...mapState(["loanHisTable"]),
    ...mapState(["receiveHisTable"])
  }
};
</script>
