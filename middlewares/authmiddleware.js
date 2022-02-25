import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import user from '../models/usersModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       //get token from header
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.token){
        //set token from cookies
        token = req.cookies.token
    }

    
    try {

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

        //get user from token
        req.User = await user.findById(decode.id).select('_password')

        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized')
        
    }

    {
        if(!token){
            res.status(401)
            throw new Error('Not authorized, No Token')
        }
    }

})

export default protect