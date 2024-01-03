import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';

const liveUrl = "https://iot.efillelectric.com/api";
//const liveUrl = "https://cms.efillelectric.com/api";
const liveImageUrl = "https://iot.efillelectric.com";

const apiService = axios.create({
    baseURL: liveUrl,
});

apiService.interceptors.request.use(
    async (request) => {
        if (request.method.toLowerCase() === 'post') {
            request.data = request.data || {};
        }

        const accessToken = await EncryptedStorage.getItem('user_session').then((val) => val != undefined ? JSON.parse(val).token : null);
        if (accessToken != undefined || accessToken != null) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return request;
    });


apiService.interceptors.response.use(
    async (response) => {
        // console.log("Response : ", response.status);
        if (response.status === 401) {
            try {
                await EncryptedStorage.removeItem("user_session");
            } catch (error) {
                console.log(error);
            }

        }
        return response;
    }, (error) => {
        // console.log("Response Error: ", error);
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    });



export default {
    liveImageUrl,
    /*------------------------------------ Global API --------------------------------------*/
    // App Maintenance Check
    checkMaintenance() {
        return apiService.post(`${liveUrl}/checkMaintenance`);
    },
    getVersion(formData){
        // console.log('response',formData);
return apiService.post(`${liveUrl}/versioncheck`,formData);
    },
    // App version Check
    appVersionCheck(formData) {
        return apiService.post(`${liveUrl}/appVersionCheck`, formData);
    },

    //Verify User
    checkUser() {
        // console.log('response');
        return apiService.post(`${liveUrl}/verifyuser`);
    },

    /*------------------------------------ Authentication API --------------------------------------*/
    // Registration of New User (Self User/ Corporate User/ Guest User)
    signUp(formData) {
        // console.log("register");
        return apiService.post(`${liveUrl}/auth/register`, formData);
    },
    companyCode(formData) {
        // console.log("login");
        return apiService.post(`${liveUrl}/auth/check-company-code`, formData);
    },
    // Login Existing User (Self User/ Corporate User/ Guest User)
    login(formData) {
        // console.log("login0", formData);
        return apiService.post(`${liveUrl}/auth/login`, formData);
    },
    // Login Existing User
    logout(USER_TOKEN) {
        // console.log("login1");
        return apiService.get(`${liveUrl}/user/logout`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    // Forget Password
    forgotPassword(formData) {
        // console.log("login3");
        return apiService.post(`${liveUrl}/forget-password`, formData);
    },
    //Check Phone Number
    checkPhoneNumber(formData) {
        console.log("login4");
        return apiService.post(`${liveUrl}/auth/check-phone`, formData);
    },
    // Reset Password
    resetPassword(formData) {
        console.log("login5");
        return apiService.post(`${liveUrl}/auth/reset-password`, formData);
    },
    //Get Manufacturer
    getAllManufacturersSignUp() {
        return apiService.get(`${liveUrl}/vehicle/manufacturer`);
    },
    //Get Vehicle Model
    getVehicleModelSignUp(formData) {
        return apiService.post(`${liveUrl}/vehicle/model`, formData);
    },

    /*------------------------------------ OTP API --------------------------------------*/
    sendOtp(formData) {
        console.log('new distnce api',formData)
        return apiService.post(`${liveUrl}/auth/send-OTP`, formData);
    },
    verifyOtp(formData) {
        return apiService.post(`${liveUrl}/auth/verify-OTP`, formData);
    },
    resendOtp(formData) {
        return apiService.post(`${liveUrl}/auth/resend-OTP`, formData);
    },

    /*------------------------------------ Vehicle Dropdown API --------------------------------------*/
    //Get Vehicle Type List 
    getVehicleTypeList(USER_TOKEN) {

        return apiService.get(`${liveUrl}/vehicle/list`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Connectors Dropdown API --------------------------------------*/
    //Get Connectors List 
    getConnectorsList(USER_TOKEN) {

        return apiService.get(`${liveUrl}/connector/list/v1`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Filter Charging Stations API --------------------------------------*/
    //Get Charging stations List via filter parameters
    filterChargingStations(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/chargingStation/filter`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },


    /*------------------------------------ Charging Station API --------------------------------------*/
    //Get List of All Charging Stations
    getChargingStations(USER_TOKEN) {

        return apiService.get(`${liveUrl}/chargingStation/list`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get List of All Charging Stations with distance
    getChargingStationsDistance(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/chargingStation/list`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    getChargingStationsDistances(formData, USER_TOKEN) {
        
        return apiService.post(`${liveUrl}/chargingStation/list-new`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get List of All Third Party Charging Stations
    getThirdPartyChargingStations(USER_TOKEN) {
        return apiService.get(`${liveUrl}/list-charger/index`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get List of Favourite Charging Stations
    getFavouriteChargingStations(USER_TOKEN) {
        return apiService.get(`${liveUrl}/favorite/list`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get Details of Charging Station
    getChargingStationDetails(formData, USER_TOKEN) {

        console.log('details',USER_TOKEN)
        return apiService.post(`${liveUrl}/chargingStation/details`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get Available Charging Points of a charging station
    getAvailablePoints(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/connector/available-list1`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get List of Favorite Charging Stations
    getFavoriteChargingStation(USER_TOKEN) {

        return apiService.get(`${liveUrl}/favorite/list`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Add Charging Station to Favorite List
    addFavorite(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/favorite/add`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Remove Charging Station from Favorite List
    removeFavorite(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/favorite/destroy`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get List of Reviews of Charging Station
    getChargingStationReviews(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/rating/list`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Add Reviews for Charging Station
    addReviews(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/rating/add`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    addReviews_new(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/rating/add-new`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Remove Charging Station review
    removeReview(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/rating/destroy`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get Available Charging Points
    availableChargingPoints(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/chargingPoint/list`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Notifications API --------------------------------------*/
    //Get All Unread Notifications
    getAllNotifications(USER_TOKEN) {

        return apiService.post(`${liveUrl}/notification/unread`, {}, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Mark Specific Notification as Read
    readSpecificNotification(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/notification/specific-read`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Mark All Notification as Read
    readAllNotification(USER_TOKEN) {

        return apiService.post(`${liveUrl}/notification/all-read`, {}, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Schedule API --------------------------------------*/
    //Create Booking
    createBooking(formData, USER_TOKEN) {

        //console.log('Create Booking: ',formData);
        return apiService.post(`${liveUrl}/schedule/create`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    bookCharger(formData, USER_TOKEN) {
        console.log('bookcharger',formData)
        return apiService.post(`https://iot.efillelectric.com/api/create-new-booking/v2`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    // bookCharger(formData, USER_TOKEN) {
    //     return apiService.post(`${liveUrl}/create-new-booking`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    // },
    coupon_charger(formData, USER_TOKEN) {
        console.log('couponbooking',formData)
        return apiService.post(`https://iot.efillelectric.com/api/get-final-amount-coupon`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get All scheduled Booking history
    getBookingHistory(formData, USER_TOKEN) {
console.log('history',formData)
        return apiService.post(`${liveUrl}/schedule/history/v2`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Cancel Booking
    cancelBooking(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/schedule/cancel/v2`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Schedule Detail
    scheduleDetails(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/schedule/details`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Add Feedback
    submitFeeback(formData, USER_TOKEN) {

        return apiService.post(`${liveUrl}/feedback/add`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    //Get Transaction Id of the requested transaction
    getTransactionId(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/transaction/check`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    //Check QR Code validity
    checkQRcode(formData, USER_TOKEN) {
        // console.log(formData);
        return apiService.post(`${liveUrl}/check-qr-code`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },

    /*------------------------------------ User Details API --------------------------------------*/
    //Get Manufacturer
    getAllManufacturers(USER_TOKEN) {
        return apiService.get(`${liveUrl}/vehicle/manufacturer`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get Vehicle Model
    getVehicleModel(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/vehicle/model`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Update phone Number
    updatePhone(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user/change-phone`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Update User Details Name, DOB, Address
    updateUserDetails(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user/change-detail`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Coupon API --------------------------------------*/
    //Get All Coupons Ticket
    getCoupons(USER_TOKEN) {
        return apiService.get(`${liveUrl}/coupon/all`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    applyCoupons(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/coupon/add`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    removeCoupons(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/coupon/remove`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Support API --------------------------------------*/
    //Submit Support Ticket
    submitTicket(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/submit-ticket`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    getTicketStatus(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/check-ticket-status`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Profile Screen --------------------------------------*/
    //Get User Information
    getUserInformation(USER_TOKEN) {
        return apiService.get(`${liveUrl}/user/get-detail`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Change User Password
    changePassword(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user/change-password`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Add Vehicle Details
    addVehicle(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/vehicle/add`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Update Vehicle Details
    updateVehicle(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/vehicle/update`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Get Vehicle Details
    getVehicles(USER_TOKEN) {
        return apiService.get(`${liveUrl}/vehicle/details/v1`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Delete Vehicle Details
    deleteVehicle(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/vehicle/delete`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Book Charger Screen --------------------------------------*/
    //Check Available Booking Slots
    checkAvailableSlots(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/schedule/available`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Check if schedule data is valid
    checkSchedule(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/schedule/check`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },

    /*------------------------------------ Payment Gateway Screen --------------------------------------*/

    //Create Order
    createOrder(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/payment/create`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    //Order Transaction on Successful charging
    orderSubmit(formData, USER_TOKEN, role) {
        if (role == '2') {
            //Corporate User Order API
            return apiService.post(`${liveUrl}/order/create/corporate`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
        } else {
            //Self User Order API
            return apiService.post(`${liveUrl}/order/create`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
        }
    },
    //Temp Order Submit
    tempOrderSubmit(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/order/temp/create`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })

    },
    //Order History
    orderHistory(USER_TOKEN) {
        return apiService.post(`${liveUrl}/order/history`, {}, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    /*------------------------------------ List a Charger Screen --------------------------------------*/
    //Add a charger
    listACharger(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/list-charger`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    /*------------------------------------ Static Pages API --------------------------------------*/
    getLegalDocuments(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/pages`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    getDocumentDetails(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/pages/detail`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    getFaqs(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/pages/faq`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    /*-----------------------------------Wallet API -----------------------------------------*/
    new_walletOrder(formData,USER_TOKEN) {
        // console.log('userrre_wallet',formData);
        return apiService.post(`${liveUrl}/charger_user/v2`,formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    // walletOrder(USER_TOKEN) {
    //     return apiService.post(`${liveUrl}/user/wallet-balance`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    // },
    //Create wallet order
    createOrderWallet(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/payment/create-order-wallet`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    // reazorpay order id api
    orderCreate(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/payment/update-wallet-balance`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    // for wallet balance
    walletOrder(USER_TOKEN) {
        return apiService.post(`${liveUrl}/user/wallet-balance`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    walletHistory(USER_TOKEN) {
        console.log('userrre_wallet');
        return apiService.post(`${liveUrl}/order/wallet-history`, {}, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    checkRfidCard(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user-card-scan`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    checkCarId(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user-car-scan`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    getRfidCards(USER_TOKEN) {
        return apiService.post(`${liveUrl}/user-cards`, {}, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    getcars(USER_TOKEN) {
        return apiService.post(`${liveUrl}/user-cars`, {}, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    checkeRfid(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user-card-scan-realtime-status`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    checkecar(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/user-car-scan-realtime-status`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    getactiveOrders(USER_TOKEN) {
        return apiService.post(`${liveUrl}/get-active-orders`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    tempOrderSubmit1(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/order/temp/create1`, formData)
    },
    deleteIt(formData, USER_TOKEN) {
        return apiService.post(`${liveUrl}/deleterfidcard`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });
    },
    UserInfo(USER_TOKEN) {
        console.log('login');
        return apiService.post(`${liveUrl}/userinfo1`, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } });

    },
    chargerfault(formData, USER_TOKEN) {
        // console.log('login', formData);
        return apiService.post(`${liveUrl}/chargerfault`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    verifyuser(formData, USER_TOKEN) {
        // console.log(formData, 'formdata');
        return apiService.post(`${liveUrl}/verifyuser1`, formData, { headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    errorcheck(formData) {
        return apiService.post(`${liveUrl}/sessionerror`, formData)
    },
    downloadinvoice(formData, USER_TOKEN){
        // console.log('invoice',formData);
        return apiService.post(`${liveUrl}/download-invoice`, formData,{ headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    sendemail(formData, USER_TOKEN){
        //  console.log('send',formData);
        return apiService.post(`${liveUrl}/send-invoice`, formData,{ headers: { Authorization: 'Bearer '.concat(USER_TOKEN) } })
    },
    subscription(formData){
        // console.log('subhhtp',formData);
        return apiService.post(`https://mobility.efillelectric.com/mobility-subscribe`, formData)
    },
    dealersubscribe(formData){
        // console.log('subhhtp',formData);
        return apiService.post(`https://mobility.efillelectric.com/dealer-subscribe`, formData)
    },
    chargerlist(){
        // console.log('subhhtp');
        return apiService.post(`https://mobility.efillelectric.com/vehicles`)
    },
    franchise(formData){
        // console.log('subhhtp',formData);
        return apiService.post(`https://iot.efillelectric.com/franchisee-subscribe`,formData)
    },
    cardlist(formData){
        //  console.log('cardt',formData);
        return apiService.post(`https://iot.efillelectric.com/franchisee/charger_models`,formData)
    },
    checkoutlist(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://iot.efillelectric.com/admin/charger-checkout`,formData)
    },
    dealercart(formData){
        //  console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/admin/charger-checkout1`,formData)
    },
    upload(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/submit-data`,formData)
    },
    dealer_order(formData){
         console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/distributor-order-history`,formData)
    },
    dealer_stock(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/distributor-stock-list`,formData)
    },
    dealer_soldrecords(formData){
        //  console.log('soldlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/distributor-sold-list`,formData)
    },
    dealer_sellrecords(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/distributor-sell-record`,formData)
    },
    dealer_invoice(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/distributor-sell-record-details`,formData)
    },
    dealer_orderdetails(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/order-details`,formData)
    },
    dealer_warranty(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/product-warranty`,formData)
    },
    warrantypolicy(){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/warranty-terms`)
    },
    serive_api(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/check-chessis`,formData)
    },
    serive_otp(formData){
        //  console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-send-otp`,formData)
    },
    serive_otpverify(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-verify-otp`,formData)
    },
    serive_register(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-register`,formData)
    },
    serive_open(formData){
        //  console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-open-list`,formData)
    },
    serive_close(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-close-list`,formData)
    },
    serive_closeverify(formData){
        console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-close`,formData)
    },
    dealer_chaessis(formData){
        // console.log('chessislist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/distributor-chessis-list`,formData)
    },
    serive_list(){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-list`)
    },
    warranty_list(){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/warranty-list`)
    },
    warranty_register(formData){
    console.log('warramtylist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/warranty-register`,formData)
    },
    warranty_open(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/warranty-open-list`,formData)
    },
    warranty_close(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/warranty-close-list`,formData)
    },
    document_type(){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/document-type`)
    },
    users_order(formData){
        //  console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/customer/vehicles`,formData)
    },
    users_service(formData){
         console.log('user_service',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/vehicle/service`,formData)
    },
    users_service_history(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/user/service-history`,formData)
    },
    users_service_submit(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/user/free-service-submit`,formData)
    },
    free_service(formData){
        console.log('user_outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/service/options`,formData)
    },
    dealer_service(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/distributor-service/options`,formData)
    },
    user_soldrecords(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/user-sold-list`,formData)
    },
    dealer_chessis_no(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/chessis/service-history`,formData)
    },
   rc_update(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/final-rc`,formData)
    },
    chat_bot(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/chat-loop`,formData)
    },
    user_docs(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/user-docs`,formData)
    },
    dealer_sale_details(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/distributor/sale-details`,formData)
    },
    vehicledata_update(formData){
        // console.log('userlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/distributor/update-part-no`,formData)
    },
    paid_serive_list(){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/service-list-paid`)
    },
    dmc_list(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/payment-proofs-images`,formData)
    },
    UploadVehicle_Document(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/delar_fame_two_docs`,formData)
    },
    UploadVehicle_Data(formData){
        // console.log('outlist',formData);
        return apiService.post(`https://mobility.efillelectric.com/api/v1/delar_fame_two_upload_docs`,formData)
    },
    franchisee_list(formData){
        console.log('paynfdmt',formData);
        return apiService.post(`https://iot.efillelectric.com/api/v1/payment-proofs-images`,formData)
    },
    franchiseercart(formData){
         console.log('franchiseecheck',formData);
       return apiService.post(`https://iot.efillelectric.com/admin/charger-checkout2`,formData)
   },
   franchisee_orderhistory(formData){
    console.log('fjfj',formData);
   return apiService.post(`https://iot.efillelectric.com/api/v1/charger-order-history`,formData)
},
franchisee_orderdetails(formData){
    // console.log('franchisee',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/franchisee-order-details`,formData)
},
franchisee_stock(formData){
    // console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/franchisee-stock-list`,formData)
},
franchisee_soldrecords(formData){
    // console.log('soldlist',formData);
   return apiService.post(`https://iot.efillelectric.com/api/v1/franchisee-sold-list`,formData)
},
franchisee_invoice(formData){
    console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/franchisee-sell-record-details`,formData)
},
franchisee_order(formData){
    //  console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/customer/chargers`,formData)
},
charger_service(formData){
     console.log('cherger_service',formData);
   return apiService.post(`https://iot.efillelectric.com/api/charger/service`,formData)
},
charger_free_service(formData){
     console.log('charge_outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/service/options`,formData)
},
charger_paid_serive_list(){
    // console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/service-list-paid`)
},
charger_users_service_history(formData){
    // console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/user/service-history`,formData)
},
charger_user_docs(formData){
    // console.log('userlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/user-docs`,formData)
},
dealer_charger_warranty(formData){
     console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/product-warranty`,formData)
},
charger_user_soldrecords(formData){
    // console.log('userlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/user-sold-list`,formData)
},
charger_warrantypolicy(){
    // console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/warranty-terms`)
},

service_open(formData){
    console.log('outlist',formData);
   return apiService.post(`https://iot.efillelectric.com/api/v1/service-open-list`,formData)
},
franchisee_service(formData){
    // console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/franchisee-service/options`,formData)
},
charger_serive_otp(formData){
    console.log('sendootp',formData);
   return apiService.post(`https://iot.efillelectric.com/api/v1/service-send-otp`,formData)
},
charger_serive_otpverify(formData){
     console.log('outst',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/service-verify-otp`,formData)
},
charger_service_closeverify(formData){
//  console.log('ottp',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/service-close`,formData)
},
service_close(formData){
    // console.log('outlist',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/service-close-list`,formData)
},
loyaltypoints(formData){
    console.log('loyal',formData);
    return apiService.post(`https://mobility.efillelectric.com/api/v1/delar_loyalty_points`,formData)
},
loyaltyhistory(formData){
    // console.log('loyal',formData);
    return apiService.post(`https://mobility.efillelectric.com/api/v1/dealer_loyalty_history`,formData)
},
linkform(formData){
    // console.log('loyal',formData);
    return apiService.post(`https://iot.efillelectric.com/franchisee/share-service-request`,formData)
},
updateIc(formData){
    // console.log('loyal',formData);
    return apiService.post(`https://iot.efillelectric.com/franchisee/share-inc-request`,formData)
},
franchise_loyaltypoints(formData){
    // console.log('loyal',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/franchisee_loyalty_points`,formData)
},
franchise_loyaltyhistory(formData){
     console.log('loyal',formData);
    return apiService.post(`https://iot.efillelectric.com/api/v1/franchisee_loyalty_history`,formData)
},
};
