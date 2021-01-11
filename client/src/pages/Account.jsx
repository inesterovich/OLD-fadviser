import React from 'react';



export const Account = (account) => {

    console.log(account);
    console.log(this);

    return (
        /*
        <div>
            <h3>{account.name}</h3>
            <table key={account._id}>
                <thead>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Комментарий</th>
                    <th>Сумма</th>
                    
                </thead>
                <tbody>
                   {
                        account.operations.map((operation, index) => {
                            return (
                                <tr key={operation._id}>
                                    <td>{index + 1 }</td>
                                    <td>{new Date(operation.date).toLocaleDateString() }</td>
                                    <td>{operation.comment }</td>
                                    <td>{operation.sum }</td>
                               </tr>
                           )
                       })
                        
                    }
                </tbody>
            </table>
        </div> */

        <div>Заглушка</div>
    )
}