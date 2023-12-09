import {LOAD_SHUTTLES_FAIL , LOAD_SHUTTLES_SUCCESS , LOAD_SHUTTLES_REQUEST, LOAD_SHUTTLE_REQUEST, LOAD_SHUTTLE_SUCCESS, LOAD_SHUTTLE_FAIL, SAVE_SEATS_DISPATCH, SAVE_SEATS_SUCCESS, SAVE_SEATS_FAIL, SHUTTLE_UPDATE_DISPATCH, SHUTTLE_UPDATE_SUCCESS, SHUTTLE_UPDATE_FAIL, SHUTTLE_UPDATE_RESET, SHUTTLE_DELETE_DISPATCH, SHUTTLE_DELETE_SUCCESS, SHUTTLE_DELETE_FAIL, SHUTTLE_DELETE_RESET, SHUTTLE_ADD_DISPATCH, SHUTTLE_ADD_SUCCESS, SHUTTLE_ADD_FAIL, SHUTTLE_ADD_RESET} from '../constants/shuttleConstants'

export const getShuttlesReducers = (state = {loading : true} , action) => {
    switch(action.type){
        case LOAD_SHUTTLES_REQUEST : 
            return {loading : true}
        case LOAD_SHUTTLES_SUCCESS :
            return {loading : false , shuttles : action.payload}
        case LOAD_SHUTTLES_FAIL :
            return {loading : false , error : action.payload}
        default :
            return state
    }
}

export const getShuttleReducers = (state = {loading : true} , action) => {
    switch(action.type){
        case LOAD_SHUTTLE_REQUEST : 
            return {loading : true}
        case LOAD_SHUTTLE_SUCCESS :
            return {loading : false , shuttle : action.payload}
        case LOAD_SHUTTLE_FAIL :
            return {loading : false , error : action.payload}
        default :
            return state
    }
}

export const passengersDetails = (state = { passengers : [] } , action) => {
    switch(action.type){
        case SAVE_SEATS_DISPATCH :
            return {loading : true}
        case SAVE_SEATS_SUCCESS :
            return {loading : false , passengers : action.payload}
        case SAVE_SEATS_FAIL : 
            return {loading : false , error : action.payload}
        default : 
            return state
    }
}

export const updateShuttleReducer = (state = {loading : true} , action) => {
    switch(action.type){
        case SHUTTLE_UPDATE_DISPATCH :
            return {loading : true}
        case SHUTTLE_UPDATE_SUCCESS :
            return {loading : false , success : true}
        case SHUTTLE_UPDATE_FAIL :
            return {loading : false }
        case SHUTTLE_UPDATE_RESET :
            return {}
        default :
            return state 
    }
}

export const deleteShuttleReducer = (state = {loading : true} , action) => {
    switch(action.type){
        case SHUTTLE_DELETE_DISPATCH :
            return {loading : true}
        case SHUTTLE_DELETE_SUCCESS :
            return {loading : false , success : true}
        case SHUTTLE_DELETE_FAIL :
            return {loading : false }
        case SHUTTLE_DELETE_RESET :
            return {}
        default :
            return state 
    }
}

export const addShuttleReducer = (state = {loading : true} , action) => {
    switch(action.type){
        case SHUTTLE_ADD_DISPATCH :
            return {loading : true}
        case SHUTTLE_ADD_SUCCESS :
            return {loading : false , success : true}
        case SHUTTLE_ADD_FAIL :
            return {loading : false }
        case SHUTTLE_ADD_RESET :
            return {}
        default :
            return state 
    }
}