import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { utils } from '../utils';
import { Modal, Button, DatePicker } from 'react-materialize';
import { useMessage } from '../hooks/message.hook.jsx';



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

    
    const [validity, setValidity] = useState(true);
    const message = useMessage();

    const changeHandler =  useCallback(event => {
       
        if (event.target.type === 'select-one') {
            let type = event.target.selectedOptions[0].dataset.operationtype;

            type === 'income' ? type = true : type = false;
            setOperationType(type);
    
        }
    
        setOperation({...operation, [event.target.name]:
            event.target.type === 'number' ?
                Number(event.target.value)
                : event.target.value})
    }, [operation])
    
   

    const createHandler = async () => {
        try {

            if (Number(operation.sum) === 0 || isNaN(Number(operation.sum))) {
                setValidity(false);
            } else {

            
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
                
            if (currentAccount) {
                const closeModal = document.getElementById('closeCreateOperation');
                closeModal.click();
                }

            }

    
            
        } catch (error) {}
       
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    useEffect(() => {
        if (validity === false) {
            message('Сумма операции не может быть нулевой');
            setValidity(true);
        }
    }, [validity, message])


    const SelectInit = () => {
        
        const modal = document.getElementById('create-operation');
        const select = modal.querySelectorAll('select');
        window.M.FormSelect.init(select, {});
        }
    
    const trigger = <Button> Новая операция </Button>
   const submit = <Button className="btn grey lighten-1 black-text " onClick={createHandler} >Сохранить</Button>;
    const cancelButton = <Button id="closeCreateOperation" modal="close" className="btn grey lighten-1 black-text">Отмена</Button>;
    

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

                        if (!operationType) {

                            if (event.target.value.length === 0 && !isNaN(Number(event.key)) ) {
                                event.preventDefault();
                                event.target.value = -event.key;
                            }
                            
                            if (event.target.value.length >= 1 && event.key === '-') {
                                event.preventDefault();
                            }

                            if (event.code === "Backspace" && event.target.value.length === 2) {
                            
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