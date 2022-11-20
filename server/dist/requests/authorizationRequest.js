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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const server_config_json_1 = require("../config/server.config.json");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const generates_1 = require("../utils/generates");
class AuthorizationRequest {
    authorization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            if (login && password) {
                try {
                    const user = yield index_1.db.query(`SELECT * FROM users WHERE login=$1`, [
                        login,
                    ]);
                    if ((0, bcrypt_1.compareSync)(password, user[0].password) && user) {
                        const accessToken = (0, generates_1.generateAccessToken)(user[0].id, login);
                        const refreshToken = (0, generates_1.generateRefreshToken)(user[0].refresh_id);
                        res.status(200).json({ message: 'Авторизация успешна',
                            refreshToken,
                            accessToken,
                            access_expiresIn: server_config_json_1.access_token.time,
                            access_createDate: new Date().getTime()
                        });
                    }
                    else {
                        res.status(400).json({ message: 'Неверный логин или пароль' });
                    }
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json({ message: 'Пользователя с таким логином не существует' });
                }
            }
            else {
                res.status(400).json({ message: 'Нет данных' });
            }
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            if (login && password) {
                const refreshId = (0, uuid_1.v4)();
                const hashPassword = (0, bcrypt_1.hashSync)(password, 10);
                try {
                    const user = yield index_1.db.query(`INSERT INTO users (login, password, refresh_id ) VALUES ($1,$2,$3) returning *`, [
                        login,
                        hashPassword,
                        refreshId
                    ]);
                    const accessToken = (0, generates_1.generateAccessToken)(user[0].id, login);
                    const refreshToken = (0, generates_1.generateRefreshToken)(user[0].refresh_id);
                    res.status(200).json({ message: 'Пользователь добавлен',
                        refreshToken,
                        accessToken,
                        access_expiresIn: server_config_json_1.access_token.time,
                        access_createDate: new Date().getTime()
                    });
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json({ message: 'Такое имя логина уже занято' });
                }
            }
            else {
                res.status(400).json({ message: 'Не хватает данных' });
            }
        });
    }
}
exports.default = new AuthorizationRequest();
