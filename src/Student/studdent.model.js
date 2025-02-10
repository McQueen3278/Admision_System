import { Schema, model } from "mongoose";

const studdentSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },

    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]

    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    profilePicture:{
      type: String  
    },
    carnet:{
        type: String,
        required: true,
        maxLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    },
    coursesAssigned:[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    
},
{
    versionKey: false,
    timeStamp: true
},)

studdentSchema.methods.toJSON = function(){
    const { password, _id, ...studdent } = this.toObject()
    studdent.uid= _id
    return studdent
}

export default model("Studdent", studdentSchema);

