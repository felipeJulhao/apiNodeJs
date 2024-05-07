import mongoose from "mongoose";

const URI = 'mongodb+srv://101447:Udhh0A9MaOl46IRp@cluster0.c20l5nn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const databaseConnection = async () => {
    if (!global.mongoose) {
        mongoose.set("strictQuery", false)
        global.mongoose = await mongoose.connect(URI)
        .then(()=>console.log('Mongodb conectado'))
        .catch(e=>console.log(e));
    }
}

export default databaseConnection