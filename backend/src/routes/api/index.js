import express from "express";
import checkoutsRouter from "./v1/checkouts";

const router = express.Router();
router.use(express.json());

router.use("/v1/checkouts", checkoutsRouter);

export default router;
