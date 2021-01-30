import React  from 'react';
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



