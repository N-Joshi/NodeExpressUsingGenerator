var mongoose = require('mongoose')
var mongoSchema = mongoose.Schema //allows us to create entity 
var friends = new mongoSchema({
    "name": String,
    "location": String,
    "year": Number
},
{
    versionKey: false 
});



module.exports = mongoose.model('friends', friends)  //name of collection in mongodb then link with the schema that we created