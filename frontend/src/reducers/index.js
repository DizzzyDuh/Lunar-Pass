import { combineReducers } from "redux"
import { addShuttleReducer , deleteShuttleReducer , getShuttleReducers, getShuttlesReducers, passengersDetails, updateShuttleReducer } from "./shuttleReducers"
import { fetchOrderReducer, orderCreateReducer, paidOrderReducer, savebillingReducer, savePaymentReducer, userOrdersReducers, usersOrdersReducers } from "./orderReducers"
import {userLoginReducer , userCreateReducer, getUserProfileReducer, userUpdateReducer, allUsersReducers, deleteUserReducers, getUserAdminReducer, updateUserReducer} from './userReducers'

const reducers = combineReducers({
    getShuttles : getShuttlesReducers,
    getShuttle : getShuttleReducers,
    passengers : passengersDetails,
    userLogin : userLoginReducer,
    userRegister : userCreateReducer,
    billingAddress : savebillingReducer,
    paymentMethod : savePaymentReducer,
    createdOrder : orderCreateReducer,  
    fetchOrder : fetchOrderReducer,
    updatedOrder : paidOrderReducer,
    getUser : getUserProfileReducer,
    updateUser : userUpdateReducer,
    userOrders : userOrdersReducers,
    allOrders : usersOrdersReducers,  
    allUsers : allUsersReducers,
    deleteUser :deleteUserReducers,
    userProfile : getUserAdminReducer,
    profileUpdate : updateUserReducer,
    updateShuttle : updateShuttleReducer,
    deleteShuttle : deleteShuttleReducer,
    addShuttle : addShuttleReducer,
})

export default reducers