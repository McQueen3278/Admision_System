import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { professorExists } from "../helpers/db-validator.js";

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(professorExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]


export const updateProfessorValidator = [
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(professorExists),
    validarCampos
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(professorExists),
    validarCampos
]

