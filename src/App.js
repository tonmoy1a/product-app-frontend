import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginComponant from './Auth/LoginComponant'
import PrivateRoute from './Route/PrivateRoute'
import DashboardComponant from './Dashboard/DashboardComponant';
import AuthService from './Auth/AuthService';

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <Route path='/login' component={LoginComponant} exact/>
            <PrivateRoute path="/product/" component={DashboardComponant} />
          </Switch>
          {!AuthService.isLoggedIn() &&
              <Redirect to={{pathname: 'login'}}/>
          }
      </BrowserRouter>
  );
}

export default App;
