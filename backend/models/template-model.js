const mongoose = require('mongoose')


const templateschema = new mongoose.Schema({
    templateurl:{
        type:String,
        required:[true,'templateurl is required']
    }
})

const Template = mongoose.model('Template',templateschema)

module.exports = Template