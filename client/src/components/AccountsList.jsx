import React from 'react';
import { ModalCustom } from '../components/Modal.jsx';

export const AccountsList = ({ accounts }) => {
    
    // Вот здесь делаем историю для модалки
    // Модалку вполне можно вынести отдельным компонентом

    if (accounts === undefined || !accounts.length) {
        return <div className="section">
            <h2>Ваши счета</h2>
            <span className="center"> Нет ни одного счёта</span>
            <ModalCustom />
        </div>
    }

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
                                    <td>Открыть</td>
                                    <td>Удалить</td>

                                </tr>
                            )
                        } )
                    }
                </tbody>
            </table>

            <ModalCustom />
        </div>
    )
}