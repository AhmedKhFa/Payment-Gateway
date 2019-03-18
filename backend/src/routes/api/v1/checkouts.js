import express from "express";
import { create, createValidations } from "@api/v1/checkouts-controller";

const router = express.Router();

router.post("/", createValidations, create);

export default router;
