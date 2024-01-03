import React, { useContext } from 'react';
import { StatusBar, Platform, LogBox, BackHandler, Dimensions, Alert, Linking } from 'react-native';
//Library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import FlashMessage from "react-native-flash-message";
import * as Sentry from "@sentry/react-native";
import EncryptedStorage from 'react-native-encrypted-storage';
import { checkVersion } from "react-native-check-version";

import VersionCheck from 'react-native-version-check';
//Utils
import { strings, TranslationContext } from './src/utils/translations';
import { AuthContext } from "./src/utils/authContext";
import AsyncStorage from "./src/utils/AsyncStorage";
//API
import HttpRequest from './src/utils/HTTPRequest';
//Component
import DrawerContent from "./src/components/DrawerContent";
import HandleNotifications from "./src/components/HandleNotifications";
//Redux
import { connect } from 'react-redux';
import { userInfo, loginToken } from './src/Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
//Context
import { NetworkProvider, NetworkContext } from './src/utils/NetworkProvider';
//App Loading Screen
import Splash from "./src/screens/splash/";
import Maintenance from "./src/screens/maintenance/";

//Non Authenticated User Screens
import OnBoarding from "./src/screens/splash/onBoarding/";
import Auth from "./src/screens/auth/";
import CreateAccount from "./src/screens/auth/signUp/";
import SignIn from "./src/screens/auth/signIn/";
import GuestUserSignIn from "./src/screens/auth/signIn/guestUser";
import SelfUser from "./src/screens/auth/signUp/selfUser/";
import CorporateUser from "./src/screens/auth/signUp/corporateUser/";
import GuestUser from "./src/screens/auth/signUp/guestUser/";
import ForgetPassword from "./src/screens/auth/forgetPassword/";
import OtpVerification from "./src/screens/auth/otpVerify/";
import ResetPassword from "./src/screens/auth/forgetPassword/resetPassword/";
import Success from "./src/screens/auth/forgetPassword/resetPassword/success/";

//Authenticated User Screens
import Home from "./src/screens/home/";
import Filter from "./src/components/FilterContent/";
import CouponPage from "./src/components/Couponpage/";
import Notifications from "./src/screens/notifications/";
import ChargingStations from "./src/screens/stationsList/";
import FavouriteChargingStations from "./src/screens/favouriteStationList/";
import MyProfile from "./src/screens/myProfile/";
import ChargingStationDetails from "./src/screens/chargingStation/";
import ChargingTransaction from "./src/screens/chargingTransaction";
import AddReviews from "./src/screens/addReviews/";
import Cart from "./src/screens/addtocart/"
import quickCharge from "./src/screens/quickCharge/";

import Faq from "./src/screens/faq/";
import Preferences from "./src/screens/preferences/";
import StationVisibility from "./src/screens/preferences/stationVisibility/";
import Buyers from "./src/screens/preferences/buyers/";
import Franchise from "./src/screens/preferences/franchise/";
import NotificationSetting from "./src/screens/preferences/notificationSetting/";
import LanguageSetting from "./src/screens/preferences/languageSetting/";
import Coupons from "./src/screens/coupons/";
import LegalDocument from "./src/screens/legalDocument/";
import LegalDocumentDetails from "./src/screens/legalDocument/details/";
import OrderHistory from "./src/screens/orderHistory/";
import Invoice from "./src/screens/orderHistory/invoice";
import ChargingHistory from "./src/screens/chargingHistory/";
import ChargingHistoryDetails from "./src/screens/chargingHistoryDetails/";
// import BookSchedule from "./src/screens/bookSchedule/";
import PaymentGateway from "./src/screens/paymentGateway/";
import Wallet from "./src/screens/Wallet/";
import walletHistory from "./src/screens/walletHistory/";
import ChargingLog from "./src/screens/chargingLog/new.js";
import ChargingFeedback from "./src/screens/chargingFeedback/";
import ContactUs from "./src/screens/ContactUs/";
import scanner from "./src/screens/scanner/";
import rfidCard from "./src/screens/rfidCard/";
import rfidCardView from "./src/screens/rfidCardView/";
import success from "./src/screens/rfidCardView/Success/";
import book from "./src/screens/booking/";
import Error from "./src/components/Error/";
import PointsHistory from "./src/screens/loyaltypoints/"

