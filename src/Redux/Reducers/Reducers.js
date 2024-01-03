import * as type from '../Actions/ActionType';
import initialState from './initialState';

export default UserData = (state = initialState.userData, action) => {

    switch (action.type) {
        case type.DEVICE_TOKEN:
            return {
                ...state,
                device_token: action.device_token
        };
        case type.LOGIN_TOKEN:
            return {
                ...state,
                token: action.token
        };

        case type.USER_INFO:
            return {
                ...state,
                info: action.info
            };

        case type.CHARGING_STATIONS:
            return {
                ...state,
                charging_stations: action.charging_stations
            };

        case type.DISTANCE_INFO:
            return {
                ...state,
                distance: action.distance
            };
        
        case type.FILTER_INFO:
            return {
                ...state,
                filter: action.filter
            };  
            
        case type.CURRENT_LOCATION:
            return {
                ...state,
                current_location: action.current_location
            };  

        case type.REVIEWS:
            return {
                ...state,
                reviews_list: action.reviews_list
            };
        
        case type.VEHICLES:
            return {
                ...state,
                vehicles_list: action.vehicles_list
            };

        case type.CHARGING_STATION_INFO:
            return {
                ...state,
                charging_station_info: action.charging_station_info
            };

        case type.CHARGING_POINT_INFO:
            return {
                ...state,
                charging_point_info: action.charging_point_info
            };

        case type.BOOK_CHARGER_INFO:
            return {
                ...state,
                book_charger_info: action.book_charger_info
            };

        case type.BOOKING_INFO:
            return {
                ...state,
                booking_info: action.booking_info
            };

        case type.ORDER_ID:
            return {
                ...state,
                order_id: action.order_id
            }; 
        
        case type.ORDER_AMOUNT:
            return {
                ...state,
                order_amount: action.order_amount
            }; 
            
        case type.COUPON_STATUS:
            return {
                ...state,
                coupon_status: action.coupon_status
            };
        
        case type.COUPON_APPLIED:
            console.log('reducer',type.COUPON_APPLIED)
            return {
                ...state,
                coupon_applied: action.coupon_applied
            };                            
       
        case type.NOTIFICATION:
            return {
                ...state,
                notification: action.notification
            };

        case type.WISHLIST:
            return {
                ...state,
                wishlist: [action.wishlist]
            };
            case type.SUBSCRIBED:
                // console.log('action',action);
            return {
                ...state,
                subscribed: action.subscribed
            };
            case type.CHARGER_BUYERS:
                // console.log('action',action);
            return {
                ...state,
                buycharger: action.buycharger
            };
            case type.FRANCHISE:
                // console.log('action',action);
            return {
                ...state,
                franchisers: action.franchisers
            };
            case type.CHASSIS_NO:
                // console.log('action',action);
            return {
                ...state,
                Chessis_no: action.Chessis_no
            };
            case type.REMOVE:
                // console.log('remove',typeof(action));
            return {
                ...state,
                remove: action.remove
            };


        default:
            return state;
    }

}

