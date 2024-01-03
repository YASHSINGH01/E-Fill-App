/*
    Used To Store Data Locally On Application
*/ 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    setAlreadyLaunched(data) {
        return AsyncStorage.setItem('alreadyLaunched', data);
    },
    getAlreadyLaunched() {
        return AsyncStorage.getItem('alreadyLaunched');
    },
    // setUserLanguage(data) {
    //     return AsyncStorage.setItem('userLanguage', data);
    // },
    // getUserLanguage() {
    //     return AsyncStorage.getItem('userLanguage');
    // },
    setUserInfo(data) {
        return AsyncStorage.setItem('userInfo', JSON.stringify(data));
    },
    getUserInfo() {
        return AsyncStorage.getItem('userInfo');
    },
    setLoginToken(data){
        return AsyncStorage.setItem('loginToken', data);
    },
    getLoginToken() {
        return AsyncStorage.getItem('loginToken');
    },
    setNotification(data){
        return AsyncStorage.setItem('notification', JSON.stringify(data));
    },
    getNotification() {
        return AsyncStorage.getItem('notification');
    },
    setStatusNotification(data){
        console.log('storagenoti', data);
        return AsyncStorage.setItem('statusNotification', JSON.stringify(data));
    },
    getStatusNotification() {
        return AsyncStorage.getItem('statusNotification');
    },
    getUser_pass_key(){
        return AsyncStorage.getItem('dealer_passkey');
    },
    setUser_pass_key(data){
         console.log('storage', data);
        return AsyncStorage.setItem('dealer_passkey',JSON.stringify(data));
    },
    getDealer_vehicle_storage(){
        return AsyncStorage.getItem('dealer_productlist');
    },
    setDealer_vehicle_storage(data){
         console.log('storage', data);
        return AsyncStorage.setItem('dealer_productlist',data);
    },
    clearallDealer_vehicle_storage(){
        // console.log('storage', data);
        return AsyncStorage.multiRemove('dealer_productlist');
    },
    clearDealer_vehicle_storage(){
        // console.log('storage', data);
        return AsyncStorage.removeItem('dealer_productlist');
    },
    getDealer_pass_key(){
        return AsyncStorage.getItem('dealer_passkey');
    },
    setDealer_pass_key(data){
         console.log('paaskeystorage', data);
        return AsyncStorage.setItem('dealer_passkey',JSON.stringify(data));
    },
    getFranchise_passkey(){
        return AsyncStorage.getItem('franchisee_passkey');
    },
    setFranchise_passkey(data){
        console.log('storage', data);
       return AsyncStorage.setItem('franchisee_passkey',JSON.stringify(data));
   },
   clearFranchisee_product(){
    // console.log('storage', data);
    return AsyncStorage.removeItem('franchisee_products');
},
   getFranchisee_product(){
    return AsyncStorage.getItem('franchisee_products');
},
setFranchisee_product(data){
    console.log('storage_fproducts', data);
   return AsyncStorage.setItem('franchisee_products',data);
},
    getSubScription(){
        return AsyncStorage.getItem('telematrix');
    },
    setSubScription(data){
        //  console.log('storage', data);
        return AsyncStorage.setItem('telematrix',JSON.stringify(data));
    },
    setChargingLogInfo(data) {
        return AsyncStorage.setItem('chargingLog',  JSON.stringify(data));
    },
    getChargingLogInfo() {
        return AsyncStorage.getItem('chargingLog');
    },
}