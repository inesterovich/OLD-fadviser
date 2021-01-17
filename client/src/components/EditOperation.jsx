import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useHttp } from '../hooks/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { utils } from '../utils';
import { Modal, Button, DatePicker } from 'react-materialize';




export const EditOperation = ({operationId, date, category, sum, commentId}) => {

 
    const { storage } = utils;

    const history = useHistory();
    const accountId = useParams().id;
    const { token } = useContext(AuthContext);
    const { request} = useHttp();

    const [operation, setOperation] = useState({
        date,
        comment: category,
        sum,
    })


    const changeHandler = event => {
        console.log(date);
        setOperation({...operation, [event.target.name]:
            event.target.type === 'number' ?
                Number(event.target.value)
                : event.target.value})
    }


    const updateHandler = async () => {
        try {
           const currentAccount = await request(`/api/secure/accounts/${accountId}`, 'POST', { ...operation, type: 'edit operation', operationId}, {
                Authorization: `Bearer ${token}`
           })
            
            /* В первую очередь я хочу, чтобы модалка у меня в принципе открывалась
            Затем мне нужно, чтобы форма заполнялась моими данными. 
            */
            

          const accounts = storage.get('userAccounts', null);
           let index = accounts.findIndex((item) => item._id === accountId);

            accounts[index].operations = currentAccount.operations;
            accounts[index].sum = currentAccount.sum;
            
           storage.set('userAccounts', accounts);

            history.push(`/loading`);
            history.replace(`/accounts/${accountId}`);
            
        } catch (error) {}
       
    }

    

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const trigger = <Button> Изменить </Button>
    const submit = <Button modal="close" className="btn grey lighten-1 black-text " onClick={updateHandler} >Сохранить</Button>;
    const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Отмена</Button>;


    


    return (

        <Modal id={operationId}
            header="Изменение операции" trigger={trigger} actions={[
         
            submit, cancelButton
        ]}>
            <DatePicker 
                    id={date ? `date${commentId}`: 'date'}
                    name="date"
                    options={{
                        autoClose: true,
                        defaultDate: new Date(date),
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
                <input
                    id={commentId ? `comment${commentId}`: 'comment'}
                    type="text"
                    name="comment"
                    placeholder="Введите комментарий"
                    onChange={changeHandler}
                    defaultValue={category}
                    required        
                />
            <label htmlFor={commentId ? `comment${commentId}`: 'comment'}>Коментарий</label> 
            </div>

            <div className="input-field">
                <input
                    id="sum"
                    type="number"
                    name="sum"
                    defaultValue={sum}
                    onChange={changeHandler}
                    
                />
                
                <label htmlFor="sum">Сумма операции</label>
            </div>

        </Modal>
        
    )
}