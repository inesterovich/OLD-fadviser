import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.jsx';
import { AuthContext } from '../context/AuthContext';
import { AccountsList } from '../components/AccountsList.jsx';

export const Dashboard = () => {
    /* На этой странице мне нужен список счетов и кнопка создать 
    Список счетов будет таблицей либо абзацем. Кнопка - кнопка с хендлером "Onclick"
    */
 
   const [accounts, setAccounts] = useState();
   const { request } = useHttp();
   const { token } = useContext(AuthContext);

   const fetchAccounts = useCallback(async () => {
       try {
           const fetched = await request('/api/secure/accounts', 'GET', null, {
               Authorization: `Bearer ${token}`
           });

           setAccounts(fetched); 

       } catch (error) {}

   }, [token, request])

   useEffect(() => {
       fetchAccounts();
   }, [fetchAccounts]);

   return (
       <>
           {
               <AccountsList accounts = {accounts} />
           }
       
       </>
   )
}