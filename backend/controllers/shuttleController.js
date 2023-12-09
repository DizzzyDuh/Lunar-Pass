import asyncHandler from 'express-async-handler'
import express from 'express'
import mongoose from 'mongoose'
import Shuttle from '../models/shuttleModel.js'

export const addNewShuttle = asyncHandler(async(req , res) => {
    const {name , number , from , to , fromDate , toDate , fromTime , toTime , duration , stops , price} = req.body;

    try {
        const shuttle = await Shuttle.create({
            name,
            number,
            from,
            to,
            fromDate : new Date(fromDate),
            toDate : new Date(toDate),
            fromTime,
            toTime,
            duration,
            price
        })

        res.json(shuttle);
        
    } catch (error){
        res.status(500)
        throw new Error(error);
    }

})

export const getShuttles = asyncHandler(async(req, res) => {
    
try {
    const shuttles = await Shuttle.find({})
    res.json(shuttles);
} catch (error){
    res.status(500)
    throw new Error();
}

});

export const getShuttle = asyncHandler(async(req, res) => {

    const id = req.params.id
    
    try {
        const shuttles = await Shuttle.findById(id)
        res.json(shuttles);
    } catch (error){
        res.status(500)
        throw new Error();
    }
});


export const updateShuttle = asyncHandler(async(req , res) => {

    const id = req.params.id;

    const shuttle = await Shuttle.findById(id);

    const {name , number , from , to , fromDate , toDate , fromTime , toTime , duration , price} = req.body;

    try {
        const shuttleUpdated = await Shuttle.findByIdAndUpdate( id , {
            name,
            number,
            from,
            to,
            fromDate : new Date(fromDate),
            toDate : new Date(toDate),
            fromTime,
            toTime,
            duration,
            price
        })

        res.json(shuttleUpdated);
    } catch (error){
        res.status(500)
        throw new Error(error);
    }

})

export const deleteShuttle = asyncHandler(async(req , res) => {

    const id = req.params.id;

    const shuttle = await Shuttle.findById(id);

    if(shuttle) {
        const shuttleUpdated = await Shuttle.findByIdAndRemove(id);
        res.json(shuttleUpdated);
    } else {
        res.status(500)
        throw new Error(error);
    }

})