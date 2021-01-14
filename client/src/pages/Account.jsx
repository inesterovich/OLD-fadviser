import React from 'react';
import { useParams } from 'react-router-dom';
import { utils } from '../utils';

import { CreateOperation } from '../components/CreateOperation.jsx';
import { DeleteOperation } from '../components/DeleteOperation.jsx';
import { EditOperation } from '../components/EditOperation.jsx';





export const Account = () => {

    const accountId = useParams().id;
    
    
    const { storage } = utils;

    const accounts = storage.get('userAccounts', null);
    const account = accounts.find((item) => item._id === accountId);

   


    
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
                                    <td> 
                                            <EditOperation
                                            operationId={operation._id}
                                            date={new Date(operation.date).toLocaleDateString()}
                                            category={operation.comment}
                                            sum={operation.sum}
                                            commentId = {index+1}
                                            />
</td>
                                    <td>
                               
                                            <DeleteOperation
                                                operationId={operation._id}
                                            />
                                    </td>
                               </tr>
                           )
                       })
                        
                    }
                </tbody>
            </table>

            <CreateOperation />
        </div>

    )
}