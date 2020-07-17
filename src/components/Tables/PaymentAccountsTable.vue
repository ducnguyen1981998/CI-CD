<template>
  <div>
    <md-table table-header-color="green" v-model="userPaymentDetail" >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Account Number">{{ item.SoTaiKhoanThanhToan }}</md-table-cell>
        <md-table-cell md-label="Balance">{{ item.SoDu }}</md-table-cell>
      </md-table-row>
    </md-table> 
  </div>
</template>

<script>
export default {
  name: "payment-accounts-table",
  props: ['userPaymentDetail']
};

</script>
