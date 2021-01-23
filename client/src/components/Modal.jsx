import React  from 'react';
// eslint-disable-next-line no-unused-vars
import { Modal, Button } from 'react-materialize';



export const ModalCustom = ({ data }) => {

  const { name, component } = data;


  const trigger = <Button>{`${name}`} </Button>
  

  return (

    <Modal header={name} trigger={trigger}>
     {component}
  </Modal>
    )
}



// Я всё-таки хотел бы внутрь одной функции всё это обернуть. Там и поиграть можно будет с контентом