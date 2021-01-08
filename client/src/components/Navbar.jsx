import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export const Navbar = () => {

    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
        
    }

    return (
        <nav>
        <div class="nav-wrapper">
          <span className="brand-logo">Fadviser</span>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/dahsboard">Счета</NavLink></li>
                    <li><NavLink to="/profile">Профиль</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
          </ul>
        </div>
      </nav>
    )
}