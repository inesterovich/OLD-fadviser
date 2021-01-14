import React  from 'react';
// eslint-disable-next-line no-unused-vars
import { Modal, Button } from 'react-materialize';

export const TestModal = (props) => {

    

    const trigger = <Button> Открыть окно </Button>


    const cancelButton = <Button  modal="close"  className="btn grey lighten-1 black-text">Отмена</Button>;
    const submit = <Button modal="close"  className="btn grey lighten-1 black-text " >Отправить</Button>;


    return (

        <Modal header="Окно открыто" trigger={trigger} actions={[
         
            submit, cancelButton
          ]}>
        <p>Заглушка внутри</p>
      </Modal>
        )
}