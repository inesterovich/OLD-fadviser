import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';
const accountsData = 'accountsData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);

    //Вот где-то здесь надо декодировать токен и попробовать проверить его на валидность
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
     }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
        localStorage.removeItem(accountsData);
     }, []);


    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId);
        };

        setReady(true);

     }, [login]);


    return {
        login, logout, token, userId, ready
    }
}