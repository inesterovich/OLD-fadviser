import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-scroll';
import { Register } from './Register.jsx';
import { Login } from './Login.jsx';
import logoIcon from '../assets/fadviser_small.svg';
import {ReactComponent as ArrowIcon } from '../assets/arrow_drop_down.svg';


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

  const asideConfig = [
    {
      to: "/dashboard",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Дашборд',
    },

    {
      to: "/accounts",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Учёт финансов',
    },

    {
      to: "/budget",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Планирование бюджета',
    },

    {
      to: "/debt",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Управление кредитами',
    },

    {
      to: "/income-cap",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Калькулятор дохода',
    },

    {
      to: "/money-life-converter",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Конвертер жизни',
    },

    {
      to: "/reports",
      className: linkConstant.className,
      activeClassName: linkConstant.activeClassname,
      linkText: 'Отчёты',
    },
  ];


  
  const location = useLocation();

  const dropDownHandler = () => {
    const menu = document.getElementById('topNav');
    const elements = menu.querySelectorAll('.dropdown-trigger');
    if (elements) {
      window.M.Dropdown.init(elements, {});
    }

    
    
    
  }


  
  return (
    <>
      <ul id="dropdown-menu" className="dropdown-content center-align">
        
        {
          !isAuthenticated &&
          <>
          <li className="grey-text text-lighten-1 disabled">О платформе</li>
          <li><Link to="opportunity-section-header"  className="grey-text text-darken-1" activeClass="active" spy={true} smooth={true}>Возможности</Link>
            </li>
          <li><a
                 className="grey-text text-darken-1 modal-trigger" href="#registerModal"               
                >Регистрация</a></li>
          <li><a
                className="grey-text text-darken-1 modal-trigger" href="#loginModal"
                >Войти</a></li>
          
          </>
        }

        {isAuthenticated && <>
          {
                // Ссылки меню после авторизации
                LinksConfig.map((link, index) => {
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
                })
          }

          <li className="divider"></li>
          
          
          {asideConfig.map((link, index) => {
                        return (
                    <li key={index} className={location.pathname === link.to? 'active' : ' '} >
                        <NavLink
                                    to={link.to}
                                    className={index > 1 ? `${link.className} disabled`: link.className}
                                    activeClassName={link.activeClassName}
                        >
                                    {link.linkText}
                                   
                        </NavLink>
                    </li>)
          })
          }

        </>


        }

      </ul>


      <nav id="topNav" onLoad={dropDownHandler}>
        <div className="nav-wrapper white">
          
          <img className="brand-logo" src={logoIcon} alt="Fadviser" />
          
          <ul id="nav-large" className="right hide-on-med-and-down">
            
            {
              // Ссылки меню до авторизации
              !isAuthenticated && 
            
              <>
              <li className="grey-text text-lighten-1 disabled">О платформе
              </li>
              <li>
                <Link to="opportunity-section-header" className="grey-text text-darken-1" activeClass="active" spy={true} smooth={true}>Возможности</Link>
              </li>
              <li><Register /></li>
              <li><Login /></li>
            </>
            }

            {isAuthenticated && 
              <>
 
              {
                // Ссылки меню после авторизации
                LinksConfig.map((link, index) => {
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
                })
              }
              </>


            }
         
         
          </ul>
          
          <ul className="right hide-on-large-only">
          <li className="show-on-medium-and-down"><a id="dropdown1" className="dropdown-trigger grey-text text-darken-1 " href="#!" data-target="dropdown-menu">МЕНЮ <ArrowIcon className="arrow_drop_down" /></a></li>
          </ul>
    </div>
  </nav>



    </>

  )
    
  

}