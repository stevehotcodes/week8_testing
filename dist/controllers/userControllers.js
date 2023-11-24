"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getOneUser = exports.deleteUser = exports.registerNewUser = void 0;
const mssql_1 = __importStar(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../middleware/validators");
const dbConfig_1 = require("../config/dbConfig");
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        let { fullName, email, password, cohortNumber } = req.body;
        const { error } = validators_1.registrationSchema.validate(req.body);
        if (error) {
            return res.status(406).json({ error: error.details[0].message });
        }
        password = yield bcrypt_1.default.hash(password, 10);
        const pool = yield mssql_1.default.connect(dbConfig_1.dbConfig);
        (yield pool.connect()).request()
            .input('id', mssql_1.VarChar, id)
            .input('fullName', mssql_1.VarChar, fullName)
            .input('password', mssql_1.VarChar, password)
            .input('cohortNumber', mssql_1.VarChar, cohortNumber)
            .execute('createNewUser');
        return res.status(201).json({ message: `User <${email}> has been registered successfully. Your ID is ${id}` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ messsage: error.message });
    }
});
exports.registerNewUser = registerNewUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        const pool = yield mssql_1.default.connect(dbConfig_1.dbConfig);
        let result = (yield pool.connect()).request()
            .input('id', mssql_1.VarChar, id)
            .execute('deleteUser');
        return res.status(201).json({ message: "deleted successfully", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        const pool = yield mssql_1.default.connect(dbConfig_1.dbConfig);
        let user = (yield pool.connect()).request()
            .input('id', mssql_1.VarChar, id)
            .execute('getOneUser');
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(dbConfig_1.dbConfig);
        let { id } = req.params;
        console.log("params id", id);
        const existingUser = yield getUserByIdHelper(id);
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "No user found with the id" });
        }
        let { email, fullName, cohortNumber, } = req.body;
        console.log("hey i am an update controller");
        let result = yield pool.request()
            .input('id', mssql_1.VarChar, id)
            .input('fullName', mssql_1.VarChar, fullName)
            .input('email', mssql_1.VarChar, email)
            .input('cohortNumber', mssql_1.VarChar, cohortNumber)
            .execute('updateUser');
        console.log(result);
        return res.status(200).json({ message: "user updated successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error in updating the user" });
    }
});
exports.updateUser = updateUser;
const getUserByIdHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(dbConfig_1.dbConfig);
        const user = (yield (pool.request().input('id', mssql_1.VarChar, id).execute("getOneUser"))).recordset[0];
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
