import { useState } from "react";

const useUser = () => {
    const [username, setUsername] = useState<string>()
    const [name, setName] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [email, setEmail] = useState<string>()

    function useUsername(unam:string){
        setUsername(unam)
    }

    function useName(nam:string){
        setName(nam)
    }

    function useLastname(lnam:string){
        setLastname(lnam)
    }

    function useEmail(mail:string){
        setEmail(mail)
    }

    function usePassword(pass:string){
        setPassword(pass)
    }

    return {
        username,
        name,
        lastname,
        password,
        email,
        useUsername,
        useName,
        useLastname,
        useEmail,
        usePassword
    }
}

export default useUser