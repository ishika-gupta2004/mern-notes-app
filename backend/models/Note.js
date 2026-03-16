const mongoose = require ('mongoose');

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    tags:[String]
})

module.exports = mongoose.model("Note",noteSchema);