import { useState } from "react"
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom"
import AuthService from "../Auth/AuthService"
import ProductComponant from "../Products/ProductComponant"
import ProductCreateComponant from "../Products/ProductCreateComponant";

function DashboardComponant(){

    const history = useHistory();

    const logout = () => {
        AuthService.logout();
        history.push('/login');
    }

    return (
        <div class="container">
            <div c>

            </div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
                <Link to="/product" class="navbar-brand">Product App</Link>
                    
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/product" className="nav-link">Product</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/product/create" className="nav-link">Product Create</Link>
                        </li>
                        <li className="nav-item">
                            <a class="nav-link" onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div>
            <Switch>
                <Route path='/product/create' component={ProductCreateComponant} exact/>
                <Route path='/product/edit/:productId' component={ProductCreateComponant} exact/>
                <Route path='/product' component={ProductComponant} exact/>
            </Switch>
            </div>
            
        </div>
    )
}

export default DashboardComponant