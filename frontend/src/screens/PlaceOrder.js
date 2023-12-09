import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePassengerDetails, loadShuttle } from '../actions/shuttleActions'
import { createOrder } from '../actions/orderActions'
import Steps from '../Components/Steps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import '../css/placeorder.css'

const PlaceOrder = ({history}) => {

    const Passengers = useSelector(state => state.passengers);
    const {loading , passengers } = Passengers;

    const shuttleId = passengers[0] ? passengers[0].shuttle : undefined;

    const dispatch = useDispatch();

    const getShuttle = useSelector(state => state.getShuttle);
    const {loading : loadingShuttle , shuttle} = getShuttle;

    const createdOrder = useSelector(state => state.createdOrder);
    const { loading : loadingCreateOrder , success , order} = createdOrder;

    const userLogin = useSelector(state => state.userLogin);
    const {userData} = userLogin;

    const billingAddress = useSelector(state => state.billingAddress);
    const { address} = billingAddress

    const paymentMethod = useSelector(state => state.paymentMethod);
    const { method} = paymentMethod


    let totalPrice;
    let taxPrice;

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
            dispatch({type : ORDER_CREATE_RESET})
        } else {
        if(shuttleId)
        dispatch(loadShuttle(shuttleId))
        }
    } , [shuttleId , dispatch , totalPrice , success ])

    if(!loadingShuttle ){
        totalPrice = (passengers.length * shuttle.price).toFixed(2);
        taxPrice = (totalPrice * 0.18).toFixed(2);
    }

    const handleOrder = () => {
        if(!loadingShuttle )
        console.log(billingAddress)
        dispatch(createOrder({user : userData._id , shuttle : shuttleId , passengers , billingAddress : address , paymentMethod : method.paymentMethod ,  taxPrice , totalPrice , totalPassengers : passengers.length }))
    }

    return (
        <>
            <Steps step1 step2 step3 step4 />
            <section id="order-page">
                <div id="left">
                    <div className="billing">
                    <p className="title">Billing</p>
                    <p className="value">Address : Antariksh Bhavan, New BEL Road, Bengaluru - 560 231, Karnataka, India</p>
                    <hr />
                    </div>
                    <div className="payment-method">
                    <p className="title">PAYMENT METHOD</p>
                    <p className="value">Method : Netbanking</p>
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
                                <td></td>
                                </tr>
                        </thead>
                        <tbody>
                            {!loading && passengers.map(passenger => 
                            <tr key={passenger.seat} className="item">
                                <td>{passenger.name}</td>
                                <td>{passenger.age}</td>
                                <td>{passenger.seat}</td>
                                <td style={{cursor: "pointer"}}> <i onClick={() => dispatch(deletePassengerDetails(passenger.seat))} className="fas fa-trash"></i> </td>
                            </tr>  
                            )}
                        </tbody>
                    </table>
                    <hr />
                    {!loadingShuttle && shuttleId &&
                        <> 
                        <p className="title">Shuttle Details</p>
                        <div className="shuttle-details-container">
                                <p className="name">Name : {shuttle.name}</p>
                                <p className="name">Number : {shuttle.number}</p>
                                <p className="name">Price : {shuttle.price}</p>
                                <p className="name">From: {shuttle.from}</p>
                                <p className="name">To : {shuttle.to}</p>
                                <p className="name">OnBoarding Time : {shuttle.fromTime}</p>
                                <p className="name">OffBoarding Time : {shuttle.toTime}</p>
                                <p className="name">Onboarding Date : {shuttle.fromDate ? shuttle.fromDate.substring(0, 10) : '12-12-2020'}</p>
                                <p className="name">Offboarding Date : {shuttle.toDate ? shuttle.toDate.substring(0, 10) : '13-12-2020'}</p>
                        </div>
                        </>
                    }
                    </div>
                </div>
                <div id="right">
                    <div className="title">
                    Order Summary
                    </div>
                    <div className="items-summary row">
                    <p className="value">Total Passengers</p>
                    <p className="value">{passengers.length}</p>
                    </div>

                    <div className="tax-summary row">
                    <p className="value">Tax</p>
                    <p className="value">{!loadingShuttle && taxPrice}</p>
                    </div><div className="total-summary row">
                    <p className="value">total</p>
                    <p className="value">{!loadingShuttle && totalPrice}</p>
                    </div>
                    <button onClick={handleOrder} className="submit">Place order</button>
                </div>
                </section>

        </>
    )
}

export default PlaceOrder