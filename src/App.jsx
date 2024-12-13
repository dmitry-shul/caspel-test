import './App.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import MyModal from './components/MyModal';
import DeleteModal from './components/DeleteModal';

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    middleName: "",
    age: null,
    key: undefined,
  });
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown Green',
      age: 32,
    },
    {
      key: '2',
      name: 'Alex Rich Black',
      age: 19,
    },
    {
      key: '3',
      name: 'Bob Smith White',
      age: 56,
    },
  ]);

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: [
        {
          text: 'John',
          value: 'John',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
      sortDirections: ['descend'],
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" className='actions'>
          <a onClick={() => (setIsDeleteModalOpen(true), setInputs({...inputs, key: record.key})) }><DeleteOutlined /></a>
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

  const editPerson = (record) => {
    setIsEdit(true)
    setIsModalOpen(true)
    setInputs({
      name: record.name.split(" ")[0],
      lastName: record.name.split(" ")[1],
      middleName: record.name.split(" ")[2],
      age: record.age,
      key: record.key,
    })
  }


  return (
    <div className='container'>
      <Button type="primary" className='add-btn' onClick={showModal}>
        Добавить
      </Button>
      <MyModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        inputs={inputs} 
        setInputs={setInputs} 
        invalidMessage={invalidMessage} 
        setInvalidMessage={setInvalidMessage} 
        isEdit={isEdit} 
        data={data} 
        setData={setData} 
      />
      <DeleteModal 
        isDeleteModalOpen={isDeleteModalOpen} 
        setIsDeleteModalOpen={setIsDeleteModalOpen} 
        inputs={inputs} 
        setInputs={setInputs}
        data={data} 
        setData={setData} 
      />
      <Table 
        columns={columns} 
        dataSource={data} 
        showSorterTooltip={{target: 'sorter-icon',}} 
      />
    </div>
  )
}

export default App
