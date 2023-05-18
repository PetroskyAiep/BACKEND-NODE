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
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../dist/classes/token"));
const userRoutes = (0, express_1.Router)();
userRoutes.get('/', (req, res) => {
    return res.json({
        ok: true,
        msj: 'Todo funcionando correctamente'
    });
});
userRoutes.post('/', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    user_model_1.default.create(user).then((userDb) => {
        res.json({
            ok: true,
            user: userDb
        });
    });
});
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_model_1.default.findOne({ where: { email: body.email } }).then((userDb) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userDb) {
            return res.json({
                ok: false,
                msj: "Usuario o contraseña incorrecta"
            });
        }
        if (!(yield bcryptjs_1.default.compareSync(body.password, userDb.password))) {
            console.log('db: \'' + userDb.password + '\' /s: \'' + body.password + '\' /c: ' + (body.password == userDb.password));
            return res.json({
                ok: false,
                msj: "Usuario o contraseña incorrecta xx"
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            id: userDb.id,
            name: userDb.name,
            email: userDb.email
        });
        return res.json({
            ok: true,
            token: tokenUser
        });
    }));
});
userRoutes.put('/', (req, res) => {
    return res.json({
        ok: true
    });
});
exports.default = userRoutes;
