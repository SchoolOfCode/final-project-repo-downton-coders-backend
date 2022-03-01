import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import user from '../models/usersModel.js'
//import UnauthenticatedError from '../errors/unauthenticated.js'

const protect = asyncHandler(async (req, res, next) => {
    // const authHeader = req.headers.authorization
    // if(!authHeader || !authHeader.startsWith('Bearer')){
    //     throw new  UnauthenticatedError('Invalid Authentication')
    // }

    // const token = authHeader.split(' ')[1]
    // try {
    //     //verify token
    //     const payload = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

    //     //get user from token
    //     req.user = {UserId: payload.UserId, username: payload.username}
    //      next()
    // } catch (error) {
    //     console.log(error)
    //     res.status(401)
    //     throw new  UnauthenticatedError('Not Authorized')
       
    // }
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       //get token from header
        token = req.headers.authorization.split(' ')[1]
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