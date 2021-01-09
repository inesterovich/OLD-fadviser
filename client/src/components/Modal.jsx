import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Modal, Button, Icon } from 'react-materialize';
import { CreateAccount } from './CreateAccount.jsx';


export const ModalCustom = () => {
  const trigger = <Button>Создать счет</Button>
  
 
    // Триггер можно нарисовать прямо внутри скобок вообще-то. 

    return (

    <Modal header="Создание счета" trigger={trigger}>
      <CreateAccount />
  </Modal>
    )
}



// Я всё-таки хотел бы внутрь одной функции всё это обернуть. Там и поиграть можно будет с контентом