//dealer
import ChargerList from "./src/screens/dmc/chargerlist/";
import dealerOrder from "./src/screens/dmc/orderhistory/";
import Service from "./src/screens/dmc/servicerecords/";
import Producthistory from "./src/screens/dmc/producthistory/";
import Stock from "./src/screens/dmc/stock/";
import Soldform from "./src/screens/dmc/invoice/"
import Warranty from "./src/screens/dmc/warranty/"
import Claims from "./src/screens/dmc/warranty/claimitems/"
import WarrantyPolicy from "./src/screens/dmc/warranty/warrantypolicy/"
import Dealers from "./src/screens/dmc/";
import detailsOrder from "./src/screens/dmc/orderhistory/orderdetails/";
import Soldrecords from "./src/screens/dmc/producthistory/soldrecords/";
import Serviceform from "./src/screens/dmc/servicerecords/serviceform/";
import openservices from "./src/screens/dmc/servicerecords/openservices/";
import closeservices from "./src/screens/dmc/servicerecords/closeservices/";
import Serviceinvoice from "./src/screens/dmc/servicerecords/serviceinvoice/";
import otpcancel from "./src/screens/dmc/servicerecords/cancleservice/";
import serviceotp from "./src/screens/dmc/servicerecords/otpverify/";
import WarrantyClaims from "./src/screens/dmc/warrantyclaims/";
import openwarranty from "./src/screens/dmc/warrantyclaims/openwarranty/";
import closewarranty from "./src/screens/dmc/warrantyclaims/closewarranty/";
import warrantyform from "./src/screens/dmc/warrantyclaims/warrantyform/";
import Warrantyques from "./src/screens/dmc/warrantyclaims/warrantyques/";
import Updatedata from "./src/screens/dmc/modifydata/";
import Payment from "./src/screens/dmc/paymentproof/";
import VehilceDocument from "./src/screens/dmc/uploadDocuments/";

//franchise
import Frann from "./src/screens/franchisee/";
import Product from "./src/screens/franchisee/chargerlist/";
import Checkout from "./src/screens/franchisee/checkout/";
import franchiseeOrder from "./src/screens/franchisee/orderhistory/";
import fdetailsOrder from "./src/screens/franchisee/orderhistory/orderdetails/";
import franchiseeStock from "./src/screens/franchisee/stock/";
import fProducthistory from "./src/screens/franchisee/producthistory/";
import fSoldrecords from "./src/screens/franchisee/producthistory/soldrecords/";
import FService from "./src/screens/franchisee/servicerecords/";
import fopenservices from "./src/screens/franchisee/servicerecords/openservices/";
import fServiceinvoice from "./src/screens/franchisee/servicerecords/serviceinvoice/";
import fotpcancel from "./src/screens/franchisee/servicerecords/cancleservice/";
import fcloseservices from "./src/screens/franchisee/servicerecords/closeservices/";
import FranWarrantyPolicy from "./src/screens/franchisee/warranty/";
import FranWarrantyClaims from"./src/screens/franchisee/warrantyclaims/claimitems/";
import FranLoyality from"./src/screens/franchisee/loyalityhistory/";

//user
import Users from "./src/screens/user/";
import Services from "./src/screens/user/service/";
import UserOrders from "./src/screens/user/orderhistory/";
import serviceHistory from "./src/screens/user/service/history/";
import Primitive from "./src/screens/user/service/premetive/";
import breakdown from "./src/screens/user/service/breakdown/";
import freeservice from "./src/screens/user/service/freeservice/";
import paidservice from "./src/screens/user/service/paidservices/";
import UserWarranty from "./src/screens/user/warranty/";
import UserClaims from "./src/screens/user/warranty/claimitems/";
import Document from "./src/screens/user/documents/";
import ChargingError from "./src/screens/chargingLog/Success/";
import UserWarrantyPolicy from "./src/screens/user/warranty/warrantypolicy/";




