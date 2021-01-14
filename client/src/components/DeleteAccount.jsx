import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook.jsx';
import { Modal, Button  } from 'react-materialize';


export const DeleteAccount = ({accountId}) => {

    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { request } = useHttp();


    
    const deleteHandler = async () => {
        const body = {
            type: 'delete account',
        };


         await request(`/api/secure/accounts/${accountId}`, 'POST', body, {
            Authorization: `Bearer ${token}`
        });


        history.push(`/loading`);
        history.replace(`/dashboard`);
        
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const trigger = <Button> Удалить </Button>
    const submit = <Button modal="close" className="btn grey lighten-1 black-text " onClick={deleteHandler} >Да</Button>;
    const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Нет</Button>;



    return (
        <Modal header="Удалить счёт?" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
      
      </Modal>

    )




  
}