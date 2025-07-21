
const User = require('../Model/User')
const {StatusCodes} = require('http-status-codes')

const register = async(req,res) =>{
    try{
        const{name,email,password}= req.body;
        if(!name || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All Fields are mandatory"})
        }
        const userExist = await User.findOne({email})
        if (userExist){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "User aleready exists"})
        }
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({message: "user created"})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

    // const Login = async(req,res)=>{
    //     const {email,password} = req.body;
    //         if (!email || !password ){
    //             return res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    //         }
    //     const user = await User.findOne({email})
    //     if(!user){
    //         return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid Credentials"})
    //     }
    //     const isPasswordCorrect = await User.comparePassword(password);
    //         if(!isPasswordCorrect){
    //             return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid Credentials"})
    //         }
    // }

module.exports = {
    register
}