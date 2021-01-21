import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { utils } from '../utils';
import { Modal, Button, DatePicker } from 'react-materialize';


export const CreateOperation = () => {
    
    const { storage } = utils;

    const history = useHistory();
    const accountId = useParams().id;
    const { token } = useContext(AuthContext);
    const { request} = useHttp();

    const [operation, setOperation] = useState({
        date: new Date(),
        category: 'Зарплата',
        sum: 0,
    })

    const [operationType, setOperationType] = useState(true);

    // Определение типа операции готово. Нужно придумать, как запретить с ней что-то делать
    // Мне нужно добавить атрибут к полю. 
    /*  Если это доходы, то min = 0,000001
        Если это расходы, то max = - 0,000001

        А если попробовать сумму записывать строкой и на базе её делать номером?
    */

    const changeHandler =  useCallback(event => {
        console.log(event)
       
        if (event.target.type === 'select-one') {
            let type = event.target.selectedOptions[0].dataset.operationtype;

            type === 'income' ? type = true : type = false;
            setOperationType(type);
    
        }

        /*

        if (event.target.id === 'sum') {
            
            if (operationType === true) {
                const sum = event.target.value;

              
                debugger;
                if (Number(sum) < 0) {
                    console.log(sum)
                    event.target.value = event.target.value.slice(1) || ''

                }
            
            }
        } */

    
        setOperation({...operation, [event.target.name]:
            event.target.type === 'number' ?
                Number(event.target.value)
                : event.target.value})
    }, [operation])
    
    /*
    useEffect(() => {
        console.log(operationType);
        console.log(operation)
    }, [changeHandler, operationType, operation])
    */

  

    const createHandler = async () => {
        try {
           const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', { ...operation, type: 'add operation'}, {
                Authorization: `Bearer ${token}`
           })
            
            

            const accountsData = storage.get('accountsData', null);
            const accounts = accountsData.accounts;
            let index = accounts.findIndex((item) => item._id === accountId);

            accounts[index].operations = currentAccount.operations;
            accounts[index].sum = currentAccount.sum;
            
            storage.set('accountsData', accountsData);

            history.push(`/loading`);
            history.replace(`/accounts/${accountId}`);
            
        } catch (error) {}
       
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);


    const SelectInit = () => {
        
        const modal = document.getElementById('create-operation');
        const select = modal.querySelectorAll('select');
        window.M.FormSelect.init(select, {});
        }
    
    const trigger = <Button> Новая операция </Button>
   const submit = <Button modal="close" className="btn grey lighten-1 black-text " onClick={createHandler} >Сохранить</Button>;
    const cancelButton = <Button modal="close" className="btn grey lighten-1 black-text">Отмена</Button>;
    

    return (

        <Modal id="create-operation" className="modal big-modal create-operation" header="Новая операция" trigger={trigger}
            actions={[
         
            submit, cancelButton
            ]}
            options={{
            onOpenStart: SelectInit,
            
        }}
        
        >
            <div className="input-field">
                <DatePicker
                    
                    id="dateCreate"
                    name="date"
                    options={{
                        autoClose: false,
                        defaultDate: operation.date,
                        setDefaultDate: true,
                        firstDay: 1,
                        format: 'dd.mm.yyyy',
                        i18n: {
                            cancel: 'Отмена',
                            done: 'ОК',
                            clear: 'Очистить',
                            months: [
                                'Январь',
                                'Февраль',
                                'Март',
                                'Апрель',
                                'Май',
                                'Июнь',
                                'Июль',
                                'Август',
                                'Сентябрь',
                                'Октябрь',
                                'Ноябрь',
                                'Декабрь'
                            ],
                            monthsShort: [
                                'Янв',
                                'Фев',
                                'Мар',
                                'Апр',
                                'Май',
                                'Июн',
                                'Июл',
                                'Авг',
                                'Сен',
                                'Окт',
                                'Ноя',
                                'Дек'
                            ],
                            
                            weekdays: [
                                'Воскресенье',
                                'Понедельник',
                                'Вторник',
                                'Среда',
                                'Четверг',
                                'Пятница',
                                'Суббота'
                            ],
                            
                            weekdaysAbbrev: [
                                'ВС',
                                'ПН',
                                'ВТ',
                                'СР',
                                'ЧТ',
                                'ПТ',
                                'СБ'
                            ],
                            
                            weekdaysShort: [
                                'ВС',
                                'ПН',
                                'ВТ',
                                'СР',
                                'ЧТ',
                                'ПТ',
                                'СБ'
                              ]
                        },


                        onSelect: (newDate) => {
                            changeHandler({
                                target: {
                                    name: 'date',
                                    value: newDate
                                }
                            })
                        }
                        
                    }}
                />
                
                
            
            </div>
            
            <div></div>
            <div className="input-field">
                <select name="category" onChange={changeHandler} value={storage.get('accountsData').categories.income[0].name} required>
                    <optgroup label="Доходы">
                        {storage.get('accountsData').categories.income.map((object, index) => {
                            return (
                                <option key={object._id} value={object.name}
                                data-operationtype="income"
                                >{object.name}</option>
                            )
                        })}
                    </optgroup>
                    <optgroup label="Расходы">
                    {storage.get('accountsData').categories.expenses.map((object) => {
                            return (
                                <option key={object._id} value={object.name}
                                data-operationtype="expenses"
                                >{object.name}</option>
                            )
                        })}
                    </optgroup>
                </select>
                <label>Категория</label>
  </div>

            <div className="input-field">
                <input
                    id="sum"
                    type="number"
                    name="sum"
                    placeholder={operation.sum}
                    onChange={changeHandler}
                    min={operationType ? 0 : ''}
                    onKeyDown={(event) => {
                        if (operationType && event.key === '-') {
                            event.preventDefault();
                            
                        }

                        // Меньше нуля я убил. А если расходы убиваем? Дописываем минус? И минус 0 тоже выкидываем
                    }}
                    
                    
                    
                />
                
                <label htmlFor="sum">Сумма операции</label>
            </div>

       
        </Modal>
        
    )
}