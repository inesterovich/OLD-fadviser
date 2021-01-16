import React from 'react';
import { NavLink } from 'react-router-dom';


export const SideNav = () => {

    
    const clickHandler = (event) => {
            event.target.closest('.valign-wrapper').childNodes.forEach((link) => link.classList.remove('active'))
          event.target.closest('li').classList.add('active')
        
    }

    // Я вообще хочу следить за состоянием вложенного элемента
    
    

    return (
        <div className="aside-nav">
            <nav className="white">
                <ul className="valign-wrapper">
                    <li>
                        <NavLink to="/dashboard" className="grey-text text-darken-1" activeClassName="active"  onClick={clickHandler} on >
                            Дашборд
                        </NavLink>
                    </li>
                    <li className="grey-text text-darken-1">
                        <NavLink to="/accounts" className="grey-text text-darken-1" activeClassName="active" onClick={clickHandler}>
                            Учёт финансов
                        </NavLink>
                    </li>
                    <li className="grey-text text-darken-1">
                        <NavLink to="/budget" className="grey-text text-darken-1 disabled" activeClassName="active" onClick={clickHandler}>
                            Планирование бюджета
                        </NavLink>
                    </li>
                    <li className="grey-text text-darken-1" >
                        <NavLink to="/debt" className="grey-text text-darken-1 disabled"  activeClassName="active" onClick={clickHandler}>
                            Управление кредитами
                        </NavLink>
                    </li>
                    <li className="grey-text text-darken-1" >
                        <NavLink to="/income-cap" className="grey-text text-darken-1 disabled" activeClassName="active" onClick={clickHandler}>
                            Калькулятор дохода
                        </NavLink>
                    </li>
                    <li className="grey-text text-darken-1">
                        <NavLink to="/money-life-converter" className="grey-text text-darken-1 disabled" activeClassName="active" onClick={clickHandler}>
                            Конвертер жизни
                        </NavLink>
                    </li>
                    <li className="grey-text text-darken-1">
                        <NavLink to="/reports" className="grey-text text-darken-1 disabled" activeClassName="active" onClick={clickHandler}>
                            Отчёты и Аналитика
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <NavLink to="/">
                
            </NavLink>
       </div>
    ) 
}