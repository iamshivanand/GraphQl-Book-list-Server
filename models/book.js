const mongoose=require("mongoose");
const Schema =mongoose.Schema;


const bookSchema=new Schema({
    name:String,
    genre:String,
    authorId:String
});

module.exports=mongoose.model('Book',bookSchema);
//from the above command we means that we are going to have a collection(Book) 
//which is going to have a object looking like booKSchema