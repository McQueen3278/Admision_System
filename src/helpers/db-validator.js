import User from "../Student/studdent.model.js"
import Course from "../course/course.model.js"
import Professor from "../Professor/professor.model.js"

export const existeEmail = async(email ='') =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)

    }

    
}

export const existeUsername = async(username ='') =>{
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El username ${username} ya fue registrado previamente`)

    }
}

export const userExists = async(uid ='') =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error(`El usuario no existe`)

    }
}    

export const existeCarnet = async (carnet ='') =>{
    const existe = await User.findOne({carnet})
    if(existe){
        throw new Error(`El carnet ${carnet} ya fue registrado previamente`)    
    }   

}

export const courseExtists = async(id='') =>{
    const existe = await Course.findById(id)
    if(!existe){
        throw new Error(`El curso no existe`)
    }
}

export const professorExists = async(id='') =>{
    const existe = await Professor
    .findById(id)
    if(!existe){
        throw new Error(`El profesor no existe`)
    }
    }