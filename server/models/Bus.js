import { model,Schema } from "mongoose";

const busSchema={
    
    no:{
        type:Number,
        required:true      
    },
    city:{
        type:String,
        required:true
    }
}

const Bus = model('Bus',busSchema);
export default Bus;