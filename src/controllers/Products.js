const express = require('express');
const mongoose = require('mongoose');
const Product = require('../Model/Products');
const {StatusCodes} = require('http-status-codes')

const createProduct = async(req,res)=>{
    const{
        name,
        category,
        quantity,
        price,
    }= req.body
    
    if(!name || !category || !quantity || !price){
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please fill all fields'})
    }

    //create product
    const product = await Product.create({
        name,
        category,
        quantity,
        price
    });

    res.status(StatusCodes.CREATED).json(product)
}

//Get Product
const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find()
        res.status(StatusCodes.OK).json(products)
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
}

const getOneProduct = async(req,res)=>{
    try{
        const product = await Product.findOne({name: req.params.name})
        res.status(StatusCodes.OK).json(product)
    }
    catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
}
//delete Product
const deleteProduct = async(req,res)=>{
    const product = await product.findOne({name: req.params.name})
    if (!product){
        res.status(StatusCodes.BAD_REQUEST).json({message: "product not found"})
    }
    await Product.findOneAndDelete({name: req.params.name});
    res.status(StatusCodes.OK).json({message: "product deleted succesfully"})
}

//update Product
const UpdateProduct = async(req,res)=>{
    const{
        name,
        category,
        quantity,
        price
    }=req.body
    const product = await Product.findOne({name: req.params.Name})
    if (!product){
        res.status(StatusCodes.BAD_REQUEST).json({message: "product not found"})
    }

    //Update product
    const updatedProduct = await product.findOneAndUpdate({name: req.params.name},
        {
            name,
            category,
            quantity,
            price
        }
    )
    res.status(StatusCodes.OK).json({message: "product updated succesfully"})
}

module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct,
    UpdateProduct
}