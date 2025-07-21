const express = require('express')
const User = require('../Model/User')
const mongoose = require('mongoose')
const {StatusCodes} = require('http-status-codes')

const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(StatusCodes.OK).json({ users });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
};

const getOneUser = async(req,res)=>{
    try {
        const user = await User.findByEmail(req.User.Email);
        if(user){
            res.status(StatusCodes.OK).json 
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'failed to retrieve user',
            error: error.message
        })
    }
}

const updateUser = async(req,res)=>{
    const updateUser = await User.findByEmail(req.User.Email);

    if (User) {
        const {Name,Email,Password}= User;

        User.name = req.body.name,
        User.Email = req.body.Email,
        User.Password = req.body.Email

        const updatedUser = await User.save();
        res.status(StatusCodes.OK).json(updatedUser)
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({message: "User not found"})
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser
};