
import asyncHandler from 'express-async-handler'
import user  from '../models/usersModel.js'
import generateToken from '../utilis/generateToken.js'

export const registerUser  = asyncHandler(async(req, res) => {
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

  const User = await user.create({
    name,
    surname,
    username,
    age,
    email,
    password,
    hobbies,
  })
  if(User){
    res.status(201).json({
      _id: User.id,
      name: User.name,
      surname: User.surname,
      username: User.username,
      email: User.email,
      age: User.age,
      password: User.password,
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

  if(User &&(await User.comparePassword(password))){
    res.json({
      _id: User.id,
      name: User.name,
      surname: User.surname,
      username: User.username,
      email: User.email,
      age: User.age,
      token: generateToken(User._id)
      
    
    })
  }else{
    res.status(400)
    throw new Error({message: 'Invalid User Credentials'})
  }

})


 export const updateUserProfile = asyncHandler(async (req, res) => {
  const User = await user.findById(req.User._id);

  if (User) {
    User.name = req.body.name || User.name;
    User.surname = req.body.surname || User.surname
    User.email = req.body.email || User.email;
    if (req.body.password) {
      User.password = req.body.password;
    }

    const updatedUser = await User.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


// export const updateUserPassword = asyncHandler(async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   if (!oldPassword || !newPassword) {
//     throw new Error('Please provide both values');
//   }
//   const User = await user.findOne({ _id: req.User.UserId });

//   const isPassword = await User.comparePassword(oldPassword);
//   if (!isPassword) {
//     throw new Errorr('Invalid Credentials');
//   }
//   User.password = newPassword;

//   await User.save();
//   res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
// })


// export const deleteUser = asyncHandler(async(req, res) => {
//   const User = await user.findById(req.params.id)
//   if(id === User._id){
//     res.status(200).json({
//       id: _id,
//       name: User.name,
//       surname: User.surname,
//       username:User.username,
//       email: User.email

//     })
//   }else {
//     res.status(404)
//     throw new Error('Invalid Request')
//   }
//   const deletedUser = await User.remove()
//   res.json(deletedUser)
// })

//generate jwt token




