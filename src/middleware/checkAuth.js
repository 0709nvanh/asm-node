import expressJWT from 'express-jwt'

export const requiredLogIn = () => expressJWT({
    secret: 'vananh',
    algorithms: ['HS256'],
    requestProperty: 'auth'
})

export const isAuth = (req, res, next) => {
    const user = req.profile._id == req.auth._id
    if(!user){
        return res.status(402).json({
            msg: "Ban khong duoc truy cap"
        })
    }
    next()
}

export const isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(401).json({
            msg: "Ban khong la admin, "
        })
    }
    next()
}
