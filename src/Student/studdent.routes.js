import { Router } from "express";
import { updateStuddent, getStuddentById, deleteStuddent, updatePassword, getStuddents } from "./studdent.controller.js";
import { updateUserValidator, getUserByIdValidator, deleteUserValidator, updatePasswordValidator } from "../middlewares/user-validator.js";

const router = Router();

router.get("/findStuddent/:uid", getUserByIdValidator, getStuddentById)

router.get("/", getStuddents)

router.delete("/deleteStuddent/:uid", deleteUserValidator, deleteStuddent)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateStuddent)

export default router;