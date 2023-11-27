import express from "express";
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import Booking from "./models/Book.js"
import Bus from "./models/Bus.js"

const app = express();

app.use(express.json());

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    if (connection) {
        console.log(`MongoDB connected....💖`)
    }
};
connectDB();

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "server is running"
    })
})

app.post("/api/bookings", async (req, res) => {
    const { city, date } = req.body;
    const book = new Booking ({
        city,
         date
    })

try {
    const saveBook = await book.save();
    return res.status(201).json({
        success: true,
        data: { saveBook },
        message: "Booking created"

    });
}
catch (err) {
    return res.json({
        success: false,
        message: err.message,
    })
}
})

app.get("/api/bookings",async(req,res)=>{

    const bookticket = await axios.find();

    return res.status(204).json({
        success:true,
        data:bookticket,
        message:"Booking fetched"
    })
})

app.get("/api/bookings/:id",async(req,res)=>{
    const {id}=req.params;
     const booking= await Booking.find();
    return res.json({
        success:true,
        data:{
            id:id,
           booking
        },
        message:"Booking id fetched successfully"
    })
})

app.put("/api/bookings",async(req,res)=>{

    const {id}=req.params;

        const booking= await Booking.findById(id);
 
    return res.json({
        success:true,
        data:{
            id:id,
            booking
        },
        message:"Booking fetched successfully"
    })

})

app.patch('/api/bookings/:id' ,async (req,res)=>{

const {id} =req.params;

const booking= await Booking.findById(id);

    await booking.updateOne({id:id})

    return res.json({
        success:true,
        data:booking,
        message:"Booking fetched successfully "
    });
});

app.delete('/api/bookings/:_id', async (req, res) => {
    const { _id } = req.params;
    const deleteBooking = await Booking.deleteOne({ _id: _id });

    res.status(404).json({
        success: true,
        data: deleteBooking,
        message: "Booking deleted successfully"
    })

})


app.post("/api/buses", async (req, res) => {
    const { city, no } = req.body;
    const bus = new Bus ({
        city,
         no
    })

try {
    const saveBus = await bus.save();
    return res.json({
        success: true,
        data: saveBus ,
        message: "Bus details created"

    });
}
catch (err) {
    return res.json({
        success: false,
        message: err.message,
    })
}
})

app.get("/api/buses",async(req,res)=>{

    const busdeatil = await axios.find();

    return res.json({
        success:true,
        data:busdeatil,
        message:"Bus  fetched successfully"
    })
})

app.get("/api/buses/:id",async(req,res)=>{
    const {id}=req.params;
     const bus= await Bus.find();
    return res.json({
        success:true,
        data:{
            id:id,
           bus
        },
        message:"Bus  fetched successfully"
    })
})

app.put("/api/buses",async(req,res)=>{

    const {id}=req.params;

        const bus= await Bus.findById(id);
 
    return res.json({
        success:true,
        data:{
            id:id,
            bus
        },
        message:"Bus fetched successfully"
    })

})

app.patch('/api/buses/:id' ,async (req,res)=>{

const {id} =req.params;

const bus= await Bus.findById(id);

    await bus.updateOne({id:id})

    return res.json({
        success:true,
        data:bus,
        message:"Bus fetched successfully "
    });
});

app.delete('/api/buses/:id', async (req, res) => {
    const { id } = req.params;
    const deleteBus = await Bus.deleteOne({ id: id });

    res.json({
        success: true,
        data: deleteBus,
        message: " Bus Booking deleted successfully"
    })

})



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
