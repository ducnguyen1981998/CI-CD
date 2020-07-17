/* eslint-disable prettier/prettier */
// Cards
import ChartCard from "./Cards/ChartCard.vue";
import NavTabsCard from "./Cards/NavTabsCard.vue";
import StatsCard from "./Cards/StatsCard.vue";
import LoginCard from "./Cards/LoginCard.vue";

// Tables
import NavTabsTable from "./Tables/NavTabsTable.vue";
import OrderedTable from "./Tables/OrderedTable.vue";
import SimpleTable from "./Tables/SimpleTable.vue";
import TranferHistoryTable from "./Tables/TranferHistoryTable.vue";
import LoanHistoryTable from "./Tables/LoanHistoryTable.vue";
import ReceiveHistoryTable from "./Tables/ReceiveHistoryTable.vue";
import PaymentAccountsTable from "./Tables/PaymentAccountsTable.vue";
import SavingAccountsTable from "./Tables/SavingAccountsTable.vue";
import DebtReminderTable from "./Tables/DebtReminderTable.vue";


export {
  ChartCard,
  NavTabsCard,
  StatsCard,
  NavTabsTable,
  OrderedTable,
  SimpleTable,
  LoginCard,
  
  //component cho TransactionHisotry
  TranferHistoryTable,
  LoanHistoryTable,
  ReceiveHistoryTable,
  
  //component cho AccountList
  PaymentAccountsTable,
  SavingAccountsTable,

  //component for DebtReminder
  DebtReminderTable
};
