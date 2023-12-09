import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {loadShuttle} from '../actions/shuttleActions'
import '../css/shuttledetails.css'

const ShuttleDetails = ({match , history}) => {

    const id = match.params.id;

    const dispatch = useDispatch();

    const getShuttle = useSelector(state => state.getShuttle);
    const {loading , shuttle} = getShuttle;

    const [seats , setSeats] = useState(1);

    const userLogin = useSelector(state => state.userLogin);
    const {userData} = userLogin

    useEffect(
        () => {
            dispatch(loadShuttle(id))
        }
    , [dispatch , id])

    const handleSeatChange = (e) => {
        setSeats(Number(e.target.value));
    }

    const handleSeatsSelection = (e) =>{

        if(userData)
            history.push(`/shuttle/${shuttle._id}/proceed?seats-${seats}`)
        else {
            history.push(`/login?/shuttle/${shuttle._id}/proceed?seats-${seats}`)
        }
        console.log(seats);
    
    }

    return (
        (!loading && 
        <>
        <div className="goback container">
            <Link className="back" to='/'><i className="fas fa-arrow-circle-left"></i> Go Back</Link>
        </div>
        <section id="shuttleDetails">
            <div className="left">
                <p className="title">Shuttle Details</p>
                <div className="basic">
                    <p className="name">Name : {shuttle.name}</p>
                    <p className="number">Number : {shuttle.number}</p>
                    <p className="total"><em>Total Travel Durating</em> : {`${shuttle.duration.split(':')[0]} hr ${shuttle.duration.split(':')[1]}m `}</p>
                    <p className="price">Price: <i className="fas fa-rupee-sign"></i> {shuttle.price}</p>
                </div>
                <hr />
                    <div className="fromDetails">
                        <p className="title"><i classNam="fas fa-plane-departure"></i> OnBoarding Details</p>
                        <p className="onboard-location"><i className="fas fa-place-of-worship"></i> <em>Place</em> : {shuttle.from}</p>
                        <p className="onboard-date">
                            <i className="fas fa-calendar-week"></i> <em>Date</em> : {shuttle.fromDate ? shuttle.fromDate.substring(0 , 10) : '12-12-2020'}
                        </p>
                        <p className="onboard-date">
                            <i className="fas fa-clock"></i> <em>Time</em> : {shuttle.fromTime}
                        </p>
                    </div>
                    <hr />
                    <div className="toDetails">
                        <p className="title"><i classNam="fas fa-plane-arrival"></i> OffBoarding Details</p>
                        <p className="onboard-location"><i className="fas fa-place-of-worship"></i> <em>Place</em> : {shuttle.to}</p>
                        <p className="onboard-date">
                            <i className="fas fa-calendar-week"></i> <em>Date</em> : {shuttle.toDate ? shuttle.toDate.substring(0 , 10) : '12-12-2020'}
                        </p>
                        <p className="onboard-date">
                            <i className="fas fa-clock"></i> <em>Time</em> : {shuttle.toTime}
                        </p>
                    </div>
                    <hr />
            </div>
                        <div className="right">
                <p className="seats title">Seating Numbers</p>
                <img src="/images/air-seats.jpg"></img>
            </div>
            <div className="start-booking">
            <p className="title">Start Booking Now !!</p>
            <div className="form-container">
                <form>
                    <label htmlFor="seats" className="seats-label">Select the No of seats you would like to book</label>
                    <select onChange={handleSeatChange} value={seats}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={handleSeatsSelection} className="seats-button"> Next </button>
                </form>
                </div>
                <div className="note">
                    <p className="note-title"><em>Note :</em></p>
                    <ul>
                        <li>Seat Number follows as: <i>Row_Name Row_Number (Ex - A16)</i></li>
                        <li>Passenger must check-in 2 hours prior to the onBoarding Time </li>
                        <li>Maximum number of bookings/account is limited to 5</li>
                    </ul>
                </div>
            </div>

        </section></>)
    )
}

export default ShuttleDetails
