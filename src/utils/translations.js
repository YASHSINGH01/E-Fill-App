import React from 'react';
import LocalizedStrings from 'react-native-localization';

export const strings = new LocalizedStrings({
  'en-US': {
    "splash1": {
        "title": "Locate a\nCharging Point",
        "description": "Find an EV Charger at your frequented destination - Cafes, malls, tech parks and restaurants."
    },
    "splash2": {
        "title": "Scan the\nCode",
        "description": "Scan the QR code and select the amount to start charging."
    },
    "splash3": {
        "title": "Begin\nCharging",
        "description": "Check your session status and stop charging through app remotely."
    },
    "terms": {
        "initial": "By signing up, you agree to E-Fill ",
        "termsConditions": "Terms of Service ",
        "concent": "and consent to our ",
        "privacyPolicy": "Privacy policy",
        "end": "."
    },
    "welcome": {
        "signIn": "Sign in",
        "createAccount": "Create account",
        "recoverPassword": "Recover Password"
    },
    "User": {
      "title": "User ",
     
  },
    "signIn": {
        "title": "Sign in",
        "phoneNumber": "Phone Number",
        "phonePlaceholder": "Please enter your phone number",
        "password": "Password",
        "emptyError": "Should not be empty.",
        "passwordLength": "The password must be at least 6 characters.",
        "recoverPassword": "Recover Password",
        "guestUser": "Guest User",
        "successTitle": "Success!",
        "successMessage": "You have successfully signed in.",
        "skipLogin": "Skip Login",
        "response": {
            "success": {
                "title": "Success!",
                "message": "You have successfully signed in."
            },
            "error": {
                "title": "Error!",
                "message": "Oops! Something Went Wrong!",
                "unAuthorized" : "Invalid Credentials!"
            }
        }
    },
    'chargerfault':{
      "title": "Charging Error",
    },

    "guestUser": {
        "title": "Guest User SignIn",
        "phoneNumber": "Phone Number",
        "phonePlaceholder": "Please enter your phone number",
        "signIn": "Sign in",
    },
    "auth": {
        "selfUser": "Self User",
        "corporateUser": "Corporate User",
        "guestUser": "Guest User"
    },
    "selfUser": {
        "title": "Self User",
        "name": "Name",
        "namePlaceholder": "Enter your name",
        "phoneNumber": "Phone Number",
        "phonePlaceholder": "Please enter your phone number",
        "email":"Email ID",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "registerButton": "Sign up",
        "iAccept": "I Accept T&C and Privacy Policy",
    },
    "corporateUser": {
        "title": "Corporate User",
        "name": "Customer Name",
        "namePlaceholder": "Enter your name",
        "phoneNumber": "Customer Phone Number",
        "phonePlaceholder": "Please enter your phone number",
        "corporateCode": "Corporate Code",
        "corporateUser": "Corporate User",
        "corporateCodePlaceholder": "Enter your corporate code",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "vehicleDetails": "Vehicle Details",
        "twoWheeler": "2w",
        "threeWheeler": "3w",
        "lmv": "LMV",
        "hmv": "HMV",
        "registrationNumber": "Registration Number",
        "registrationNumberPlaceholder": "Enter registration number HR XX XX XXXX",
        "vinNumber": "VIN Number",
        "vinNumberPlaceholder": "Enter VIN number",
        "selectManufacturer": "Select Manufacturer",
        "selectModel": "Select Model",
        "iAccept": "I Accept T&C and Privacy Policy",
        "registerButton": "Sign up"
    },
    "guestSignupUser": {
        "title": "Guest User",
        "name": "Name",
        "namePlaceholder": "Enter your name",
        "phoneNumber": "Phone Number",
        "phonePlaceholder": "Please enter your phone number",
        "iAccept": "I Accept T&C and Privacy Policy",
        "registerButton": "Sign up"
    },
    
    "forgetPassword": {
        "title": "Forget Password",
        "forgetPassword": "Forget Password ?",
        "phoneNumber": "Phone Number",
        "phonePlaceholder": "Please enter your phone number",
        "sendOTP": "Send OTP",
        "response": {
          "error": {
            "title": "Error !",
            "message": "Phone number does not exist",
          }
        }
    },
    "enterOtp": {
        "title": "Enter OTP",
        "otpSentMessage": "Please enter 6 digit OTP code sent to your registered mobile number",
        "customer_otp":"OTP has been sent on",
        "get":"Please get it from the Customer",
        "verifyOTP": "Verify OTP",
        "notReceivedCode": "Not Received Code ?",
        "resendIn": "Resend OTP in",
        "resend": "Resend",
        "response": {
          "success": {
            "title": "Success!",
            "message": "Well done! OTP Sent.",
            "resend": {
              "message": "OTP Sent Again."
            },
            "verified": {
              "message": "Well done! OTP Verified"
            }
          },
          "error": {
            "title": "Error !",
            "message": "Oops! We are unable to send you the OTP at the moment. Please try again later.",
            "verified": {
              "message": "Incorrect OTP. Please try again with correct OTP."
            }
          }
        }
    },

    
    "newPassword": {
        "title": "New Password",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "passwordChange": "Change Password",
        "passwordSuccessMessage": "Password Changed Successfully",
        "goBack": "Go Back",
        "response": {
          "success": {
            "title": "Success!",
            "message": "Password Updated Successfully."
          },
          "error": {
            "title": "Error !",
            "message": "Unable to update your password."
          }
        }
    },
    "home": {
        "title": "Home",
        "search": "Search....",
        "notConnected": "Not Connected",
        "available": "Available",
        "deActivated": "Unavailable",
        "currentlyBusy": "Currently Busy",
        "online": "Online",
        "busy": "Busy",
        "unavailable": "Unavailable",
        "navigate": "View Detail"
    },
    "notification": {
        "title": "Notifications",
        "noNotification": "No New Notifications Found",
        "clearAll": "Clear All"
    },
    "filter": {
        "title": "Filter Charging Stations",
        "searchNamePlaceholder": "Search by Name",
        "searchLocationPlaceholder": "Search by Location",
        "nearMe": "Near me",	
        "distance": "Distance",	
        "km": "Km",
        "byVehicle": "By Vehicle",
        "byConnector": " Select Connector Type",
        "rating": "Rating",
        "applyFilter": "Apply Filter"
    },
    "drawer": {
        "chargingStations": "Charging Stations",
        "chargingHistory": "Schedule History",
        "quickCharge": "Quick Charge",
        "legalDocuments": "Legal Documents",
        "faq": "FAQs",
        "preferences": "Preferences",
        "logout": "Logout"
    },
    "profile": {
        "title": "My Profile",
        "anonymous": "Anonymous User",
        "name": "Name",
        "namePlaceholder": "Enter your name",
        "selectDate": "Select Date of birth",
        "addressPlaceholder": "Enter your address",
        "changeMobile": "Change Mobile Number",
        "phoneNumber": "Phone Number",
        "phonePlaceholder": "Enter your phone number",
        "viewProfile": "View Profile",
        "resetPassword": "Change Password",
        "vehicleDetails": "Vehicle Details",
        "assignedCPO": "Assigned CPO(s)- EFILL",
        "updateButton": "Update",
        "changeButton": "Change",
        "existingPassword": "Existing Password",
        "newPassword": "New Password",
        "confirmPassword": "Confirm Password",
        "changePassword": "Change Password",
        "manufacturer": "Manufacturer:",
        "model": "Model:",
        "addVehicle": "Add Vehicle Details",
        "addVehicleTitle": "Add Vehicle",
        "twoWheeler": "2w",
        "threeWheeler": "3w",
        "lmv": "LMV",
        "hmv": "HMV",
        "type": "Type:",
        "registrationNumber": "Registration Number",
        "registrationNumberPlaceholder": "Enter registration number",
        "vinNumber": "VIN Number",
        "vinNumberPlaceholder": "Enter VIN number",
        "vin_number": "VIN Number:",
        "selectManufacturer": "Select Manufacturer",
        "selectModel": "Select Model",
        "submitButton": "Submit",
        "response": {
          "error": {
            "title": "Error!",
            "message": "Oops! Something Went Wrong!",
            "emptyError": "Should not be empty.",
            "errorManufacturer": "Please select a vehicle manufacturer",
            "errorModel": "Please select a vehicle model",
            "errorSelect": "Please select a vehicle manufacturer & vehicle model",
            "noVehicle": "No vehicle added yet.",
            "invalidRegistrationNumberError": "Special character are not allowed.",
            "invalidOrdPassword": "Incorrect Old Password. Please try again with correct password."
          },
          "success": {
              "title": "Success!"
          },
        }

    },
     "contactus": {
            "title": "Contact Us",
             "namehead":"Name : ",
            "name":"Mr. Raghuvir Singh",
            "phoneno": "Phone No. : ",
            "contactno":"+91 7834887076",
            "email": "Email ID : ",
            "emailid":"raghuvir@efill.co.in",
            "query":"For any Query and Support ,Please, Contact us on the following given details. "
        },
    "thirdPartyChargingStation": {
      "title": "Third Party Charging Stations",
      "viewDetails": "View Details",
      "favouriteChargingStation": "Favourite Stations",
      "powerRating": "Power Rating (KWH)",
      "availableConnector": "connector available",
      "noRating": "No rating yet",
      "ratings": "rating",
      "response": {
        "success": {
          "title": "Success!"
        },
        "error": {
          "title": "Error!",
          "message": "No Charging Station Found",
        }
      }
    },
    "chargingStation": {
        "title": "Charging Stations",
        "station": "Station Details",
        "bookCharger": "Book Charger",
        "favouriteChargingStation": "Favourite Stations",
        "noRating": "No rating yet",
        "ratings": "rating",
        "response": {
          "success": {
            "title": "Success!"
          },
          "error": {
            "title": "Error!",
            "message": "No Charging Station Found",
          }
        }
    },
    "chargingStationDetails": {
      "title": "Charging Station Detail",
      "overview": "OVERVIEW",
      "review": "REVIEW",
      "noReview": "No Review yet.",
      "bookCharger": "Book Charger",
      "slot": "slot",
      "call": "Call",
      "navigate": "Navigate",
      "photos": "Photos",
      "online": "Online",
      "quickCharge": "Quick Charge",
      "availablePoints": "Connector",
      "noPointAvailable": "No connector available.",
      "basicDetails": "Basic Details",
      "chargingPrice": "Charging Price:",
      'Capacity':"Capacity:",
      "facilities": "Facilities",
      "services": "Services",
      "parking": "Parking",
      "coffee": "Cafe",
      "washroom": "Washroom",
      "shops": "Shops",
      "type": "Type",
      "charges": "Charges may apply.",
      "chargesNotApplicable": "Charges May Not Be Applicable.",
      "public": "Public",
      "checkIn": "Book Now",
      "existingReviews": "Existing Reviews",
      "addReview": "Add your Review",
     
      "reviews": {
          "title": "Add Your Reviews",
          "chargingStation": "Charging Station",
          "rating": "Rating",
          "review": "Review",
          "reviewPlaceholder": "Write your Review",
          "submitReview": "Submit Review",
          "notFound": "No Reviews Found",
          "response":{
            "success": {
              "title": "Success!",
              "message": "Review submitted successfully. It will be updated shorty."
            },
            "error": {
              "title": "Error!",
              "message": "Oops! Something Went Wrong!",
              "submitError": "Oops! we are unable to submit review. Please try again later.",
              "emptyError": "Should not be empty.",
              "zeroRating": "Rating can't be 0."
            }
          }
      },
      "response": {
          "error": {
              "notFound": "No such charging stations found."
          },
          "success": {
          }
        },
    },

  "Wallet1": {

            "notice": "*NOTE: Scheduled order will automatically be cancelled after 15 mins of scheduled time in case of no show.",

            "warning": "Oops!",

            "minAmount": "Please select all the details",
            },
    "bookCharger": {
    "now":"Now",
        "title": "Book Charger",
        "unit": "Estimated Units",
        "price": "Estimated Price",
        "vehicleNumber": "Vehicle Number",
        "vehicleModelPlaceholder": "Select Vehicle Model",
        "vehicle": "Select Vehicle Model",
        "addVehicle": "+ Add Vehicle",
        "connectorType": "Connector Type",
        "connectorTypePlaceholder": "Select Connector Type",
        "bookingDate": "Booking Date",
        "bookingDatePlaceholder": "Pick a booking date",
        "startTime": "Preferred Time (From:)",
        "startTimePlaceholder": "Pick a preferred time from:",
        "endTime": "Preferred Time (To:)",
        "endTimePlaceholder": "Pick a preferred time to:",
        "sortConnector": "Sort Connector",
        "byCapacity": "Sort by capacity",
        "byPrice": "Sort by price",
        "bookNow": "Book Now",
        "notFound": "No charging point available",
        "error": {
          "title": "Oops!",
          "vehicle": "Please select a vehicle.",
          "startTime": "Start time can not be same as the end time.",
          "endTime": "End time can not be same as the start time.",
          "connector": "Please select a connector type.",
          "requestFailed": "We are unable to process your request at the moment. Please try again."
        }
    },
    "bookSchedule": {
        "title": "Book Schedule",
        "morning": "Morning",
        "afternoon": "Afternoon",
        "evening": "Evening",
        "connector": "Connector",
        "capacity": "Units",
        "price": "Price",
        "bookingDate": "Booking Date",
        "bookNow": "Book Now",
        "note": "NOTE: Please select a start time & end Time from the slots available below. Double click on the selected time to reset.",
        "response": {
          "error": {
            "title": "Error!",
            "chargingDate":"Please select a charging date to schedule charging.",
            "chargingStartTime": "Please select a charging start time to schedule charging.",
            "chargingEndTime": "Please select a charging end time to schedule charging.",
            "slotNotAvailable": "Please select a different time slot. Slots from",
            "slotNotAvailableEnd": "are already booked."
          }
        }
    },
    "paymentMode": {
        "title": "Payment Mode",
        "pay": "Pay",
        "coupon": "Coupon",
        "basis": "I want to charge on the basis of",
        "amount": "Amount",
        "amountSymbol": "/- Rs.",
        "unit": "kWh",
        "unitSymbol": "kWh",
        "time": "Time",
        "timeSymbol": "hrs",
        "proceed": "Proceed",
        "notice": "*NOTE: Scheduled order will automatically be cancelled after 15 mins of scheduled time in case of no show.",

        "warning": "Oops!",
        "unavailableTimeSlot": "This time slot is not available. Please select a different time slot",
        "unavailableCharger": "Charger is not available at the moment please try again after some time.",
        "minAmount": "The amount can't be less then the order amount Rs.",
        "couponRemoveSuccess": "Coupon Code Removed Successfully."
    },
    "Wallet": {

            "notice": "*NOTE: Scheduled order will automatically be cancelled after 15 mins of scheduled time in case of no show.",

            "warning": "Oops!",

            "minAmount": "The amount can't be  Rs.0",

        },
    "chargingLog":{
      "title": "Charging Log",
      "status": "Status: ",
      "charging": "Charging",
      "elapsedTime": "Elapsed Time: ",
      "chargingPointStatus": "Charging Status:",
      "stop": "Stop",
      "start": "Start",
      "chargingDuration": "Charging Duration",
      "energyConsumed": "Energy  Used",
      "areYouSure": "Are you sure ?",
      "cancelMessage": "Do you want to stop charging your EV ?",
      "no": "No",
      "yes": "Yes",
      "startMeterReading": "Start Meter Reading (Wh)",
      "stopMeterReading": "Stop Meter Reading (Wh)",
      "totalAmount": "Total Amount(Rs.)",
      "BatteryPercentage": "Battery Percentage",
      "stopCharging": "Stop Charging",
      "stoppingCharging": "Finishing...",
      "faulted": "We apologies for the inconvenience caused. We will get back to you shortly."
    },
    "successTransaction": {
      "status": "SUCCESSFULL!",
      "message": "Your transaction was successfull.",
      "noOfUnits": "No. of Units",
      "orderId": "Order Id",
      "date": "Date",
      "time": "Time",
      "totalPrice": "Total Price",
      "scanQrCode": "Scan QR Code Here",
      "start": "START",
      "plugConnector": "Please plug in the connector to your EV",
      "processRequest":"Please wait while we process your request",
      "chargerUnavailable": "Charger Status Unavailable. Please Try Again.."
    },
    "coupon": {
        "title": "Coupons",
        "label": "Coupon: ",
        "notFound": "No New Coupon Found.",
        "apply": "Apply"
    },
    "chargingHistory": {
        "title": "Charging History",
        "tabTitle": "History",
        "new": "New",
        "cancelled": "Cancelled",
        "completed": "Completed",
        "connector": "Charger Type: ",
        "kWh":"kWh Booked:",

        "connectorno": "Connector No. ",
        "chargingPoint": "Charger ID : ",
        "date": "Booking Date : ",
        "duration":"Duration : ",
        "cancelledtime":"Time : ",
        "amount":"Amount : ",
        "starttime":"Time : ",
        "time": "Start Time : ",
        "endtime": "End Time : ",
        "viewDetails": " Start Charging",
        "resume": "Check charging status",
        "cancelBooking": "Cancel Booking",
        "areYouSure": "Are you sure ?",
        "cancelMessage": "Do you want to cancel your booking ?",
        "no": "No",
        "yes": "Yes",
        "response":{
          "success": {
            "title": "Success!",
            "message": "Scheduled charging has been cancelled successfully."
          },
          "error": {
            "notFound": "No new charging schedule available",
            "notCancelledBookingFound": "No cancelled booking found.",
            "notSuccessfullBookingFound": "No completed booking found."
          }
        }
    },
    "chargingHistoryDetails": {
      "title": "Charging History Details",
      "connector": "Connector",
      "chargingPoint": "Charging PointID",
      "payment": "Payments",
      "description": "Credits Towards Charging",
      "paymentMode": "Payment Mode",
      "orderId": "Order ID",
      "refunded": "Refunded",
      "chargingDetail": "Charging Details",
      "connectorType": "Connector Type",
      "chargingDate": "Charging Date",
      "chargingTime": "Charging Time",
      "userDetail": "User Details",
      "userEmail": "Email",
      "userPhone": "Phone",
      "notification": {
          "first": "You can start charging your Electric vehicle in couple of minutes.",
          "second": "Please be prepared to plug in the connector to your Electric Vehicle.",
          "third": "You can proceed with the charging in few seconds.",
          "fourth": " Remaining",
          "fifth": "Oops! You were unable to start the charging at the booked time.",
          "sixth": "Please click on the start button now.",
          "seventh" : "You can now proceed and check your charging status.",
          "error" : "Your charging duration has come to an end. Please contact the service provider.",
      },
      "proceed": "PROCEED",
      "feedback": "FEEDBACK",
      "response":{
        "success": {

        },
        "error": {
         
        }
      }
    },
    "orderHistory": {
      "title": "Order History",
      "vehicle": "Vehicle",
      "chargepointid":"ChargepointID",
      "chargingPoint": "Charging Point",
      "stationName":"Station Name",
      "date": "Date",
      "orderId": "Order ID",
      "filter": {
        "title": "Filter",
        "dateFrom": "Please select a start date",
        "dateTo": "Please select a end date",
      },
      "invoice": {
        "title": "Bill Payment Invoice",
        "success": "Payment Successfull",
        "billPaid": "Bill paid at",
        "transactionDetails": "Transaction Details",
        "transactionId": "Transaction ID",
        "orderId": "Order ID",
        "duration": "Charging Duration",
        "paymentMode": "Payments",
        "subTotal": "Sub Total",
         "booking": "Booking Amount",
         "paid": "Amount Paid ",
         "dis":"Coupon Discount",
        "discount": "Discount",
        "total":"Total",
        "GST": "GST",
        "final":"Final Total",
        "paidFrom": "Paid from",
        "contactDetails": "Contact Details",
        "chargingDetails": "Charging Details",
        "energyConsumed": "Energy Consumed (kWh)",
        "unitConsumed": "Rate/kWh",
        "refund": "Refunded Amount"
      },
      "response":{
        "success": {
          "title": "Success!",
          "message": "Scheduled charging has been cancelled successfully."
        },
        "error": {
          "notFound": "No E-fill credit history available",
        }
      }
    },
    "chargingFeedback": {
      "title": "Charging Feedback",
      "chargingStation": "Charging Station",
      "review": "Review",
      "writeReviewPlaceholder": "Write your Review",
      "comment": "Is there anything you would like to tell us?",
      "commentPlaceholder": "Any Suggestions?",
      "overallExperience": "Overall Experience",
      "overallSatisfaction": "Overall Satisfaction",
      "timelyResponse": "Timely Response",
      "customerService": "Customer Service",
      "submitFeeback": "Submit Feeback",
      "success": "Successfull Charge",
      "report": "Report Issue",
      "addComment": "Add Comment",
      "response": {
        "success": {
          "title": "Success!",
          "message": "Feedback submitted successfully."
        },
        "error": {
          "title": "Error!",
          "message": "Feedback not submitted."
        }
      }
    },
    "quickCharge": {
        "title": "Scan QR Code",
        "scanning": "Scanning...",
        "cancel": "Cancel",
        "start": "START",
        "goBack": "GO BACK",
        "addVehicle": "+ Please add a vehicle",
        "selectVehicle": "Select your vehicle Model & Scan the QR Code on the Charger",
        "response": {
          "error": {
            "title": "Error!",
            "invalidQR": "Invalid QR code scanned. Please use appropriate QR code available at the charging station.",
          }
        }
    },
    "telematrix":{
      "title":"Telematrix"
    },
    "francisee":{
      "title":"Charger Franchisee",
      "out":"Submit Products",
      "check":"Check Out",
      "upload":"Upload Payment Receipt",
      "loyality":"Franchisee Redeem Loyalty",
      "loyality_his":"Franchisee Loyalty History",
      "history":"Loyalty History"

    },
    "dmc":{
      "title":"Dealer",
      "cart":"Add to Cart",
      "product":"Product List",
      "order":"Order History",
      "orderdetails":"Order Details",
      "porduct_list":"Product List",
      "stock":"Stock List",
      "battery":"Battery ",
      "sale_deatils":"Sale Details",
      "motor":"Motor ",
      "control":"Controller ",
      "other":"Others",
      "details":"Order details",
      "sold_record":"Sold Records",
      "warranty_title":"Warranty ",
      "warranty_policy":"Warranty Policy",
      "warranty_terms":"Warranty Terms",
      "warrenty_claim":"Warranty Claims",
      "service":"Service Records",
      "s_list":"Service List",
      "w_list":"Warranty List",
      "o_list":"Open Claims",
      "c_list":"Closed Claims",
      "w_detail":"Warranty Details",
      "closed_service":"Closed Services",
      "open_service":"Open Services",
      "s_detail":"Service Details",
      "warranty_c":"Warranty Claim",
      "temp_rc":"Temp. RC Number",
      "vehicle_forms":"Vehicle Update Form",
      "submit":"Submit",
      "loyality":"Redeem Loyalty",
      "loyality_his":"Loyalty History",
      "loyalty_use":" Loyalty Use",
      "poof":"ID Proof Image",
      "paymnt":"Payment Proof",
      "update":{
        "chassis_no":"Chassis Number",
        "battery_no":"Battery Number",
        "charger_no":"Charger Number",
        "controller_no":"Controller Number",
        "converter_no":"Convertor Number",
        "differential_no":"Differential Number",
        "fm_no":"F.M. Number",
        "front_shocker_no":"Front Shocker Number",
        "horn_no":"Horn Number",
        "ignition_lock_no":"Ignition Lock Number",
        "motor_no":"Motor Number",
        "rim_no":"Rim Number",
        "speedometer_no":"Speedometer Number",
        "throttle_no":"Throttle Number",
        "tyre_no":"Tyre Number"
      },
      "soldForm":{
        "title":"Customer Form",
        "title1":"Service Form",
        "doc_no":"Document Number",
        "select":"Select the Date & Time",
        "doc_type":"ID Proof",
        "id":"ID Proof"
      },
      
    },
    "users":{
  "doc":"Documents",
"title":"Users",
"ev":"Your EV",
"upload":"User Documents",
"charger":"Your Chargers",
"order":"Order History",
"detail":"Service Details",
"issues":"Service Issue",
"other_issues":"Other Service Issues",
"w_detail":"Warranty Details",
"service":"Services",
"types":"Service Types",
"documents":"Documents",
"services":{
"want":'Please Confirm your Service',
"confirm":"Your Service is Confirm"
},
"history":"Service History",
"breakdown":"BreakDown Service",
"primitve":"Preventive Service"
    },
    "listCharger": {
      "title": "List a Charger",
      "companyName": "Company Name",
      "address": "Address",
      "latitude": "Latitude",
      "longitude": "Longitude",
      "powerRating": "Power Rating (KWH)",
      "connectors": "Connectors",
      "slots": "Number of Slots",
      "imageUpload": "Upload Image (Optional)",
      "area": "Area (Optional)",
      "openTime": "Open Time (Optional)",
      "closeTime": "Close Time (Optional)",
      "submit": "Submit",
      "response": {
        "success": {
          "title": "Success!",
          "message": "Charger listed Successfully."
        },
        "error": {
          "title": "Error !",
          "message": "Unable to process your request."
        }
      }
    },
    "legalDocuments": {
        "title": "Legal Documents",
        "privacy": "Privacy Policy",
        "refund": "Refund & Cancellation",
        "product": "Product & Services",
        "terms": "Terms & Conditions",
        "about": "About Us"
    },
    "charging": {
          "quick": "Add Credit",
          "quicky": "Credit History",
          "available": "Charging History ",
          "availableby": "Preferences",
        },
    "wallethistory": {
            "title": "E-Fill Credit History",
        },
        "rfid": {
                    "title": "RFID Scanner",
                    "subtitle":"Add RFID",
                    "message":"A new card added in your account.",
                    "message1":"Add money in your wallet and swipe again to start charging."
                },
       "rfidView": {
                          "title": "RFID CARD",
                        "subtitle":"RFID Cards",
                        "balance":"Please maintain balance of Rs.1000 to use RFID card"
                      },
    "faq": {
        "title": "FAQ",
        "subTitle": "FAQs for users",
        "description": "Common questions we receive from the users"
    },
    "preferences": {
        "title": "Preferences",
        "notificationSetting": "Notification Settings",
        "languageSetting": "Language Settings",
        "selectLanguage": "Select Language",
        "mobility":"Device Mobility",
        "distributer":"Vehicle Dealers",
        "enable":"Enable",
        "franchise":"Charger Franchisee",
        "allNotification": "All notifications",
        "notification": "Notifications",
        "user":"User",
        "statusAlert": "Status Alert for charging stations"
    },
    "language": {
      "hindi": "Hindi",
      "english": "English"
    },
    "error":{
      "title": "Error!",
      "name" : "User Name must be at least 15 characters",
      "message": "Oops! Something Went Wrong!",
      "emptyError": "Should not be empty.",
      "phoneError": "The phone must a 10 digit number.",
      "emailLengthError":'Please enter a valid Email Id',
      "passwordLengthError": "The password must be at least 6 characters.",
      "passwordUnmatchedError": "Password did not match.",
      "enterOtpError": "Please Enter Complete OTP",
      "invalidMobile": "Please select a different mobile number",
      "termsAndConditions": "You must accept T&C and Privacy Policy.",
      "warningTitle": "Warning!",
      "skipLoginMessage" : "Please create a self user or a corporate user account to avail this feature.",
      "oops": "Oops!",
      "chargingPointUnavailable": "Charging Point Unavailable at the moment.",
      "processRequest": "We are unable to process your request at the moment. Please try again.",
      "chargingDatePassed": "Your charging date has already passed. You are not allowed to start the charging now.",
      "transactionDetailsError": "We are trying to track your transaction details. Please try again or contact the charging station operator.",
      "chargerUnavailable": "Currently charger is not available.",
      "chargingStationNotFound": "No Charging Station found.",
      "nothingNew": "Noting new to update.",
      "pleaseWait": "Please wait scanning is under process.",
      "connectorUnmatched": "Connector not available for this vehicle model.",
    },
    "success": {
      "title": "Success!",
      "favouriteList": "Charging Station has been added to the favorite list.",
      "removedFavouriteList": "Charging Station has been removed from favorite list.",
      "reviewDeleted": "Review deleted successfully.",
      "couponSuccess": "Coupon Code Applied Successfully.",
      "detailsUpdated": "Your details has been updated successfully.",
      "passwordUpdated": "Password Updated Successfully.",
      "vehicleAdded": "Vehicle Added successfully.",
      "vehicleUpdate": "Vehicle Updated successfully.",
      "vehicleDeleted": "Vehicle deleted successfully.",
      "loyalty":"Loyalty Points will be added"
    },
    "sidebar": {
      "viewProfile": "View Profile",
      "chargingStation": "Charging Stations",
      "favoriteStations": "Favourite Stations",
      "orderHistory": "Order History",
      "chargingHistory": "Charging History",
      "quickCharge" : "Quick Charge",
      "listCharger": "List a Charger",
      "telematrix":"Telematrix",
      "wallet": "Add E-Fill Credit",
       "credithistory": "E-Fill Credit History",
      "walletHistory":"Wallet History",
      "thirdPartyCharger": "Third Party Chargers",
      "legalDocuments": 'Legal Documents',
      "chargerslist":"Dealer",
      "user":"Your EV",
       "user1":"Your Chargers",
      "frann":"Charger Franchisee",
      "faq": "FAQ's",
      "preferences" : "Preferences",
      "logout": "Logout"
    },
    "warranty":{
      "open":"Warranty Open",
      "closed":"Warrany Closed",
      "create":"Create Warranty Claims"
    },
    "services":{
      "open":"Open Cases",
      "closed":"Closed Cases"
    }
  },

  'en-IN': {
    "splash1": {
        "title": "Locate a\nCharging Point",
        "description": "Find an EV Charger at your frequented destination - Cafes, malls, tech parks and restaurants."
    },
    "splash2": {
        "title": "Scan the\nCode",
        "description": "Scan the QR code and select the amount to start charging."
    },
    "splash3": {
        "title": "Begin\nCharging",
        "description": "Check your session status and stop charging through app remotely."
    },
    "terms": {
        "initial": "साइन अप करके, आप हमारी ",
        "termsConditions": "सेवा की शर्तें ",
        "concent": "और ",
        "privacyPolicy": "गोपनीयता नीति ",
        "end": "से सहमत हैं।"
    },
    "welcome": {
        "signIn": "साइन इन करें",
        "createAccount": "खाता बनाएं",
        "recoverPassword": "गोपनीय शब्द पुन प्राप्त करे"
    },
    "signIn": {
        "title": "साइन इन करें",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "कृपया अपना फोन नंबर दर्ज करें",
        "password": "कुंजिका",
        "emptyError": "खाली नहीं होना चाहिए।",
        "passwordLength": "पासवर्ड कम से कम 6 अक्षर का होना चाहिए।",
        "recoverPassword": "गोपनीय शब्द पुन प्राप्त करे",
        "guestUser": "अतिथि उपयेागकर्ता",
        "successTitle": "सफलता",
        "successMessage": "आपने सफलतापूर्वक प्रवेश कर लिया है।",
        "skipLogin": "लॉगिन छोड़ दें",
        "response": {
            "success": {
                "title": "सफलता",
                "message": "आपने सफलतापूर्वक प्रवेश कर लिया है।"
            },
            "error": {
                "title": "त्रुटि",
                "message": "कुछ गलत हो गया",
                "unAuthorized": "अमान्य फ़ोन नंबर या पासवर्ड",
            }
        }
    },
    "guestUser": {
        "title": "अतिथि उपयोगकर्ता साइन इन करें",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "कृपया अपना फोन नंबर दर्ज करें",
        "signIn": "साइन इन करें"
    },
    "auth": {
        "selfUser": "स्वयं उपयोगकर्ता",
        "corporateUser": "कॉर्पोरेट उपयोगकर्ता",
        "guestUser": "अतिथि उपयेागकर्ता"
    },
    "selfUser": {
        "title": "स्वयं उपयोगकर्ता",
        "name": "नाम",
        "namePlaceholder": "अपना नाम दर्ज करें",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "कृपया अपना फोन नंबर दर्ज करें",
        "password": "कुंजिका",
        "confirmPassword": "पासवर्ड की पुष्टि कीजिये",
        "registerButton": "साइन अप करें",
        "iAccept": "मैं नियम एवं शर्तें और गोपनीयता नीति को स्वीकार करता हूं"
    },
    "corporateUser": {
        "title": "कॉर्पोरेट उपयोगकर्ता",
        "corporateUser": "कॉर्पोरेट उपयोगकर्ता",
        "name": "नाम",
        "namePlaceholder": "अपना नाम दर्ज करें",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "कृपया अपना फोन नंबर दर्ज करें",
        "corporateCode": "कॉर्पोरेट कोड",
        "corporateCodePlaceholder": "अपना कॉर्पोरेट कोड दर्ज करें",
        "password": "कुंजिका",
        "confirmPassword": "पासवर्ड की पुष्टि कीजिये",
        "vehicleDetails": "वाहन की सूचना",
        "twoWheeler": "2w",
        "threeWheeler": "3w",
        "lmv": "LMV",
        "hmv": "HMV",
        "registrationNumber": "पंजीकरण संख्या",
        "registrationNumberPlaceholder": "पंजीकरण संख्या दर्ज करें HR XX XX XXXX",
        "vinNumber": "विन नंबर",
        "vinNumberPlaceholder": "विन नंबर दर्ज करें",
        "selectManufacturer": "निर्माता का चयन करें",
        "selectModel": "मॉडल का चयन करें",
        "iAccept": "मैं नियम एवं शर्तें और गोपनीयता नीति को स्वीकार करता हूं",
        "registerButton": "साइन अप करें"
    },
    "guestSignupUser": {
        "title": "अतिथि उपयेागकर्ता",
        "name": "नाम",
        "namePlaceholder": "अपना नाम दर्ज करें",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "कृपया अपना फोन नंबर दर्ज करें",
        "iAccept": "मैं नियम एवं शर्तें और गोपनीयता नीति को स्वीकार करता हूं",
        "registerButton": "साइन अप करें"
    },
    "forgetPassword": {
        "title": "पासवर्ड भूल गए",
        "forgetPassword": "पासवर्ड भूल गए ?",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "कृपया अपना फोन नंबर दर्ज करें",
        "sendOTP": "ओटीपी भेजें",
        "response": {
          "error": {
            "title": "त्रुटि!",
            "message": "फोन नंबर मौजूद नहीं है।",
          }
        }
    },
    "enterOtp": {
        "title": "ओटीपी दर्ज करें",
        "otpSentMessage": "कृपया अपने पंजीकृत मोबाइल नंबर पर भेजे गए 6 अंकों का कोड दर्ज करें",
        "verifyOTP": "ओटीपी सत्यापित करें",
        "notReceivedCode": "कोड प्राप्त नहीं ?",
        "resendIn": "ओटीपी पुनः भेजें",
        "resend": "पुन: भेजें",
        "response": {	
          "success": {	
            "title": "सफलता ।",	
            "message": "बहुत बढ़िया । OTP भेजा गया।",	
            "resend": {	
              "message": "OTP फिर से भेजा गया।"	
            },	
            "verified": {	
              "message": "बहुत बढ़िया। OTP सत्यापित।"	
            }	
          },	
          "error": {	
            "title": "त्रुटि।",	
            "message": "उफ़। हम इस समय आपको OTP भेजने में असमर्थ हैं। बाद में पुन: प्रयास करें।",	
            "verified": {	
              "message": "गलत ओटीपी। कृपया सही OTP के साथ फिर से प्रयास करें।"	
            }	
          }	
        }
    },
    "newPassword": {
        "title": "नया पासवर्ड",
        "password": "कुंजिका",
        "confirmPassword": "पासवर्ड की पुष्टि कीजिये",
        "passwordChange": "पासवर्ड बदलें",
        "passwordSuccessMessage": "पासवर्ड सफलतापूर्वक बदला गया",
        "goBack": "वापस जाओ",
        "response": {	
          "success": {	
            "title": "सफलता ।",	
            "message": "पासवर्ड सफलतापूर्वक अपडेट किया गया।"	
          },	
          "error": {	
            "title": "त्रुटि।",	
            "message": "अपना पासवर्ड अपडेट करने में असमर्थ।"	
          }	
        }
    },
    "home": {
        "title": "घर",
        "search": "खोज....",
        "notConnected": "जुड़े नहीं हैं",
        "available": "उपलब्ध",
        "deActivated": "निष्क्रिय",
        "currentlyBusy": "अभी व्यस्त है",
        "online": "ऑनलाइन",
        "busy": "व्यस्त",
        "unavailable": "अनुपलब्ध",
        "navigate": "विस्तार से देखें"
    },
    "notification": {
        "title": "सूचनाएं",
        "noNotification": "कोई नई सूचना नहीं मिली",
        "clearAll": "सभी साफ करें"
    },
    "filter": {
        "title": "फ़िल्टर",
        "searchNamePlaceholder": "नाम के आधार पर खोजें",
        "searchLocationPlaceholder": "स्थान के आधार पर खोजें",
        "nearMe": "मेरे पास",	
        "distance": "दूरी",	
        "km": "किलोमिटर",
        "byVehicle": "वाहन द्वारा",
        "byConnector": "कनेक्टर प्रकार द्वारा",
        "rating": "रेटिंग",
        "applyFilter": "फिल्टर लागू करें"
    },
    "drawer": {
        "chargingStations": "चार्जिंग स्टेशन",
        "chargingHistory": "अतीत में किया गया चार्ज",
        "quickCharge": "त्वरित चार्ज",
        "legalDocuments": "कानूनी दस्तावेज",
        "faq": "पूछे जाने वाले प्रश्न",
        "preferences": "पसंद",
        "logout": "लॉग आउट"
    },
    "rfid": {
      "title": "आरएफआईडी स्कैनर",
      "subtitle":"आरएफआईडी जोड़ें",
      "message":"आपके खाते में एक नया कार्ड जोड़ा गया.",
      "message1":"अपने वॉलेट में पैसे जोड़ें और चार्ज करना शुरू करने के लिए फिर से स्वाइप करें."
  },
"rfidView": {
            "title": "आरएफआईडी कार्ड",
          "subtitle":"आरएफआईडी कार्ड"

        },
    "profile": {
        "title": "मेरी प्रोफाइल",
        "anonymous": "अनाम उपयोगकर्ता",
        "name": "नाम",
        "namePlaceholder": "अपना नाम दर्ज करें",
        "selectDate": "जन्म तिथि चुनें",
        "addressPlaceholder": "अपना पता दर्ज करें",
        "changeMobile": "फ़ोन नंबर बदलें",
        "phoneNumber": "फ़ोन नंबर",
        "phonePlaceholder": "फ़ोन नंबर दर्ज करें",
        "viewProfile": "प्रोफाइल देखिये",
        "resetPassword": "पासवर्ड बदलें",
        "vehicleDetails": "वाहन की सूचना",
        "assignedCPO": "सौंपा गया CPO (s) - EFILL",
        "updateButton": "अपडेट करें",
        "changeButton": "परिवर्तन",
        "existingPassword": "मौजूदा पासवर्ड",
        "newPassword": "नया पासवर्ड",
        "confirmPassword": "पासवर्ड की पुष्टि कीजिये",
        "changePassword": "पासवर्ड बदलें",
        "manufacturer": "निर्माता:",
        "model": "मॉडल:",
        "addVehicle": "वाहन विवरण जोड़ें",
        "addVehicleTitle": "वाहन जोड़ें",
        "twoWheeler": "2w",
        "threeWheeler": "3w",
        "lmv": "LMV",
        "hmv": "HMV",
        "type": "प्रकार:",
        "registrationNumber": "पंजीकरण संख्या",
        "registrationNumberPlaceholder": "पंजीकरण संख्या दर्ज करें",
        "vinNumber": "विन नंबर",
        "vinNumberPlaceholder": "विन नंबर दर्ज करें",
        "vin_number": "विन नंबर:",
        "selectManufacturer": "निर्माता का चयन करें",
        "selectModel": "मॉडल का चयन करें",
        "submitButton": "प्रस्तुत",
        "response": {
          "error": {
            "title": "त्रुटि",
            "message": "कुछ गलत हो गया",
            "emptyError": "खाली नहीं होना चाहिए।",
            "errorManufacturer": "कृपया एक वाहन निर्माता चुनें।",
            "errorModel": "कृपया एक वाहन मॉडल चुनें।",
            "errorSelect": "कृपया एक वाहन निर्माता और वाहन मॉडल चुनें।",
            "noVehicle": "अभी तक कोई वाहन नहीं जोड़ा गया।",  
            "invalidRegistrationNumberError": "अमान्य पंजीकरण संख्या। विशेष वर्ण अनुमति नहीं है।",
            "invalidOrdPassword": "पुराना पासवर्ड गलत है। कृपया सही पासवर्ड के साथ पुन: प्रयास करें।"
          },
          "success": {
              "title": "सफलता"
          }
      },
    },
    "thirdPartyChargingStation": {
      "title": "थर्ड पार्टी चार्जिंग स्टेशन",
      "viewDetails": "विवरण देखें",
      "favouriteChargingStation": "पसंदीदा स्टेशन",
      "powerRating": "पावर रेटिंग (KWH)",
      "availableConnector": "कनेक्टर उपलब्ध है।",
      "noRating": "अभी तक कोई मूल्यांकन नहीं है",
      "ratings": "मूल्यांकन",
      "response": {
        "success": {
          "title": "सफलता",
        },
        "error": {
          "title": "त्रुटि",
          "message": "कोई चार्जिंग स्टेशन उपलब्ध नहीं है",
        }
      }
    },
    
    "contactus": {
      "title": "संपर्क करें",
       "namehead":"नाम : ",
      "name":"Mr. Raghuvir Singh",
      "phoneno": "फोन नंबर : ",
      "contactno":"+91 7834887076",
      "email": "ईमेल आईडी: ",
      "emailid":"raghuvir@efill.co.in",
      "query":"किसी भी प्रश्न और समर्थन के लिए, कृपया नीचे दिए गए विवरण पर हमसे संपर्क करें।"
  },
    "chargingStation": {
        "title": "चार्जिंग स्टेशन",
        "bookCharger": "बुक चार्जर",
        "favouriteChargingStation": "पसंदीदा स्टेशन",
        "noRating": "अभी तक कोई मूल्यांकन नहीं है",
        "ratings": "मूल्यांकन",
        "response": {
          "success": {
            "title": "सफलता",
          },
          "error": {
            "title": "त्रुटि",
            "message": "कोई चार्जिंग स्टेशन उपलब्ध नहीं है",
          }
        }
    },
    "charging": {
      "quick": "क्रेडिट जोड़ने",
      "quicky": "क्रेडिटt इतिहास",
      "available": "चार्जिंग इतिहास ",
      "availableby": "पसंद",
    },
    "chargingStationDetails": {
      "title": "चार्जिंग स्टेशन विस्तार",
      "overview": "विवरण",
      "review": "समीक्षा",
      "noReview": "अभी तक कोई समीक्षा नहीं है।",
      "bookCharger": "बुक चार्जर",
      "call": "कॉल करें",
      "navigate": "मार्गनिर्देशन करें",
      "photos": "फ़ोटो",
      "online": "ऑनलाइन",
      "quickCharge": "शीघ्र चार्ज करें",
      "availablePoints": "कनेक्टर :",
      "slot": "स्लॉट",
      "noPointAvailable": "कोई कनेक्टर उपलब्ध नहीं है।",
      "basicDetails": "बुनियादी विवरण",
      "chargingPrice": "चार्जिंग मूल्य:",
      "facilities": "सुविधाएं",
      "services": "सेवाएं",
      "parking": "पार्किंग",
      "coffee": "कॉफी",
      "washroom": "शौचालय",
      "shops": "दुकानें",
      "type": "प्रकार",
      "charges": "मूल्य लग सकते हैं।",
      "chargesNotApplicable": "सायद मूल्य लागू नहीं होगा।",
      "public": "सार्वजनिक",
      "checkIn": "चेक इन",
      "existingReviews": "मौजूदा समीक्षा",
      "addReview": "अपनी समीक्षा जोड़ें",
  
      "reviews": {
          "title": "अपनी समीक्षा जोड़ें",
          "chargingStation": "चार्जिंग स्टेशन",
          "rating": "मूल्यांकन",
          "review": "समीक्षा",
          "reviewPlaceholder": "अपनी समीक्षा लिखिए",
          "submitReview": "समीक्षा जमा करें",
          "notFound": "कोई समीक्षा नहीं मिली।",
          "response":{
              "success": {
                "title": "सफलता",
                "message": "समीक्षा सफलतापूर्वक सबमिट की गई। इसे छोटा किया जाएगा।"
              },
              "error": {
                "title": "त्रुटि",
                "message": "कुछ गलत हो गया",
                "submitError": "हम समीक्षा सबमिट करने में असमर्थ हैं। कृपया बाद में पुन: प्रयास करें।",
                "emptyError": "खाली नहीं होना चाहिए।",
                "zeroRating": "रेटिंग 0 नहीं हो सकती।"
              }
            }
      },
      "response":{
        "success": {
          "title": "सफलता",
        },
        "error": {
          "title": "त्रुटि",
          "notFound": "कोई चार्जिंग स्टेशन उपलब्ध नहीं है",
        }
      }
    },
    "bookCharger": {
        "title": "बुक चार्जर",
        "unit": "अनुमानित इकाई",
        "price": "अनुमानित मूल्य",
        "vehicleNumber": "वाहन नंबर",
        "vehicleNumberPlaceholder": "वाहन नंबर का चयन करें",
        "addVehicle": "+ वाहन जोड़ें",
        "connectorType": "संबंधक प्रकार",
        "connectorTypePlaceholder": "संबंधक प्रकार चुनें",
        "bookingDate": "बुकिंग दिनांक",
        "bookingDatePlaceholder": "बुकिंग की तारीख चुनें",
        "startTime": "आरंभ समय",
        "startTimePlaceholder": "प्रारंभ समय चुनें",
        "endTime": "अंत समय",
        "endTimePlaceholder": "अंतिम समय चुनें",
        "sortConnector": "संबंधक द्वारा क्रमबद्ध",
        "byCapacity": "क्षमता द्वारा क्रमबद्ध",
        "byPrice": "मूल्य द्वारा क्रमबद्ध",
        "bookNow": "अभी बुक करें",
        "notFound": "कोई चार्जिंग स्टेशन उपलब्ध नहीं है",
        "error": {	
          "title": "उफ़।",	
          "vehicle": "कृपया एक वाहन चुनें।",	
          "startTime": "प्रारंभ समय समाप्ति समय के समान नहीं हो सकता।",
          "endTime": "समाप्ति समय प्रारंभ समय के समान नहीं हो सकता।",
          "connector": "कृपया एक कनेक्टर प्रकार चुनें।",	
          "requestFailed": "हम इस समय आपसे अनुरोध करने में असमर्थ हैं। कृपया पुन: प्रयास करें।"	
        }
    },
    "bookSchedule": {
        "title": "बुक कार्यक्रम",
        "morning": "सुबह",
        "afternoon": "अपराह्न",
        "evening": "शाम",
        "connector": "संबंधक",
        "capacity": "इकाई",
        "price": "मूल्य",
        "bookingDate": "बुक करने की तिथि",
        "bookNow": "अभी बुक करें",
        "note": "नोट: कृपया नीचे उपलब्ध स्लॉट से प्रारंभ समय और समाप्ति समय चुनें। रीसेट करने के लिए चयनित समय पर डबल क्लिक करें।",
        "response": {
          "error": {
            "title": "त्रुटि!",
            "chargingDate":"चार्जिंग शेड्यूल करने के लिए कृपया एक चार्जिंग डेट चुनें।",
            "chargingStartTime": "कृपया चार्जिंग शेड्यूल करने के लिए चार्जिंग टाइम चुनें।",
            "chargingEndTime": "चार्जिंग शेड्यूल करने के लिए कृपया चार्जिंग एंड टाइम चुनें।",
            "slotNotAvailable": "कृपया एक अलग समय स्लॉट चुनें। चार्जिंग स्लॉट",
            "slotNotAvailableEnd": "पहले से ही बुक हैं।"
          }
        }
    },
    "paymentMode": {
        "title": "भुगतान का प्रकार",
        "pay": "भुगतान करें",
        "coupon": "कूपन",
        "basis": "मैं के आधार पर चार्ज करना चाहता हूँ",
        "amount": "राशि",
        "amountSymbol": "/- रुपये!",
        "unit": "kWh",
        "unitSymbol": "kWh",
        "time": "समय",
        "timeSymbol": "घंटा",
        "proceed": "आगे बढ़ना",
        "notice": "* नोट: कोई आदेश नहीं दिखाने के मामले में निर्धारित समय के 15 मिनट के बाद निर्धारित ऑर्डर स्वचालित रूप से रद्द कर दिया जाएगा।",

        "warning": "उफ़।",
        "unavailableTimeSlot": "यह समय स्लॉट उपलब्ध नहीं है। कृपया एक अलग समय स्लॉट चुनें।",
        "unavailableCharger": "चार्जर फिलहाल उपलब्ध नहीं है कृपया कुछ समय बाद फिर से प्रयास करें।",
        "minAmount": "यह राशि दी गई राशि से कम नहीं हो सकती।",
        "couponRemoveSuccess": "कूपन कोड सफलतापूर्वक निकाला गया।"
    },
    "chargingLog":{
      "title": "चार्ज लॉगिंग",
      "status": "स्थिति:",
      "charging": "चार्ज",
      "elapsedTime": "बीता हुआ समय:",
      "chargingPointStatus": "चार्ज की स्थिति:",
      "stop": "रुकें",
      "start": "शुरू",
      "chargingDuration": "चार्जिंग अवधि",
      "energyConsumed": "ऊर्जा की खपत",
      "startMeterReading": "मीटर प्रारंभ रीडिंग (Wh)",
      "stopMeterReading": "मीटर स्टॉप रीडिंग (Wh)",
      "totalAmount": "कुल राशि (कर के बिना) (रु।)",
      "BatteryPercentage": "बैटरी का प्रतिशत",
      "stopCharging": "चार्जिंग बंद करने",
      "stoppingCharging": "रोक रहे हैं।",
      "faulted": "असुविधा के लिए हम क्षमा चाहते हैं। हम आपसे शीघ्र ही संपर्क करेंगे।"
    },
    "successTransaction": {
      "status": "सफलता",
      "message": "आपका लेनदेन सफल रहा।",
      "orderId": "आदेश पहचान",
      "noOfUnits": "इकाइयों की संख्या",
      "date": "दिनांक",
      "time": "समय",
      "totalPrice": "कुल कीमत",
      "scanQrCode": "यहां QR कोड स्कैन करें",
      "start": "शुरू",
      "plugConnector": "कृपया कनेक्टर को अपने ईवी में प्लग करें",
      "processRequest":"कृपया प्रतीक्षा करें जब तक हम आपकी प्रार्थना को अग्रसारित करें",
      "chargerUnavailable": "चार्जर की स्थिति उपलब्ध नहीं है। कृपया पुन: प्रयास करें।"
    },
    "coupon": {
        "title": "कूपन",
        "label": "कूपन ",
        "notFound": "कोई नया कूपन नहीं मिला",
        "apply": "लागू करें"
    },
    "chargingHistory": {
      "title": "पुराना चार्ज रिकॉर्ड",
      "tabTitle": "चार्ज रिकॉर्ड",
      "new": "नया",
      "cancelled": "रद्द किया हुआ",
      "completed": "संपूर्ण",
      "connector": "कनेक्टर: ",
      "chargingPoint": "चार्जिंग प्वाइंट: ",
      "date": "दिनांक :",
      "time": "समय :",
      "viewDetails": "विवरण देखें",
      "resume": "चार्जिंग की स्थिति जांचें",
      "cancelBooking": "बुकिंग रद्द करें",
      "areYouSure": "क्या आपको यकीन है।",
      "cancelMessage": "क्या आप अपनी बुकिंग रद्द करना चाहते हैं।",
      "no": "नहीं",
      "yes": "हाँ",
      "response":{
        "success": {
          "title": "सफलता!",
          "message": "अनुसूचित चार्ज सफलतापूर्वक रद्द कर दिया गया है।"
        },
        "error": {
          "notFound": "कोई चार्जिंग इतिहास उपलब्ध नहीं है",
          "notCancelledBookingFound": "कोई रद्द बुकिंग नहीं मिली।",
          "notSuccessfullBookingFound": "कोई सफल बुकिंग नहीं मिली।"
        }
      }
    },
    "chargingHistoryDetails": {
      "title": "पुराना चार्ज रिकॉर्ड का विवरण",
      "connector": "संबंधक",
      "chargingPoint": "चार्जिंग पॉइन्ट्",
      "payment": "भुगतान",
      "description": "चार्जिंग के लिए क्रेडिट",
      "paymentMode": "भुगतान का प्रकार",
      "orderId": "भुगतान आईडी",
      "refunded": "वापसी राशि",
      "chargingDetail": "चार्जिंग विवरण",
      "connectorType": "संबंधक प्रकार",
      "chargingDate": "चार्जिंग दिनांक",
      "chargingTime": "चार्जिंग समय",
      "userDetail": "उपभोक्ता विवरण",
      "userEmail": "ईमेल",
      "userPhone": "फ़ोन",
      "notification": {
          "first": "आप कुछ मिनटों में अपने इलेक्ट्रिक वाहन को चार्ज करना शुरू कर सकते हैं।",
          "second": "कृपया अपने विद्युत वाहन में संबंधक को प्लग करने के लिए तैयार रहें।",
          "third": "आप कुछ सेकंड में चार्जिंग के साथ आगे बढ़ सकते हैं।",
          "fourth": " शेष",
          "fifth": "आप बुक किए गए समय पर चार्जिंग शुरू करने में असमर्थ थे।",
          "sixth": "कृपया अब प्रारंभ बटन पर क्लिक करें",
          "seventh" : "अब आप आगे बढ़ सकते हैं और अपनी चार्जिंग स्थिति की जांच कर सकते हैं।",
          "error" : "आपकी चार्जिंग अवधि समाप्त हो गई है। कृपया सेवा प्रदाता से संपर्क करें।",
      },
      "proceed": "आगे बढ़े",
      "feedback": "प्रतिपुष्टि",
      "response":{
        "success": {

        },
        "error": {
         
        }
      }
    },
  "walletHistory": {
          "title": "Wallet History",
          "amount": "amount",
          "messages": "message",
          "date": "date",
          "orderId": "Order ID",
          "filter": {
            "title": "Filter",
            "dateFrom": "Please select a start date",
            "dateTo": "Please select a end date",
          },
   },
    "orderHistory": {
      "title": "आदेश इतिहास",
      "vehicle": "वाहन",
      "chargingPoint": "चार्जिंग पॉइन्ट्",
      "date": "तारीख",
      "orderId": "आदेश पहचान",
      "filter": {
        "title": "फ़िल्टर करें",
        "dateFrom": "कृपया एक आरंभ तिथि चुनें",
        "dateTo": "कृपया अंतिम तिथि चुनें",
      },
      "invoice": {
        "title": "बिल भुगतान चालान",
        "success": "भुगतान सफल",
        "billPaid": "बिल का भुगतान किया",
        "transactionDetails": "लेनदेन का विवरण",
        "transactionId": "लेनदेन आईडी",
        "orderId": "आदेश पहचान",
        "duration": "चार्जिंग अवधि",
        "paymentMode": "भुगतान विधि",
        "subTotal": "उप कुल",
        "GST": "जीएसटी",
        "final":"अंतिम कुल",
        "paidFrom": "से भुगतान किया",
        "contactDetails": "सम्पर्क करने का विवरण",
        "chargingDetails": "चार्जिंग का विवरण",
        "energyConsumed": "ऊर्जा की खपत",
        "unitConsumed": "मीटर रीडिंग",
        "refund": "रिफंड की गई राशि"
      },
      "response":{
        "success": {	
          "title": "सफलता।",	
          "message": "शेड्यूल किए गए चार्ज को सफलतापूर्वक रद्द कर दिया गया है।"	
        },
        "error": {
          "notFound": "कोई आदेश इतिहास उपलब्ध नहीं है।",
        }
      }
    },
    "chargingFeedback": {
      "title": "चार्ज के लिए फीडबैक",
      "chargingStation": "चार्जिंग स्टेशन",
      "review": "समीक्षा करें",
      "writeReviewPlaceholder": "अपनी समीक्षा लिखिए",
      "comment": "क्या कुछ ऐसा है जो आप हमें बताना चाहेंगे?",
      "commentPlaceholder": "कोई सुझाव?",
      "overallExperience": "समग्र अनुभव",
      "overallSatisfaction": "सम्पूर्ण संतुष्टि",
      "timelyResponse": "समय पर प्रतिक्रिया",
      "customerService": "ग्राहक सेवा",
      "submitFeeback": "फीडबैक जमा करें",
      "success": "सफल प्रभार",
      "report": "रिपोर्ट जारी करना",
      "addComment": "टिप्पणी जोड़ें",
      "response": {
        "success": {
          "title": "सफलता!",
          "message": "फीडबैक को सफलतापूर्वक जोड़ा गया।"
        },
        "error": {
          "title": "त्रुटि!",
          "message": "प्रतिक्रिया असफल।"
        }
      }
    },
    "quickCharge": {
        "title": "शीघ्र चार्ज करें",
        "scanning": "जाँच हो रही है...",
        "cancel": "रद्द करें",
        "start": "शुरू करें",
        "goBack": "वापस जाएं",
        "addVehicle": "+ कृपया एक वाहन जोड़ें",
        "selectVehicle": "+ कृपया एक वाहन चुनें",
        "response": {
          "error": {
            "title": "त्रुटि!",
            "invalidQR": "अमान्य QR कोड स्कैन किया गया। कृपया चार्जिंग स्टेशन पर उपलब्ध उपयुक्त QR कोड का उपयोग करें।",
          }
        }
    },
    "listCharger": {	
      "title": "हमारी सूची में चार्जर जोड़ें",	
      "companyName": "कंपनी का नाम",
      "address": "पता",
      "latitude": "अक्षांश",
      "longitude": "देशान्तर",
      "powerRating": "पावर रेटिंग (KWH)",
      "connectors": "कनेक्टर्स",
      "slots": "स्लॉट की संख्या",
      "imageUpload": "चित्र अपलोड करें (वैकल्पिक)",
      "area": "क्षेत्र (वैकल्पिक)",
      "openTime": "खुलने का समय (वैकल्पिक)",
      "closeTime": "बंद करने का समय (वैकल्पिक)",
      "submit": "प्रस्तुत",
      "response": {	
        "success": {	
          "title": "सफलता।",	
          "message": "चार्जर को सफलतापूर्वक सूचीबद्ध किया गया।"	
        },	
        "error": {	
          "title": "त्रुटि।",	
          "message": "आपके अनुरोध को संसाधित करने में असमर्थ।"	
        }	
      }	
    },
    "legalDocuments": {
        "title": "कानूनी दस्तावेज",
        "privacy": "गोपनीयता नीति",
        "refund": "धन की वापसी और रद्द करना",
        "product": "वस्तु और सेवाएँ",
        "terms": "नियम एवं शर्तें",
        "about": "हमारे बारे में"
    },
    "faq": {
        "title": "सामान्य प्रश्न",
        "subTitle": "उपयोगकर्ताओं के लिए अक्सर पूछे जाने वाले प्रश्न",
        "description": "नए उपयोगकर्ताओं से प्राप्त हुए सामान्य प्रश्न"
    },
    "preferences": {
        "title": "पसंद",
        "notificationSetting": "अधिसूचना सेटिंग",
        "languageSetting": "भाषा सेटिंग",
        "selectLanguage": "भाषा का चयन करें",
        "allNotification": "सभी अधिसूचनाएं",
        "notification": "सूचनाएं",
        "statusAlert": "चार्जिंग स्टेशनों के लिए स्थिति चेतावनी"
    },
    "language": {
      "hindi": "हिंदी",
      "english": "अंग्रेज़ी"
    },
    "error":{
      "title": "त्रुटि!",
      "message": "उफ़! कुछ गलत हो गया!",
      "emptyError": "खाली नहीं होना चाहिए।",
      "phoneError": "फोन में 10 अंकों का नंबर होना चाहिए।",
      "passwordLengthError": "पासवर्ड कम से कम 6 अक्षर का होना चाहिए।",
      "passwordUnmatchedError": "पासवर्ड मेल नहीं खाता था।",
      "enterOtpError": "कृपया पूरा OTP दर्ज करें",
      "invalidMobile": "कृपया एक अलग मोबाइल नंबर चुनें।",
      "termsAndConditions": "आपको T & C और गोपनीयता नीति को स्वीकार करना होगा।",
      "warningTitle": "चेतावनी",
      "skipLoginMessage" : "कृपया इस सुविधा का लाभ उठाने के लिए एक स्व उपयोगकर्ता या एक कॉर्पोरेट उपयोगकर्ता खाता बनाएँ।",
      "oops": "उफ़।",
      "chargingPointUnavailable": "फिलहाल प्वाइंट अनुपलब्ध।",
      "processRequest": "हम इस समय आपके अनुरोध को संसाधित करने में असमर्थ हैं। बाद में पुन: प्रयास करें।",
      "chargingDatePassed": "आपकी चार्जिंग तिथि पहले ही बीत चुकी है। आपको अभी चार्ज शुरू करने की अनुमति नहीं है।",
      "transactionDetailsError": "हम आपके लेन-देन के विवरण को ट्रैक करने का प्रयास कर रहे हैं। कृपया पुनः प्रयास करें या चार्जिंग स्टेशन ऑपरेटर से संपर्क करें।",
      "chargerUnavailable": "वर्तमान में चार्जर उपलब्ध नहीं है।",
      "chargingStationNotFound": "कोई चार्जिंग स्टेशन नहीं मिला।",
      "nothingNew": "अद्यतन करने के लिए नया नहीं है।",
      "pleaseWait": "कृपया प्रतीक्षा करें स्कैनिंग प्रक्रियाधीन है।",
      "connectorUnmatched": "इस वाहन मॉडल के लिए कनेक्टर उपलब्ध नहीं है।",
    },
    "success": {
      "title": "सफलता।",
      "favouriteList": "पसंदीदा सूची में चार्जिंग स्टेशन जोड़ा गया है।",
      "removedFavouriteList": "चार्जिंग स्टेशन को पसंदीदा सूची से हटा दिया गया है।",
      "reviewDeleted": "समीक्षा सफलतापूर्वक हटा दी गई।",
      "couponSuccess": "कूपन कोड सफलतापूर्वक लागू किया गया।",
      "detailsUpdated": "आपका विवरण सफलतापूर्वक अपडेट कर दिया गया है।",
      "passwordUpdated": "पासवर्ड सफलतापूर्वक अपडेट किया गया।",
      "vehicleAdded": "वाहन का विवरण सफलतापूर्वक जोड़ा गया।",
      "vehicleUpdate": "वाहन का विवरण सफलतापूर्वक अपडेट किया गया।",
      "vehicleDeleted": "वाहन को सफलतापूर्वक हटाया गया।",
    },
    // "sidebar": {
    //   "viewProfile": "प्रोफाइल देखिये",
    //   "chargingStation": "चार्जिंग स्टेशन",
    //   "favoriteStations": "पसंदीदा स्टेशन",
    //   "orderHistory": "आदेश इतिहास",
    //   "chargingHistory": "पुराना चार्ज रिकॉर्ड",
    //   "quickCharge" : "शीघ्र चार्ज करें",
    //   "listCharger": "चार्जर सूचीबद्ध करें",
    //   "thirdPartyCharger": "थर्ड पार्टी चार्जर्स",
    //   "legalDocuments": 'कानूनी दस्तावेज',
    //   "faq": "सामान्य प्रश्न",
    //   "preferences" : "पसंद",
    //   "logout": "लॉग आउट"
    // }
    "sidebar": {
      "viewProfile": "प्रोफाइल देखिये",
      "chargingStation": "चार्जिंग स्टेशन",
      "favoriteStations": "पसंदीदा स्टेशन",
      "orderHistory": "आदेश इतिहास",
      "chargingHistory": "पुराना चार्ज रिकॉर्ड",
      "quickCharge" : "शीघ्र चार्ज करें",
      "listCharger": "चार्जर सूचीबद्ध करें",
      "thirdPartyCharger": "थर्ड पार्टी चार्जर्स",
      "legalDocuments": 'कानूनी दस्तावेज',
      "faq": "सामान्य प्रश्न",
      "preferences" : "पसंद",
      "logout": "लॉग आउट",
      "telematrix":"टेलीमैट्रिक्स",
      "wallet": "ई-फिल क्रेडिट जोड़ें",
       "credithistory": "ई-फिल क्रेडिट हिस्ट्री",
      "walletHistory":"बटुआ इतिहास",
      "chargerslist":"विक्रेता",
      "user":"आपका ईवी",
      "frann":"चार्जर फ्रेंचाइजी",
    },
    "dmc":{
      "title":"विक्रेता",
      "cart":"कार्ट में जोड़ें",
      "product":"उत्पादों की सूची",
      "order":"आदेश इतिहास",
      "details":"ऑर्डर का विवरण",
      "orderdetails":"ऑर्डर का विवरण",
      "porduct_list":"उत्पादों की सूची",
      "stock":"शेयर सूची",
      "battery":"बैटरी ",
      "motor":"मोटर ",
      "control":"नियंत्रक ",
      "other":"अन्य",
      "sold_record":"बिके रिकॉर्ड",
      "warranty_title":"गारंटी ",
      "warranty_policy":"वारंटी नीति",
      "warranty_terms":"वारंटी शर्तें",
      "warrenty_claim":"वारण्टी दावे",
      "service":"सेवा अभिलेख",
      "s_list":"सेवा सूची",
      "w_list":"वारंटी सूची",
      "o_list":"खुले दावे",
      "c_list":"बंद दावे",
      "w_detail":"वारंटी विवरण",
      "closed_service":"बंद सेवाएं",
      "open_service":"खुली सेवाएं",
      "s_detail":"सेवा विवरण",
      "warranty_c":"वारंटी का दावा",
      "vehicle_forms":"वाहन अद्यतन प्रपत्र",
      "temp_rc":"अस्थायी। आरसी नंबर",
      "submit":"जमा करना",
      "poof":"आईडी प्रूफ छवि",
      "update":{
        "chassis_no":"चेसिस नंबर",
        "battery_no":"बैटरी संख्या",
        "charger_no":"चार्जर संख्या",
        "controller_no":"नियंत्रक संख्या",
        "converter_no":"कन्वर्टर नंबर",
        "differential_no":"विभेदक संख्या",
        "fm_no":"एफ.एम. संख्या",
        "front_shocker_no":"फ्रंट शॉकर नंबर",
        "horn_no":"हॉर्न नंबर",
        "ignition_lock_no":"इग्निशन लॉक नंबर",
        "motor_no":"मोटर संख्या",
        "rim_no":"रिम संख्या",
        "speedometer_no":"स्पीडोमीटर संख्या",
        "throttle_no":"थ्रॉटल नंबर",
        "tyre_no":"टायर संख्या"
      },
      "soldForm":{
        "title":"ग्राहक प्रपत्र",
        "title1":"सेवा प्रपत्र",
        "doc_no":"दस्तावेज़ संख्या",
        "doc_type":"आईडी प्रूफ",
        "id":"आईडी प्रूफ"
      },
    },

    "users":{
      "doc":"दस्तावेज़",
    "title":"उपयोगकर्ताओं",
    "ev":"आपका ईवी",
    "order":"आदेश इतिहास",
    "detail":"सेवा विवरण",
    "issues":"सेवा के मुद्दे",
    "w_detail":"वारंटी विवरण",
    "service":"सेवाएं",
    "types":"सेवा प्रकार",
    "documents":"दस्तावेज़",
    "services":{
    "want":'कृपया अपनी सेवा की पुष्टि करें',
    "confirm":"आपकी सेवा की पुष्टि है"
    },
    "history":"सेवा इतिहास",
    "breakdown":"टूटने की सेवा",
    "primitve":"निवारक सेवा"
  },
  "warranty":{
    "open":"वारंटी ओपन",
    "closed":"वारंटी बंद",
    "create":"वारंटी दावा बनाएँ"
  },
  "services":{
    "open":"खुली सेवाएं",
    "closed":"बंद सेवाएं"
  },
  "francisee":{
    "title":"चार्जर फ्रेंचाइजी",
     "out":"उत्पाद सबमिट करें",
     "check":"चेक आउट",
     "upload":"भुगतान प्रमाण अपलोड करें",
   },

  
    
 },
 

});

export const setLocale = (locale) => {
const prevTranslations = { ...strings.getContent() };
const newTranslations = {};

Object.keys(locale).forEach((langCode) => {
  newTranslations[langCode] = {
      ...(prevTranslations && Object.keys(prevTranslations)
        ? prevTranslations[langCode]
        : {}),
      ...locale[langCode],
    };
  });
  strings.setContent(newTranslations);
};
export const TranslationContext = React.createContext(strings);