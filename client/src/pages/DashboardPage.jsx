import React from 'react';
import accountingImage from '../assets/accounting.jpg'
import budgetingImage from '../assets/budgeting.png'
import loanManagementImage from '../assets/loan.jpg'
import financialCapImage from '../assets/financialCap.jpg'
import timeMoneyImage from '../assets/timeMoney.jpg'
import reportImage from '../assets/report.jpg'


export const DashboardPage = () => {
    
    return (
        <div className=" dashboard row ">
                           
            <a href="/accounts" className=" link-block col l4 m6 s12 black-text">
                <div className="card">
                    <div className="card-image">
                        <img src={budgetingImage} alt="Finance accounting" />
                    </div>
                    <div className="card-content">
                        <h3>Учёт <br/> финансов</h3>
                    </div>
                </div>
                
            </a>

            <a href="/budget" className=" link-block col l4 m6 s12 black-text disabled">
                <div className="card">
                    <div className="card-image">
                        <img src={accountingImage} alt="Budget planiing" />
                    </div>
                    <div className="card-content">
                        <h3>Планирование бюджета</h3>
                    </div>
                </div>
                
            </a>

            <a href="/debt" className=" link-block col l4 m6 s12 black-text disabled">
                <div className="card">
                    <div className="card-image">
                        <img src={loanManagementImage} alt="Debt management" />
                    </div>
                    <div className="card-content">
                        <h3>Управление кредитами</h3>
                    </div>
                </div>
                
            </a>

            <a href="/income-cap" className=" link-block col l4 m6 s12 black-text disabled">
                <div className="card">
                    <div className="card-image">
                        <img src={financialCapImage} alt="Finance cap calculator" />
                    </div>
                    <div className="card-content">
                        <h3>Калькулятор дохода</h3>
                    </div>
                </div>
                
            </a>

            <a href="/money-life-converter" className=" link-block col l4 m6 s12 black-text disabled">
                <div className="card">
                    <div className="card-image">
                        <img src={timeMoneyImage} alt="Money-life converter" />
                    </div>
                    <div className="card-content">
                        <h3>Конвертер жизни</h3>
                    </div>
                </div>
                
            </a>

            <a href="/reports" className=" link-block col l4 m6 s12 black-text disabled">
                <div className="card">
                    <div className="card-image">
                        <img src={reportImage} alt="Reports" />
                    </div>
                    <div className="card-content">
                        <h3>Отчёты и аналитика</h3>
                    </div>
                </div>
                
            </a>
      
        
     
        </div>

     )
}