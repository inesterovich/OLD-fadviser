import React, { useEffect } from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes.jsx';
import { useAuth } from './hooks/auth.hook.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader.jsx';
import { SideNav } from './components/SideNav.jsx';



function App() {


  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  

  if (!ready) {
    return < Loader />
  }
  

  // Можно делать нормально aside меню компонент и сюда сегод забирать
  
  
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>

      <Router>
        <header className="header">
           <Navbar />
        </header>
      <main className=" main "> 
          {isAuthenticated &&
            <div className=" center-align row">
            <aside className="col s3">
              <SideNav />
            </aside>
            <section id="module-section" className="col offset-s1 s7">
              {routes}
            </section>
          </div>}
          {!isAuthenticated && routes}
        </main>

        <footer className="footer">

        </footer>
      </Router>
      </AuthContext.Provider>
    
  );
}

export default App;
