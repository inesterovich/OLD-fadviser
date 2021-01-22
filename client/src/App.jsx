import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes.jsx';
import { useAuth } from './hooks/auth.hook.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader.jsx';
import { SideNav } from './components/SideNav.jsx';
import CourseLogo from './assets/rs_school_js.svg';


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
            <aside className="col l3 hide-on-med-and-down">
              <SideNav />
            </aside>
            <section id="module-section" className="col l7 s10 offset-right-m1 offset-m1 offset-s1">
              {routes}
            </section>
          </div>}
          {!isAuthenticated && routes}
        </main>

        <footer className="footer white">
          {
            // Сюда надо вставить футер. На проверку - свои данные. В прод - авторское право
            <div className="container">
              <div>
              <p className="author-name">Author: Ilya Nesterovich</p>
              <p className="author-github"><a href="https://github.com/inesterovich/">GitHub</a></p>
              </div>

              <div className="course-logo-container">
                <a href="https://rs.school/js/"><img src={CourseLogo } alt="Course Logo"/></a>
              </div>
              
            </div>
          }
        </footer>
      </Router>
      </AuthContext.Provider>
    
  );
}

export default App;
