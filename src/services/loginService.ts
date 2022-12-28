import axios from "axios";
import { LoginData } from "../utils/types";

const URL = 'http://127.0.0.1:8000/api/login/'

function sendLogin(login: LoginData){
    const request = axios.post(URL, login)
    return request.then(response => response.data)
}

export default {sendLogin}