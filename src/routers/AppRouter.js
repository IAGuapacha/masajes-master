import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { LoginScreen } from '../components/LoginScreen';
import { DashboarRoutes } from './DashboarRoutes';

export const AppRouter = () => {
    return (
        <Router>
      <div>
        

  
        <Switch>
          
          <Route  exact path="/login" component={LoginScreen}/>
          <Route   path="/" component={DashboarRoutes}/>
        </Switch>
      </div>
    </Router>
    )
}

