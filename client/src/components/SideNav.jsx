import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';


export const SideNav = () => {

  
  

    const linkConstant = {
        className: 'grey-text text-darken-1',
        activeClassname: 'active'
    }

    const linksConfig = [
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
    ]


    let location = useLocation()

    return (
        <div className="aside-nav">
            <nav className="white">
                <ul className="valign-wrapper">
                    {linksConfig.map((link, index) => {
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
                    })}

               
                   
                </ul>
            </nav>
            <NavLink to="/">
                
            </NavLink>
       </div>
    ) 
}