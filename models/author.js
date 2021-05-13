const mongoose=require("mongoose");
const Schema =mongoose.Schema;


const authorSchema=new Schema({
    name:String,
    age:Number,
   
});

module.exports=mongoose.model('Author',authorSchema);
//from the above command we means that we are going to have a collection(Author) 
//which is going to have a object looking like authorSchema