const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      headerMode="none"
      name="OnBoarding"
      component={OnBoarding}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      headerMode="none"
      name="Auth"
      component={Auth}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="GuestUserSignIn"
      component={GuestUserSignIn}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SelfUser"
      component={SelfUser}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="GuestUser"
      component={GuestUser}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="CorporateUser"
      component={CorporateUser}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      headerMode="none"
      name="ForgetPassword"
      component={ForgetPassword}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      headerMode="none"
      name="OtpVerification"
      component={OtpVerification}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      headerMode="none"
      name="ResetPassword"
      component={ResetPassword}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      headerMode="none"
      name="Success"
      component={Success}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="LegalDocumentDetails"
      component={LegalDocumentDetails}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      headerMode="none"
      name="Home"
      component={TabsScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Filter"
      component={Filter}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name="Couponpage"
      component={CouponPage}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name="Coupons"
      component={Coupons}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Notifications"
      component={Notifications}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingStations"
      component={ChargingStations}
      options={{ headerShown: false }}
    />


    <HomeStack.Screen
      headerMode="none"
      name="FavouriteChargingStations"
      component={FavouriteChargingStations}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="MyProfile"
      component={MyProfile}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Error"
      component={Error}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingError"
      component={ChargingError}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingStationDetails"
      component={ChargingStationDetails}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingTransaction"
      component={ChargingTransaction}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="AddReviews"
      component={AddReviews}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="quickCharge"
      component={quickCharge}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      headerMode="none"
      name="ChargingFeedback"
      component={ChargingFeedback}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Faq"
      component={Faq}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Preferences"
      component={Preferences}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="StationVisibility"
      component={StationVisibility}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Buyers"
      component={Buyers}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="NotificationSetting"
      component={NotificationSetting}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="LanguageSetting"
      component={LanguageSetting}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="LegalDocument"
      component={LegalDocument}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="LegalDocumentDetails"
      component={LegalDocumentDetails}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="rfidCardView"
      component={rfidCardView}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingHistory"
      component={ChargingHistory}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="OrderHistory"
      component={OrderHistory}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Invoice"
      component={Invoice}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingHistoryDetails"
      component={ChargingHistoryDetails}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="PaymentGateway"
      component={PaymentGateway}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ChargingLog"
      component={ChargingLog}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Success"
      component={Success}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="success"
      component={success}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Wallet"
      component={Wallet}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="walletHistory"
      component={walletHistory}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="ContactUs"
      component={ContactUs}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="scanner"
      component={scanner}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="rfidCard"
      component={rfidCard}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      headerMode="none"
      name="booking"
      component={book}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name="frachiseeorder"
      component={franchiseeOrder}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='f_detailsOrder'
      component={fdetailsOrder}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="FranWarrantyClaims"
      component={FranWarrantyClaims}
      options={{ headerShown: false }}
    />
    
    <HomeStack.Screen
      headerMode="none"
      name="ChargerList"
      component={ChargerList}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Dealers"
      component={Dealers}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Cart"
      component={Cart}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      headerMode="none"
      name="Franchise"
      component={Franchise}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Frann"
      component={Frann}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Product"
      component={Product}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Checkout"
      component={Checkout}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="dealerOrder"
      component={dealerOrder}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="Stock"
      component={Stock}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='franchiseeStock'
      component={franchiseeStock}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Service'
      component={Service}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='FService'
      component={FService}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Producthistory'
      component={Producthistory}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Soldform'
      component={Soldform}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Soldrecords'
      component={Soldrecords}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name='fSoldrecords'
      component={fSoldrecords}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Users'
      component={Users}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Warranty'
      component={Warranty}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Claims'
      component={Claims}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='detailsOrder'
      component={detailsOrder}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='WarrantyPolicy'
      component={WarrantyPolicy}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Serviceform'
      component={Serviceform}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='serviceotp'
      component={serviceotp}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='openservices'
      component={openservices}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='fopenservices'
      component={fopenservices}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name='FranLoyality'
      component={FranLoyality}
      options={{ headerShown: false }}
    />
    
    <HomeStack.Screen
      headerMode="none"
      name='closeservices'
      component={closeservices}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name='fcloseservices'
      component={fcloseservices}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Serviceinvoice'
      component={Serviceinvoice}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name='fServiceinvoice'
      component={fServiceinvoice}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='otpcancel'
      component={otpcancel}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name='fotpcancel'
      component={fotpcancel}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='WarrantyClaims'
      component={WarrantyClaims}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='openwarranty'
      component={openwarranty}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='warrantyform'
      component={warrantyform}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='closewarranty'
      component={closewarranty}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='UserOrders'
      component={UserOrders}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Services'
      component={Services}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='serviceHistory'
      component={serviceHistory}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Primitive'
      component={Primitive}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='breakdown'
      component={breakdown}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='FranPolicy'
      component={FranWarrantyPolicy}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name="UserWarrantyPolicy"
      component={UserWarrantyPolicy}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='freeservice'
      component={freeservice}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='paidservice'
      component={paidservice}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='UserWarranty'
      component={UserWarranty}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='UserClaims'
      component={UserClaims}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Warrantyques'
      component={Warrantyques}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      headerMode="none"
      name='Document'
      component={Document}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Updatedata'
      component={Updatedata}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='Payemnt'
      component={Payment}
      options={{ headerShown: false }}
    />
     <HomeStack.Screen
      headerMode="none"
      name='fProducthistory'
      component={fProducthistory}
      options={{ headerShown: false }}
    />
      <HomeStack.Screen
      headerMode="none"
      name='LoyaltyHistory'
      component={PointsHistory}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      headerMode="none"
      name='UploadDocument'
      component={VehilceDocument}
      options={{ headerShown: false }}
    />

  </HomeStack.Navigator>
);

