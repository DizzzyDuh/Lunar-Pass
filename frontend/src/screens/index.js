import React , {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { loadShuttles } from '../actions/shuttleActions'
import {Link} from 'react-router-dom'
import '../css/index.css'

const Index = () => {

    const dispatch = useDispatch();

    const getShuttles = useSelector(state => state.getShuttles);
    const {loading , shuttles} = getShuttles;

    useEffect(
        () => {
            dispatch(loadShuttles())
        }
    , [dispatch])

    return (
    <section id="index">
        <h1 style={{color: 'white'}}>All the Availble Shuttles</h1>
                <section id="shuttlesList">
        {loading ? <h1>Loading......</h1> : 

            !loading && shuttles.reverse().map(shuttle => (
            <div key={shuttle._id} className="container shuttlesList-container">
                <div className="logo fa-2x"><i classNam="fas fa-plane"></i></div>
                <div className="details">
                    <p className="shuttleTitle">{shuttle.name}</p>
                    <p className="shuttleNo">{shuttle.number}</p>
                </div>
                <div className="shuttleDetails">
                    <div className="from">
                        <p className="from-title title">From</p>
                        <p className="location">{shuttle.from}</p>
                        <p className="from-date date">{shuttle.toDate ? shuttle.toDate.substring(0 , 10) : '12-03-2020'}</p>
                        <p className="time">({shuttle.fromTime})</p>
                    </div>
                    <div className="to">
                        <p className="to-title title"> To</p>
                        <p className="location">{shuttle.to}</p>
                        <p className="to-date date">{shuttle.toDate ? shuttle.toDate.substring(0 , 10) : '12-03-2020'}</p>
                        <p className="time">({shuttle.toTime})</p>
                    </div>
                </div>
                <div className="onBoardTime">
                <p className="time">{`${shuttle.duration.split(":")[0]}h ${shuttle.duration.split(":")[1]}min`}</p>
                </div>
                <div className="price">
                    <p className="price">&#8377; {shuttle.price}</p>
                    <Link to={`/shuttle/${shuttle._id}`}><button className="details">More</button></Link>
                </div>
            </div>
            ))}
    </section>
    </section>
    )
}

export default Index
