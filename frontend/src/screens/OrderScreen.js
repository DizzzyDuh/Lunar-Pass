import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchOrder, updatedOrderToPaid} from '../actions/orderActions'
import '../css/paymentpage.css'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_FETCH_RESET, ORDER_PAID_RESET } from '../constants/orderConstants';
import { loadShuttle } from '../actions/shuttleActions';

const OrderScreen = ({match}) => {

    const id = match.params.id;

    const dispatch = useDispatch();

    const fetcOrder = useSelector(state => state.fetchOrder);
    const {loading , error , order } = fetcOrder;


    const updatedOrder = useSelector(state => state.updatedOrder);
    const {loading : loadingUpdate , order : updatedorder , success } = updatedOrder;



    useEffect(() => {
        if(!order || order._id !== id){
            dispatch(fetchOrder(id));
        } else {
            if(success){
                dispatch(fetchOrder(id));
                dispatch({type : ORDER_PAID_RESET})
            } 
        }
    } , [dispatch , id , success])

    let paypalamount;
    
    if(!loading){
        paypalamount = (order.totalPrice/74).toFixed(2)
        console.log(paypalamount)
    }

    const handlepaypalSuccess = (success) => {
        dispatch(updatedOrderToPaid(id , success));
        // dispatch(fetchOrder(id))
    }

    return (
            !loading ?          
            <section id="payment-page">
                <div id="left">
                    <div className="billing">
                    <p className="title">Billing</p>
                    <p className="value">{order.billingAddress.address} , {order.billingAddress.city}  {order.billingAddress.postalCode} , {order.billingAddress.country}</p>
                    <hr />
                    </div>
                    <div className="payment-method">
                    <p className="title">PAYMENT METHOD</p>
                    <p className="value">Method : {order.paymentMethod}</p>
                    {order.isPaid ? <p className="order-notification green">Payment has been successful </p> : <p className="order-notification red">Not paid</p>}
                    <hr />
                    </div>
                    <div className="order-items-container">
                    <p className="title">Passengers Details</p>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Age</td>
                                <td>SeatNo</td>
                                </tr>
                        </thead>
                        <tbody>
                            {(order.passengers).map(passenger => 
                            <tr key={passenger.seat} className="item">
                                <td>{passenger.name}</td>
                                <td>{passenger.age}</td>
                                <td>{passenger.seat}</td>
                            </tr>  
                            )}
                        </tbody>
                    </table>
                    <hr />
                         
                        {order.shuttle && <> <p className="title">Shuttle Details</p>
                        <div className="shuttle-details-container">
                                <p className="name">Name : {order.shuttle.name}</p>
                                <p className="name">Number : {order.shuttle.number}</p>
                                <p className="name">Price : {order.shuttle.price}</p>
                                <p className="name">From: {order.shuttle.from}</p>
                                <p className="name">To : {order.shuttle.to}</p>
                                <p className="name">OnBoarding Time : {order.shuttle.fromTime}</p>
                                <p className="name">OffBoarding Time : {order.shuttle.toTime}</p>
                                <p className="name">Onboarding Date : {order.shuttle.fromDate ? order.shuttle.fromDate.substring(0, 10) : '12-12-2020'}</p>
                                <p className="name">Offboarding Date : {order.shuttle.toDate ? order.shuttle.toDate.substring(0, 10) : '13-12-2020'}</p>
                        </div></> }
                    </div>
                </div>
                <div id="right">
                    <div className="title">
                    Order Summary
                    </div>
                    <div className="items-summary row">
                    <p className="value">Total Passengers</p>
                    <p className="value">{order.totalPassengers}</p>
                    </div>

                    <div className="tax-summary row">
                    <p className="value">Tax</p>
                    <p className="value">Rs {order.taxPrice}</p>
                    </div><div className="total-summary row">
                    <p className="value">total</p>
                    <p className="value">Rs {order.totalPrice}</p>
                    </div>
                    {!order.isPaid && <paypalButton amount={paypalamount} onSuccess = {handlepaypalSuccess}/>}
                </div>
                </section> : error ? <p>{error}</p> : <h1>Loading....</h1>
    )
}

export default OrderScreen