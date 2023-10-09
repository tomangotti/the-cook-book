import storeToken from "../tokens/storeToken";
import { router, useRouter } from "expo-router";

const postLogin = (info) => {
    const router = useRouter()
    
    fetch('http://10.0.0.106:8000/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    .then((r) => {
        if (r.ok) {
            return r.json().then((data) => {
                storeToken(data.token);
                router.push('/home');
                return true;
            });
        } else {
            return false;
        }
    })
    .catch((error) => {
        return false;
    });
}

export default postLogin;