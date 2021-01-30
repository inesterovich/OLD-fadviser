import React from 'react';
import { useParams } from 'react-router-dom';
import { utils } from '../utils';
import { CreateOperation } from '../components/CreateOperation.jsx';
import { DeleteOperation } from '../components/DeleteOperation.jsx';
import { EditOperation } from '../components/EditOperation.jsx';
import { ReactComponent as IncomeIcon } from '../assets/income.svg';
import { ReactComponent as ExpensesIcon } from '../assets/expenses.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete-black.svg';
import {ReactComponent as EditIcon} from '../assets/edit-black.svg';




export const AccountDetail = () => {


    const accountId = useParams().id;
    
    
    const { storage } = utils;

    const accounts = storage.get('accountsData', null).accounts;
    const account = accounts.find((item) => item._id === accountId);

   
    
    let accumulator = account.operations[0].sum || 0;

    return (
        
        <div>
            <h2>{account.name}</h2>
            <table key={account._id}  className="center-align">
                <thead>

                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Комментарий</th>
                        <th><IncomeIcon title="Доход" /></th>
                        <th><ExpensesIcon title="Расход" /></th>
                        <th>Остаток</th>
                        <th><EditIcon title="Изменить операцию" /></th>
                        <th><DeleteIcon title="Удалить операцию" /></th>
                    </tr>
                    
                </thead>
                <tbody>
                   {   
                        account.operations.map((operation, index) => {

                            return (
                                <tr key={operation._id}>
                                    <td>{index + 1 }</td>
                                    <td>{new Date(operation.date).toLocaleDateString() }</td>
                                    <td>{operation.category}</td>
                                    <td className="green-text text-darken-3">
                                        {
                                        operation.sum > 0
                                            ? Number(operation.sum.toFixed(2)).toLocaleString()
                                            + ' ₽'
                                            : ''
                                        }
                                    </td>
                                    <td className="red-text text-darken-3">
                                        {
                                            operation.sum < 0
                                            ? Number(operation.sum.toFixed(2)).toLocaleString() + ' ₽'
                                            : ''
                                        }
                                    </td>
                                    <td>
                                        {
                                            index === 0
                                            ? Number(accumulator.toFixed(2)).toLocaleString() + ' ₽'
                                            : Number((accumulator += operation.sum).toFixed(2)).toLocaleString() + ' ₽'
                                    }</td>
                                    <td> 
                                            <EditOperation
                                            operationId={operation._id}
                                            date={new Date(operation.date).toString()}
                                            category={operation.category}
                                            sum={operation.sum}
                                            categoryId={index + 1}
                                            type = {operation.sum > 0 ? true : false}
                                            />
</td>
                                    <td>
                               
                                            <DeleteOperation
                                            operationId={operation._id}
                                            disabled={index === 0}
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