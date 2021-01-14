import React, { useContext, useEffect } from 'react';
import { utils } from '../utils';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook.jsx';


export const DeleteAccount = ({accountId}) => {

   
    const { storage } = utils;

    const history = useHistory();
    
    const { token } = useContext(AuthContext);
    const { request } = useHttp();


    
    const deleteHandler = async () => {
        const body = {
            type: 'delete account',
        };


        const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', body, {
            Authorization: `Bearer ${token}`
        });

     //   const accounts = storage.get('userAccounts', null);
       // let index = accounts.findIndex((item) => item._id === accountId);

        //accounts[index].operations = currentAccount.operations;
        // accounts[index].sum = currentAccount.sum;
        
        //storage.set('userAccounts', accounts);

        history.push(`/loading`);
        history.replace(`/dashboard`);
        
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);



    
    return (
        
         <button
                className="btn grey lighten-1 black-text"
                type="button"
                onClick={deleteHandler}
                    >
                       Да
                    </button>
        
        
    )


  
}