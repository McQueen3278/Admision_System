import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    professor:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentsAssigned :[{
        type: Schema.Types.ObjectId,
        ref: 'User',

    }],
},   
    
    {
        versionKey: false,
        timeStamp: true
    },)

    


export default model("Course", courseSchema);

