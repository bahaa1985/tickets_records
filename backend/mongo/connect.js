import mongoose from "mongoose";

async function connect(){   
    const connection = await mongoose.connect("mongodb+srv://bahaa1985:850101@cluster0.nes5a.mongodb.net/flights_db?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return connection;
}

export default connect;