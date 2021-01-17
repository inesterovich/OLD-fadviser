/* eslint-disable no-unused-vars */
import React, {  useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.jsx';
import { useMessage } from '../hooks/message.hook.jsx';
import { Icon, Button } from 'react-materialize';

import accountingImage from '../assets/accounting.jpg';
import budgetingImage from '../assets/budgeting.png';
import loanManagementImage from '../assets/loan.jpg';
import financialCapImage from '../assets/financialCap.jpg';
import timeMoneyImage from '../assets/timeMoney.jpg';
import reportImage from '../assets/report.jpg';
import bigLogo from '../assets/fadviser.svg';


export const AuthPage = () => {
   
    const message = useMessage();
    const {  error,  clearError } = useHttp();

 

    useEffect(() => {
        message(error);
        clearError();

     }, [error, message, clearError]);

 

    return (
        <>
        <div className="section promo-section valign-wrapper">
            <div className="container" >
                <div className="center white blue-text text-darken-4 promo-wrapper">
                    <h1><img src={bigLogo} alt="Main title"/></h1>
                    <p>Платформа финансовых советов</p>
                </div>
            </div>
            </div>

            <div id="opportunity-section" className="section opportunity-section">
                <div className="container center-align">
                    <h2 id="opportunity-section-header" className="center">Возможности</h2>

                    <div className="row ">
                        
                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img src={budgetingImage} alt="Finance accounting" />
                                </div>
                                <div className="card-content">
                                    <h3>Учёт финансов</h3>
                                    <p>Добавляйте счета, операции. Настраивайте свои категории</p>

                                </div>
                            </div>
                            
                            
                        </div>

                        <div className="col s4">

                        <div className="card">
                                <div className="card-image">
                                    <img src={accountingImage} alt="Budget planiing" />
                                </div>
                                <div className="card-content">
                                    <h3>Планируйте будущее</h3>
                                    <p>Сформируйте бюджет по системе 6 шкатулок или составьте самостоятельно</p>

                                </div>
                        </div>

                            

                            
                        </div>

                        <div className="col s4">
                            
                            <div className="card">
                                <div className="card-image">
                                    <img src={loanManagementImage} alt="Debt management" />
                                </div>
                                <div className="card-content">
                                <h3>Управляйте долгами</h3>
                                <p>Подберите стратегию погашения или проверьте банк на честность</p>

                                </div>
                        </div>


                        </div>

                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img src={financialCapImage} alt="Finance cap calculator" />
                                </div>
                                <div className="card-content">
                                    <h3>Растите в деньгах</h3>
                                    <p>Определите ваш потенциальный уровень заработка и стремитесь к нему</p>

                                </div>
                            </div>
                        </div>

                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img src={timeMoneyImage} alt="Money-life converter" />
                                </div>
                                <div className="card-content">
                                    <h3>Экономьте жизнь</h3>
                                    <p>Переведите ваши покупки в часы жизни и не тратьте деньги на лишнее</p>

                                </div>
                            </div>



                            
                        </div>

                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img src={reportImage} alt="Reports" />
                                </div>
                                <div className="card-content">
                                    <h3>Создавайте отчёты</h3>
                                    <p>Визуализируйте ваши финансы и будьте в курсе текущей ситуации</p>

                                </div>
                         </div>



                            
                        </div>

  
                      
                    </div>

                    <Button
                        className="center blue darken-2 btn-large modal-trigger" href="#registerModal"
                        node="button"
                    
                      >Присоединиться</Button>
                </div>
            </div>
            </>
    )

}