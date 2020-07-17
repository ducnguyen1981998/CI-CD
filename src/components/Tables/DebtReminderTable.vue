<template>
  <div>
    <md-table
      table-header-color="red"
      v-model="searched"
      md-sort="name"
      md-sort-order="asc"
      md-card
    >
      <md-table-toolbar>
        <!-- Sắp xếp theo danh sách nợ do mình tạo hay danh sách nợ do người khác gởi -->
        <md-field class="md-toolbar-section-start">
          <md-select
            v-model="typeDebtReminder"
            name="typeDebtReminder"
            id="typeDebtReminder"
            placeholder="From"
            @md-selected="changeType($event)"
          >
            <md-option value="from">From</md-option>
            <md-option value="to">To</md-option>
          </md-select>
        </md-field>
        <!-- Thanh tìm kiếm -->
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Tìm kiếm theo STK..."
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>
      <!-- Hiển thị Not Found khi không tìm được -->
      <md-table-empty-state
        md-label="Không tìm thấy danh sách nợ"
        :md-description="
          `Không tìm thấy danh sách nợ cho tìm kiếm '${search}'.`
        "
      >
      </md-table-empty-state>

      <!-- Dữ liệu được hiển thị ở đây nếu có -->
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Mã nhắc nợ" md-sort-by="MaGiaoDichNhacNo">{{
          item.MaGiaoDichNhacNo
        }}</md-table-cell>
        <md-table-cell md-label="STK" md-sort-by="SoTaiKhoanNguoiNhan"
          >{{ item.SoTaiKhoanNguoiNhan }}
        </md-table-cell>
        <md-table-cell md-label="Họ tên" md-sort-by="SoTaiKhoanNguoiNhan"
          >{{ item.TenKhachHang }}
        </md-table-cell>
        <md-table-cell md-label="Thời gian" md-sort-by="NgayGiaoDich">{{
          item.NgayGiaoDich
        }}</md-table-cell>
        <md-table-cell md-label="Nội dung" md-sort-by="NoiDung">{{
          item.NoiDung
        }}</md-table-cell>
        <md-table-cell md-label="Số tiền" md-sort-by="SoTien">{{
          new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND"
          }).format(item.SoTien)
        }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-primary">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            class="md-icon-button md-primary md-raised"
            @click="remove(item)"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="activeRemoveDR"
      md-title="Hủy danh sách nhắc nợ"
      md-content="Bạn có chắc chắn muốn hủy nhắc nợ này? <br>
      Chúng tôi sẽ gởi một thông báo tới tài khoản đích để xác nhận thông tin của bạn."
      md-confirm-text="Đồng ý"
      md-cancel-text="Hủy"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <md-dialog-prompt
      :md-active.sync="valueDialog"
      v-model="valueMessage"
      md-title="Vui lòng nhập nội dung sẽ gởi đến tài khoản nhắc nợ."
      md-input-maxlength="30"
      md-input-placeholder="Nội dung"
      md-confirm-text="Hoàn thành"
      md-cancel-text="Hủy"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
// import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.NoiDung).includes(toLower(term)));
  }
  return items;
};
export default {
  name: "debt-reminder-table",
  props: ["debtReminder"],
  data: () => ({
    // Tìm kiếm bằng Search
    search: null,
    searched: [],
    // tìm kiếm theo nguồn hay đích
    typeDebtReminder: "from",
    //Hủy giao dich
    isRemove: false,
    //Active dialog hủy nhắc nợ
    activeRemoveDR: false,
    valueDialog: null,
    valueMessage: null
  }),
  methods: {
    //Dialog hủy nhắc nợ
    onConfirm() {
      this.valueDialog = "agreed";
    },
    onCancel() {
      this.valueDialog = "disagreed";
    },
    ...mapActions(["removeDebtReminder"]),
    searchOnTable() {
      this.typeDebtReminder === "from"
        ? (this.searched = searchByName(this.debtReminder.source, this.search))
        : (this.searched = searchByName(
            this.debtReminder.destination,
            this.search
          ));
    },
    changeType(event) {
      this.typeDebtReminder === "from"
        ? (this.searched = this.debtReminder.source)
        : (this.searched = this.debtReminder.destination);
    },
    remove(item) {
      //Actibe form hủy nhắc nợ
      this.activeRemoveDR = true;
      this.isRemove = true;
      console.log("HERE: Remove Item Function", item.idGiaoDichNhacNo);
      const valueMessage = this.valueMessage;
      this.removeDebtReminder({ item, valueMessage });
    }
  },
  created() {
    console.log("Table Created: ", this.debtReminder);
    this.debtReminder ? (this.searched = this.debtReminder.source) : null;
  },
  watch: {
    debtReminder: function(val) {
      //console.log("Val: ", val);
      this.searched = val.source;
    }
  }
};
</script>
