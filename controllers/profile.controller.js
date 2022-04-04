exports.current_user=(req,res)=>{
    return res.status(200).send({
        message:'User data successfully fetched',
        data:req.user
    });
}