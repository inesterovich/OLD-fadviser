import React, { useContext, useEffect, useState }  from 'react';
// eslint-disable-next-line no-unused-vars
import { Modal, Button } from 'react-materialize';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const Login = () => {
    const {login} = useContext(AuthContext);
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

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            login(data.token, data.userId);

            if (data) {
                const closeModal = document.getElementById('closeLogin');
                closeModal.click();
            }
        } catch (error) {}
    }
    
    useEffect(() => {
    window.M.updateTextFields();
    }, []);

    const trigger = <a href="/" onClick={(event) => event.preventDefault()} className="grey-text text-darken-1" > Войти </a>

    const submit = <Button modal="close" className="btn grey lighten-1 black-text" onClick={loginHandler} disabled={loading} >Отправить</Button>;
    const cancelButton = <Button id="closeLogin"  modal="close"  className="btn grey lighten-1 black-text">Отмена</Button>;
   


    return (
        <Modal 
            header="Авторизация" trigger={trigger} actions={[
         
            submit, cancelButton
        ]}>
            
            <div className="input-field">
                        <input
                                placeholder="Введите email"
                                id="loginEmail"
                                type="text"
                                name="email"
                                onChange={changeHandler}
                                  
                                />
                        <label htmlFor="loginEmail">Email</label>
                            </div>
                            
                <div className="input-field">
                        <input
                                placeholder="Введите пароль"
                                id="loginPassword"
                                type="password"
                                name="password"
                                onChange={changeHandler} 
                                />
                        <label htmlFor="loginPassword">Пароль</label>
                        </div>

        
      </Modal>
        )
}