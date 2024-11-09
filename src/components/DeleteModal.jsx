import React from 'react'
import { Button, Modal } from 'antd';

const DeleteModal = ({isDeleteModalOpen, setIsDeleteModalOpen, inputs, setInputs, data, setData}) => {

  const deletePerson = () => {
    const newData = data.filter(item => item.key !== inputs.key)
    setData(newData)
    setIsDeleteModalOpen(false)
    setInputs({
      name: "",
      lastName: "",
      middleName: "",
      age: null,
      key: undefined,
    })
  }

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <Modal 
        title="Удалить выбранного пользователя" 
        open={isDeleteModalOpen} 
        onOk={deletePerson} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={deletePerson}>
            Удалить
          </Button>
        ]}
      >
      </Modal>
  )
}

export default DeleteModal
