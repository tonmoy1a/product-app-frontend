import { useState } from "react";
import AuthService from "./AuthService";

function LoginComponant() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('')

    const login = async (e) => {
        e.preventDefault();
        let response = await AuthService.login(email,password)
        if(response){

        }else{
            seterrorMessage('Login Failed')
        }
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    {errorMessage!=="" &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                    }
                    
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control"  placeholder="Password" required/>
                        </div>
                        <div className="form-check">
                            
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default LoginComponant