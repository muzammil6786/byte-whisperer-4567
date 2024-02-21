const jwt = require("jsonwebtoken");
require("dotenv").config()
const UsersModel = require("../models/users.model");

const auth = async (req, res, next) => {
   try {
        const token = req.header.autherization.split(" ")[1]; ;
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        const user = await UsersModel.findOne({ _id: decoded.userID });
        if(user){
            req.user = user;
            next();
        }else{
            res.status(401).send({error:"Please login again"});
        }
    }catch (error) {
        res.status(401).send({error:"Please login first"});
    }
}

module.exports = auth