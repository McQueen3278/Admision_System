import { hash, verify } from "argon2";
import Studdent from "./studdent.model.js"

export const getStuddentById = async (req, res) => {
    try{
        const { uid } = req.params;
        const studdent = await Studdent.findById(uid)

        if(!studdent){
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            studdent
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getStuddents = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, studdents ] = await Promise.all([
            Studdent.countDocuments(query),
            Studdent.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            studdents
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los Estudiantes",
            error: err.message
        })
    }
}

export const deleteStuddent = async (req, res) => {
    try{
        const { uid } = req.params
        
        const studdent = await Studdent.findByIdAndDelete(uid)

        return res.status(200).json({
            success: true,
            message: "Estudiante eliminado",
            studdent
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el Estudiante",
            error: err.message
        })
    }
}


export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const studdent = await Studdent.findById(uid)

        const matchOldAndNewPassword = await verify(studdent.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Studdent.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

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


export const updateStuddent = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;
   
        const studdent = await Studdent.findByIdAndUpdate(uid, data, { new: true });
   
        res.status(200).json({
            success: true,
            msg: 'Estudiante actualizado',
            studdent,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el usuario',
            error: err.message
        });
    }
  }



