import React from 'react'
import '../App.css'
import { Button, Input, Modal } from 'antd';


const MyModal = ({isModalOpen, setIsModalOpen, inputs, setInputs, invalidMessage, isEdit, setInvalidMessage, data, setData}) => {

  const handleOk = () => {
    const valid = validation()
    const person = {
      key: String(Math.floor(Math.random()*1000000)),
      name: `${inputs.name} ${inputs.lastName} ${inputs.middleName}`,
      age: Number(inputs.age),
    }
    if(valid) {
      setData([...data, person])
      setIsModalOpen(false);
      setInputs({
        name: "",
        lastName: "",
        middleName: "",
        age: null,
        key: undefined,
      })
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputs({
      name: "",
      lastName: "",
      middleName: "",
      age: null,
      key: undefined,
    })
  };

  const validation = () => {
    let valid = true
    if(inputs.age < 0) {
      setInvalidMessage("Неверно указан возраст")
      valid = false
    }
    if(inputs.name.length < 2 || inputs.lastName.length < 2 || inputs.middleName.length < 2) {
      setInvalidMessage("Имя, Фамилия,Отчество должны состоять минимум из 2 символов")
      valid = false
    }
    Object.values(inputs).forEach(item => {
      if(item === "" || item === null) {
        setInvalidMessage("Все поля должны быть заполнены")
        valid = false
      }
    })
    if(valid) setInvalidMessage("")
    return valid
  }

  const saveEdit = () => {
    const filteredData = data.filter(item => item.key !== inputs.key)
    const valid = validation()
    const editPerson = {
      key: String(inputs.key),
      name: `${inputs.name} ${inputs.lastName} ${inputs.middleName}`,
      age: Number(inputs.age),
    }
    const newData = [...filteredData, editPerson]
    const sortedData = newData.sort((a, b) => a.key - b.key)
    if(valid) {
      setData(sortedData)
      setIsModalOpen(false);
      setInputs({
        name: "",
        lastName: "",
        middleName: "",
        age: null,
        key: undefined,
      })
    }
  }

  return (
    <Modal 
        title="Добавить пользователя" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          isEdit
          ? <Button key="save" type="primary" onClick={saveEdit}>
              Сохранить
            </Button>
          : <Button key="submit" type="primary" onClick={handleOk}>
              Добавить
            </Button>,
        ]}
      >
        <div className="input-block">
          <p>Имя</p>
          <Input 
            placeholder='Имя' 
            value={inputs.name} 
            onChange={e => setInputs({...inputs, name: e.target.value})} 
          />
        </div>
        <div className="input-block">
          <p>Фамилия</p>
          <Input 
            placeholder='Фамилия' 
            value={inputs.lastName} 
            onChange={e => setInputs({...inputs, lastName: e.target.value})} 
          />
        </div>
        <div className="input-block">
          <p>Отчество</p>
          <Input 
            placeholder='Отчество' 
            value={inputs.middleName} 
            onChange={e => setInputs({...inputs, middleName: e.target.value})} 
          />
        </div>
        <div className="input-block">
          <p>Возраст</p>
          <Input 
            type='number' 
            min={0} 
            placeholder='Возраст' 
            value={inputs.age} 
            onChange={e => setInputs({...inputs, age: e.target.value})} 
          />
        </div>
        <p className="invalid-message">{invalidMessage}</p>
      </Modal>
  )
}

export default MyModal
