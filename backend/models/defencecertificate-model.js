const mongoose = require('mongoose');

const DefencecertificateSchema = new mongoose.Schema({
    project:{
        type:mongoose.Types.ObjectId,
        ref:'projects',
        maxlength:1,
        required:[true, "Please provide project ID"]
    },
    comments: {
        type: String,
        required:[true, "Please provide comments"]
    }
});

module.exports = mongoose.model("DefenceCertificate",DefencecertificateSchema);