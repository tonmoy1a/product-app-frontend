import http from "../Util/Http"

class AuthService{

    static isLoggedIn() {
        return false
    }

    static async login(email,password){
        try {
            let response = await http.post('/api/auth/login', {email:email, password:password});

            localStorage.setItem('token', response.data.access_token)
            
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

}

export default AuthService
