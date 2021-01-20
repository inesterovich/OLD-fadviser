import React, { useContext, useEffect } from 'react';
import { utils } from '../utils';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook.jsx';
import { Modal, Button  } from 'react-materialize';


export const DeleteOperation = ({ operationId, disabled = false }) => {

   
    const { storage } = utils;

    const history = useHistory();
    const accountId = useParams().id;
    const { token } = useContext(AuthContext);
    const { request } = useHttp();


    
    const deleteHandler = async () => {
        const body = {
            operationId,
            type: 'delete operation',
        };


        const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', body, {
            Authorization: `Bearer ${token}`
        });

        const accountsData = storage.get('accountsData', null);
        const accounts = accountsData.accounts;
        let index = accounts.findIndex((item) => item._id === accountId);

        accounts[index].operations = currentAccount.operations;
        accounts[index].sum = currentAccount.sum;
            
        storage.set('accountsData', accountsData);

        history.push(`/loading`);
        history.replace(`/accounts/${accountId}`);
        
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const trigger = <Button className={disabled ? 'btn disabled' : 'btn' }> Удалить </Button>
    const submit = <Button modal="close" className="btn grey lighten-1 black-text " onClick={deleteHandler} >Да</Button>;
    const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Нет</Button>;



    
    return (
        <Modal header="Удалить операцию?" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
      
      </Modal>
    )


  
}