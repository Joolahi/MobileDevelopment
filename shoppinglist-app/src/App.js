import React, { useEffect, useState } from 'react';
import './App.css';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';

//importing UI styles
import { Button, Input, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

const firebaseConfig = {
  apiKey: "AIzaSyA8InRRDFk1_fMaYzWjb--HVzUTKC8Qqrg",
  authDomain: "shoppinglist-35b36.firebaseapp.com",
  projectId: "shoppinglist-35b36",
  storageBucket: "shoppinglist-35b36.appspot.com",
  messagingSenderId: "950761784534",
  appId: "1:950761784534:web:2e00958aaadae864cbf577",
  measurementId: "G-5EQFHZ4CP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [item, setItem] = useState("");
  const [count, setCount] = useState(1);


  useEffect(() => {
    const fetchData = async () => {

      const dataCollection = collection(db, 'items');
      const dataSnapshot = await getDocs(dataCollection);

      const items = dataSnapshot.docs.map(doc => {
        return {
          name: doc.data().name,
          count: doc.data().count,
          id: doc.id
        };
      });

      setItems(items);
      setLoading(false);
    }
    fetchData();
  }, []);


  if (loading) return (<p>Loading...</p>);


  const sh_items = items.map((item, index) => {
    return (
      <Card style={{
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#BBD6B8',
        border: "solid",
        borderWidth: '1px',
        borderBlockColor: "#665A48",
        marginBottom: "10px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p key={index} style={{ fontSize: "25px", margin: "1px", marginLeft: "25%" }}>{item.name} {item.count}</p>
          <Button type="primary" style={{ backgroundColor: "#EA5455", marginTop: "10px", marginRight: "5%" }} onClick={() => deleteItem(item)}>
            <DeleteOutlined />
          </Button>
        </div>
      </Card>
    );
  });

  const addItem = async () => {
    let newItem = { name: item, count: count, id: '' };
    let doc = await addDoc(collection(db, 'items'), newItem);
    newItem.id = doc.id;
    setItems([...items, newItem]);
    setItem('')
    setCount(1);
  }

  const deleteItem = async (item) => {
    deleteDoc(doc(db, "items", item.id));
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray);
  }


  return (
    <div className="App">

      <div className="Container">
        <img src='./shoppingListLogo.png' className="App-logo" />
        <h1 className="App-title">Shopping List</h1>
        <div className="Inputs-Container">
          <Input placeholder="Add Item" className="Text-Input" onChange={e => setItem(e.target.value)} />
          <Input placeholder="Add Count" className="Number-Input" keyBoard="numeric" onChange={e => setCount(e.target.value)} />
          <Button type="primary" className='Button' onClick={() => addItem()}>
            Add </Button>
        </div>

      </div>
      <div className="cardItems">
        {sh_items}
      </div>
    </div>
  );
}

export default App;
