import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { utils } from '../utils';
import { Modal, Button } from 'react-materialize';


export const CreateOperation = () => {

    // Нам нужно будет id счета
    const { storage } = utils;

    const history = useHistory();
    const accountId = useParams().id;
    const { token } = useContext(AuthContext);
    const { request} = useHttp();

    const [operation, setOperation] = useState({
        date: '',
        comment: '',
        sum: 0,
    })

    const changeHandler = event => {
        setOperation({...operation, [event.target.name]:
            event.target.type === 'number' ?
                Number(event.target.value)
                : event.target.value})
    }

  

    const createHandler = async () => {
        try {
           const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', { ...operation, type: 'add operation'}, {
                Authorization: `Bearer ${token}`
           })
            

           const accounts = storage.get('userAccounts', null);
            let index = accounts.findIndex((item) => item._id === accountId);

            accounts[index].operations = currentAccount.operations;
            accounts[index].sum = currentAccount.sum;
            
            storage.set('userAccounts', accounts);

            history.push(`/loading`);
            history.replace(`/accounts/${accountId}`);
            
        } catch (error) {}
       
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);


  
// Самый простой способ настраивать модалку как я хочу, возращать уже настроенные компонент с модалкой
    
    /* Оборачивать здесь - тогда пусть и повторений дофига, но хоть по человечески кнопки настроить можно
    
    Вариант посложнее - куда-нибудь вынести все хендлеры в одну папочку и доставать при необходимости. 
    */
    
   const trigger = <Button> Новая операция </Button>
   const submit = <Button modal="close" className="btn grey lighten-1 black-text " onClick={createHandler} >Сохранить</Button>;
   const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Отмена</Button>;

    return (

        <Modal header="Новая операция" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
            <div className="input-field">
                <input
                    id="date"
                    type="date"
                    name="date"
                    onChange={changeHandler}
                    required        
                />
            <label htmlFor="date">Введите дату операцмм</label>
            </div>
            
            <div className="input-field">
                <input
                    id="comment"
                    type="text"
                    name="comment"
                    placeholder="Введите комментарий"
                    onChange={changeHandler}
                    required        
                />
            <label htmlFor="comment">Коментарий</label> 
            </div>

            <div className="input-field">
                <input
                    id="sum"
                    type="number"
                    name="sum"
                    placeholder={operation.sum}
                    onChange={changeHandler}
                    
                />
                
                <label htmlFor="sum">Сумма операции</label>
            </div>

       
        </Modal>
        
    )
}