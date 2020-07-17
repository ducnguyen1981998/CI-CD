/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { router } from "../routes/routes";

Vue.use(Vuex);

import axios from 'axios';

export default new Vuex.Store({
  state: {
    //tables cho DebtReminder
    status: {},
    debtReminderTable: [],
    accountTable: [],
  },
  getters:{
    
  },
  mutations: {
    GET_DEBT_REMINDER(state, payload){
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      //console.log(payload.source);
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
    // lấy thông tin ghi nợ của khách hàng
    async getDebtReminder(ctx){
      console.log("getDebtReminder");
      const userSTK='258258258';
      const respone=await axios.get('http://localhost:3000/api/internal/debt-reminder/'+userSTK);
      ctx.commit('GET_DEBT_REMINDER',respone.data);
    },
    // Hủy một dòng nhắc nợ bất kì
    async removeDebtReminder(ctx, item){
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
      const body = {
        "SourceAccountNumber":258258258,
        "DestinationAccountNumber": parseInt(payload.DestinationAccountNumber),
        "Amount": parseInt(payload.Amount), 
        "Message": payload.Message,
      }
      console.log(body);
      commit("ADD_DEBT_REMINDER_REQUEST");
      const respone=await axios.post('http://localhost:3000/api/internal/debt-reminder/', body);
      if(respone.data.err){
        commit('ADD_DEBT_REMINDER_FAILED',respone.data);
      }else{
        commit('ADD_DEBT_REMINDER_SUCCESS',respone.data);
        router.push("debtReminder");
      }
      
    },
  },
  modules: {
  }
})
