import React, { useEffect, useState }  from 'react';
// eslint-disable-next-line no-unused-vars
import { Modal, Button } from 'react-materialize';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';


export const Register = () => {
    
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();

     }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message);

            if (data) {
                const closeModal = document.getElementById('closeRegister');
                closeModal.click();
            }
            
        } catch (error) {}
    }


    
    useEffect(() => {
    window.M.updateTextFields();
    }, []);

    const trigger = <a href="/" onClick={(event) => event.preventDefault()} className="grey-text text-darken-1" > Регистрация </a>

    const submit = <Button className="btn grey lighten-1 black-text " onClick={registerHandler} disabled={loading} >Отправить</Button>;
    const cancelButton = <Button id="closeRegister"  modal="close"  className="btn grey lighten-1 black-text">Отмена</Button>;
   


    return (
        <Modal id="registerModal"
            header="Регистрация" trigger={trigger} actions={[
         
            submit, cancelButton
        ]}>
            
            <div className="input-field">
                        <input
                                placeholder="Введите email"
                                id="registerEmail"
                                type="text"
                                name="email"
                                onChange={changeHandler}
                                  
                                />
                        <label htmlFor="registerEmail">Email</label>
                            </div>
                            
                <div className="input-field">
                        <input
                                placeholder="Введите пароль"
                                id="registerPassword"
                                type="password"
                                name="password"
                                onChange={changeHandler} 
                                />
                        <label htmlFor="registerPassword">Пароль</label>
                        </div>

        
      </Modal>
        )
}