import React from 'react';
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
  
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>

      <Router>
        <header className="header center-align">
           <Navbar />
        </header>
      <main className="main"> 
          {isAuthenticated &&
            <div className=" center-align row">
            <aside className="col l3 s3">
              <SideNav />
            </aside>
            <section id="module-section" className="col offset-s1 l7 s7">
              {routes}
            </section>
          </div>}
          {!isAuthenticated && routes}
        </main>

        <footer className="footer">
          {
            // Сюда надо вставить футер. На проверку - свои данные. В прод - авторское право

          }
        </footer>
      </Router>
      </AuthContext.Provider>
    
  );
}

export default App;
