const notFound = (req,res)=>{
    res.status(404).json({
        message : "No Route Found."
    })
}

module.exports = notFound;