const Teletabs = createMaterialBottomTabNavigator();
const TeleScreens = (props) => (
  <Teletabs.Navigator
    initialRouteName="telematrix"
    activeColor="#fff"
    inactiveColor="#ffff"
    barStyle={{ backgroundColor: '#05294b' }}
  // shifting={true}
  >
    <Teletabs.Screen
      name="telematrix"
      component={TeleHome}
      options={{
        tabBarLabel: "Live Battery",
        tabBarColor: '#05294b',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={20} />
        )
      }}
    />
    <Teletabs.Screen
      name="battery"
      component={Battery}
      options={{
        tabBarLabel: 'Battery',
        tabBarColor: '#6418f4',
        tabBarIcon: ({ color }) => (
          <Icon name="scan" color={color} size={20} />
        ),
      }}
    />

  </Teletabs.Navigator>
);


const Tabs = createMaterialBottomTabNavigator();
const TabsScreen = (props) => (
  <Tabs.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    inactiveColor="#ffff"
    barStyle={{ backgroundColor: '#05294b' }}
  // shifting={true}
  >
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: strings.home.title,
        tabBarColor: '#05294b',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={20} />
        )
      }}
    />
    <Tabs.Screen
      name="Quick Charge"
      component={quickCharge}
      options={{
        tabBarLabel: strings.quickCharge.title,
        tabBarColor: '#6418f4',
        tabBarIcon: ({ color }) => (
          <Icon name="scan" color={color} size={20} />
        ),
      }}
    />


    <Tabs.Screen
      name="MyProfile"
      component={MyProfile}
      options={{
        tabBarLabel: strings.profile.title,
        tabBarColor: '#d0275f',
        tabBarIcon: ({ color }) => (
          <Icon name="person-outline" color={color} size={20} />

        ),
        tabBarVisible: false
      }}
    />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <DrawerContent {...props} />}
    drawerPosition="left"
    drawerType='back'
    drawerStyle={{ width: Dimensions.get('window').width * 0.80 }}
  >

    <Drawer.Screen name="Home" component={HomeStackScreen} options={{ unmountOnBlur: true }} />
  </Drawer.Navigator>

);

