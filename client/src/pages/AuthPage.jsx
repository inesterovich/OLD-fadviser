/* eslint-disable no-unused-vars */
import React, {  useEffect } from 'react';

import { useHttp } from '../hooks/http.hook.jsx';
import { useMessage } from '../hooks/message.hook.jsx';
import { Icon, Button } from 'react-materialize';

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
                <div className="center white blue-text promo-wrapper">
                    <h1>Fadviser</h1>
                    <p>Платформа финансовых советов</p>
                </div>
            </div>
            </div>

            <div id="opportunity-section" className="section opportunity-section">
                <div className="container center-align">
                    <h2 className="center">Возможности</h2>

                    <div className="row">
                        <div className="col s4">
                            <div className="opportunity center-align">
                                <Icon >card_travel</Icon>
                                <h3>Считайте деньги</h3>
                                <p>Добавляйте счета, операции. Настраивайте свои категории</p>
                            </div>
                        </div>

                        <div className="col s4">
                            <div className="opportunity center-align">
                                <Icon >card_travel</Icon>
                                <h3>Планируйте будущее</h3>
                                <p>Сформируйте бюджет по системе 6 шкатулок или составьте самостоятельно</p>
                            </div>
                        </div>

                        <div className="col s4">
                            <div className="opportunity center-align">
                                <Icon >card_travel</Icon>
                                <h3>Управляйте долгами</h3>
                                <p>Подберите стратегию погашения или проверьте банк на честность</p>
                            </div>
                        </div>

                        <div className="col s4">
                            <div className="opportunity center-align">
                                <Icon >card_travel</Icon>
                                <h3>Растите в деньгах</h3>
                                <p>Определите ваш потенциальный уровень заработка и стремитесь к нему</p>
                            </div>
                        </div>

                        <div className="col s4">
                            <div className="opportunity center-align">
                                <Icon >card_travel</Icon>
                                <h3>Экономьте жизнь</h3>
                                <p>Переведите ваши покупки в часы жизни и не тратьте деньги на лишнее</p>
                            </div>
                        </div>

                        <div className="col s4">
                            <div className="opportunity center-align">
                                <Icon>card_travel</Icon>
                                <h3>Создавайте отчёты</h3>
                                <p>Визуализируйте ваши финансы и будьте в курсе текущего финансового состояния</p>
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