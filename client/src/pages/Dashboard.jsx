import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.jsx';
import { AuthContext } from '../context/AuthContext';
import { AccountsList } from '../components/AccountsList.jsx';
import { Loader } from '../components/Loader.jsx'; 
import { utils } from '../utils';



export const Dashboard = () => {

    const { storage } = utils;
 
   const [accounts, setAccounts] = useState();
   const {loading, request } = useHttp();
   const { token } = useContext(AuthContext);

   const fetchAccounts = useCallback(async () => {
       try {
           const fetched = await request('/api/secure/accounts', 'GET', null, {
               Authorization: `Bearer ${token}`
           });
           setAccounts(fetched); 

           storage.set('userAccounts', fetched);

       } catch (error) {}

   }, [request, token, storage])

   useEffect(() => {
       fetchAccounts();
   }, [fetchAccounts]);
    
    

   if (loading) {
    return < Loader />
}

return (
    <>
        { !loading && <AccountsList accounts = {accounts} /> }
    
    </>
)
}