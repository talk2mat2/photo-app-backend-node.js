const mongoose = require("mongoose");

const { Schema } = mongoose;


const MessagesSchema = new Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        onModel: {
            type: String,
            require : true,
            enum: ['Users', 'photographerSchema']
          }
    },
    title : {type : String},
    body : {type : String}
});


module.exports = mongoose.model("MessagesSchema", MessagesSchema);
