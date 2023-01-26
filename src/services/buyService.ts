import axios from "axios";

const URL = 'http://127.0.0.1:8001/api/compras/'


function sendBuy(buy: any, token: string | null){
    const config:any = {
        headers: { Authorization: token }
    }
    const request = axios.post(URL, buy, config)
    return request.then(response => response.data)
}

function handleMoney(money: number, username:string){
    const request = axios.put(URL, {money:money, username:username})
    return request.then(response => response.data)
}

function delUser(token: string){
    const config:any = {
        headers: { Authorization: token }
    }
    const request = axios.delete(URL, config)
    return request.then(response => response.data)
}

export default { sendBuy, handleMoney, delUser }