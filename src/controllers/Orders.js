const express = require('express');
const mongoose = require('mongoose');
const Order = require('../Model/Orders');
const {StatusCodes} = require('http-status-codes')

const createOrder = async(req,res)=>{
    const{
        product,
        price,
        quantity,
        orderDate,
    }= req.body
    
    if(!product|| !price || !quantity || !orderDate){
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please fill all fields'})
    }

    //create order
    const order = await Order.create({
        // user: req.user._id,
        product,
        price,
        quantity,
        orderDate,
    });

    res.status(StatusCodes.CREATED).json(order)
}

//Get Orders
const getAllOrders = async(req,res)=>{
    try{
        const order = await Order.find()
        res.status(StatusCodes.OK).json(Order)
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to retrieve orders',
            error: error.message
        });
    }
}

const getOneOrder = async(req,res)=>{
    try{
        const order = await Order.findOne({_id: req.params._id})
        res.status(StatusCodes.OK).json(order)
    }
    catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to retrieve orders',
            error: error.message
        });
    }
}
//delete Order
const deleteOrder = async(req,res)=>{
    const order = await Order.findOne({name: req.params.name})
    if (!order){
        res.status(StatusCodes.BAD_REQUEST).json({message: "order not found"})
    }
    await Order.findOneAndDelete({name: req.params.name});
    res.status(StatusCodes.OK).json({message: "order deleted succesfully"})
}

//update Order
const UpdateOrder = async(req,res)=>{
    const{
        product,
        price,
        quantity,
        orderDate,
    }=req.body;

    const order = await Order.findOne({_id: req.params._id})
    if (!order){
        res.status(StatusCodes.BAD_REQUEST).json({message: "Order not found"})
    }

    //Update Order
    const updatedOrder = await Order.findOneAndUpdate({_id: req.params._id},
        {
            product,
            price,
            quantity,
            orderDate,
        }
    )
    res.status(StatusCodes.OK).json({message: "order updated succesfully"})
}

module.exports = {
    createOrder,
    getAllOrders,
    getOneOrder,
    deleteOrder,
    UpdateOrder
}