import { Router } from "express";
import { professorRegister, studdentRegister, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validator.js";
import { uploadPetsPicture } from "../middlewares/multer-upload.js";

const router = Router();
 router.post(
    "/registerStuddent",
    uploadPetsPicture.single("image"),
    registerValidator,
   studdentRegister
 )

 router.post(
    "/registerProfessor",
    uploadPetsPicture.single("image"),
    registerValidator,
    professorRegister
   )

 router.post("/login", loginValidator, login)

 export default router;