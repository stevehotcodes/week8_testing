"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registrationSchema = joi_1.default.object({
    fullName: joi_1.default.string().required().min(3),
    email: joi_1.default.string().email().min(3).required(),
    password: joi_1.default.string().min(8).required(),
    cohortNumber: joi_1.default.number().required()
});
