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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const child_process_1 = require("child_process");
const database_1 = require("./api/database");
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
database_1.connect();
app.post('/api/', (req, res) => {
    res.send('This is the Project Stonks API root...');
});
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    let user = yield database_1.getUser(username);
    if (!user) {
        res.send({ result: -2 });
    }
    else {
        if (user.password !== password) {
            res.send({ result: -1 });
        }
        else {
            res.send({
                result: 0,
                username: user.username,
                password: user.password,
                scripts: user.scripts
            });
        }
    }
}));
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    let user = yield database_1.getUser(username);
    if (user) {
        res.send({ result: -1 });
    }
    else {
        const data = {
            username, password, scripts: [
                {
                    name: 'hello_world',
                    description: 'A very basic simulation script.',
                    code: 'buy APPL 12 + 140 MACD\nbuy GME 12 + 14 MACD',
                    log: ''
                }
            ]
        };
        const success = yield database_1.registerUser(data);
        if (!success) {
            res.send({ result: -2 });
        }
        else {
            res.send({ result: 0, data });
        }
    }
}));
app.post('/api/update-script', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const oldName = req.body.oldName;
    const script = req.body.script;
    let user = yield database_1.getUser(username);
    if (!user) {
        res.send({ result: -1 });
    }
    else {
        if (!user.scripts) {
            user.scripts = [];
        }
        let scripts = user.scripts;
        let newScripts = [];
        scripts.forEach((key) => {
            if (key.name !== oldName) {
                newScripts.push(key);
            }
        });
        newScripts.push({
            name: script.name,
            description: script.description,
            code: script.code,
            log: script.log
        });
        user.scripts = newScripts;
        yield user.save();
        res.send({ result: 0 });
        var process = child_process_1.spawn('python3', [path_1.default.join(__dirname, '../src/api/compiler', 'main.py'), script.code]);
        let log = '';
        process.stdout.on('data', (data) => {
            log += `${data}` + '\n';
        });
        process.on('close', () => __awaiter(void 0, void 0, void 0, function* () {
            if (user && user.scripts) {
                newScripts = [];
                scripts.forEach((key) => {
                    if (key.name !== oldName) {
                        newScripts.push(key);
                    }
                });
                newScripts.push({
                    name: script.name,
                    description: script.description,
                    code: script.code,
                    log: log
                });
                user.scripts = [];
                yield user.save();
                user.scripts = newScripts;
                yield user.save();
            }
        }));
    }
}));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/build', 'index.html'));
});
function dev() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
app.listen(3100, () => {
    console.log('Server running...');
});
