const jwt = require('jsonwebtoken');

const createJwt = ({payload})=>{
    if (!payload) throw new Error("payload is required");

 return jwt.sign(payload,process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_LIFETIME
})

}

const isTokenValid =({token})=>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid Token");
    }
};

const attachCookiesToResponse = ({res,user})=>{
    if (!user) throw new Error("User payload is missing when attaching cookies");
    const token = createJwt({payload: user});
    const oneDay = 1000*60*60*24
    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now()+oneDay),
        signed:true
    })
}

module.exports ={createJwt,isTokenValid,attachCookiesToResponse}