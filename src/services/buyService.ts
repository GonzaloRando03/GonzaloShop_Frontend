import axios from "axios";

const URL = 'http://127.0.0.1:8001/api/compras/'


function sendBuy(buy: any, token: string | null){
    const config:any = {
        headers: { Authorization: token }
    }
    const request = axios.post(URL, buy, config)
    return request.then(response => response.data)
}


export default { sendBuy }