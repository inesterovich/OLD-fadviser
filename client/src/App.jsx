import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes.jsx';
import { useAuth } from './hooks/auth.hook.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader.jsx';



function App() {


  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return < Loader />
  }
  
  
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>

      <Router>
        <header className="header">
           <Navbar />
        </header>
      <main className=" main"> 
      {routes}
        </main>

        <footer className="footer">

        </footer>
      </Router>
      </AuthContext.Provider>
    
  );
}

export default App;
