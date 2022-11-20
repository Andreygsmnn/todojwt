"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const db_config_json_1 = __importDefault(require("../config/db.config.json"));
const connection = {
    user: db_config_json_1.default.user,
    password: db_config_json_1.default.password,
    port: db_config_json_1.default.port,
    host: db_config_json_1.default.host,
    database: db_config_json_1.default.database
};
exports.db = (0, pg_promise_1.default)()(connection);
