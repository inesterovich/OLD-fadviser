import React from 'react';
import { useParams } from 'react-router-dom';
import { utils } from '../utils';
import { ModalCustom } from '../components/Modal.jsx';
import { CreateOperation } from '../components/CreateOperation.jsx';



export const Account = () => {

    const accountId = useParams().id;
    
    const component = <CreateOperation />;
    const { storage } = utils;

    const accounts = storage.get('userAccounts', null);
    const account = accounts.find((item) => item._id === accountId);

      /* Вместо суммы мне нужен:
    1. Доход;
    2. Расход;
    3. Остаток
    


    Суммирую я верно. Теперь нужно обновлять счёт в локальном хранилище. 
    */
    
    let accumulator = account.operations[0].sum || 0;

    return (
        
        <div>
            <h3>{account.name}</h3>
            <table key={account._id}>
                <thead>

                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Комментарий</th>
                        <th>Доход</th>
                        <th>Расход</th>
                        <th>Остаток</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                    
                </thead>
                <tbody>
                   {   
                        account.operations.map((operation, index) => {

                            return (
                                <tr key={operation._id}>
                                    <td>{index + 1 }</td>
                                    <td>{new Date(operation.date).toLocaleDateString() }</td>
                                    <td>{operation.comment }</td>
                                    <td>{operation.sum > 0 ? operation.sum: '' }</td>
                                    <td>{operation.sum < 0 ? operation.sum: '' }</td>
                                    <td>{index === 0 ? accumulator : accumulator += operation.sum
                                    }</td>
                                    <td>Изменить</td>
                                    <td>Удалить</td>
                               </tr>
                           )
                       })
                        
                    }
                </tbody>
            </table>

            <ModalCustom data={ {name: 'Новая операция', component}} />
        </div>

    )
}