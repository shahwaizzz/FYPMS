const mongoose = require("mongoose")

const  finalCertificateSchema = new mongoose.Schema({
    project:{
        type: mongoose.Types.ObjectId,
        ref:"projects",
        // required:[true,"please provide project ID"],
        maxlength:1,
    },
    supervisor:{
        type: mongoose.Types.ObjectId,
        ref:"supervisors",
        // required:[true,"please provide supervisor ID"],
        maxlength:1,
    },
    0:{
        type: String,
    },
    1:{
        type: String,
    },
    2:{
        type: String,
    },
    fyprequirements:{
        type: String,
        enum: {
        values: ['Full Complete','Partial Complete', 'Not Complete'],
        default: 'Pending'    
        }
    },
    usecasess:{
        type: String,
        enum: {
        values: ['Full Complete','Partial Complete', 'Not Complete'],
        default: 'Pending'    
        }
    },
    funrequirements:{
        type: String,
        enum: {
        values: ['Full Complete','Partial Complete', 'Not Complete'],
        default: 'Pending'    
        }
    },
    diagrams:{
        type: String,
        enum: {
        values: ['Full Complete','Partial Complete', 'Not Complete'],
        default: 'Pending'    
        }
    },
    commentmember1:{
        type: String,
    },    
    commentmember2:{
        type: String,
    },    
    commentmember3:{
        type: String,
    },    
    feedback:{
        type: String,
    }, 
})

module.exports = mongoose.model("FinalCertificate",finalCertificateSchema)