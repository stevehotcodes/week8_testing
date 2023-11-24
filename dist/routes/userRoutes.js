"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const userRouter = (0, express_1.default)();
userRouter.get("/user", userControllers_1.getOneUser);
userRouter.post("/register", userControllers_1.registerNewUser);
userRouter.post("/update", userControllers_1.updateUser);
userRouter.delete("/delete", userControllers_1.deleteUser);
exports.default = userRouter;
