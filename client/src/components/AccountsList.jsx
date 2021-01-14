import React from 'react';
import { ModalCustom } from '../components/Modal.jsx';
import { Link } from 'react-router-dom';
import { CreateAccount } from './CreateAccount.jsx';
import { DeleteAccount } from '../components/DeleteAccount.jsx';
import { Button, Modal } from 'react-materialize';

export const AccountsList = ({ accounts }) => {


    const component = <CreateAccount />;

    const delComponent = <DeleteAccount />


    

    if (accounts === undefined || !accounts.length) {
        return <div className="section">
            <h2>Ваши счета</h2>
            <span className="center"> Нет ни одного счёта</span>
            <ModalCustom data={ {name: 'Создать счёт', component}} />
        </div>
    }
    // Не круче ли будет здесь всё-таки сообразить контекст?
    // Добавляем удаление кривым способом и делаем контекст

    return (
        <div className="section">
            <h2>Ваши счета</h2>
            <table>
                <thead>
                        
                        <tr>
                            <th>№</th>
                            <th>Название счета</th>
                            <th>Остаток</th>
                            <th>Открыть</th>
                            <th>Удалить</th>
                        </tr>
                    

                </thead>
                <tbody>
              
             {
                        accounts.map((account, index) => {

                            return (
                                <tr key={account._id}>
                                    <td>{ index + 1 }</td>
                                    <td>{ account.name }</td>
                                    <td>{ account.sum }</td>
                                    <td><Link to={
                                        {
                                            pathname: `/accounts/${account._id}`,
                                            account: {account}
                                        }} >Открыть</Link></td>
                                    <td> 
                                    <Modal
                                            trigger={
                                            <Button
                                               
                                            >Удалить
                                            </Button>
                                            }
                                            header="Удалить аккаунт?"
                                            actions={[
                                                <Button
                                                    flat
                                                    modal="close"
                                                    node="button"
                                                    waves="green"
                                                >Нет
                                                </Button>
                                            ]}
                                        >
                                            
                                            <DeleteAccount accountId={account._id} />
                                            
                                        </Modal>


                                    </td>

                                </tr>
                            )
                        } )
                    }
                </tbody>
            </table>

            <ModalCustom data={ {name: 'Создать счёт', component}} />
        </div>
    )
}