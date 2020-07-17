<template>
  <form @submit.prevent="addDebtReminderSubmit">
    <!-- Lỗi khi kết nối backend -->

    <md-card>
      <md-card-header
        :data-background-color="dataBackgroundColor"
        class="text-center"
      >
        <h4 class="title">Giao dịch nhắc nợ</h4>
        <p class="category">Thêm mới</p>
      </md-card-header>
      <md-card>
        <md-card-header data-background-color="blue">
          <md-card-header-text>
            <div class="md-caption">Tài khoản nguồn</div>
            <div class="md-title">123123123123</div>
            <div class="md-caption">
              Số dư khả dụng:
              <div class="md-title">500.500.100 VND</div>
            </div>
            <div class="md-caption">Mở tại: CN 25Bank, Nguyễn Trọng Tuyển</div>
          </md-card-header-text>
        </md-card-header>
      </md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-75">
            <md-field>
              <md-icon>credit_card</md-icon>
              <label>Số tài khoản</label>
              <md-input
                name="destination"
                v-model="payload.DestinationAccountNumber"
                v-validate="'required|numeric|min:9|max:9'"
                @input="searchOnDB"
              ></md-input>
            </md-field>
            <md-progress-spinner
              v-show="status.getAccountInfoing"
              md-mode="indeterminate"
              :md-diameter="15"
              :md-stroke="5"
            ></md-progress-spinner>
            <p class="text-danger">
              {{ errors.first("destination") }}
            </p>
            <p
              v-show="
                status.getAccountInfoed &&
                  payload.DestinationAccountNumber.length === 9
              "
              class="text-success"
            >
              {{ accountTable.TenKhachHang }}
            </p>
            <p
              v-show="
                status.getAccountInfoFailed &&
                  payload.DestinationAccountNumber.length === 9
              "
              class="text-danger"
            >
              {{ accountTable }}
            </p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-button class="md-raised md-success">Chọn</md-button>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field class="md-form-group">
              <md-icon>payments</md-icon>
              <label> Số tiền</label>
              <md-input
                name="Amount"
                v-validate="'required|numeric'"
                v-model="payload.Amount"
                placeholder="VND"
              ></md-input>
            </md-field>
            <p class="text-danger">
              {{ errors.first("Amount") }}
            </p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <md-icon>mms</md-icon>
              <label>Nội dung</label>
              <md-input
                name="message"
                v-model="payload.Message"
                v-validate="'required'"
              ></md-input>
            </md-field>
            <p v-if="!payload.Message" slot="inputs" class="text-danger">
              {{ errors.first("message") }}
            </p>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-progress-spinner
              v-show="status.addDebtRemindering"
              md-mode="indeterminate"
              :md-diameter="20"
              :md-stroke="5"
            ></md-progress-spinner>
            <md-button class="md-raised md-success" type="submit">
              Tiếp tục
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "debt-reminder-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      payload: {
        DestinationAccountNumber: "",
        Amount: null,
        Message: null
      },
      //hiển thị Dialog chọn tài khoản
      showDialog: false
    };
  },
  methods: {
    ...mapActions(["getAccountInfo", "addDebtReminder"]),
    addDebtReminderSubmit(e) {
      //console.log("addDebtReminderSubmit");
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
      });
      const payload = this.payload;
      if (
        payload.Amount &&
        payload.Message &&
        payload.DestinationAccountNumber
      ) {
        this.addDebtReminder(this.payload);
      }
    },
    searchOnDB() {
      if (this.payload.DestinationAccountNumber.length === 9) {
        this.getAccountInfo(this.payload.DestinationAccountNumber);
      }
    }
  },
  computed: {
    ...mapState(["accountTable", "status"]),
    ...mapState("alert", ["type", "message"])
  }
};
</script>
<style scoped>
.md-title {
  color: green;
  font-size: 14px;
}
.md-caption {
  font-size: 14px;
}
</style>
