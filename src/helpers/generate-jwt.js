import jwt from "jsonwebtoken"


export const generateJWT = (uid = "", role = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role };

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: "1h",
            },
            (err, token) => {
                if (err) {
                    console.error("Error al generar el token:", err);
                    reject({
                        success: false,
                        message: "Error al generar el token",
                    });
                } else {
                    resolve({
                        success: true,
                        token,
                    });
                }
            }
        );
    });
};