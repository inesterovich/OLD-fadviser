import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { utils } from '../utils';
import { Modal, Button, DatePicker } from 'react-materialize';
import { useMessage } from '../hooks/message.hook.jsx';
import {ReactComponent as EditIcon} from '../assets/edit-black.svg';



export const EditOperation = ({ operationId, date, category, sum,  categoryId, type }) => {
    
   

 
    const { storage } = utils;

    const history = useHistory();
    const accountId = useParams().id;
    const { token } = useContext(AuthContext);
    const { request, error, clearError } = useHttp();
    const [operationType, setOperationType] = useState(type);
 
    const [validity, setValidity] = useState(true);

    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();

     }, [error, message, clearError]);
    

    const [operation, setOperation] = useState({
        date: new Date(date),
        category,
        sum,
    })


    const changeHandler = useCallback(event => {
        
        // Вот здесь мне надо что-то дописать 
        /*  Что именно мне нужно тут сделать? 
        
        */
      
       
        if (event.target.type === 'select-one') {
            let type = event.target.selectedOptions[0].dataset.operationtype;

            type === 'income' ? type = true : type = false;
            setOperationType(type);

       
            
         
           
    
        }
     
        setOperation({
            ...operation,
            [event.target.name]:
            event.target.type === 'number' ?
                Number(event.target.value)
                : event.target.value
        
        })
    }, [operation])

    useEffect(() => {
        if (operationType) {
            
            if (operation.sum < 0) {
                setOperation({
                    date: operation.date,
                    sum: -operation.sum,
                    category: operation.category
                })
            }
        } else {

            if (operation.sum > 0) {

                setOperation({
                    date: operation.date,
                    sum: -operation.sum,
                    category: operation.category
                })
            }
        }

    }, [operationType, operation])

    
    


    const updateHandler = async () => {
        try {
            if (Number(operation.sum) === 0 || isNaN(Number(operation.sum))) {
                setValidity(false);
            } else {
                const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', { ...operation, type: 'edit operation', operationId}, {
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

                if (currentAccount) {
                    const closeModal = document.getElementById(`closeEditOperation${operationId}`);
                    closeModal.click();
                    }
            }


 
            
        } catch (error) {}
       
    }

    useEffect(() => {
        if (validity === false) {
            message('Сумма операции не может быть нулевой');
            setValidity(true);
        }
    }, [validity, message])

    

    useEffect(() => {
        window.M.updateTextFields();
    }, []);


    const SelectInit = () => {
        
        const modal = document.getElementById(`${operationId}`);
        const select = modal.querySelectorAll('select');
        window.M.FormSelect.init(select, {});

        }
        
    

    const trigger = <EditIcon  title="Изменить операцию" className="active-icon" />
    const submit = <Button className="btn grey lighten-1 black-text " onClick={updateHandler} >Сохранить</Button>;
    const cancelButton = <Button modal="close"  id={`closeEditOperation${operationId}`}  className="btn grey lighten-1 black-text">Отмена</Button>;


    

    return (

        <Modal id={operationId}
            header="Изменение операции" trigger={trigger} actions={[
         
                submit, cancelButton
                
            ]}

            options={{
                onOpenStart: SelectInit,
                
            }}
        
        >
            <DatePicker 
                    id={date ? `date${categoryId}`: 'date'}
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
           

            
            <div className="input-field">
                
                {categoryId === 1 &&
                    <input

                    type="text"
                    name="category"
                    value={operation.category}
                    disabled={true}
                    />
                    
                }
                
                {
                    categoryId !== 1 &&

                    <select name="category" onChange={changeHandler} defaultValue={operation.category} required>
                    <optgroup label="Доходы">
                        {
                            storage.get('accountsData').categories.income.map((object, index) => {
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
                }

            
                <label>Категория</label>
  </div>


  <div className="input-field">
                <input
                    id="sum"
                    type="number"
                    name="sum"
                    value={operation.sum}
                    onChange={changeHandler}
                    min={operationType ? 0 : ''}
                    onKeyDown={(event) => {

                        if (operationType && event.key === '-') {
                            event.preventDefault(); 
                        }

                        if (!operationType) {

                            if (event.target.value.length === 0 && !isNaN(Number(event.key)) ) {
                                event.preventDefault();
                                event.target.value = -event.key;
                            }
                            
                            if (event.target.value.length >= 1 && event.key === '-') {
                                event.preventDefault();
                            }

                            if (event.code === "Backspace" && event.target.value.length === 2) {
                                console.log('Catch');
                                if (event.target.value[0] === '-') {
                                    event.preventDefault();
                                    event.target.value = '';
                                }
                            }
                           
                       
                        }

                    }}
                    
                    
                    
                />
                
                <label htmlFor="sum">Сумма операции</label>
            </div>

        </Modal>
        
    )
}