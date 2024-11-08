import './App.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import MyModal from './components/MyModal';

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    middleName: "",
    age: null,
  });
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown Green',
      age: 32,
    },
  ]);

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" className='actions'>
          <a onClick={() => deletePerson(record.key)}><DeleteOutlined /></a>
          <a onClick={() => editPerson(record)}><EditOutlined /></a>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsEdit(false)
    setIsModalOpen(true);
  };

  useEffect(() => {
    setInvalidMessage("")
  }, [isModalOpen])

  const deletePerson = (key) => {
    const newData = data.filter(item => item.key !== key)
    setData(newData)
  }

  const editPerson = (record) => {
    setIsEdit(true)
    setIsModalOpen(true)
    setInputs({
      name: record.name.split(" ")[0],
      lastName: record.name.split(" ")[1],
      middleName: record.name.split(" ")[2],
      age: record.age,
    })
  }


  return (
    <div className='container'>
      <Button type="primary" className='add-btn' onClick={showModal}>
        Добавить
      </Button>
      <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} inputs={inputs} setInputs={setInputs} invalidMessage={invalidMessage} setInvalidMessage={setInvalidMessage} isEdit={isEdit} data={data} setData={setData} />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default App
