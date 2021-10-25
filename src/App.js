import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

let baseURL = "https://pokeapi.co/api/v2/pokemon/12";

function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
      <p>{post.name}</p>
      {/* <p>{post}</p>
      <p>{post}</p> */}
    </div>
      </header>
    </div>
  );
}

export default App;
