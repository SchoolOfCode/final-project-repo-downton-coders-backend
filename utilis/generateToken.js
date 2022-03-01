 import jwt from 'jsonwebtoken'
 
 const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {expiresIn: process.env.JWT_LIFETIME})
  }


  export default generateToken