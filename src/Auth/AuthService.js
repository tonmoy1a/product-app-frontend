import http from "../Util/Http"

class AuthService{

    static isLoggedIn() {
        if(localStorage.getItem('token')){
            return true
        }else{
            return false
        }
        
    }

    static async login(email,password){
        // console.log(http.get(''));
        
        try {
            let response = await http.post('/api/auth/login', {email:email, password:password});

            localStorage.setItem('token', response.data.access_token)

            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    static logout(){
        localStorage.removeItem('token');
    }

}

export default AuthService
