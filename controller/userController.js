import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import user  from '../models/usersModel.js'


 export const getAllUsers = asyncHandler( async (req, res) =>{
     const User = await user.find()
    res.status(200).json(User)
})

// async function (req, res, next) {

//   })


// export const createUser = asyncHandler(async (req, res) => {
//     const name = await req.body.name;
//     const surname = await req.body.surname;
//     const username = await req.body.username;
//     const age = await req.body.age;
//     const email = await req.body.email;
//     const hobbies = await req.body.hobbies;
//     const newUser = await user.create({
//       name: name,
//       surname: surname,
//       username: username,
//       age: age,
//       email: email,
//       hobbies: hobbies
//     })
//     res.send({"newUser": newUser})
//     res.status(201).json({message: 'create users'})
// })


export const registerUser  = (async(req, res) => {
  const {name, surname, username, age, email, password, hobbies} = req.body

  if(!name || !surname || !username || !age || !email  || !password || !hobbies ){
    res.status(400)
    throw new Error('Please add all field')
  }

  //check if user exists
  const userExists = await user.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error({message:'user already exist'})
  }
  //hash user password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const User = await user.create({
    name,
    surname,
    username,
    age,
    email,
    password: hashedPassword,
    hobbies,
  })
  if(User){
    res.status(201).json({
      _id: User.id,
      name: User.name,
      surname: User.surname,
      username: User.username,
      email: User.email,
      password: hashedPassword,
      token: generateToken(User._id)
    })
  }else{
    res.status(400)
    throw new Error({message: 'Invalid User data'})
  }


})
export const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  //check user email
  const User = await user.findOne({email})

  if(User &&(await bcrypt.compare(password, User.password))){
    res.json({
      _id: User.id,
      name: User.name,
      surname: User.surname,
      username: User.username,
      email: User.email,
      token: generateToken(User._id)
      
    
    })
  }else{
    res.status(400)
    throw new Error({message: 'Invalid User Credentials'})
  }

})

export const getUser = asyncHandler(async(req, res) =>{
  const {_id, name, surname, username, email} = await user.findById(req.User.id)
  res.status(200).json({
    id: _id,
    name,
    surname,
    username,
    email
  })
  
})

export const updateUser = asyncHandler(async(req,res) => {
 const User = await user.findById({_id:req.params.id})
 User.username = req.body.username,
 User.email = req.body.email,
 User.age = req.body.age
 const updatedUser = await User.save()
 res.json(updatedUser)
  

})

export const deleteUser = asyncHandler(async(req, res) => {
  const User = await user.findById(req.params.id)
  if(id === User.id){
    res.status(200).json({
      id: _id,
      name: User.name,
      surname: User.surname,
      username:User.username,
      email: User.email

    })
  }else {
    res.status(403)
    throw new Error('Invalid Request')
  }
  const deletedUser = await User.remove()
  res.json(deletedUser)
})

//generate jwt token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET_TOKEN, {expiresIn: '30d'})
}


