import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-scroll';
import { Register } from './Register.jsx';
import { Login } from './Login.jsx';
import logoIcon from '../assets/fadviser_small.svg'


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
  
  // То есть, следить за положением юзера будем тут только после авторизации. До - один роут, перемещаемся между его частями

  const linkConstant = {
    className: "grey-text text-darken-1",
    activeClassName: 'active',
  }

  const LinksConfig = [
    {
      to: '/profile',
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassName,
      linkText: 'Профиль'
    
    },
    
    {
      to: '/logout',
      className: linkConstant.className,
      activeClassName: '',
      onClick: logoutHandler,
      linkText: 'Выйти'
    },
    
  ]
  
  const location = useLocation();

  const dropDownHandler = () => {
    const menu = document.getElementById('topNav');
    const elements = menu.querySelectorAll('.dropdown-trigger');
    window.M.Dropdown.init(elements, {});
    
    
  }
  
  if (isAuthenticated) {
    return (
      <nav id="topNav" >
      <div className="nav-wrapper white">
      <img className="brand-logo" src={logoIcon} alt="Fadviser"/>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {LinksConfig.map((link, index) => {
              return (
                <li
                  key={link.linkText + index}
                  className={location.pathname === link.to ? `${link.className} active` : link.className}
                >
                  {link.to !== '/logout' ?
                    <NavLink
                      to={link.to}
                      className={link.className}
                      activeClassName={link.activeClassName}
                    >
                      {link.linkText}
                    </NavLink>
                    : <a
                      href={link.to}
                      className={link.className}
                      onClick={logoutHandler}
                    >
                      {link.linkText}
                    </a>
                  }
                
                
                </li>
              )
            })}
       
         
                   
      </ul>
    </div>
  </nav>
    )
  }

  // Никакого sideNav. Делаем dropdowm

  return (

    <>
       <ul id="dropdown-menu" className="dropdown-content center-align">
          <li className="grey-text text-lighten-1 disabled">О платформе</li>
          <li><Link to="opportunity-section-header"  className="grey-text text-darken-1" activeClass="active" spy={true} smooth={true}>Возможности</Link>
            </li>
          <li><Register /></li>
          <li><Login /></li>
        
      </ul>



    <nav id="topNav" onLoad={dropDownHandler}>
        <div className="nav-wrapper white">
          
      <img className="brand-logo" src={logoIcon} alt="Fadviser"/>
        <ul id="nav-large" className="right hide-on-med-and-down">
          <li className="grey-text text-lighten-1 disabled">О платформе</li>
          <li><Link to="opportunity-section-header"  className="grey-text text-darken-1" activeClass="active" spy={true} smooth={true}>Возможности</Link>
            </li>
          <li><Register /></li>
          <li><Login /></li>
         
          </ul>
          
          <ul className="right hide-on-large-only">
          <li className="show-on-medium-and-down"><a id="dropdown1" className="dropdown-trigger grey-text text-darken-1 " href="#!" data-target="dropdown-menu">МЕНЮ<i className="material-icons right grey-text">arrow_drop_down</i></a></li>
          </ul>
    </div>
  </nav>
    </>
  )


}