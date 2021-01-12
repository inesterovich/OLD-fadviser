import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage.jsx';
import { Dashboard } from './pages/Dashboard.jsx';

import { Account } from './pages/Account.jsx';
import { Profile } from './pages/Profile.jsx';
import { Loading } from './pages/Loading.jsx';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                  <Profile/>
                </Route>

                <Route path="/dashboard" exact>
                <Dashboard />
                </Route>

                <Route path="/accounts/:id" >
                  <Account/>
                </Route>

                <Route path="/loading" exact>
                <Loading />
                </Route>

                <Redirect to="/dashboard"/>

            </Switch>
        )
    } 

    return <Switch>
        <Route path="/">
            <AuthPage />
        </Route>

        <Redirect to="/" />
    </Switch>
    
}