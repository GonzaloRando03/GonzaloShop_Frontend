import axios from "axios";
import { User } from "../utils/types";

const URL = 'http://127.0.0.1:8000/api/users/'


function sendUser(user: User){
    const request = axios.post(URL, user)
    return request.then(response => response.data)
}

function handleMoney(money: number, username:string){
    const request = axios.put(URL, {money:money, username:username})
    return request.then(response => response.data)
}

function delUser(token: String){
    const config:any = {
        headers: { Authorization: token }
    }
    const request = axios.delete(URL, config)
    return request.then(response => response.data)
}

export default { sendUser, handleMoney, delUser }