const Manager = require("../models/manager")
const {check, validationResult} = require("express-validator")
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")


exports.signup = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const manager = new Manager(req.body);
    manager.save((err, manager)=>{
        if(err){
            return res.status(400).json({
                err: "Couldn't save your data in db!"
            })
        }
        res.json({
            name: manager.name,
            email: manager.email,
            id: manager._id
        })
    })
}

exports.signin = (req,res) => {
    const errors = validationResult(req)
    const {email, password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    Manager.findOne({email}, (err, manager)=>{
        if(err){
            res.status(400).json({
                error: "Account Not Found Check your credentials!"
            })
        }
        
        if(!manager.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match the records!"
            })
        }

        //token creation
        const token = jwt.sign({_id: manager._id}, process.env.SECRET)
        res.cookie("token",token, {expire: new Date() + 7});

        //send response
        const {_id, email} = manager;
        return res.json({token, manager:{_id, email}})

    })
}

exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.json({
        message: "Signed out successfully!"
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    requestProperty: "auth",
    algorithms: ['HS256'] 
})