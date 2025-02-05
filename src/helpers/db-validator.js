import User from "../user/user.model.js"

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