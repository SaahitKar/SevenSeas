import express from 'express'
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import { UserData, ScriptData, connect, registerUser, getUser, updateUser } from './api/database';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../frontend/build')))
connect();
app.post('/api/', (req, res) => {
    res.send('This is the Project Stonks API root...');
});
app.post('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let user = await getUser(username);
    if (!user) {
        res.send({ result: -2 });
    } else {
        if (user.password !== password) {
            res.send({ result: -1 });
        } else {
            res.send({
                result: 0,
                username: user.username,
                password: user.password,
                scripts: user.scripts
            });
        }
    }
});
app.post('/api/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let user = await getUser(username);
    if (user) {
        res.send({ result: -1 });
    } else {
        const data = {
            username, password, scripts: [
                {
                    name: 'hello_world',
                    description: 'A very basic simulation script.',
                    code: 'buy AAPL 12 + 140 PRICE\nbuy GME 12 + 14 MACD',
                    log: ''
                }
            ]
        };
        const success = await registerUser(data);
        if (!success) {
            res.send({ result: -2 });
        } else {
            res.send({ result: 0, data });
        }
    }
});
app.post('/api/update-script', async (req, res) => {
    const username = req.body.username;
    const oldName = req.body.oldName;
    const script = req.body.script;
    let user = await getUser(username);
    if (!user) {
        res.send({ result: -1 });
    } else {
        if (!user.scripts) {
            user.scripts = [];
        }
        let scripts = user.scripts;
        let newScripts: ScriptData[] = [];
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
        await user.save();
        res.send({ result: 0 });
        var process = spawn('python3', [path.join(__dirname, '../src/api/compiler', 'main.py'), script.code]);
        let log: string = '';
        process.stdout.on('data', (data: any) => {
            log += `${data}` + '\n';
        });
        process.on('close', async () => {
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
                await user.save();
                user.scripts = newScripts;
                await user.save();
            }
        });
    }
});
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});
async function dev() {
    
}

app.listen(3100, () => {
    console.log('Server running...');
});
