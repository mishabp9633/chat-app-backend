import  mongoose  from 'mongoose';
mongoose.set('strictQuery', false);

const connection_string =
  "mongodb://127.0.0.1:27017/Chat-app";

  export async function initialize(){
    try{
         await mongoose.connect(connection_string)
            
            console.log("db connected");
        }catch(err){
          console.log('mongoDB connection error:', err);
           throw err    
    }
}

  