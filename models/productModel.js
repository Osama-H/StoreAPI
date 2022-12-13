const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'A Product Name Must Be Provided'],
        trim : true
    },
    price : { 
        type : Number,
        required : [true,'A Product Price Must Be Provided']
    },
    featured : {
        type : Boolean,
        default : false
    },
    rating : {
        type : Number,
        default : 4.5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    company : {
        type : String,
        enum : {
            values : ['ikea','marcos','liddy','ikea'],
            message : "{VALUE} Isn't Supported"
        }
    }
})

module.exports = mongoose.model('Product',productSchema)