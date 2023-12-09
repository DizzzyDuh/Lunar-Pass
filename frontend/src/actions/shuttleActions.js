import axios from 'axios'
import { SHUTTLE_UPDATE_DISPATCH, SHUTTLE_UPDATE_SUCCESS , SHUTTLE_UPDATE_FAIL , LOAD_SHUTTLES_FAIL, LOAD_SHUTTLES_REQUEST, LOAD_SHUTTLES_SUCCESS, LOAD_SHUTTLE_FAIL, LOAD_SHUTTLE_REQUEST, LOAD_SHUTTLE_SUCCESS, SAVE_SEATS_DISPATCH, SAVE_SEATS_FAIL, SAVE_SEATS_SUCCESS, SHUTTLE_DELETE_DISPATCH, SHUTTLE_DELETE_SUCCESS, SHUTTLE_DELETE_FAIL, SHUTTLE_ADD_DISPATCH, SHUTTLE_ADD_SUCCESS, SHUTTLE_ADD_FAIL } from '../constants/shuttleConstants'

export const loadShuttles = () => async (dispatch) => {
    dispatch ({type : LOAD_SHUTTLES_REQUEST , loading : true})

    try {
        const {data} = await axios.get(`http://localhost:5000/api/shuttles/`)
        dispatch ({type : LOAD_SHUTTLES_SUCCESS , payload : data , loading : false})
    } catch (error) {
        dispatch({
            type : LOAD_SHUTTLES_FAIL,
            payload : error.message ? error.message : error
        })
    }
} 

export const loadShuttle = (id) => async (dispatch) => {
    dispatch ({type : LOAD_SHUTTLE_REQUEST , loading : true})

    try {
        const {data} = await axios.get(`http://localhost:5000/api/shuttles/${id}`)
        dispatch ({type : LOAD_SHUTTLE_SUCCESS , payload : data , loading : false})
    } catch (error) {
        dispatch({
            type : LOAD_SHUTTLE_FAIL,
            payload : error.message ? error.message : error
        })
    }
}

export const savePassengersDetails = (data) => async (dispatch) => {
        dispatch ({type : SAVE_SEATS_DISPATCH , loading: true})

    try {
        let items = [];

        items = localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')): [];
        items.push(data);

        console.log(JSON.parse(localStorage.getItem('passengers')))
        localStorage.setItem('passengers' ,JSON.stringify(items))

        dispatch ({type : SAVE_SEATS_SUCCESS , payload : items , loading : false})
    } catch(error) {
        dispatch({
            type : SAVE_SEATS_FAIL,
            payload : error.message ? error.message : error
        })
    }
}

export const deletePassengerDetails = (seatId) => async (dispatch) => {
        dispatch ({type : SAVE_SEATS_DISPATCH , loading: true})

    try {
        let items = [];

        items = localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')): [];
        items = items.filter(item => item.seat != seatId);

        console.log(items);
        localStorage.setItem('passengers' ,JSON.stringify(items))

        dispatch ({type : SAVE_SEATS_SUCCESS , payload : items , loading : false})
    } catch(error) {
        dispatch({
            type : SAVE_SEATS_FAIL,
            payload : error.message ? error.message : error
        })
    }
}

export const updateShuttle = (shuttle) => async (dispatch , getState) => {
    dispatch ({type : SHUTTLE_UPDATE_DISPATCH , loading: true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}};
        
        const {data} = await axios.put(`http://localhost:5000/api/shuttles/${shuttle.id}` , shuttle , header)

        dispatch ({type : SHUTTLE_UPDATE_SUCCESS , success : true , loading : false})
    } catch(error) {
        dispatch({
            type : SHUTTLE_UPDATE_FAIL,
            payload : error.message ? error.message : error
        })
    }   
}

export const deleteShuttle = (id) => async (dispatch , getState) => {
    dispatch ({type : SHUTTLE_DELETE_DISPATCH , loading: true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}};

        const {data} = await axios.delete(`http://localhost:5000/api/shuttles/${id}` , header)

        dispatch ({type : SHUTTLE_DELETE_SUCCESS , success : true , loading : false})
    } catch(error) {
        dispatch({
            type : SHUTTLE_DELETE_FAIL,
            payload : error.message ? error.message : error
        })
    }   
}

export const addShuttle = (shuttle) => async (dispatch , getState) => {
    dispatch ({type : SHUTTLE_ADD_DISPATCH , loading: true})

    try {

        const user = getState().userLogin.userData;

        const header = {headers : {'Authorization' : `Bearer ${user.token}`}};

        const {data} = await axios.post(`http://localhost:5000/api/shuttles/` , shuttle , header)

        dispatch ({type : SHUTTLE_ADD_SUCCESS , success : true , payload : data , loading : false})
    } catch(error) {
        dispatch({
            type : SHUTTLE_ADD_FAIL,
            payload : error.message ? error.message : error
        })
    }   
}