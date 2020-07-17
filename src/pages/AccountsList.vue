<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Simple Table</h4>
            <p class="category">Here is a subtitle for this table</p>
          </md-card-header>
          <md-card-content>
            <payment-accounts-table :userPaymentDetail="userPaymentDetail"></payment-accounts-table>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Saving Accounts List</h4>
            <p class="category">Here is a subtitle for this table</p>
          </md-card-header>
          <md-card-content>
            <saving-accounts-table :userSavingDetail="userSavingDetail"></saving-accounts-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PaymentAccountsTable, SavingAccountsTable } from "@/components";
import { mapState } from 'vuex';

export default {
  components: {
    PaymentAccountsTable,
    SavingAccountsTable
  },
  mounted(){
    this.$store.dispatch('getAccountsList');
     this.$store.dispatch('getUserPaymentDetail',this.$store.state.userPaymentNumber);
    this.$store.dispatch('getUserSavingDetail',this.$store.state.userSavingNumbers);
    // console.log(this.$store.state.accountsList);
    // console.log(this.$store.state.userSavingNumbers);
    // console.log(this.userSavingDetail);
  },
  computed:{
    ...mapState(['userSavingDetail']),
    ...mapState(['userPaymentDetail']),
  },
};
</script>
