import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook.jsx';
import { Modal, Button } from 'react-materialize';
import {ReactComponent as DeleteIcon} from '../assets/delete-black.svg';


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
        history.replace(`/accounts`);
        
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const trigger = <DeleteIcon  title="Удалить счёт" className="active-icon" />
    const submit = <Button modal="close" className="btn grey lighten-1 black-text " onClick={deleteHandler} >Да</Button>;
    const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Нет</Button>;



    return (
        <Modal header="Удалить счёт?" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
      
      </Modal>

    )




  
}