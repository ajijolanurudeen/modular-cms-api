
const User = require('../Model/User');
const {StatusCodes} = require('http-status-codes');
const { createUserPayload } = require('../utilities/createUserPayload');

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

    const Login = async(req,res)=>{
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email and password are required" });
            }
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
            }
    
            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
            }
    
            // Send cookie + response
            createUserPayload({ res, user });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    };


    const logout = async(req,res)=>{
        res.cookie('token','logout',{
            httpOnly: true,
            expires: new Date(Date.now()+1000)
        })
        res.status(StatusCodes.OK).json({msg:"user logged out"})
    }

module.exports = {
    register,
    Login,
    logout
}