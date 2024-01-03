

import { 
    REMOVE,CHASSIS_NO,FRANCHISE,CHARGER_BUYERS, SUBSCRIBED, DEVICE_TOKEN, LOGIN_TOKEN, USER_INFO, CHARGING_STATIONS, DISTANCE_INFO, FILTER_INFO, CURRENT_LOCATION, REVIEWS, VEHICLES, CHARGING_STATION_INFO, CHARGING_POINT_INFO, BOOK_CHARGER_INFO, BOOKING_INFO, ORDER_ID, ORDER_AMOUNT, COUPON_STATUS, COUPON_APPLIED, NOTIFICATION, WISHLIST
} from './ActionType';


export const deviceToken = (data) => {
    //  console.log("show device token", data);
    return {
        type: DEVICE_TOKEN,
        device_token: data
    }
}
export const loginToken = (data) => {
    // console.log("show login token", data);
    return {
        type: LOGIN_TOKEN,
        token: data
    }
}
export const userInfo = (data) => {
    // console.log("show user info", data);
    return {
        type: USER_INFO,
        info: data
    }
}
export const chargingStation = (data) => {
    // console.log("show charging station list", data);
    return {
        type: CHARGING_STATIONS,
        charging_stations: data
    }
}
export const distanceInfo = (data) => {
    // console.log("show distance info", data);
    return {
        type: DISTANCE_INFO,
        distance: data
    }
}
export const filterInfo = (data) => {
    // console.log("show filter info", data);
    return {
        type: FILTER_INFO,
        filter: data
    }
}
export const currentLocation = (data) => {
    // console.log("show current location info", data);
    return {
        type: CURRENT_LOCATION,
        current_location: data
    }
}
export const reviewsList = (data) => {
    // console.log("show charging station reviews", data);
    return {
        type: REVIEWS,
        reviews_list: data
    }
}
export const vehiclesList = (data) => {
    // console.log("show user vehicles", data);
    return {
        type: VEHICLES,
        vehicles_list: data
    }
}
export const chargingStationInfo = (data) => {
    // console.log("show charging station info", data);
    return {
        type: CHARGING_STATION_INFO,
        charging_station_info: data
    }
}
export const chargingPointInfo = (data) => {
    // console.log("show charging point info", data);
    return {
        type: CHARGING_POINT_INFO,
        charging_point_info: data
    }
}
export const bookChargerInfo = (data) => {
    // console.log("show book charger info", data);
    return {
        type: BOOK_CHARGER_INFO,
        book_charger_info: data
    }
}
export const bookingInfo = (data) => {
    // console.log("show booking info", data);
    return {
        type: BOOKING_INFO,
        booking_info: data
    }
}
export const orderID = (data) => {
    // console.log("show order ID", data);
    return {
        type: ORDER_ID,
        order_id: data
    }
}
export const orderAmount = (data) => {
    // console.log("show order amount", data);
    return {
        type: ORDER_AMOUNT,
        order_amount: data
    }
}
export const couponStatus = (data) => {
    // console.log("show coupon status info", data);
    return {
        type: COUPON_STATUS,
        coupon_status: data
    }
}
export const couponApplied = (data) => {
    console.log("show applied coupon info", data);
    return {
        type: COUPON_APPLIED,
        coupon_applied: data
    }
}
export const notification = (data) => {
   // console.log("show notification", data);
    return {
        type: NOTIFICATION,
        notification: data
    }
}
export const allWishlist = (data) => {
    return {
        type: WISHLIST,
        wishlist: data
    }
}
export const subscribed = (data) => {
    // console.log("show subscribed", data);
    return {
        type: SUBSCRIBED,
        subscribed: data
    }
}
export const buycharger = (data) => {
    console.log("show subscribed", data);
    return {
        type: CHARGER_BUYERS,
        buycharger: data
    }
}
export const franchisers = (data) => {
    // console.log("show subscribed", data);
    return {
        type:FRANCHISE,
        franchisers: data
    }
}
export const Chessis_no = (data) => {
    // console.log("show subscribed", data);
    return {
        type:CHASSIS_NO,
        Chessis_no: data
    }
    
}
export const remove = (data) => {
     console.log("remove", data);
    return {
        type:REMOVE,
        remove: data
    }
    
}
