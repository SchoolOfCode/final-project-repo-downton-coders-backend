
import user  from '../models/users.js'


 export const getUsers = async (req, res) =>{
     const User = await user.find()
    res.status(200).json(User)
}

// async function (req, res, next) {

//   })


export const createUser = async (req, res) => {
    const name = await req.body.name;
    const surname = await req.body.surname;
    const username = await req.body.username;
    const age = await req.body.age;
    const email = await req.body.email;
    const hobbies = await req.body.hobbies;
    const newUser = await user.create({
      "name": name,
      "surname": surname,
      "username": username,
      "age": age,
      "email": email,
      "hobbies": hobbies
    })
    res.send({"newUser": newUser})
    res.status(201).json({message: 'create users'})
}

