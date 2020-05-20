import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

//3 conceitos principais do react -> component, state, proprieties(props)
// Component -> isolated block made from html, css and js that does not interfere with the rest of the application
//Prop -> more like attributes that parent passes to child
//State -> 


function App() {

  const [devs, setDevs] = useState([]);


  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
  }

  useEffect(() => {
    loadDevs();
    console.log('loadDevs was called')
  }, []);


  async function handleAddDev(data) {
    console.log(devs.findIndex(dev => dev.github_username === data.github_username));
    if (devs.findIndex(dev => dev.github_username === data.github_username) !== -1) {
      console.log("Dev already added");
      alert("dev alrdy added")
      return;
    }
    await api.post('/devs', data)
    console.log("dev added =)");
    loadDevs()
  }

  async function handleDeleteDev(data){
    await api.delete('/devs', data._id)
    alert("dev deleted =)");
    loadDevs()
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (<DevItem key={dev._id} dev={dev} onSubmit={handleDeleteDev}/>))}
        </ul>
      </main>
    </div>
  );
}

export default App;