const RootStack = createStackNavigator();
const RootStackScreen = ({ user }) => (

  <RootStack.Navigator headerMode="none">
    {user ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);


const App = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUnderMaintenance, setUnderMaintenance] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const { isConnected } = useContext(NetworkContext);

  React.useEffect(() => {
    strings.setLanguage('en-US');
    //        Sentry.init({
    //          dsn: "https://2ad143dc0d9a4c8993840e2b1c8be1e9@o1044491.ingest.sentry.io/6019551",
    //        });
    appMaintenanceCheck();

    //        LogBox.ignoreLogs(['Warning: ...']);
    //        LogBox.ignoreAllLogs();
  }, []);

  //Status bar
  if (Platform.OS == 'android') {
    StatusBar.setBackgroundColor("rgba(0,0,0,0)")
    StatusBar.setBarStyle("light-content")
    StatusBar.setTranslucent(true)
  }

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUser(true);
        // console.log("user", setUser);
      },
      signUp: () => {
        setIsLoading(false);
        setUser(false);
      },
      signOut: () => {
        AsyncStorage.setLoginToken('');
        props.loginToken('');
        AsyncStorage.setUserInfo(null).then(() => {
          setIsLoading(false);
          setUser(false);
        });
      },
    };
  }, []);

  appMaintenanceCheck = () => {
    if (isConnected) {
      HttpRequest.checkMaintenance()
        .then((res) => {
          const result = res.data;
          if (res.status == 200 && result.error == "false") {
            if (result.status == "1") {
              setIsLoading(!isLoading);
              setUnderMaintenance(true);

            } else {
              //Check for App Version Update
              checkUpdateNeeded();
            }
          } else {
            console.log("Check Maintenance API Error : ", result);
          }
        })
        .catch(err => {
          console.log("Check Maintenance API Catch Exception: ", err);
        })
    } else {
      Alert.alert(
        'Internet Connection!',
        'Make sure you are connected to the internet',
        [
          {
            text: 'Ok', onPress: () => {
              Linking.openSettings();
            }
          }
        ]
      );
    }
  }

  const checkUpdateNeeded = async () => {
    // console.log('platform',Platform.OS);
    // if (Platform.OS == 'android') {
    //   var operatins_system=Platform.OS
    // }
     console.log('berr',Platform.OS);
      HttpRequest.getVersion({ version: 4.1, Platform:Platform.OS })
        .then((res) => {
          const result = res.data;
           console.log('cersiondd',result);
          if (res.status == 200 && result.error == true) {
            Alert.alert(
              'Please Update',
              'You will have to update your app to latest version to continue using.',
              [
                {
                  text: 'Update',
                  onPress: () => {
                    BackHandler.exitApp();
                    Linking.openURL(result.url);
                  }
                }
              ]
            )
          }
          else {

            //Check if Logged in user details exists in AsyncStorage
            props.userInfo('');
            props.loginToken('');
            try {
            
              EncryptedStorage.getItem("user_session").then((value) => {
                if (value != undefined) {
                  if (JSON.parse(value).token) {
                    //                    console.log("value",value);
                    //                    console.log("taken",JSON.parse(value).token);
                    //                    console.log("id",JSON.parse(value).info.id);

                    if (JSON.parse(value).info.id != 38) {
                      HttpRequest.checkUser(JSON.parse(value).token).then((res) => {
                        setIsLoading(!isLoading);
                        const result = res.data;
                        if (res.status == 200 && result.error == false) {

                           props.userInfo(JSON.parse(value).info);
                          //  console.log('bdvd', props.userInfo(JSON.parse(value).info))
                          setUser(true);
                        }
                        else {
                          setIsLoading(false);
                          setUser(false);

                        }
                      }

                      );

                    } else {
                      setUser(false);
                    }
                  } else {
                    setIsLoading(false);
                    setUser(false);
                  }
                } else {
                  setIsLoading(false);
                  setUser(false);
                }
              });
            } catch (error) {
              // There was an error on the native side
              setIsLoading(false);
              setUser(false);
            }

          }
        }
        )
        .catch(err => {
          console.log("Check Maintenance API Catch Exception: ", err);
        })

    }
    //   checkUpdateNeeded = async () => {
    //     try {
    //       const version = await checkVersion();
    //       //npm i react-native-check-version
    //       VersionCheck.getLatestVersion()
    //   .then(latestVersion => {
    //     console.log("latest",latestVersion);    // 0.1.2
    //   });
    //   VersionCheck.getLatestVersion({
    //     provider: 'playStore'  // for Android
    //   })
    //   .then(latestVersion => {
    //     console.log(latestVersion);    // 0.1.2
    //   });

    // console.log('version',version);
    // console.log('needUpdate',version.needsUpdate);
    //       if (version.needsUpdate) {
    //         //Alert the user and direct to the app url
    //         Alert.alert(
    //           'Please Update',
    //           'You will have to update your app to latest version to continue using.',
    //           [
    //             {
    //               text: 'Update',
    //               onPress: () => {
    //                 BackHandler.exitApp();
    //                 Linking.openURL(version.url);
    //               }
    //             }
    //           ]
    //         )
    //       } else {
    //         //Check if Logged in user details exists in AsyncStorage
    //         props.userInfo('');
    //         props.loginToken('');
    //         try {
    //           EncryptedStorage.getItem("user_session").then((value) => {
    //             if (value != undefined) {
    //               if (JSON.parse(value).token) {
    //                 //                    console.log("value",value);
    //                 //                    console.log("taken",JSON.parse(value).token);
    //                 //                    console.log("id",JSON.parse(value).info.id);

    //                 if (JSON.parse(value).info.id != 38) {
    //                   HttpRequest.checkUser(JSON.parse(value).token).then((res) => {
    //                     setIsLoading(!isLoading);
    //                     const result = res.data;
    //                     if (res.status == 200 && result.error == false) {

    //                       props.userInfo(JSON.parse(value).info);
    //                       setUser(true);
    //                     }
    //                     else {
    //                       setIsLoading(false);
    //                       setUser(false);

    //                     }
    //                   }

    //                   );

    //                 } else {
    //                   setUser(false);
    //                 }
    //               } else {
    //                 setIsLoading(false);
    //                 setUser(false);
    //               }
    //             } else {
    //               setIsLoading(false);
    //               setUser(false);
    //             }
    //           });
    //         } catch (error) {
    //           // There was an error on the native side
    //           setIsLoading(false);
    //           setUser(false);
    //         }
    //       }
    //     } catch (error) {
    //       setIsLoading(false);
    //       setUser(false);
    //     }
    //   }

    return (
      <NetworkProvider>
        <AuthContext.Provider value={authContext}>
          <StatusBar translucent barStyle="light-content" />
          <TranslationContext.Provider value={strings}>
            <NavigationContainer theme={{ colors: { background: '#05294b' } }}>
              {isLoading ? (<Splash />) : isUnderMaintenance ? (<Maintenance />) :
                <RootStackScreen user={user} />
              }
            </NavigationContainer>
          </TranslationContext.Provider>
          {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
          <HandleNotifications  />
          <FlashMessage position="top" style={{ height: 120, justifyContent: 'center', zIndex: 99999, width: '100%', position: 'absolute' }} />
        </AuthContext.Provider>
      </NetworkProvider>
    );
  };

  const mapStateToProps = state => {
    return {
      info: state,
      token: state.token,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      userInfo: bindActionCreators(userInfo, dispatch),
      loginToken: bindActionCreators(loginToken, dispatch)
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App);