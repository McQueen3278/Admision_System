import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/check-validator.js";
import { uploadPetsPicture } from "../middlewares/multer-upload.js";

const router = Router();
 router.post(
    "/register",
    uploadPetsPicture.single("image"),
    registerValidator,
    register
 )

 router.post("/login", loginValidator, login)

 export default router;