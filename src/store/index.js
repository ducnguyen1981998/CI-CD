/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { router } from "../routes/routes";
import { alert } from './alert.module';
import { account } from './account.module';
Vue.use(Vuex);

import axios from 'axios';

export default new Vuex.Store({
  modules:{
    alert,
    account
  },
  state: {
    //tables cho TransactionHistory
    receiveHisTable:[],
    tranferHisTable:[],
    loanHisTable:[],
    //tables,info cho AccountsList
    accountsList:[],
    userPaymentNumber:'', //chi co 1
    userSavingNumbers:[],
    userPaymentDetail:[],
    userSavingDetail:[],
    //query:''

    //tables cho DebtReminder
    status: {},
    debtReminderTable: [],
    accountTable: [],
  },
  getters:{
    
  },
  mutations: {
    GET_RECEIVE_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.receiveHisTable=payload;
    },
    GET_TRANFER_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.tranferHisTable=payload;
      // state.tranferHisTable=payload.map(t=>{
      //   t.NgayGiaoDich=moment(t.NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // });
      
    },
    GET_LOAN_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.loanHisTable=payload;
    },
    GET_ACCOUNTS_LIST(state, payload){
      state.accountsList=payload;
    },
    GET_USER_PAYMENT_NUMBER(state){
      const type='thanh toán';
      for(const i in state.accountsList){
        if(state.accountsList[i].LoaiTaiKhoan==type)
        state.userPaymentNumber=state.accountsList[i].SoTaiKhoan;
      }
    },
    GET_USER_SAVING_NUMBERS(state){
      const type='tiết kiệm';
      state.userSavingNumbers=[];
      for(const i in state.accountsList){
        if(state.accountsList[i].LoaiTaiKhoan==type)
        state.userSavingNumbers.push(state.accountsList[i].SoTaiKhoan);
      }
      //state.userSavingNumber=stk;
    },
    GET_USER_PAYMENT_DETAIL(state,payload){
      state.userPaymentDetail=payload;
    },
    GET_USER_SAVING_DETAIL(state,payload){
      state.userSavingDetail=payload;
    },
    GET_DEBT_REMINDER_REQUEST(state, payload){
      
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      //console.log("GET_DEBT_REMINDER_SUCCESS");
      state.status = { getDebtRemindering: true}
    },
    GET_DEBT_REMINDER_SUCCESS(state, payload){
      
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      console.log("GET_DEBT_REMINDER_SUCCESS");
      console.log(payload.source);
      state.status = { getDebtReminderSuccess: true}
      state.debtReminderTable=payload;
    },
    REMOVE_DEBT_REMINDER(state, payload){
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      //console.log(payload.source);
      // console.log(payload);
      state.debtReminderTable=payload;
    },
    GET_ACCOUNT_INFO_REQUEST(state, payload){
      state.status = { getAccountInfoing: true}
    },
    GET_ACCOUNT_INFO_SUCCESS(state, payload){
      state.status = { getAccountInfoed: true}
      state.accountTable= payload;
    },
    GET_ACCOUNT_INFO_FAILED(state, payload){
      state.status = { getAccountInfoFailed: true}
      state.accountTable= payload.err;
    },
    ADD_DEBT_REMINDER_REQUEST(state, payload){
      state.status = { addDebtRemindering: true}
    },
    ADD_DEBT_REMINDER_SUCCESS(state, payload){
      state.status = { addDebtRemindered: true}
      //state.accountTable= payload;
    },
    ADD_DEBT_REMINDER_FAILED(state, payload){
      state.status = { addDebtReminderFailed: true}
      //state.accountTable= payload.err;
    },
  },
  actions: {
    //lay lich su nhan tien
    async getReceiveHis(ctx){
      const userSTK='258258258';
      const respone=await axios.get('http://localhost:3000/api/internal/transaction/ReceiveTransaction/'+userSTK);
      ctx.commit('GET_RECEIVE_HISTORY',Object.values(respone.data));
    },
    //lay lich su chuyen khoan
    async getTranferHis(ctx){
      const respone=await axios.get('http://localhost:3000/api/internal/transaction/TranferTransaction/258258258');
      ctx.commit('GET_TRANFER_HISTORY',Object.values(respone.data));
    },
    //lay lich su nhac no
    async getLoanHis(ctx){
      const respone=await axios.get('http://localhost:3000/api/internal/transaction/LoanTransaction/258258258');
      ctx.commit('GET_LOAN_HISTORY',Object.values(respone.data));
    },
    //lay danh sach tk + stk thanh toan + stk tiet kiem
    async getAccountsList(ctx){
      const respone=await axios.get('http://localhost:3000/api/internal/accountbank/UserAccountsList/2');
      ctx.commit('GET_ACCOUNTS_LIST',Object.values(respone.data));
      ctx.commit('GET_USER_PAYMENT_NUMBER');
      ctx.commit('GET_USER_SAVING_NUMBERS');
    },
    //lay thong tin stk thanh toan
    async getUserPaymentDetail(ctx, stkThanhToan){
      console.log(stkThanhToan);
      const respone=await axios.get('http://localhost:3000/api/internal/paymentaccount/detail/'+stkThanhToan);
      ctx.commit('GET_USER_PAYMENT_DETAIL',Object.values(respone.data));
    },
    //lay thong tin cac stk tiet kiem
    async getUserSavingDetail(ctx, stkTietKiem){
      const result=[];
      for(const stktk of stkTietKiem){
        const respone=await axios.get('http://localhost:3000/api/internal/savingaccount/detail/'+stktk);
        result.push(Object.values(respone.data)[0]);
      }
      console.log(result);
      ctx.commit('GET_USER_SAVING_DETAIL',result);
    },

    // lấy thông tin ghi nợ của khách hàng
    async getDebtReminder(ctx){
      ctx.commit("GET_DEBT_REMINDER_REQUEST");
      const userSTK='258258258';
      const respone=await axios.get('http://localhost:3000/api/internal/debt-reminder/'+userSTK);
      if(respone.data.err){
        //ctx.commit('GET_DEBT_REMINDER_FAILED',respone.data);
      }else{
        ctx.commit('GET_DEBT_REMINDER_SUCCESS',respone.data);
        //ctx.dispatch("alert/error", "123", { root: true });
      }
    },
    // Hủy một dòng nhắc nợ bất kì
    async removeDebtReminder(ctx, {item, message}){
      // const payload={
      //   userSTK : '258258258',
        
      // };
      const respone=await axios.put('http://localhost:3000/api/internal/debt-reminder/', item);
      ctx.commit('REMOVE_DEBT_REMINDER',respone.data);
    },
    // Lấy danh sách tài khoản
    async getAccountInfo({commit}, account){
      commit("GET_ACCOUNT_INFO_REQUEST");
      const respone=await axios.get('http://localhost:3000/api/internal/debt-reminder/detail-info/' +account);
      if(respone.data.err){
        commit('GET_ACCOUNT_INFO_FAILED',respone.data);
      }else{
        commit('GET_ACCOUNT_INFO_SUCCESS',respone.data);
      }
      
    },

    // Thêm vào DB thẻ ghi nợ
    async addDebtReminder({commit}, payload){

      //Nội dung sẽ gởi
      const body = {
        "SourceAccountNumber":258258258,
        "DestinationAccountNumber": parseInt(payload.DestinationAccountNumber),
        "Amount": parseInt(payload.Amount), 
        "Message": payload.Message,
      }
      // console.log(body);
      commit("ADD_DEBT_REMINDER_REQUEST");
      const respone=await axios.post('http://localhost:3000/api/internal/debt-reminder/', body);
      if(respone.data.err){
        commit('ADD_DEBT_REMINDER_FAILED',respone.data);
      }else{
        commit('ADD_DEBT_REMINDER_SUCCESS',respone.data);
        router.push("debtReminder");
      }
    },
  }
})
