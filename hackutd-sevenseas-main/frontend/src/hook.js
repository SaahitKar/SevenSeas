import axios from 'axios';
const ip = '99.125.121.169';
export function setUser(data) {
    localStorage.setItem('user_data', JSON.stringify(data));
}
export function getUser() {
    let data = localStorage.getItem('user_data');
    if (data !== null) {
        return JSON.parse(data);
    }
    return undefined;
}
export async function login(username, password) {
    let data = await axios.post(`http://${ip}:3100/api/login`, { username, password }).catch((err) => {
        console.log('Connection failed...');
        console.error(err);
    });
    return data;
}
export async function register(username, password) {
    let data = await axios.post(`http://${ip}:3100/api/register`, { username, password }).catch((err) => {
        console.log('Connection failed...');
        console.error(err);
    });
    return data;
}
export async function updateScript(username, oldName, script) {
    let data = await axios.post(`http://${ip}:3100/api/update-script`, { username, oldName, script }).catch((err) => {
        console.log('Connection failed...');
        console.error(err);
    });
    return data;
}
export function logout() {
    localStorage.removeItem('user_data');
}