import React, { useContext, useEffect } from 'react';
import { utils } from '../utils';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook.jsx';


export const DeleteOperation = ({ operationId }) => {

   
    const { storage } = utils;

    const history = useHistory();
    const accountId = useParams().id;
    const { token } = useContext(AuthContext);
    const { request } = useHttp();

/* Что мне надо передать-то, какие именно данные?  */
    
    const deleteHandler = async () => {
        const body = {
            operationId,
            type: 'delete operation',
        };


        const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', body, {
            Authorization: `Bearer ${token}`
        });

        const accounts = storage.get('userAccounts', null);
        let index = accounts.findIndex((item) => item._id === accountId);

        accounts[index].operations = currentAccount.operations;
        accounts[index].sum = currentAccount.sum;
        
        storage.set('userAccounts', accounts);

        history.push(`/loading`);
        history.replace(`/accounts/${accountId}`);
        
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);



    
    return (
        <>
         <button
                className="btn grey lighten-1 black-text"
                type="button"
                onClick={deleteHandler}
                    >
                       Да
                    </button>
        
        </>
    )


  
}