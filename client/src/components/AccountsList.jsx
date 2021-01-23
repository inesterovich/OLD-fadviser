import React from 'react';
import { Link } from 'react-router-dom';
import { CreateAccount } from './CreateAccount.jsx';
import { DeleteAccount } from '../components/DeleteAccount.jsx';
import { ReactComponent as OpenIcon } from '../assets/open.svg';
import {ReactComponent as DeleteIcon} from '../assets/delete-black.svg';


export const AccountsList = ({ accounts }) => {
    
    if (accounts === undefined || !accounts.length) {
        return <div className="section">
            <h2>Ваши счета</h2>
            <span className="center"> Нет ни одного счёта</span>
          <CreateAccount />
            
        </div>
    }
   

    return (
        <>
            <h2>Ваши счета</h2>
            <table>
                <thead>
                        
                        <tr>
                            <th>№</th>
                            <th>Название счета</th>
                            <th>Остаток</th>
                            <th><OpenIcon title="Открыть счёт" /></th>
                            <th><DeleteIcon title="Удалить счёт" /></th>
                        </tr>
                    

                </thead>
                <tbody>
              
             {
                        accounts.map((account, index) => {

                            return (
                                <tr key={account._id}>
                                    <td>{ index + 1 }</td>
                                    <td>{ account.name }</td>
                                    <td>{`${account.sum.toLocaleString()} ₽`}</td>
                                    <td><Link to={
                                        {
                                            pathname: `/accounts/${account._id}`,
                                            account: {account}
                                        }} ><OpenIcon title="Открыть" /></Link></td>
                                    <td> 
    
                                        <DeleteAccount accountId={account._id} >
                                        <DeleteIcon title="Удалить счёт" />
                                        </DeleteAccount>
                                            
                                    </td>

                                </tr>
                            )
                        } )
                    }
                </tbody>
            </table>

            <CreateAccount />
        </>
    )
}