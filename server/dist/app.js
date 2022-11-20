"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./database/index");
const CORS_1 = __importDefault(require("./middlewares/CORS"));
const startServer_1 = require("./startServer");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const tasksRoute_1 = __importDefault(require("./routes/tasksRoute"));
const recordingRoute_1 = __importDefault(require("./routes/recordingRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(CORS_1.default);
app.use('/auth', authRoute_1.default);
app.use('/tasks', tasksRoute_1.default);
app.use('/refresh', recordingRoute_1.default);
app.get("/", (req, res) => {
    res.send('hello');
});
(0, startServer_1.startServer)(app, index_1.db);
