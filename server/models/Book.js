import { model,Schema } from "mongoose";

const bookSchema={
    
    date:{
        type:Number,
        required:true      
    },
    city:{
        type:String,
        required:true
    }
}

const Booking = model('Booking',bookSchema);
export default Booking;
