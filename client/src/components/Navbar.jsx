import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-scroll';
import { Register } from './Regiter.jsx';
import { Login } from './Login.jsx';

const publicPath = process.env.PUBLIC_URL;


export const Navbar = () => {

    const history = useHistory();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        logout();
        history.push('/');
        
  }

  
/* Меню я вижу и до, и после авторизации.  До - там много ссылок. После остаётся только лого и иконка профиля пользователя. То есть мне нужен контекст */
  
useEffect(() => {
  window.M.updateTextFields();
}, []);
  
  
  if (isAuthenticated) {
    return (
      <nav>
      <div className="nav-wrapper white">
      <img className="brand-logo" src={`${publicPath}/fadviser.png`} alt="Fadviser"/>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/profile" className="grey-text text-darken-1" >Профиль</NavLink></li>
          <li><a href="/" className="grey-text text-darken-1" onClick={logoutHandler}>Выйти</a></li>
         
               
               
      </ul>
    </div>
  </nav>
    )
  }

  // А у меня при регистрации NavLink вообще не будет. Разве что линки без шпионства
  // Регистрация и войти - это компоненты

  return (
    <nav>
      <div className="nav-wrapper white">
      <img className="brand-logo" src={`${publicPath}/fadviser.png`} alt="Fadviser"/>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="grey-text text-lighten-1 disabled">О платформе</li>
          <li><Link to="opportunity-section"  className="grey-text text-darken-1" activeClass="active" spy={true} smooth={true}>Возможности</Link>
            </li>
          <li><Register /></li>
          <li><Login/></li>
         
               
               
      </ul>
    </div>
  </nav>

  )

  /* 

    return (
        <nav>
        <div className="nav-wrapper">
          <span className="brand-logo">Fadviser</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/dahsboard">Счета</NavLink></li>
                    <li><NavLink to="/profile">Профиль</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
          </ul>
        </div>
      </nav>
    )

  */
}