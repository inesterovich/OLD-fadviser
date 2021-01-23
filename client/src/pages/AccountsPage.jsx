import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.jsx';
import { AuthContext } from '../context/AuthContext';
import { AccountsList } from '../components/AccountsList.jsx';
import { Loader } from '../components/Loader.jsx'; 
import { utils } from '../utils';



export const AccountsPage = () => {

    const { storage } = utils;
 
   const [accounts, setAccounts] = useState();
   const {loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    
    const [, setCategories] = useState();
    
    

    const fetchAccountsData = useCallback(async () => {
        try {
            const fetched = await request('/api/secure/accounts', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAccounts(fetched.accounts);
            setCategories(fetched.categories);

            storage.set('accountsData', fetched);

        } catch (error) { }

    }, [request, token, storage]);



   useEffect(() => {
       fetchAccountsData();
   }, [fetchAccountsData]);
    
    

   if (loading) {
    return < Loader />
}

return (
    <>
        { !loading && <AccountsList accounts = {accounts} /> }
    
    </>
)
}