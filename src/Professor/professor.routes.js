import Router from 'express';
import { getProfessor, updatePassword, updateProfessor, deleteProfessor } from './proffessor.controller.js';
import { updateProfessorValidator, deleteUserValidator, updatePasswordValidator } from '../middlewares/professor-validator.js';

const router = Router();


router.get("/getProfessor", getProfessor)
router.delete("/deleteProfessor/:uid", deleteUserValidator, deleteProfessor)
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)
router.put("/updateProfessor/:uid", updateProfessorValidator, updateProfessor)


export default router;