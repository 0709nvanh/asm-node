import User from '../models/user'
// import 
import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
    const { email, username, password } = req.body
    try {
        const existUser = await User.findOne({ email }).exec();
        if(existUser){
            return res.json({
                message: "User existed"
            })
        }

        const user = await new User({ email, username, password}).save()

        return res.json({
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        })
    } catch (error) {
      res.status(400).json({
          msg: "Error"
      })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec()
        console.log('user', user)

        if(!user){
            return res.json({
                message: "Do not find user"
            })
        }

        if(!user.authenticate(password)){
            return res.json({
                message: "Password is incorrect"
            })
        }

        const token = jwt.sign({_id: user._id}, 'vananh', { expiresIn: 60*60 })
        return res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const user = await User.find().exec()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const removeUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id}).exec()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

