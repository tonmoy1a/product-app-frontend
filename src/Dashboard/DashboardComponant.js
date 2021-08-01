import { useState } from "react"
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom"
import AuthService from "../Auth/AuthService"
import ProductComponant from "../Products/ProductComponant"
import ProductFormComponant from "../Products/ProductFormComponant";

function DashboardComponant(){

    const history = useHistory();

    const logout = () => {
        AuthService.logout();
        history.push('/login');
    }

    return (
        <div className="container">
            <div c>

            </div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
                <Link to="/product" className="navbar-brand">Product App</Link>
                    
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/product" className="nav-link">Product</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/product/create" className="nav-link">Product Create</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{cursor:'pointer'}} onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div>
            <Switch>
                <Route path='/product/create' component={ProductFormComponant} exact/>
                <Route path='/product/edit/:productId' component={ProductFormComponant} exact/>
                <Route path='/product' component={ProductComponant} exact/>
            </Switch>
            </div>
            
        </div>
    )
}

export default DashboardComponant