import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx'; 
import { AccountsPage } from './pages/AccountsPage.jsx';
import { BudgetPage } from './pages/BudgetPage.jsx';
import { DebtPage } from './pages/DebtPage.jsx';
import { MoneyLifePage } from './pages/MoneyLifePage.jsx'
import { ReportsPage } from './pages/ReportsPage.jsx';
import { AccountDetail } from './pages/AccountDetail.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { LoadingPage } from './pages/LoadingPage.jsx';
import { IncomeCapPage } from './pages/IncomeCapPage.jsx';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/dashboard" exact > 
                <DashboardPage />
                </Route>


                <Route path="/accounts" exact>
                <AccountsPage />
                </Route>

                <Route path="/accounts/:id" >
                  <AccountDetail/>
                </Route>
        

                <Route path="/budget" exact > 
                <BudgetPage />
                </Route>

                <Route path="/debt" exact > 
                 <DebtPage />
                </Route>

                <Route path="/income-cap" exact > 
                <IncomeCapPage />
                </Route>

                <Route path="/money-life-converter" exact > 
                <MoneyLifePage />
                </Route>

                <Route path="/reports" exact > 
                <ReportsPage />
                </Route>

                

                <Route path="/profile" exact>
                  <ProfilePage/>
                </Route>

               

                <Route path="/loading" exact>
                <LoadingPage />
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