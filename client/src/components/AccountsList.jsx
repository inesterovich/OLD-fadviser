import React from 'react';


export const AccountsList = ({ accounts }) => {
    
    console.log(accounts);

    

    if (!accounts.length) {
        return <div className="section">
            <h2>Ваши счета</h2>
            <span className="center"> Нет ни одного счёта</span>
            <button type="button" className="waves-effect waves-light btn">Создать</button>
        </div>
    }

    return (
        <div className="section">
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

            <button type="button" className="waves-effect waves-light btn">Создать</button>
        </div>
    )
}