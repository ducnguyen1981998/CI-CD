<template>
  <div>
    <md-table table-header-color="green" v-model="receiveHisTable">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label='Date'>{{ item.NgayGiaoDich }}</md-table-cell>
        <md-table-cell md-label='Money'>{{ item.SoTien }}</md-table-cell>
        <md-table-cell md-label='Sender Name'>{{ item.ThongTinNguoiGui }}</md-table-cell>
        <md-table-cell md-label='Sender Number'>{{ item.SoTaiKhoanNguoiGui }}</md-table-cell>
        <md-table-cell md-label='Bank Name'>{{ item.TenNganHang }}</md-table-cell>
        <md-table-cell md-label='Transaction Name'>{{ item.MaGiaoDich }}</md-table-cell>
        <md-table-cell md-label='Content'>{{ item.NoiDung}}</md-table-cell>
      </md-table-row> 
    </md-table>
  </div>
</template>

<script>
export default {
  name: "receive-history-table",
  props: ['receiveHisTable']
};
</script>
