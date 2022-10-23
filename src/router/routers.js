import express from "express";
import { createTableUser, login, register } from "../controller/user_controller.js";
const router = express.Router();

router.post("/user/create",createTableUser);
router.post("/user/login",login);
router.post("/user/register",register)
export default router;