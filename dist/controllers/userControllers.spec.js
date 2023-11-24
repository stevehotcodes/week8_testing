"use strict";
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
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userControllers_1 = require("../controllers/userControllers");
describe("user registration", () => {
    it("successfully registers a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                fullName: "Tester",
                email: "tester@yopmail.com",
                password: "HashedPassword@123",
                cohortNumber: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.spyOn(bcrypt_1.default, 'hash').mockResolvedValueOnce("HashPassword@123");
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce(mockedPool);
        yield (0, userControllers_1.registerNewUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: "User is registered successfully." });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(mockedInput).toHaveBeenCalledWith('password', mssql_1.default.VarChar, 'HashPassword@123');
        expect(mockedInput).toHaveBeenCalledWith('fullName', mssql_1.default.VarChar, 'Tester');
        expect(mockedInput).toHaveBeenCalledWith('email', mssql_1.default.VarChar, 'tester@yopmail.com');
    }));
});
// id VARCHAR(255) PRIMARY KEY NOT NULL ,
//     fullName VARCHAR(255) NOT NULL,
//     cohortNumber INT DEFAULT 0 NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(MAX) NOT NULL,
//     dateJoined DATE DEFAULT GETDATE() NOT NULL,
//     role VARCHAR (255) DEFAULT 'user' NOT NULL,
//     isDeleted INT DEFAULT 0 NOT NULL
describe("gets a user", () => {
    it("successfully get one user", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '12hxbsshcdce-yjeyce'
            }
        };
        let user = {
            id: "2e402706-075f-4dea-80cf-1ecfa3842ae5",
            fullName: "user",
            cohortNumber: 
            //     email VARCHAR(255) UNIQUE NOT NULL,
            //     password VARCHAR(MAX) NOT NULL,
            //     dateJoined DATE DEFAULT GETDATE() NOT NULL,
            //     role VARCHAR (255) DEFAULT 'user' NOT NULL,
            //     isDeleted INT DEFAULT 0 NOT NULL
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ user });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce(mockedPool);
        yield (0, userControllers_1.getOneUser)(req, res);
        expect(res.json).toHaveBeenCalled("");
    }));
});
