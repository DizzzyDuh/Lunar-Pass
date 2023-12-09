import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShuttle, loadShuttles } from '../actions/shuttleActions';
import { SHUTTLE_DELETE_RESET } from '../constants/shuttleConstants';
import '../css/allshuttles.css'

const AllShuttles = ({history}) => {

    const dispatch = useDispatch();

    const getShuttles = useSelector(state => state.getShuttles);
    const {loading , shuttles} = getShuttles;

    const deletedShuttle = useSelector(state => state.deleteShuttle);
    const {loading:loadingDelete , success} = deletedShuttle;


    useEffect(
        () => {
            if(success){
                dispatch(loadShuttles());
                dispatch({type : SHUTTLE_DELETE_RESET})
            } else {
                if(!shuttles)
                    dispatch(loadShuttles())
            }
        }
    , [dispatch , shuttles , success])

    const handleDelete = (id) => {
        if(window.confirm('Are you that you want to delete the shuttle ?')){
            dispatch(deleteShuttle(id));
        }
    }


    return (
        !loading &&
        <>
            <section id="all-shuttles">
                <p className="title">All Shuttles</p>
                <button onClick={() => history.push('/admin/shuttle/add/new')} className="createAccount">Create Shuttle</button>
                    <table>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>FROM</td>
                            <td>TO</td>
                            <td>PRICE</td>
                            <td>FROM DATE AND TIME</td>
                            <td>TO DATE AND TIME</td>
                            <td />
                        </tr>
                        </thead>
                        <tbody>
                            {shuttles.reverse().map(shuttle => 
                                <tr key={shuttle._id}>
                                    <td>{shuttle._id}</td>
                                    <td>{shuttle.name}</td>
                                    <td>{shuttle.from}</td>
                                    <td>{shuttle.to}</td>
                                    <td>Rs.{shuttle.price}</td>
                                    <td>{shuttle.fromDate ? shuttle.fromDate.substring(0, 10) : '12-06-12'}<br />{shuttle.fromTime}</td>
                                    <td>{shuttle.toDate ? shuttle.toDate.substring(0, 10) : '12-06-12'}<br />{shuttle.toTime}</td>
                                    <td className="icons"><i onClick={() => {handleDelete(shuttle._id)}} className="fas fa-trash"></i><i onClick={() => history.push(`/admin/shuttle/${shuttle._id}`)} className="fas fa-edit"></i></td>
                                </tr>                        
                            )
                            }
                        </tbody>
                    </table>
            </section>
        </>
    )
}

export default AllShuttles
