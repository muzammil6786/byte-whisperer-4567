const access = (...roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        }else{
            res.status(401).send({error:"Not authorized"});
        }
    }
}