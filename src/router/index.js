import React, {  Fragment ,useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../utils/protectdRoute'
import SubRouter from './router'
import Login from '../components/login/index';
import Register from '../components/register/index'
export default (() => {
  const [count,setCount]=useState(0);
    return (
        <Fragment>
            <Router>
                <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <ProtectedRoute  path="/" Component={SubRouter}></ProtectedRoute>
                </Switch>
            </Router>
        </Fragment>
    )

})
