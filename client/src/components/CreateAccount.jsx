import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-materialize';




export const CreateAccount = () => {
  

    const history = useHistory();


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
          
            history.push(`/loading`);
            history.replace('/accounts');
            
        } catch (error) {}
       
    }

    const trigger = <Button className="btn-small blue darken-1"> Создать счёт </Button>


    const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Отмена</Button>;
    const submit = <Button modal="close"  className="btn grey lighten-1 black-text" onClick={createHandler} >Отправить</Button>;
    

    return (
        <Modal header="Создать аккаунт" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
            <div className="input-field">
                <input
                    id="account"
                    type="text"
                    name="name"
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
      </Modal>
        
    )
   
 
}

