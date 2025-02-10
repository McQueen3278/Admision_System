import { body, param} from 'express-validator';
import { courseExtists } from '../helpers/db-validator.js';
import { validarCampos } from './validar-campos.js';

export const createCursoValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("description", "La descripción es obligatorio").not().isEmpty(),
    validarCampos
];

export const deleteCourseValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(courseExtists),
    validarCampos
];

export const updateCourseValidator = [
    param("id", "No es un ID válido").isMongoId(),
        param("id").custom(courseExtists),
        validarCampos
        
];


