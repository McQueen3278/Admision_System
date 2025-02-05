"use strict"

import mongoose from "mongoose"

export const dbConnection = async () => {
    try{
        mongoose.connection.on("error", () => {
            console.log("MongoDB | connection failed to MongoDB Servide")
        })

        mongoose.connection.on("connecting", () => {
            console.log("MongoDB | connecting to MongoDB Service")
        })

        mongoose.connection.on("connected", () => {
            console.log("MongoDB | connected to MongoDB Service")
        })

        mongoose.connection.on("open", () => {
            console.log("MongoDB | connected to MongoDB DataBase")
        })

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB | connected to MongoDB Service")
        })

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB | disconnected to MongoDB Servide")
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        })
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}
