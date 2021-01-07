import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes.jsx';
import { useAuth } from './hooks/auth.hook.jsx';
import { AuthContext } from './context/AuthContext.jsx';

function App() {

  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
    <Router>
      <div className="container"> 
      {routes}
        </div>
      </Router>
      </AuthContext.Provider>
    
  );
}

export default App;
