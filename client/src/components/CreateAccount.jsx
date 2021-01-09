import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import {useHttp } from '../hooks/http.hook';

export const CreateAccount = () => {

    const { token } = useContext(AuthContext);

    const { request } = useHttp();

    const [account, setAccount] = useState({
        name: 'Кошелёк',
        sum: 0
    });

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setAccount({
            ...account,
            [event.target.name]:
                event.target.type === 'number' ?
                    Number(event.target.value)
                    : event.target.value
        });
    }

    const createHandler = async () => {
        try {
             await request('/api/secure/createaccount', 'POST', { ...account }, {
                Authorization: `Bearer ${token}`
            })
            /* Счет успешно создаётся. Но отбрасывается начальное значение. Получается, при создании счёта надо сразу же создавать первую операцию в нём
            Также при успешном создании надо редиректать на страницу счетов. 
            Фронт пока закрываем, скачем на бэк
            */
            
        } catch (error) {}
       
    }
    

   
    
    /* Модалка на минималках готова. 

    Отправляем запрос серверу, правим все ошибки, которые возникнут вот тут
    */

 
    return (

        <>
            
            <div className="input-field">
                <input
                    id="account"
                    type="text"
                    name="account"
                    placeholder={account.name}
                    onChange={changeHandler}
                    required        
                />
            <label htmlFor="account">Название счета</label>
            </div>

            <div className="input-field">
                <input
                    id="sum"
                    type="number"
                    name="sum"
                    placeholder={account.sum}
                    onChange={changeHandler}
                    min="0"
                />
                
                <label htmlFor="sum">Текущий остаток на счёте</label>
            </div>

            <div className="card-action">
                    <button
                        className="btn grey lighten-1 black-text"
                        type="button"
                        onClick={createHandler}
                    >
                        Создать
                    </button>
            </div>
        </>
        
    )
}

