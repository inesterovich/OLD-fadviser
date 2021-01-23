import React  from 'react';
// eslint-disable-next-line no-unused-vars
import { Modal, Button as button } from 'react-materialize';

export const TestModal = (props) => {

    

    const trigger = <a href ="/"  onClick={(event) => event.preventDefault()} > Открыть окно </a>


    const cancelButton = <button modal="close"  className="btn grey lighten-1 black-text" >Отмена</button>;
    const submit = <button modal="close"  className="btn grey lighten-1 black-text " >Отправить</button>;


    return (

        <Modal header="Окно открыто" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
        <p>Заглушка внутри</p>
      </Modal>
        )
}