import Studdent from "../Student/studdent.model.js"
import Professor from "../Professor/professor.model.js"
import { hash, verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js"


export const professorRegister = async (req, res) =>{
    try{
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const proffesor = await Professor.create(data)
        return res.status(201).json({
            message: "Professor has been registered",
            name: proffesor.name,
            email: proffesor.email,
            carnet: proffesor.carnet,
            role: proffesor.role
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Professor registration failed",
            error: err.message
        })
    }
}

export const studdentRegister = async (req, res) =>{
    try{
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const studdent = await Studdent.create(data)
        return res.status(201).json({
            message: "Studdent has been registered",
            name: studdent.name,
            email: studdent.email,
            carnet: studdent.carnet,
            role: studdent.role
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Studdent registration failed",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    
    try {

        let user = await Professor.findOne({
            $or: [{ email: email }, { username: username }]
        });


        if (!user) {
            user = await Studdent.findOne({
                $or: [{ email: email }, { username: username }]
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Username o email no existe en la base de datos"
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }


        const token = await generateJWT(user.id, user.role);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token: token.token,
                profilePicture: user.profilePicture,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error en inicio de sesión",
            error: err.message
        });
    }
};
