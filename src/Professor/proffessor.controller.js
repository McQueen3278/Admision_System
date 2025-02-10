import Professor from './professor.model.js';
import Course from '../course/course.model.js';
import { hash, verify } from "argon2";



export const getProfessor = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, professors ] = await Promise.all([
            Professor.countDocuments(query),
            Professor.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            professors
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los Profesores",
            error: err.message
        })
    }
}

export const deleteProfessor = async (req, res) => {
    try{
        const { uid } = req.params
        
        const professor = await Professor.findByIdAndDelete(uid)

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            professor
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el profesor",
            error: err.message
        })
    }
}


export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const professor = await Professor.findById(uid)

        const matchOldAndNewPassword = await verify(professor.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Professor.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}


export const updateProfessor = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;
   
        const professor = await Professor.findByIdAndUpdate(uid, data, { new: true });
   
        res.status(200).json({
            success: true,
            msg: 'Profesor actualizado',
            professor
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el usuario',
            error: err.message
        });
    }
  }

  
