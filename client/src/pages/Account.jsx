import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.jsx';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader.jsx';
import { AccountsList } from '../components/AccountsList.jsx';

export const Account = () => {

    const [accounts, setAccounts] = useState();
    const {loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    // Пора присобачивать лоадер. Без него не заведется нормально

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

    if (loading) {
        return < Loader />
    }

    return (
        <>
            { !loading && <AccountsList accounts = {accounts} /> }
        
        </>
    )
}